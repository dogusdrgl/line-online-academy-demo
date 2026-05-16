import { bindStaticUi, closeAuthModal, renderMembers, renderSessionSummary, resetAuthState, setAuthState, setFeedback } from "./ui.js";
import { hasSupabase, ensureProfile, ensureRoles, fetchMemberDirectory, restoreSupabaseSession, signInMember, signOutMember, signUpMember, supabaseClient, updatePresence } from "./supabase.js";
import { loadSavedSession, state } from "./store.js";

async function bootstrap() {
  state.roles = await ensureRoles();
  restoreLocalSession();
  bindStaticUi({
    onSignIn: handleSignIn,
    onSignUp: handleSignUp,
    onGuest: handleGuestLogin,
    onRefresh: refreshMembers,
    onLogout: handleLogout
  });

  await restoreRemoteSession();
  await refreshMembers();
  renderSessionSummary();
  renderMembers();
  startPresenceLoop();
  bindUnloadPresence();
}

function restoreLocalSession() {
  const saved = loadSavedSession();
  if (!saved) {
    return;
  }

  setAuthState(saved);
}

async function restoreRemoteSession() {
  if (!hasSupabase()) {
    return;
  }

  const session = await restoreSupabaseSession();
  const user = session?.user;
  if (!user) {
    return;
  }

  const displayName = user.user_metadata?.display_name || user.email?.split("@")[0] || "Line Uyesi";
  const roleIds = ["member"];
  await ensureProfile({
    id: user.id,
    name: displayName,
    email: user.email || null,
    roleIds,
    isGuest: false,
    isOnline: true
  });

  setAuthState({
    mode: "member",
    userId: user.id,
    name: displayName,
    roleIds,
    isOnline: true
  });
}

async function handleSignUp({ name, email, password }) {
  try {
    await signUpMember({ name, email, password });
    setFeedback("Kayit olusturuldu. E-posta onayi kapaliysa hemen giris yapabilirsin.");
  } catch (error) {
    setFeedback(error.message || "Kayit olusturulamadi.");
  }
}

async function handleSignIn({ email, password }) {
  try {
    const { user } = await signInMember({ email, password });
    const displayName = user.user_metadata?.display_name || user.email?.split("@")[0] || "Line Uyesi";
    const roleIds = ["member"];

    await ensureProfile({
      id: user.id,
      name: displayName,
      email: user.email || null,
      roleIds,
      isGuest: false,
      isOnline: true
    });

    setAuthState({
      mode: "member",
      userId: user.id,
      name: displayName,
      roleIds,
      isOnline: true
    });

    closeAuthModal();
    await refreshMembers();
  } catch (error) {
    setFeedback(error.message || "Giris basarisiz.");
  }
}

async function handleGuestLogin({ name }) {
  if (!name) {
    setFeedback("Misafir adi gir.");
    return;
  }

  const guestId = `guest-${crypto.randomUUID?.() || Date.now()}`;
  const roleIds = ["guest"];

  try {
    if (hasSupabase()) {
      await ensureProfile({
        id: guestId,
        name,
        roleIds,
        isGuest: true,
        isOnline: true
      });
    }

    setAuthState({
      mode: "guest",
      userId: guestId,
      name,
      roleIds,
      isOnline: true
    });

    closeAuthModal();
    await refreshMembers();
  } catch (error) {
    setFeedback(error.message || "Misafir girisi basarisiz.");
  }
}

async function refreshMembers() {
  try {
    if (hasSupabase()) {
      state.members = await fetchMemberDirectory();
    } else {
      state.members = state.auth.userId
        ? [{
            id: state.auth.userId,
            name: state.auth.name,
            roleIds: state.auth.roleIds,
            primaryRoleId: state.auth.roleIds[0] || "member",
            isGuest: state.auth.mode === "guest",
            isOnline: true,
            lastSeen: new Date().toISOString()
          }]
        : [];
    }
  } catch (error) {
    console.warn("V2 uye listesi yuklenemedi:", error.message);
  }

  renderMembers();
}

async function handleLogout() {
  try {
    if (state.auth.userId && hasSupabase()) {
      await updatePresence(state.auth.userId, false);
    }

    if (state.auth.mode === "member") {
      await signOutMember();
    }
  } catch (error) {
    console.warn("V2 cikis hatasi:", error.message);
  }

  resetAuthState();
  await refreshMembers();
}

function startPresenceLoop() {
  window.setInterval(async () => {
    if (!state.auth.userId || state.auth.mode === "visitor") {
      return;
    }

    if (hasSupabase()) {
      await updatePresence(state.auth.userId, true);
      await refreshMembers();
    }
  }, 12000);

  document.addEventListener("visibilitychange", async () => {
    if (document.visibilityState === "visible" && state.auth.userId && hasSupabase()) {
      await updatePresence(state.auth.userId, true);
      await refreshMembers();
    }
  });
}

function bindUnloadPresence() {
  const goOffline = async () => {
    if (!state.auth.userId || !hasSupabase()) {
      return;
    }
    await updatePresence(state.auth.userId, false);
  };

  window.addEventListener("beforeunload", () => {
    goOffline().catch(() => {});
  });
}

window.addEventListener("keydown", async (event) => {
  if (event.key === "Escape") {
    closeAuthModal();
  }

  if (event.key === "F9" && state.auth.mode !== "visitor") {
    await handleLogout();
  }
});

if (supabaseClient?.auth?.onAuthStateChange) {
  supabaseClient.auth.onAuthStateChange(async (event, session) => {
    if (event === "SIGNED_OUT") {
      resetAuthState();
      await refreshMembers();
      return;
    }

    if (event === "SIGNED_IN" && session?.user) {
      await restoreRemoteSession();
      await refreshMembers();
    }
  });
}

bootstrap().catch((error) => {
  console.error("V2 bootstrap hatasi:", error);
});

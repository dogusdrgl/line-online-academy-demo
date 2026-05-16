import { bindStaticUi, closeAuthModal, renderMembers, renderSessionSummary, resetAuthState, setAuthState, setFeedback } from "./ui.js";
import { ensureProfile, ensureRoles, fetchMemberDirectory, fetchUserSnapshot, hasSupabase, replaceUserRoles, restoreSupabaseSession, signInMember, signOutMember, signUpMember, supabaseClient, updatePresence } from "./supabase.js";
import { getPrimaryRoleId, loadSavedSession, normalizeRoleIds, state } from "./store.js";

const ADMIN_PASSWORD = "Line5367";
const viewTitle = document.getElementById("view-title");
const viewButtons = Array.from(document.querySelectorAll("[data-view]"));
const viewPanels = Array.from(document.querySelectorAll(".view-panel"));
const adminMenuButton = document.getElementById("open-admin");
const adminBackdrop = document.getElementById("admin-backdrop");
const adminCloseButton = document.getElementById("admin-close");
const adminPasswordInput = document.getElementById("admin-password");
const adminUnlockButton = document.getElementById("admin-unlock");
const adminLock = document.getElementById("admin-lock");
const adminPanel = document.getElementById("admin-panel");
const adminUsersList = document.getElementById("admin-users-list");
const adminRefreshUsersButton = document.getElementById("admin-refresh-users");
const adminMemberSearchInput = document.getElementById("admin-member-search");
const adminMemberStats = document.getElementById("admin-member-stats");

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
  bindViews();
  bindAdminUi();

  await restoreRemoteSession();
  await refreshMembers();
  renderSessionSummary();
  renderMembers();
  renderAdminUsers();
  startPresenceLoop();
  bindUnloadPresence();
}

function restoreLocalSession() {
  const saved = loadSavedSession();
  if (saved) {
    setAuthState(saved);
  }
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
  const existing = await fetchUserSnapshot(user.id).catch(() => null);
  const roleIds = normalizeRoleIds(existing?.roleIds || ["member"]);

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
    const existing = await fetchUserSnapshot(user.id).catch(() => null);
    const roleIds = normalizeRoleIds(existing?.roleIds || ["member"]);

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
            primaryRoleId: getPrimaryRoleId(state.auth.roleIds || ["member"]),
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
  renderAdminUsers();
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

function bindViews() {
  viewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextView = button.dataset.view;
      if (nextView) {
        setActiveView(nextView, button.textContent.trim());
      }
    });
  });
}

function setActiveView(viewId, label) {
  viewButtons.forEach((button) => button.classList.toggle("active", button.dataset.view === viewId));
  viewPanels.forEach((panel) => panel.classList.toggle("active", panel.id === viewId));
  if (viewTitle && label) {
    viewTitle.textContent = label;
  }
}

function bindAdminUi() {
  adminMenuButton?.addEventListener("click", openAdminModal);
  adminCloseButton?.addEventListener("click", closeAdminModal);
  adminUnlockButton?.addEventListener("click", unlockAdmin);
  adminRefreshUsersButton?.addEventListener("click", refreshMembers);
  adminMemberSearchInput?.addEventListener("input", renderAdminUsers);
}

function openAdminModal() {
  adminBackdrop?.classList.remove("hidden");
  adminLock?.classList.remove("hidden");
  adminPanel?.classList.add("hidden");
  if (adminPasswordInput) {
    adminPasswordInput.value = "";
  }
}

function closeAdminModal() {
  adminBackdrop?.classList.add("hidden");
}

function unlockAdmin() {
  if (adminPasswordInput?.value !== ADMIN_PASSWORD) {
    window.alert("Admin sifresi hatali.");
    return;
  }

  adminLock?.classList.add("hidden");
  adminPanel?.classList.remove("hidden");
  renderAdminUsers();
}

function renderAdminUsers() {
  if (!adminUsersList) {
    return;
  }

  const searchTerm = (adminMemberSearchInput?.value || "").trim().toLocaleLowerCase("tr");
  const users = [...state.members].sort((first, second) => {
    const firstOrder = state.roles.find((role) => role.id === first.primaryRoleId)?.sortOrder ?? 999;
    const secondOrder = state.roles.find((role) => role.id === second.primaryRoleId)?.sortOrder ?? 999;
    return firstOrder - secondOrder || String(first.name).localeCompare(String(second.name), "tr");
  });
  const filteredUsers = searchTerm
    ? users.filter((user) => [user.name, ...(user.roleIds || [])].join(" ").toLocaleLowerCase("tr").includes(searchTerm))
    : users;

  if (adminMemberStats) {
    const total = users.length;
    const online = users.filter((user) => user.isOnline).length;
    const offline = total - online;
    adminMemberStats.innerHTML = `
      <article class="admin-kpi"><span>Toplam Uye</span><strong>${total}</strong></article>
      <article class="admin-kpi is-online"><span>Cevrimici</span><strong>${online}</strong></article>
      <article class="admin-kpi is-offline"><span>Cevrimdisi</span><strong>${offline}</strong></article>
    `;
  }

  adminUsersList.innerHTML = filteredUsers.length
    ? filteredUsers.map((user) => renderAdminUserCard(user)).join("")
    : '<p class="admin-muted">Henuz kayitli uye bulunamadi.</p>';

  adminUsersList.querySelectorAll("[data-role-toggle]").forEach((input) => {
    input.addEventListener("change", async () => {
      const userId = input.dataset.userId;
      const selectedRoleIds = Array.from(adminUsersList.querySelectorAll(`[data-role-toggle][data-user-id="${userId}"]:checked`)).map((item) => item.value);
      await assignRoles(userId, selectedRoleIds);
    });
  });
}

function renderAdminUserCard(user) {
  const roleOptions = state.roles.map((role) => `
    <label class="member-role-choice">
      <input type="checkbox" data-role-toggle data-user-id="${escapeHtml(user.id)}" value="${escapeHtml(role.id)}" ${user.roleIds.includes(role.id) ? "checked" : ""} />
      <span>${escapeHtml(role.name)}</span>
    </label>
  `).join("");

  return `
    <article class="member-admin-card">
      <div class="member-admin-main">
        <div class="member-admin-avatar" style="background:${escapeHtml(state.roles.find((role) => role.id === user.primaryRoleId)?.color || "#6e80ff")}">
          ${escapeHtml((user.name || "U").slice(0, 1).toUpperCase())}
        </div>
        <div class="member-admin-meta">
          <div class="member-admin-topline">
            <strong>${escapeHtml(user.name)}</strong>
            <span class="member-status">${user.isOnline ? "Cevrimici" : "Cevrimdisi"}</span>
          </div>
          <small>${escapeHtml(user.id)}</small>
          <p class="member-role-summary">Ust rol: ${escapeHtml(state.roles.find((role) => role.id === user.primaryRoleId)?.name || "Uye")}</p>
        </div>
      </div>
      <div class="member-role-matrix">${roleOptions}</div>
    </article>
  `;
}

async function assignRoles(userId, roleIds) {
  const normalizedRoleIds = normalizeRoleIds(roleIds);
  state.members = state.members.map((member) => (
    member.id === userId
      ? {
          ...member,
          roleIds: normalizedRoleIds,
          primaryRoleId: getPrimaryRoleId(normalizedRoleIds),
          isGuest: normalizedRoleIds.includes("guest")
        }
      : member
  ));
  renderMembers();
  renderAdminUsers();

  if (hasSupabase()) {
    await replaceUserRoles(userId, normalizedRoleIds);
    const member = state.members.find((item) => item.id === userId);
    if (member) {
      await ensureProfile({
        id: member.id,
        name: member.name,
        email: member.email || null,
        roleIds: normalizedRoleIds,
        isGuest: normalizedRoleIds.includes("guest"),
        isOnline: member.isOnline
      });
    }
  }

  if (state.auth.userId === userId) {
    setAuthState({
      ...state.auth,
      roleIds: normalizedRoleIds
    });
  }

  await refreshMembers();
}

function startPresenceLoop() {
  window.setInterval(async () => {
    if (!state.auth.userId || state.auth.mode === "visitor" || !hasSupabase()) {
      return;
    }

    await updatePresence(state.auth.userId, true);
    await refreshMembers();
  }, 12000);

  document.addEventListener("visibilitychange", async () => {
    if (document.visibilityState === "visible" && state.auth.userId && hasSupabase()) {
      await updatePresence(state.auth.userId, true);
      await refreshMembers();
    }
  });
}

function bindUnloadPresence() {
  window.addEventListener("beforeunload", () => {
    if (state.auth.userId && hasSupabase()) {
      updatePresence(state.auth.userId, false).catch(() => {});
    }
  });
}

window.addEventListener("keydown", async (event) => {
  if (event.key === "Escape") {
    closeAuthModal();
    closeAdminModal();
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

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

bootstrap().catch((error) => {
  console.error("V2 bootstrap hatasi:", error);
});

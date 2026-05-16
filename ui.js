import { clearSession, getPrimaryRoleId, getRole, getRoleLabel, normalizeRoleIds, saveSession, state } from "./store.js";

const elements = {
  authModal: document.getElementById("auth-modal"),
  openAuth: document.getElementById("open-auth"),
  openAuthGuestSignin: document.getElementById("open-auth-guest-signin"),
  openAuthGuestSignup: document.getElementById("open-auth-guest-signup"),
  closeAuth: document.getElementById("close-auth"),
  signinForm: document.getElementById("signin-form"),
  signupForm: document.getElementById("signup-form"),
  guestForm: document.getElementById("guest-form"),
  authFeedback: document.getElementById("auth-feedback"),
  sessionSummary: document.getElementById("session-summary"),
  membersGroups: document.getElementById("members-groups"),
  memberCount: document.getElementById("member-count"),
  refreshMembers: document.getElementById("refresh-members"),
  guestCard: document.getElementById("guest-card"),
  identityCard: document.getElementById("identity-card"),
  identityAvatar: document.getElementById("identity-avatar"),
  identityName: document.getElementById("identity-name"),
  identityRoleSummary: document.getElementById("identity-role-summary"),
  logoutButton: document.getElementById("logout-button")
};

export function bindStaticUi({ onSignIn, onSignUp, onGuest, onRefresh, onLogout }) {
  elements.openAuth?.addEventListener("click", openAuthModal);
  elements.openAuthGuestSignin?.addEventListener("click", openAuthModal);
  elements.openAuthGuestSignup?.addEventListener("click", openAuthModal);
  elements.closeAuth?.addEventListener("click", closeAuthModal);
  elements.refreshMembers?.addEventListener("click", onRefresh);
  elements.logoutButton?.addEventListener("click", onLogout);

  elements.signinForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    setFeedback("");
    const email = document.getElementById("signin-email").value.trim();
    const password = document.getElementById("signin-password").value.trim();
    await onSignIn({ email, password });
  });

  elements.signupForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    setFeedback("");
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();
    await onSignUp({ name, email, password });
  });

  elements.guestForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    setFeedback("");
    const name = document.getElementById("guest-name").value.trim();
    await onGuest({ name });
  });
}

export function openAuthModal() {
  elements.authModal?.classList.remove("hidden");
}

export function closeAuthModal() {
  elements.authModal?.classList.add("hidden");
}

export function setFeedback(message) {
  if (elements.authFeedback) {
    elements.authFeedback.textContent = message;
  }
}

export function setAuthState(nextAuthState) {
  state.auth = {
    ...state.auth,
    ...nextAuthState,
    roleIds: normalizeRoleIds(nextAuthState.roleIds || state.auth.roleIds || ["member"])
  };
  saveSession();
  renderSessionSummary();
}

export function resetAuthState() {
  state.auth = {
    mode: "visitor",
    userId: null,
    name: "Ziyaretci",
    roleIds: [],
    isOnline: false
  };
  clearSession();
  renderSessionSummary();
}

export function renderSessionSummary() {
  const roleLabels = state.auth.roleIds.length ? getRoleLabel(state.auth.roleIds).join(" / ") : "Rol yok";

  if (elements.sessionSummary) {
    elements.sessionSummary.innerHTML = `
      <strong>${escapeHtml(state.auth.name)}</strong>
      <span>${escapeHtml(state.auth.mode === "visitor" ? "Henuz giris yapilmadi." : roleLabels)}</span>
    `;
  }

  if (elements.openAuth) {
    elements.openAuth.textContent =
      state.auth.mode === "visitor"
        ? "Giris Yap"
        : state.auth.mode === "guest"
          ? "Misafir Aktif"
          : "Hesabim";
  }

  if (elements.guestCard && elements.identityCard) {
    const isVisitor = state.auth.mode === "visitor";
    elements.guestCard.classList.toggle("hidden", !isVisitor);
    elements.identityCard.classList.toggle("hidden", isVisitor);
  }

  if (elements.identityName) {
    elements.identityName.textContent = state.auth.name;
  }

  if (elements.identityRoleSummary) {
    elements.identityRoleSummary.textContent = state.auth.mode === "visitor" ? "Ziyaretci" : roleLabels;
  }

  if (elements.identityAvatar) {
    const primaryRole = getRole(getPrimaryRoleId(state.auth.roleIds || ["member"]));
    elements.identityAvatar.textContent = (state.auth.name || "L").slice(0, 1).toUpperCase();
    elements.identityAvatar.style.background = primaryRole?.color || "#6e80ff";
  }
}

export function renderMembers() {
  if (!elements.membersGroups) {
    return;
  }

  const members = [...state.members];
  const groups = [
    {
      id: "online-roles",
      title: "Cevrimici Uyeler",
      items: members.filter((member) => member.isOnline && !member.isGuest).sort(compareMembers)
    },
    {
      id: "online-guests",
      title: "Cevrimici Misafirler",
      items: members.filter((member) => member.isOnline && member.isGuest).sort(compareMembers)
    },
    {
      id: "offline",
      title: "Cevrimdisi",
      items: members.filter((member) => !member.isOnline).sort(compareMembers)
    }
  ].filter((group) => group.items.length);

  if (elements.memberCount) {
    elements.memberCount.textContent = String(members.length);
  }

  elements.membersGroups.innerHTML = groups.length
    ? groups.map((group) => `
        <section class="member-group" data-group="${group.id}">
          <h3>${escapeHtml(group.title)} · ${group.items.length}</h3>
          <div class="member-list">
            ${group.items.map(renderMemberRow).join("")}
          </div>
        </section>
      `).join("")
    : '<section class="member-group"><h3>Kullanicilar</h3><p class="muted">Henuz uye yok.</p></section>';
}

function renderMemberRow(member) {
  const primaryRoleId = member.primaryRoleId || getPrimaryRoleId(member.roleIds);
  const primaryRole = getRole(primaryRoleId);
  const roleLabels = normalizeRoleIds(member.roleIds)
    .map((roleId) => {
      const role = getRole(roleId);
      return `<span class="role-${escapeHtml(roleId)}">${escapeHtml(role?.name || roleId)}</span>`;
    })
    .join("");

  return `
    <article class="member-row">
      <div class="member-avatar" style="background:${escapeHtml(primaryRole?.color || "#6e80ff")}">
        ${escapeHtml((member.name || "U").slice(0, 1).toUpperCase())}
      </div>
      <div class="member-meta">
        <p class="member-name">${escapeHtml(member.name || "Isimsiz Uye")}</p>
        <p class="member-roles">${roleLabels}</p>
      </div>
    </article>
  `;
}

function compareMembers(first, second) {
  const firstRoleOrder = getRole(first.primaryRoleId || getPrimaryRoleId(first.roleIds))?.sortOrder ?? 999;
  const secondRoleOrder = getRole(second.primaryRoleId || getPrimaryRoleId(second.roleIds))?.sortOrder ?? 999;
  const firstSeen = new Date(first.lastSeen || 0).getTime();
  const secondSeen = new Date(second.lastSeen || 0).getTime();

  return firstRoleOrder - secondRoleOrder || secondSeen - firstSeen || String(first.name || "").localeCompare(String(second.name || ""), "tr");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

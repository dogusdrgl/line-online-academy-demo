(function () {
  const DEFAULT_ROLES = [
    { id: "admin", name: "Admin", color: "#ff6961", sortOrder: 10 },
    { id: "teacher", name: "Ogretmen", color: "#f1a126", sortOrder: 20 },
    { id: "member", name: "Uye", color: "#6e80ff", sortOrder: 40 },
    { id: "guest", name: "Misafir", color: "#63df63", sortOrder: 90 },
    { id: "assistant", name: "Asistan", color: "#9c8cff", sortOrder: 95 }
  ];

  const state = {
    auth: {
      mode: "visitor",
      userId: null,
      name: "Ziyaretci",
      roleIds: [],
      isOnline: false
    },
    roles: [...DEFAULT_ROLES],
    members: [],
    sessionKey: "line-v2-session"
  };

  const config = window.LINE_V2_SUPABASE_CONFIG || {};
  const supabaseClient =
    window.supabase && config.url && config.anonKey
      ? window.supabase.createClient(config.url, config.anonKey)
      : null;

  const ADMIN_PASSWORD = "Line5367";

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
    identityMemberCount: document.getElementById("identity-member-count"),
    guestCard: document.getElementById("guest-card"),
    identityCard: document.getElementById("identity-card"),
    identityAvatar: document.getElementById("identity-avatar"),
    identityName: document.getElementById("identity-name"),
    identityRoleSummary: document.getElementById("identity-role-summary"),
    logoutButton: document.getElementById("logout-button"),
    viewTitle: document.getElementById("view-title"),
    viewButtons: Array.from(document.querySelectorAll("[data-view]")),
    viewPanels: Array.from(document.querySelectorAll(".view-panel")),
    adminMenuButton: document.getElementById("open-admin"),
    adminBackdrop: document.getElementById("admin-backdrop"),
    adminCloseButton: document.getElementById("admin-close"),
    adminPasswordInput: document.getElementById("admin-password"),
    adminUnlockButton: document.getElementById("admin-unlock"),
    adminLock: document.getElementById("admin-lock"),
    adminPanel: document.getElementById("admin-panel"),
    adminUsersList: document.getElementById("admin-users-list"),
    adminRefreshUsersButton: document.getElementById("admin-refresh-users"),
    adminMemberSearchInput: document.getElementById("admin-member-search"),
    adminMemberStats: document.getElementById("admin-member-stats")
  };

  function hasSupabase() {
    return Boolean(supabaseClient);
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function getRole(roleId) {
    return state.roles.find((role) => role.id === roleId) || null;
  }

  function normalizeRoleIds(roleIds) {
    const next = Array.isArray(roleIds) ? roleIds.filter(Boolean) : roleIds ? [roleIds] : [];
    return next.length ? Array.from(new Set(next)) : ["member"];
  }

  function getPrimaryRoleId(roleIds) {
    const normalized = normalizeRoleIds(roleIds);
    return [...normalized].sort((first, second) => {
      const firstOrder = getRole(first)?.sortOrder ?? 999;
      const secondOrder = getRole(second)?.sortOrder ?? 999;
      return firstOrder - secondOrder;
    })[0];
  }

  function getRoleLabel(roleIds) {
    return normalizeRoleIds(roleIds).map((roleId) => getRole(roleId)?.name || roleId);
  }

  function loadSavedSession() {
    try {
      const raw = window.localStorage.getItem(state.sessionKey);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function saveSession() {
    try {
      window.localStorage.setItem(state.sessionKey, JSON.stringify(state.auth));
    } catch {}
  }

  function clearSession() {
    try {
      window.localStorage.removeItem(state.sessionKey);
    } catch {}
  }

  async function ensureRoles() {
    if (!supabaseClient) {
      return DEFAULT_ROLES;
    }

    const { data, error } = await supabaseClient
      .from("roles_v2")
      .select("id, name, color, sort_order")
      .order("sort_order", { ascending: true });

    if (error || !data?.length) {
      return DEFAULT_ROLES;
    }

    return data.map((role) => ({
      id: role.id,
      name: role.name,
      color: role.color,
      sortOrder: role.sort_order
    }));
  }

  async function signUpMember(payload) {
    if (!supabaseClient?.auth) {
      throw new Error("Supabase baglantisi kurulmadan uye kaydi acik degil.");
    }

    const response = await supabaseClient.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        data: {
          display_name: payload.name
        }
      }
    });

    if (response.error) {
      throw response.error;
    }

    return response.data;
  }

  async function signInMember(payload) {
    if (!supabaseClient?.auth) {
      throw new Error("Supabase baglantisi kurulmadan uye girisi acik degil.");
    }

    const response = await supabaseClient.auth.signInWithPassword({
      email: payload.email,
      password: payload.password
    });

    if (response.error) {
      throw response.error;
    }

    return response.data;
  }

  async function signOutMember() {
    if (!supabaseClient?.auth) {
      return;
    }

    await supabaseClient.auth.signOut();
  }

  async function fetchUserSnapshot(userId) {
    if (!supabaseClient || !userId) {
      return null;
    }

    const [{ data: profile, error: profileError }, { data: roles, error: rolesError }] = await Promise.all([
      supabaseClient
        .from("profiles_v2")
        .select("id, display_name, email, is_guest, is_online, last_seen, created_at")
        .eq("id", userId)
        .maybeSingle(),
      supabaseClient.from("user_roles_v2").select("role_id").eq("user_id", userId)
    ]);

    if (profileError) throw profileError;
    if (rolesError) throw rolesError;
    if (!profile) return null;

    const roleIds = normalizeRoleIds((roles || []).map((item) => item.role_id) || (profile.is_guest ? ["guest"] : ["member"]));
    return {
      id: profile.id,
      name: profile.display_name,
      email: profile.email,
      roleIds,
      primaryRoleId: getPrimaryRoleId(roleIds),
      isGuest: Boolean(profile.is_guest),
      isOnline: Boolean(profile.is_online),
      lastSeen: profile.last_seen || profile.created_at || null
    };
  }

  async function replaceUserRoles(userId, roleIds) {
    if (!supabaseClient) return;

    const normalizedRoleIds = normalizeRoleIds(roleIds);
    const { error: deleteError } = await supabaseClient.from("user_roles_v2").delete().eq("user_id", userId);
    if (deleteError) throw deleteError;

    const { error: insertError } = await supabaseClient
      .from("user_roles_v2")
      .insert(normalizedRoleIds.map((roleId) => ({ user_id: userId, role_id: roleId })));
    if (insertError) throw insertError;
  }

  async function ensureProfile({ id, name, email = null, roleIds = null, isGuest = false, isOnline = true }) {
    if (!supabaseClient) return;

    const existing = await fetchUserSnapshot(id).catch(() => null);
    const resolvedRoleIds = normalizeRoleIds(roleIds || existing?.roleIds || (isGuest ? ["guest"] : ["member"]));
    const { error } = await supabaseClient.from("profiles_v2").upsert({
      id,
      display_name: name,
      email,
      is_guest: isGuest,
      is_online: isOnline,
      last_seen: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });

    if (error) throw error;

    await replaceUserRoles(id, resolvedRoleIds);
  }

  async function updatePresence(userId, isOnline) {
    if (!supabaseClient || !userId) return;

    await supabaseClient
      .from("profiles_v2")
      .update({
        is_online: isOnline,
        last_seen: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq("id", userId);
  }

  async function fetchMemberDirectory() {
    if (!supabaseClient) return [];

    const [{ data: profiles, error: profilesError }, { data: userRoles, error: userRolesError }] = await Promise.all([
      supabaseClient.from("profiles_v2").select("id, display_name, email, is_guest, is_online, last_seen, created_at"),
      supabaseClient.from("user_roles_v2").select("user_id, role_id")
    ]);

    if (profilesError) throw profilesError;
    if (userRolesError) throw userRolesError;

    const rolesByUser = new Map();
    (userRoles || []).forEach((row) => {
      const bucket = rolesByUser.get(row.user_id) || [];
      bucket.push(row.role_id);
      rolesByUser.set(row.user_id, bucket);
    });

    return (profiles || []).map((profile) => {
      const roleIds = normalizeRoleIds(rolesByUser.get(profile.id) || (profile.is_guest ? ["guest"] : ["member"]));
      return {
        id: profile.id,
        name: profile.display_name,
        email: profile.email,
        roleIds,
        primaryRoleId: getPrimaryRoleId(roleIds),
        isGuest: Boolean(profile.is_guest),
        isOnline: Boolean(profile.is_online),
        lastSeen: profile.last_seen || profile.created_at || null
      };
    });
  }

  async function restoreSupabaseSession() {
    if (!supabaseClient?.auth?.getSession) return null;
    const response = await supabaseClient.auth.getSession();
    if (response.error) throw response.error;
    return response.data?.session || null;
  }

  function setFeedback(message) {
    if (elements.authFeedback) {
      elements.authFeedback.textContent = message;
    }
  }

  function openAuthModal() {
    elements.authModal?.classList.remove("hidden");
  }

  function closeAuthModal() {
    elements.authModal?.classList.add("hidden");
  }

  function setAuthState(nextAuthState) {
    state.auth = {
      ...state.auth,
      ...nextAuthState,
      roleIds: normalizeRoleIds(nextAuthState.roleIds || state.auth.roleIds || ["member"])
    };
    saveSession();
    renderSessionSummary();
  }

  function resetAuthState() {
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

  function renderSessionSummary() {
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

  function compareMembers(first, second) {
    const firstRoleOrder = getRole(first.primaryRoleId || getPrimaryRoleId(first.roleIds))?.sortOrder ?? 999;
    const secondRoleOrder = getRole(second.primaryRoleId || getPrimaryRoleId(second.roleIds))?.sortOrder ?? 999;
    const firstSeen = new Date(first.lastSeen || 0).getTime();
    const secondSeen = new Date(second.lastSeen || 0).getTime();
    return firstRoleOrder - secondRoleOrder || secondSeen - firstSeen || String(first.name || "").localeCompare(String(second.name || ""), "tr");
  }

  function renderMemberRow(member) {
    const primaryRoleId = member.primaryRoleId || getPrimaryRoleId(member.roleIds);
    const primaryRole = getRole(primaryRoleId);
    const roleLabels = member.isOnline
      ? normalizeRoleIds(member.roleIds).map((roleId) => {
          const role = getRole(roleId);
          return `<span class="role-${escapeHtml(roleId)}">${escapeHtml(role?.name || roleId)}</span>`;
        }).join("")
      : '<span class="role-offline">Cevrimdisi</span>';

    return `
      <article class="member-row ${member.isOnline ? "" : "is-offline"}">
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

  function renderMembers() {
    if (!elements.membersGroups) return;

    const members = [...state.members];
    const onlineGroupsMap = new Map();

    members
      .filter((member) => member.isOnline)
      .sort(compareMembers)
      .forEach((member) => {
        const primaryRoleId = member.primaryRoleId || getPrimaryRoleId(member.roleIds);
        const primaryRole = getRole(primaryRoleId);
        const groupId = primaryRoleId || "member";
        const groupTitle = (primaryRole?.name || "Uye").toUpperCase();
        const existing = onlineGroupsMap.get(groupId) || { id: `online-${groupId}`, title: groupTitle, items: [] };
        existing.items.push(member);
        onlineGroupsMap.set(groupId, existing);
      });

    const onlineGroups = Array.from(onlineGroupsMap.values()).sort((first, second) => {
      const firstRoleId = first.items[0]?.primaryRoleId || getPrimaryRoleId(first.items[0]?.roleIds || ["member"]);
      const secondRoleId = second.items[0]?.primaryRoleId || getPrimaryRoleId(second.items[0]?.roleIds || ["member"]);
      const firstOrder = getRole(firstRoleId)?.sortOrder ?? 999;
      const secondOrder = getRole(secondRoleId)?.sortOrder ?? 999;
      return firstOrder - secondOrder || first.title.localeCompare(second.title, "tr");
    });

    const offlineMembers = members.filter((member) => !member.isOnline).sort(compareMembers);
    const groups = [
      ...onlineGroups,
      ...(offlineMembers.length ? [{ id: "offline", title: "CEVRIMDISI", items: offlineMembers }] : [])
    ];

    if (elements.memberCount) {
      elements.memberCount.textContent = String(members.length);
    }
    if (elements.identityMemberCount) {
      elements.identityMemberCount.textContent = String(members.length);
    }

    elements.membersGroups.innerHTML = groups.length
      ? groups.map((group) => `
          <section class="member-group" data-group="${group.id}">
            <div class="member-group-head">
              <h3>${escapeHtml(group.title)}</h3>
              <span class="member-group-count">${group.items.length}</span>
            </div>
            <div class="member-list">
              ${group.items.map(renderMemberRow).join("")}
            </div>
          </section>
        `).join("")
      : '<section class="member-group"><h3>Kullanicilar</h3><p class="muted">Henuz uye yok.</p></section>';
  }

  function setActiveView(viewId, label) {
    elements.viewButtons.forEach((button) => button.classList.toggle("active", button.dataset.view === viewId));
    elements.viewPanels.forEach((panel) => panel.classList.toggle("active", panel.id === viewId));
    if (elements.viewTitle && label) {
      elements.viewTitle.textContent = label;
    }
  }

  function bindViews() {
    elements.viewButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const nextView = button.dataset.view;
        if (nextView) {
          setActiveView(nextView, button.textContent.trim());
        }
      });
    });
  }

  function openAdminModal() {
    elements.adminBackdrop?.classList.remove("hidden");
    elements.adminLock?.classList.remove("hidden");
    elements.adminPanel?.classList.add("hidden");
    if (elements.adminPasswordInput) {
      elements.adminPasswordInput.value = "";
    }
  }

  function closeAdminModal() {
    elements.adminBackdrop?.classList.add("hidden");
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
          <div class="member-admin-avatar" style="background:${escapeHtml(getRole(user.primaryRoleId)?.color || "#6e80ff")}">
            ${escapeHtml((user.name || "U").slice(0, 1).toUpperCase())}
          </div>
          <div class="member-admin-meta">
            <div class="member-admin-topline">
              <strong>${escapeHtml(user.name)}</strong>
              <span class="member-status">${user.isOnline ? "Cevrimici" : "Cevrimdisi"}</span>
            </div>
            <small>${escapeHtml(user.id)}</small>
            <p class="member-role-summary">Ust rol: ${escapeHtml(getRole(user.primaryRoleId)?.name || "Uye")}</p>
          </div>
        </div>
        <div class="member-role-matrix">${roleOptions}</div>
      </article>
    `;
  }

  function renderAdminUsers() {
    if (!elements.adminUsersList) return;

    const searchTerm = (elements.adminMemberSearchInput?.value || "").trim().toLocaleLowerCase("tr");
    const users = [...state.members].sort(compareMembers);
    const filteredUsers = searchTerm
      ? users.filter((user) => [user.name, ...(user.roleIds || [])].join(" ").toLocaleLowerCase("tr").includes(searchTerm))
      : users;

    if (elements.adminMemberStats) {
      const total = users.length;
      const online = users.filter((user) => user.isOnline).length;
      const offline = total - online;
      elements.adminMemberStats.innerHTML = `
        <article class="admin-kpi"><span>Toplam Uye</span><strong>${total}</strong></article>
        <article class="admin-kpi is-online"><span>Cevrimici</span><strong>${online}</strong></article>
        <article class="admin-kpi is-offline"><span>Cevrimdisi</span><strong>${offline}</strong></article>
      `;
    }

    elements.adminUsersList.innerHTML = filteredUsers.length
      ? filteredUsers.map(renderAdminUserCard).join("")
      : '<p class="admin-muted">Henuz kayitli uye bulunamadi.</p>';

    elements.adminUsersList.querySelectorAll("[data-role-toggle]").forEach((input) => {
      input.addEventListener("change", async () => {
        const userId = input.dataset.userId;
        const selectedRoleIds = Array.from(elements.adminUsersList.querySelectorAll(`[data-role-toggle][data-user-id="${userId}"]:checked`)).map((item) => item.value);
        await assignRoles(userId, selectedRoleIds);
      });
    });
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

  function unlockAdmin() {
    if (elements.adminPasswordInput?.value !== ADMIN_PASSWORD) {
      window.alert("Admin sifresi hatali.");
      return;
    }

    elements.adminLock?.classList.add("hidden");
    elements.adminPanel?.classList.remove("hidden");
    renderAdminUsers();
  }

  function bindAdminUi() {
    elements.adminMenuButton?.addEventListener("click", openAdminModal);
    elements.adminCloseButton?.addEventListener("click", closeAdminModal);
    elements.adminUnlockButton?.addEventListener("click", unlockAdmin);
    elements.adminRefreshUsersButton?.addEventListener("click", refreshMembers);
    elements.adminMemberSearchInput?.addEventListener("input", renderAdminUsers);
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

  async function restoreRemoteSession() {
    if (!hasSupabase()) return;

    const session = await restoreSupabaseSession();
    const user = session?.user;
    if (!user) return;

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

  async function handleSignUp(payload) {
    try {
      await signUpMember(payload);
      setFeedback("Kayit olusturuldu. E-posta onayi kapaliysa hemen giris yapabilirsin.");
    } catch (error) {
      setFeedback(error.message || "Kayit olusturulamadi.");
    }
  }

  async function handleSignIn(payload) {
    try {
      const { user } = await signInMember(payload);
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

  async function handleGuestLogin(payload) {
    if (!payload.name) {
      setFeedback("Misafir adi gir.");
      return;
    }

    const guestId = `guest-${crypto.randomUUID?.() || Date.now()}`;
    const roleIds = ["guest"];

    try {
      if (hasSupabase()) {
        await ensureProfile({
          id: guestId,
          name: payload.name,
          roleIds,
          isGuest: true,
          isOnline: true
        });
      }

      setAuthState({
        mode: "guest",
        userId: guestId,
        name: payload.name,
        roleIds,
        isOnline: true
      });

      closeAuthModal();
      await refreshMembers();
    } catch (error) {
      setFeedback(error.message || "Misafir girisi basarisiz.");
    }
  }

  function bindStaticUi() {
    elements.openAuth?.addEventListener("click", openAuthModal);
    elements.openAuthGuestSignin?.addEventListener("click", openAuthModal);
    elements.openAuthGuestSignup?.addEventListener("click", openAuthModal);
    elements.closeAuth?.addEventListener("click", closeAuthModal);
    elements.logoutButton?.addEventListener("click", handleLogout);

    elements.signinForm?.addEventListener("submit", async (event) => {
      event.preventDefault();
      setFeedback("");
      await handleSignIn({
        email: document.getElementById("signin-email").value.trim(),
        password: document.getElementById("signin-password").value.trim()
      });
    });

    elements.signupForm?.addEventListener("submit", async (event) => {
      event.preventDefault();
      setFeedback("");
      await handleSignUp({
        name: document.getElementById("signup-name").value.trim(),
        email: document.getElementById("signup-email").value.trim(),
        password: document.getElementById("signup-password").value.trim()
      });
    });

    elements.guestForm?.addEventListener("submit", async (event) => {
      event.preventDefault();
      setFeedback("");
      await handleGuestLogin({
        name: document.getElementById("guest-name").value.trim()
      });
    });
  }

  function startPresenceLoop() {
    window.setInterval(async () => {
      if (!state.auth.userId || state.auth.mode === "visitor" || !hasSupabase()) return;
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

  function restoreLocalSession() {
    const saved = loadSavedSession();
    if (saved) {
      setAuthState(saved);
    }
  }

  async function bootstrap() {
    state.roles = await ensureRoles();
    restoreLocalSession();
    bindStaticUi();
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

  bootstrap().catch((error) => {
    console.error("V2 bootstrap hatasi:", error);
  });
})();

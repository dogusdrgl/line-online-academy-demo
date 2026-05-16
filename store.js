export const DEFAULT_ROLES = [
  { id: "admin", name: "Admin", color: "#ff6961", sortOrder: 10 },
  { id: "teacher", name: "Ogretmen", color: "#f1a126", sortOrder: 20 },
  { id: "member", name: "Uye", color: "#6e80ff", sortOrder: 40 },
  { id: "guest", name: "Misafir", color: "#63df63", sortOrder: 90 },
  { id: "assistant", name: "Asistan", color: "#9c8cff", sortOrder: 95 }
];

export const state = {
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

export function getRole(roleId) {
  return state.roles.find((role) => role.id === roleId) || null;
}

export function normalizeRoleIds(roleIds) {
  const next = Array.isArray(roleIds) ? roleIds.filter(Boolean) : roleIds ? [roleIds] : [];
  return next.length ? Array.from(new Set(next)) : ["member"];
}

export function getPrimaryRoleId(roleIds) {
  const normalized = normalizeRoleIds(roleIds);
  return [...normalized].sort((first, second) => {
    const firstOrder = getRole(first)?.sortOrder ?? 999;
    const secondOrder = getRole(second)?.sortOrder ?? 999;
    return firstOrder - secondOrder;
  })[0];
}

export function getRoleLabel(roleIds) {
  return normalizeRoleIds(roleIds).map((roleId) => getRole(roleId)?.name || roleId);
}

export function loadSavedSession() {
  try {
    const raw = window.localStorage.getItem(state.sessionKey);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveSession() {
  try {
    window.localStorage.setItem(state.sessionKey, JSON.stringify(state.auth));
  } catch {}
}

export function clearSession() {
  try {
    window.localStorage.removeItem(state.sessionKey);
  } catch {}
}

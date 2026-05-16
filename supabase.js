import { DEFAULT_ROLES, getPrimaryRoleId, normalizeRoleIds } from "./store.js";

const config = window.LINE_V2_SUPABASE_CONFIG || {};

export const supabaseClient =
  window.supabase && config.url && config.anonKey
    ? window.supabase.createClient(config.url, config.anonKey)
    : null;

export function hasSupabase() {
  return Boolean(supabaseClient);
}

export async function ensureRoles() {
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

export async function signUpMember({ name, email, password }) {
  if (!supabaseClient?.auth) {
    throw new Error("Supabase baglantisi kurulmadan uye kaydi acik degil.");
  }

  const response = await supabaseClient.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: name
      }
    }
  });

  if (response.error) {
    throw response.error;
  }

  return response.data;
}

export async function signInMember({ email, password }) {
  if (!supabaseClient?.auth) {
    throw new Error("Supabase baglantisi kurulmadan uye girisi acik degil.");
  }

  const response = await supabaseClient.auth.signInWithPassword({ email, password });
  if (response.error) {
    throw response.error;
  }
  return response.data;
}

export async function signOutMember() {
  if (!supabaseClient?.auth) {
    return;
  }
  await supabaseClient.auth.signOut();
}

export async function fetchUserSnapshot(userId) {
  if (!supabaseClient || !userId) {
    return null;
  }

  const [{ data: profile, error: profileError }, { data: roles, error: rolesError }] = await Promise.all([
    supabaseClient
      .from("profiles_v2")
      .select("id, display_name, email, is_guest, is_online, last_seen, created_at")
      .eq("id", userId)
      .maybeSingle(),
    supabaseClient
      .from("user_roles_v2")
      .select("role_id")
      .eq("user_id", userId)
  ]);

  if (profileError) {
    throw profileError;
  }
  if (rolesError) {
    throw rolesError;
  }
  if (!profile) {
    return null;
  }

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

export async function ensureProfile({ id, name, email = null, roleIds = null, isGuest = false, isOnline = true }) {
  if (!supabaseClient) {
    return;
  }

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

  if (error) {
    throw error;
  }

  await replaceUserRoles(id, resolvedRoleIds);
}

export async function replaceUserRoles(userId, roleIds) {
  if (!supabaseClient) {
    return;
  }

  const normalizedRoleIds = normalizeRoleIds(roleIds);
  const { error: deleteError } = await supabaseClient.from("user_roles_v2").delete().eq("user_id", userId);
  if (deleteError) {
    throw deleteError;
  }

  const inserts = normalizedRoleIds.map((roleId) => ({ user_id: userId, role_id: roleId }));
  const { error: insertError } = await supabaseClient.from("user_roles_v2").insert(inserts);
  if (insertError) {
    throw insertError;
  }
}

export async function updatePresence(userId, isOnline) {
  if (!supabaseClient || !userId) {
    return;
  }

  await supabaseClient
    .from("profiles_v2")
    .update({
      is_online: isOnline,
      last_seen: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq("id", userId);
}

export async function fetchMemberDirectory() {
  if (!supabaseClient) {
    return [];
  }

  const [{ data: profiles, error: profilesError }, { data: userRoles, error: userRolesError }] = await Promise.all([
    supabaseClient.from("profiles_v2").select("id, display_name, email, is_guest, is_online, last_seen, created_at"),
    supabaseClient.from("user_roles_v2").select("user_id, role_id")
  ]);

  if (profilesError) {
    throw profilesError;
  }
  if (userRolesError) {
    throw userRolesError;
  }

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

export async function restoreSupabaseSession() {
  if (!supabaseClient?.auth?.getSession) {
    return null;
  }

  const response = await supabaseClient.auth.getSession();
  if (response.error) {
    throw response.error;
  }

  return response.data?.session || null;
}

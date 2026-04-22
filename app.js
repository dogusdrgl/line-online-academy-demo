const PUBLIC_VIEWS = new Set(["dashboard", "about"]);
const TEXT_CHANNEL_VIEWS = new Set([
  "contact",
  "support",
  "admin-chat",
  "trainer-chat",
  "canteen-chat",
  "piano-notes",
  "guitar-notes",
  "drum-notes",
  "other-notes"
]);

const PERMISSION_OPTIONS = [
  { id: "view_channels", label: "Kanallari Goruntule" },
  { id: "send_messages", label: "Mesaj Gonder" },
  { id: "join_voice", label: "Sesli Odaya Katil" }
];

const channelButtons = document.querySelectorAll(".channel-item");
const viewPanels = document.querySelectorAll(".view-panel");
const viewTitle = document.getElementById("view-title");
const messageSearchInput = document.getElementById("message-search");
const cameraButton = document.getElementById("camera-button");
const cameraPreview = document.getElementById("camera-preview");
const authBackdrop = document.getElementById("auth-backdrop");
const authCloseButton = document.getElementById("auth-close");
const authOpenButton = document.getElementById("open-auth-modal");
const authTabs = document.querySelectorAll(".auth-tab");
const authPanels = document.querySelectorAll(".auth-panel");
const authTabsWrap = document.getElementById("auth-tabs");
const authPanelsWrap = document.getElementById("auth-panels");
const guestForm = document.getElementById("guest-form");
const guestNameInput = document.getElementById("guest-name");
const openGuestInlineButton = document.getElementById("open-guest-inline");
const openGuestInlineSignupButton = document.getElementById("open-guest-inline-signup");
const backToAuthOptionsButton = document.getElementById("back-to-auth-options");
const signInEmail = document.getElementById("signin-email");
const signInPassword = document.getElementById("signin-password");
const signUpName = document.getElementById("signup-name");
const profileName = document.getElementById("profile-name");
const profileRole = document.getElementById("profile-role");
const profileAvatar = document.getElementById("profile-avatar");
const profileBackdrop = document.getElementById("profile-backdrop");
const profileCloseButton = document.getElementById("profile-close");
const profileDisplayNameInput = document.getElementById("profile-display-name");
const profileImageInput = document.getElementById("profile-image-input");
const profileEditorAvatar = document.getElementById("profile-editor-avatar");
const profileEditorName = document.getElementById("profile-editor-name");
const profileEditorRole = document.getElementById("profile-editor-role");
const profileSaveButton = document.getElementById("profile-save");
const profileRemoveImageButton = document.getElementById("profile-remove-image");
const guestCard = document.getElementById("guest-card");
const identityCard = document.getElementById("identity-card");
const quickMicButton = document.getElementById("quick-mic");
const quickAudioButton = document.getElementById("quick-audio");
const quickCameraButton = document.getElementById("quick-camera");
const guestCardSignin = document.getElementById("guest-card-signin");
const guestCardSignup = document.getElementById("guest-card-signup");
let logoutButton = document.getElementById("logout-button");
const membersGroups = document.getElementById("members-groups");
const adminMenuButton = document.getElementById("admin-menu-button") || document.querySelector(".brand-header .icon-button");
const adminBackdrop = document.getElementById("admin-backdrop");
const adminCloseButton = document.getElementById("admin-close");
const adminPasswordInput = document.getElementById("admin-password");
const adminUnlockButton = document.getElementById("admin-unlock");
const adminLock = document.getElementById("admin-lock");
const adminPanel = document.getElementById("admin-panel");
const adminUsersList = document.getElementById("admin-users-list");
const adminRolesList = document.getElementById("admin-roles-list");
const adminTabButtons = document.querySelectorAll("[data-admin-page]");
const adminPages = document.querySelectorAll("[data-admin-panel-page]");
const adminViewSelect = document.getElementById("admin-view-select");
const adminAccessRoles = document.getElementById("admin-access-roles");
const adminRefreshUsersButton = document.getElementById("admin-refresh-users");
const newRoleNameInput = document.getElementById("new-role-name");
const newRoleColorInput = document.getElementById("new-role-color");
const newRoleAccess = document.getElementById("new-role-access");
const newRoleAdminInput = document.getElementById("new-role-admin");
const createRoleButton = document.getElementById("create-role-button");
const saveAccessButton = document.getElementById("save-access-button");
const supabaseConfig = window.LINE_SUPABASE_CONFIG || {};
const supabaseClient =
  window.supabase && supabaseConfig.url && supabaseConfig.anonKey
    ? window.supabase.createClient(supabaseConfig.url, supabaseConfig.anonKey)
    : null;
const SUPABASE_TIMEOUT_MS = 3500;
const ADMIN_PASSWORD = "Line5367";
const LOCAL_MESSAGES_KEY = "line-online-academy-messages";
const LOCAL_SESSION_KEY = "line-online-academy-session";
const LOCAL_ROLES_KEY = "line-online-academy-roles";
const LOCAL_ACCESS_KEY = "line-online-academy-access";
const LOCAL_MODERATION_KEY = "line-online-academy-moderation";
const HIDDEN_STATIC_MESSAGES_KEY = "line-online-academy-hidden-static-messages";
const LOCAL_PROFILE_KEY = "line-online-academy-profile";
const LOCAL_CONTROLS_KEY = "line-online-academy-controls";
const LOCAL_NOTIFICATIONS_KEY = "line-online-academy-notifications";

let authState = {
  mode: "visitor",
  name: "Ziyaretci",
  role: "Ziyaretci",
  roleId: null,
  userId: null,
  isMuted: false,
  isBanned: false,
  avatarImage: null
};

let controlState = {
  mic: true,
  audio: true,
  camera: false
};

let pendingView = null;
const renderedMessageIds = new Set();
let notificationState = {};

const defaultRoles = [
  {
    id: "admin",
    name: "Admin",
    color: "#ef4444",
    order: 1,
    permissions: ["view_channels", "send_messages", "join_voice", "admin_access"],
    system: true
  },
  {
    id: "teacher",
    name: "Ogretmen",
    color: "#f1a126",
    order: 2,
    permissions: ["view_channels", "send_messages", "join_voice"],
    system: true
  },
  {
    id: "student",
    name: "Ogrenci",
    color: "#5b6dff",
    order: 3,
    permissions: ["view_channels", "send_messages", "join_voice"],
    system: true
  },
  {
    id: "guest",
    name: "Misafir",
    color: "#59d85f",
    order: 4,
    permissions: ["view_channels", "send_messages", "join_voice"],
    system: true
  },
  {
    id: "assistant",
    name: "Asistan",
    color: "#8b7cf6",
    order: 5,
    permissions: ["view_channels"],
    system: true
  }
];

let roles = [];
let viewAccess = {};
let adminKnownUsers = [];
let directoryUsers = [];
let livePresenceMembers = [];
let presenceChannel = null;

const members = [
  {
    id: "dogus",
    name: "Dogus",
    roleId: "admin",
    avatarClass: "red",
    group: "Yonetici",
    subtitle: "Kurucu"
  },
  {
    id: "sanal-asistan",
    name: "Sanal Asistan",
    roleId: "assistant",
    avatarClass: "blue",
    group: "Asistan",
    subtitle: "/help • /achievements",
    bot: true
  },
  {
    id: "line-asistan",
    name: "Line Asistan",
    roleId: "assistant",
    avatarClass: "blue",
    group: "Asistan",
    subtitle: "/soru • /cevap",
    bot: true
  },
  {
    id: "dilara",
    name: "Dilara",
    roleId: "guest",
    avatarClass: "green",
    group: "Cevrim Ici",
    subtitle: "Misafir"
  },
  {
    id: "ezgi",
    name: "Ezgi",
    roleId: "student",
    avatarClass: "coral",
    group: "Cevrim Ici",
    subtitle: "Piyano Ogrencisi"
  },
  {
    id: "mert",
    name: "Mert",
    roleId: "student",
    avatarClass: "amber",
    group: "Cevrim Ici",
    subtitle: "Davul Ogrencisi"
  }
];

const ephemeralMembers = [];

function getChannelOptions() {
  return Array.from(channelButtons)
    .map((button) => ({
      id: button.dataset.view,
      label: button.textContent.trim()
    }))
    .filter((item) => item.id && !PUBLIC_VIEWS.has(item.id));
}

function getDefaultAccess() {
  const allRoleIds = defaultRoles.map((role) => role.id);
  const restrictedToStaff = ["admin-chat", "admin-room", "trainer-chat", "trainer-room", "board-room"];
  const access = {};

  getChannelOptions().forEach((channel) => {
    access[channel.id] = restrictedToStaff.includes(channel.id)
      ? ["admin", "teacher"]
      : allRoleIds;
  });

  return access;
}

function readJson(key, fallback) {
  try {
    const rawValue = window.localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : fallback;
  } catch (error) {
    console.warn(`${key} okunamadi:`, error.message);
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`${key} kaydedilemedi:`, error.message);
  }
}

function initializeAdminState() {
  const savedRoles = readJson(LOCAL_ROLES_KEY, null);
  const roleMap = new Map(defaultRoles.map((role) => [role.id, role]));
  (savedRoles || []).forEach((role) => {
    const fallbackRole = roleMap.get(role.id);
    roleMap.set(role.id, {
      ...fallbackRole,
      ...role,
      color: role.color || fallbackRole?.color || "#f1a126",
      order: Number.isFinite(Number(role.order)) ? Number(role.order) : fallbackRole?.order || 99
    });
  });
  roles = Array.from(roleMap.values()).map((role) => {
    if (role.id !== "admin") {
      return role;
    }

    return {
      ...role,
      permissions: Array.from(new Set([...(role.permissions || []), "view_channels", "send_messages", "join_voice", "admin_access"]))
    };
  });
  saveRoles();

  const savedAccess = readJson(LOCAL_ACCESS_KEY, {});
  viewAccess = {
    ...getDefaultAccess(),
    ...savedAccess
  };
}

function saveRoles() {
  writeJson(LOCAL_ROLES_KEY, roles);
}

function saveAccess() {
  writeJson(LOCAL_ACCESS_KEY, viewAccess);
}

function readModeration() {
  return readJson(LOCAL_MODERATION_KEY, {});
}

function saveModeration(moderation) {
  writeJson(LOCAL_MODERATION_KEY, moderation);
}

function getUserModeration(userId) {
  if (!userId) {
    return { isMuted: false, isBanned: false };
  }

  return {
    isMuted: false,
    isBanned: false,
    ...(readModeration()[userId] || {})
  };
}

function setUserModeration(userId, updates) {
  const moderation = readModeration();
  moderation[userId] = {
    ...getUserModeration(userId),
    ...updates
  };
  saveModeration(moderation);
  return moderation[userId];
}

function getRole(roleId) {
  return roles.find((role) => role.id === roleId);
}

function getSortedRoles() {
  return [...roles].sort((firstRole, secondRole) => {
    const firstOrder = Number(firstRole.order ?? 99);
    const secondOrder = Number(secondRole.order ?? 99);
    return firstOrder - secondOrder || firstRole.name.localeCompare(secondRole.name, "tr");
  });
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };
    return entities[char];
  });
}

function normalizeMention(text) {
  return (text || "")
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "");
}

function renderMessageContent(text) {
  return escapeHtml(text).replace(/(^|\s)@([\p{L}\p{N}_-]+)/gu, '$1<span class="mention-token">@$2</span>');
}

function formatMessageTime(value) {
  return new Date(value).toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function readLocalMessages() {
  try {
    const rawMessages = window.localStorage.getItem(LOCAL_MESSAGES_KEY);
    return rawMessages ? JSON.parse(rawMessages) : [];
  } catch (error) {
    console.warn("Yerel mesaj arsivi okunamadi:", error.message);
    return [];
  }
}

function writeLocalMessages(messages) {
  try {
    window.localStorage.setItem(LOCAL_MESSAGES_KEY, JSON.stringify(messages.slice(-300)));
  } catch (error) {
    console.warn("Yerel mesaj arsivi yazilamadi:", error.message);
  }
}

function forgetMessage(messageId) {
  if (!messageId) {
    return;
  }

  writeLocalMessages(readLocalMessages().filter((message) => message.id !== messageId));
  renderedMessageIds.delete(messageId);
}

function rememberMessage(panelId, message) {
  if (!message?.id || !TEXT_CHANNEL_VIEWS.has(panelId)) {
    return;
  }

  const messages = readLocalMessages();
  if (messages.some((item) => item.id === message.id)) {
    return;
  }

  writeLocalMessages([
    ...messages,
    {
      ...message,
      channel_id: message.channel_id || panelId
    }
  ]);
}

function readSavedSession() {
  try {
    const rawSession = window.localStorage.getItem(LOCAL_SESSION_KEY);
    return rawSession ? JSON.parse(rawSession) : null;
  } catch (error) {
    console.warn("Kayitli oturum okunamadi:", error.message);
    return null;
  }
}

function saveSession(session) {
  try {
    window.localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(session));
  } catch (error) {
    console.warn("Oturum kaydedilemedi:", error.message);
  }
}

function clearSavedSession() {
  try {
    window.localStorage.removeItem(LOCAL_SESSION_KEY);
  } catch (error) {
    console.warn("Oturum temizlenemedi:", error.message);
  }
}

function readLocalProfile() {
  return readJson(LOCAL_PROFILE_KEY, {});
}

function saveLocalProfile(profile) {
  writeJson(LOCAL_PROFILE_KEY, {
    ...readLocalProfile(),
    ...profile
  });
}

function readControlState() {
  return {
    mic: true,
    audio: true,
    camera: false,
    ...readJson(LOCAL_CONTROLS_KEY, {})
  };
}

function saveControlState() {
  writeJson(LOCAL_CONTROLS_KEY, controlState);
}

function loadNotificationState() {
  notificationState = readJson(LOCAL_NOTIFICATIONS_KEY, {});
}

function saveNotificationState() {
  writeJson(LOCAL_NOTIFICATIONS_KEY, notificationState);
}

function getActiveViewId() {
  return document.querySelector(".view-panel.active")?.id || "dashboard";
}

function messageMentionsCurrentUser(message) {
  if (!authState.name || authState.mode === "visitor") {
    return false;
  }

  const content = message.content || "";
  const currentName = normalizeMention(authState.name);
  const firstName = normalizeMention(authState.name.split(" ")[0]);
  const mentionTokens = Array.from(content.matchAll(/@([\p{L}\p{N}_-]+)/gu)).map((match) => normalizeMention(match[1]));
  return mentionTokens.some((token) => token && (token === currentName || token === firstName));
}

function ensureChannelBadge(button) {
  let badge = button.querySelector(".channel-badge");
  if (!badge) {
    badge = document.createElement("span");
    badge.className = "channel-badge";
    button.appendChild(badge);
  }
  return badge;
}

function renderNotifications() {
  channelButtons.forEach((button) => {
    const viewId = button.dataset.view;
    const state = notificationState[viewId] || { count: 0, mentions: 0 };
    const badge = ensureChannelBadge(button);
    const hasNotification = state.count > 0 || state.mentions > 0;

    button.classList.toggle("has-unread", hasNotification);
    button.classList.toggle("has-mention", state.mentions > 0);
    badge.textContent = state.mentions > 0 ? `@${state.mentions}` : state.count > 0 ? String(Math.min(state.count, 99)) : "";
  });
}

function markChannelRead(viewId) {
  if (!TEXT_CHANNEL_VIEWS.has(viewId)) {
    return;
  }

  notificationState[viewId] = { count: 0, mentions: 0 };
  saveNotificationState();
  renderNotifications();
}

function registerChannelNotification(panelId, message, options = {}) {
  if (!TEXT_CHANNEL_VIEWS.has(panelId) || options.notify === false) {
    return;
  }

  const isOwnMessage = message.author_id && authState.userId && message.author_id === authState.userId;
  if (isOwnMessage || getActiveViewId() === panelId) {
    markChannelRead(panelId);
    return;
  }

  const currentState = notificationState[panelId] || { count: 0, mentions: 0 };
  notificationState[panelId] = {
    count: currentState.count + 1,
    mentions: currentState.mentions + (messageMentionsCurrentUser(message) ? 1 : 0)
  };
  saveNotificationState();
  renderNotifications();
}

function paintAvatar(element, name, image, fallbackColor = "#f1a126") {
  if (!element) {
    return;
  }

  element.textContent = image ? "" : (name || "U").slice(0, 1).toUpperCase();
  element.style.background = image ? `center / cover no-repeat url("${image}")` : fallbackColor;
}

function updateQuickControl(button, isActive) {
  if (!button) {
    return;
  }

  button.classList.toggle("active", isActive);
  button.classList.toggle("muted", !isActive);
}

function renderQuickControls() {
  updateQuickControl(quickMicButton, controlState.mic);
  updateQuickControl(quickAudioButton, controlState.audio);
  updateQuickControl(quickCameraButton, controlState.camera);
}

function ensureLogoutButton() {
  if (logoutButton || !identityCard) {
    return logoutButton;
  }

  logoutButton = document.createElement("button");
  logoutButton.className = "logout-button";
  logoutButton.type = "button";
  logoutButton.id = "logout-button";
  logoutButton.textContent = "Cikis Yap";
  identityCard.appendChild(logoutButton);
  return logoutButton;
}

function ensureSidebarMember(user) {
  if (!user?.id) {
    return;
  }

  const existingIndex = ephemeralMembers.findIndex((member) => member.id === user.id);
  const nextMember = {
    id: user.id,
    name: user.name,
    roleId: user.roleId,
    avatarImage: user.avatarImage || null,
    avatarClass: user.roleId === "guest" ? "amber" : "green",
    group: "Cevrim Ici",
    subtitle: getRole(user.roleId)?.name || (user.roleId === "guest" ? "Misafir" : "Uye"),
    isOnline: true
  };

  if (existingIndex >= 0) {
    ephemeralMembers[existingIndex] = {
      ...ephemeralMembers[existingIndex],
      ...nextMember
    };
    return;
  }

  ephemeralMembers.push(nextMember);
}

function withTimeout(promise, label = "Supabase istegi") {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      window.setTimeout(() => {
        reject(new Error(`${label} zaman asimina ugradi.`));
      }, SUPABASE_TIMEOUT_MS);
    })
  ]);
}

function currentPermissions() {
  if (!authState.roleId) {
    return [];
  }

  const role = getRole(authState.roleId);
  return role ? role.permissions : [];
}

function hasPermission(permission) {
  return currentPermissions().includes(permission);
}

function isAdminUser() {
  return authState.roleId === "admin" || hasPermission("admin_access");
}

function canAccessView(viewId) {
  if (PUBLIC_VIEWS.has(viewId)) {
    return true;
  }

  if (authState.mode === "visitor" || !authState.roleId) {
    return false;
  }

  const role = getRole(authState.roleId);
  if (!role?.permissions.includes("view_channels")) {
    return false;
  }

  if (role.permissions.includes("admin_access")) {
    return true;
  }

  const allowedRoles = viewAccess[viewId];
  return !allowedRoles || allowedRoles.includes(authState.roleId);
}

function isVisibleRealMember(member) {
  if (!member?.id) {
    return false;
  }

  if (member.bot) {
    return true;
  }

  if (member.isBanned || member.is_banned || getUserModeration(member.id).isBanned) {
    return false;
  }

  const demoIds = new Set(["dilara", "ezgi", "mert"]);
  if (demoIds.has(member.id)) {
    return false;
  }

  return true;
}

function getAllMembers() {
  const merged = new Map();

  [...members, ...directoryUsers, ...livePresenceMembers].forEach((member) => {
    if (!isVisibleRealMember(member) || member.roleId === "guest") {
      return;
    }
    merged.set(member.id, member);
  });

  livePresenceMembers.forEach((member) => {
    if (!isVisibleRealMember(member) || member.roleId !== "guest") {
      return;
    }
    merged.set(member.id, member);
  });

  ephemeralMembers.forEach((member) => {
    if (!isVisibleRealMember(member)) {
      return;
    }
    merged.set(member.id, {
      ...member,
      isOnline: true
    });
  });

  return Array.from(merged.values());
}

function getVisibleMembers() {
  return getAllMembers().map((member) => {
    const role = getRole(member.roleId);
    const isOnline = Boolean(member.isOnline || member.bot);

    return {
      ...member,
      group: isOnline ? role?.name || "Uye" : "Cevrimdisi",
      roleName: role ? role.name : "Rol Yok",
      subtitle: member.bot ? member.subtitle : isOnline ? role?.name || "Uye" : "Cevrimdisi",
      roleOrder: role?.order ?? 99
    };
  });
}

function renderMembersSidebar() {
  const grouped = getVisibleMembers().reduce((accumulator, member) => {
    accumulator[member.group] ||= [];
    accumulator[member.group].push(member);
    return accumulator;
  }, {});

  const order = [
    ...getSortedRoles().map((role) => role.name),
    "Cevrimdisi"
  ];

  membersGroups.innerHTML = order
    .filter((group) => grouped[group]?.length)
    .map((group) => {
      const memberRows = grouped[group]
        .map((member) => {
          const initials = member.name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

          const subtitleClass = member.roleId === "admin" || member.roleId === "guest" ? "role green" : "";
          const roleColor = getRole(member.roleId)?.color || "#f1a126";
          const offlineClass = member.isOnline || member.bot ? "" : " offline";
          const avatarStyle = member.avatarImage
            ? `background: center / cover no-repeat url("${member.avatarImage}")`
            : `background: ${escapeHtml(roleColor)}`;

          return `
            <div class="member-row${offlineClass}">
              <div class="avatar ${member.avatarClass}" style='${avatarStyle}'>${member.avatarImage ? "" : initials}</div>
              <div class="member-meta">
                <strong>${member.name}</strong>
                <p class="${subtitleClass}" style="color: ${escapeHtml(roleColor)}">${member.subtitle}</p>
              </div>
              ${member.bot ? '<span class="bot-tag">BOT</span>' : ""}
            </div>
          `;
        })
        .join("");

      return `
        <div class="members-group">
          <p class="member-heading">${group} — ${grouped[group].length}</p>
          ${memberRows}
        </div>
      `;
    })
    .join("");
}

function scrollChatToBottom(chat) {
  window.requestAnimationFrame(() => {
    chat.scrollTop = chat.scrollHeight;
  });
}

function removeChatMessage(messageId) {
  if (!messageId) {
    return;
  }

  const messageLine = document.querySelector(`[data-message-id="${CSS.escape(messageId)}"]`);
  const chatMessage = messageLine?.closest(".chat-message");
  messageLine?.remove();
  forgetMessage(messageId);

  if (chatMessage && !chatMessage.querySelector(".message-line")) {
    chatMessage.remove();
  }
}

async function deleteChatMessage(messageId) {
  if (!messageId || !isAdminUser()) {
    return;
  }

  removeChatMessage(messageId);

  if (supabaseClient && !messageId.startsWith("local-")) {
    try {
      const { error } = await withTimeout(
        supabaseClient.from("messages").delete().eq("id", messageId),
        "Mesaj silme"
      );

      if (error) {
        throw error;
      }
    } catch (error) {
      console.warn("Supabase mesaj silme basarisiz:", error.message);
    }
  }
}

function attachDeleteHandlers(scope) {
  scope.querySelectorAll("[data-delete-message]").forEach((button) => {
    if (button.dataset.deleteBound === "true") {
      return;
    }
    button.dataset.deleteBound = "true";
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteChatMessage(button.dataset.deleteMessage);
    });
  });
}

function refreshChatAdminControls() {
  document.querySelectorAll(".message-line").forEach((line) => {
    const messageId = line.dataset.messageId;
    const existingButton = line.querySelector(".message-delete");

    if (!isAdminUser() || !messageId) {
      existingButton?.remove();
      return;
    }

    if (!existingButton) {
      const button = document.createElement("button");
      button.className = "message-delete";
      button.type = "button";
      button.dataset.deleteMessage = messageId;
      button.setAttribute("aria-label", "Mesaji sil");
      button.textContent = "🗑";
      line.appendChild(button);
    }
  });

  attachDeleteHandlers(document);
}

function hideStaticMessage(staticId) {
  if (!staticId) {
    return;
  }

  const hiddenMessages = new Set(readJson(HIDDEN_STATIC_MESSAGES_KEY, []));
  hiddenMessages.add(staticId);
  writeJson(HIDDEN_STATIC_MESSAGES_KEY, Array.from(hiddenMessages));
  document.querySelector(`[data-static-message-id="${CSS.escape(staticId)}"]`)?.remove();
}

function initializeStaticMessageControls() {
  const hiddenMessages = new Set(readJson(HIDDEN_STATIC_MESSAGES_KEY, []));
  document.querySelectorAll(".channel-chat .chat-message").forEach((message, index) => {
    if (message.querySelector(".message-stack")) {
      return;
    }

    const panel = message.closest(".view-panel");
    const staticId = message.dataset.staticMessageId || `${panel?.id || "panel"}-static-${index}`;
    message.dataset.staticMessageId = staticId;

    if (hiddenMessages.has(staticId)) {
      message.remove();
      return;
    }

    if (message.querySelector(".static-message-delete")) {
      return;
    }

    const button = document.createElement("button");
    button.className = "static-message-delete message-delete";
    button.type = "button";
    button.textContent = "🗑";
    button.setAttribute("aria-label", "Sabit mesaji temizle");
    button.addEventListener("click", () => {
      if (!isAdminUser()) {
        return;
      }
      hideStaticMessage(staticId);
    });
    message.querySelector(".chat-body")?.appendChild(button);
  });
}

function createMessageLine(message) {
  const line = document.createElement("div");
  line.className = "message-line";
  line.dataset.messageId = message.id || "";
  line.classList.toggle("mentioned-me", messageMentionsCurrentUser(message));
  line.innerHTML = `
    <p>${renderMessageContent(message.content)}</p>
    ${isAdminUser() && message.id ? `<button class="message-delete" type="button" data-delete-message="${escapeHtml(message.id)}" aria-label="Mesaji sil">🗑</button>` : ""}
  `;
  attachDeleteHandlers(line);
  return line;
}

function addChatMessage(panelId, message, options = {}) {
  if (message.id && renderedMessageIds.has(message.id)) {
    return;
  }

  const panel = document.getElementById(panelId);
  const chat = panel?.querySelector(".channel-chat");
  if (!chat) {
    return;
  }

  const roleLabel = message.author_role || "Uye";
  const authorName = message.author_name || "Uye";
  const authorKey = message.author_id || authorName;
  const timestamp = message.created_at ? formatMessageTime(message.created_at) : formatMessageTime(new Date());
  const lastMessage = chat.lastElementChild;
  const shouldGroup =
    lastMessage?.classList.contains("chat-message") &&
    lastMessage.dataset.authorKey === authorKey;

  if (shouldGroup) {
    lastMessage.querySelector(".message-stack")?.appendChild(createMessageLine(message));
  } else {
    const chatMessage = document.createElement("article");
    chatMessage.className = "chat-message";
    chatMessage.dataset.authorKey = authorKey;
    chatMessage.innerHTML = `
      <div class="avatar red">${escapeHtml(authorName.slice(0, 1).toUpperCase())}</div>
      <div class="chat-body">
        <div class="chat-meta">
          <strong>${escapeHtml(authorName)}</strong>
          <span>Bugun ${timestamp}</span>
          <small class="chat-role-note">${escapeHtml(roleLabel)}</small>
        </div>
        <div class="message-stack"></div>
      </div>
    `;
    chatMessage.querySelector(".message-stack").appendChild(createMessageLine(message));
    chat.appendChild(chatMessage);
  }

  if (message.id) {
    renderedMessageIds.add(message.id);
  }

  rememberMessage(panelId, message);
  registerChannelNotification(panelId, message, options);
  scrollChatToBottom(chat);
}

function loadLocalMessages() {
  readLocalMessages()
    .filter((message) => TEXT_CHANNEL_VIEWS.has(message.channel_id))
    .forEach((message) => addChatMessage(message.channel_id, message, { notify: false }));
}

async function upsertAppUser(user) {
  if (!supabaseClient || !user?.id) {
    return false;
  }

  try {
    const { error } = await withTimeout(
      supabaseClient.from("app_users").upsert({
        id: user.id,
        display_name: user.displayName,
        role_id: user.roleId,
        is_guest: user.roleId === "guest",
        is_muted: user.isMuted || false,
        is_banned: user.isBanned || false,
        is_online: user.isOnline || false,
        last_seen: new Date().toISOString()
      }),
      "Kullanici kaydi"
    );

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    try {
      const { error: fallbackError } = await withTimeout(
        supabaseClient.from("app_users").upsert({
          id: user.id,
          display_name: user.displayName,
          role_id: user.roleId,
          is_guest: user.roleId === "guest",
          is_online: user.isOnline || false,
          last_seen: new Date().toISOString()
        }),
        "Temel kullanici kaydi"
      );

      if (fallbackError) {
        throw fallbackError;
      }

      return true;
    } catch (fallbackError) {
      console.warn("Supabase kullanici kaydi atlandi:", fallbackError.message || error.message);
    }
    return false;
  }
}

async function getStoredUserProfile(userId) {
  if (!supabaseClient || !userId) {
    return {};
  }

  try {
    const { data, error } = await withTimeout(
      supabaseClient
        .from("app_users")
        .select("role_id, is_muted, is_banned")
        .eq("id", userId)
        .maybeSingle(),
      "Kullanici profilini okuma"
    );

    if (error) {
      throw error;
    }

    return {
      roleId: data?.role_id || null,
      isMuted: data?.is_muted || false,
      isBanned: data?.is_banned || false
    };
  } catch (error) {
    console.warn("Kullanici profili okunamadi:", error.message);

    try {
      const { data, error: fallbackError } = await withTimeout(
        supabaseClient
          .from("app_users")
          .select("role_id")
          .eq("id", userId)
          .maybeSingle(),
        "Kullanici rolunu okuma"
      );

      if (fallbackError) {
        throw fallbackError;
      }

      return {
        roleId: data?.role_id || null,
        ...getUserModeration(userId)
      };
    } catch (fallbackError) {
      console.warn("Kullanici rolu okunamadi:", fallbackError.message);
      return getUserModeration(userId);
    }
  }
}

async function loadDirectoryUsers() {
  if (!supabaseClient) {
    renderMembersSidebar();
    return;
  }

  try {
    const { data, error } = await withTimeout(
      supabaseClient
        .from("app_users")
        .select("id, display_name, role_id, is_guest, is_muted, is_banned, is_online, last_seen")
        .eq("is_guest", false)
        .order("created_at", { ascending: true })
        .limit(120),
      "Uye dizinini yukleme"
    );

    if (error) {
      throw error;
    }

    directoryUsers = (data || [])
      .filter((user) => !user.is_banned)
      .map((user) => ({
        id: user.id,
        name: user.display_name || "Isimsiz Uye",
        roleId: user.role_id || "student",
        avatarClass: "blue",
        subtitle: user.is_online ? getRole(user.role_id)?.name || "Uye" : "Cevrimdisi",
        isOnline: Boolean(user.is_online),
        isMuted: Boolean(user.is_muted),
        isBanned: Boolean(user.is_banned),
        isGuest: Boolean(user.is_guest)
      }));
  } catch (error) {
    console.warn("Uye dizini yuklenemedi:", error.message);

    try {
      const { data, error: fallbackError } = await withTimeout(
        supabaseClient
          .from("app_users")
          .select("id, display_name, role_id, is_guest")
          .eq("is_guest", false)
          .order("created_at", { ascending: true })
          .limit(120),
        "Temel uye dizinini yukleme"
      );

      if (fallbackError) {
        throw fallbackError;
      }

      directoryUsers = (data || []).map((user) => ({
        id: user.id,
        name: user.display_name || "Isimsiz Uye",
        roleId: user.role_id || "student",
        avatarClass: "blue",
        subtitle: "Cevrimdisi",
        isOnline: false,
        isGuest: Boolean(user.is_guest)
      }));
    } catch (fallbackError) {
      console.warn("Temel uye dizini yuklenemedi:", fallbackError.message);
    }
  }

  renderMembersSidebar();
}

async function updatePresence(isOnline) {
  if (!supabaseClient || !authState.userId || authState.roleId === "guest") {
    return;
  }

  try {
    await withTimeout(
      supabaseClient
        .from("app_users")
        .update({
          is_online: isOnline,
          last_seen: new Date().toISOString()
        })
        .eq("id", authState.userId),
      "Cevrim ici durumu"
    );
  } catch (error) {
    console.warn("Cevrim ici durumu kaydedilemedi:", error.message);
  }
}

function getRealtimePresencePayload() {
  return {
    id: authState.userId,
    name: authState.name,
    roleId: authState.roleId,
    avatarImage: authState.avatarImage,
    isGuest: authState.roleId === "guest",
    onlineAt: new Date().toISOString()
  };
}

function syncRealtimePresenceMembers() {
  if (!presenceChannel) {
    return;
  }

  const presenceState = presenceChannel.presenceState();
  livePresenceMembers = Object.values(presenceState)
    .flat()
    .filter((presence) => presence?.id)
    .map((presence) => ({
      id: presence.id,
      name: presence.name || "Isimsiz Uye",
      roleId: presence.roleId || "guest",
      avatarImage: presence.avatarImage || null,
      avatarClass: presence.roleId === "guest" ? "amber" : "green",
      subtitle: getRole(presence.roleId)?.name || (presence.roleId === "guest" ? "Misafir" : "Uye"),
      isOnline: true,
      isGuest: Boolean(presence.isGuest)
    }));

  renderMembersSidebar();
}

async function trackRealtimePresence() {
  if (!presenceChannel || !authState.userId || authState.mode === "visitor") {
    return;
  }

  try {
    await presenceChannel.track(getRealtimePresencePayload());
  } catch (error) {
    console.warn("Canli uye durumu yayinlanamadi:", error.message);
  }
}

function subscribeToPresence() {
  if (!supabaseClient || presenceChannel) {
    return;
  }

  presenceChannel = supabaseClient.channel("line-online-academy-presence", {
    config: {
      presence: {
        key: authState.userId || `visitor-${Date.now()}`
      }
    }
  });

  presenceChannel
    .on("presence", { event: "sync" }, syncRealtimePresenceMembers)
    .on("presence", { event: "join" }, syncRealtimePresenceMembers)
    .on("presence", { event: "leave" }, syncRealtimePresenceMembers)
    .subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        await trackRealtimePresence();
      }
    });
}

async function untrackRealtimePresence() {
  if (!presenceChannel) {
    return;
  }

  try {
    await presenceChannel.untrack();
  } catch (error) {
    console.warn("Canli uye durumu kapatilamadi:", error.message);
  }
}

async function loadPersistedMessages() {
  if (!supabaseClient) {
    return;
  }

  let response;

  try {
    response = await withTimeout(
      supabaseClient
        .from("messages")
        .select("*")
        .in("channel_id", Array.from(TEXT_CHANNEL_VIEWS))
        .order("created_at", { ascending: true })
        .limit(200),
      "Mesajlari yukleme"
    );
  } catch (error) {
    console.warn("Supabase mesajlari yuklenemedi:", error.message);
    return;
  }

  const { data, error } = response;

  if (error) {
    console.warn("Supabase mesajlari yuklenemedi:", error.message);
    return;
  }

  data.forEach((message) => addChatMessage(message.channel_id, message, { notify: false }));
}

function subscribeToMessages() {
  if (!supabaseClient) {
    return;
  }

  supabaseClient
    .channel("line-online-academy-messages")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "messages"
      },
      (payload) => {
        if (payload.eventType === "INSERT") {
          addChatMessage(payload.new.channel_id, payload.new, { notify: true });
        }

        if (payload.eventType === "DELETE") {
          removeChatMessage(payload.old.id);
        }
      }
    )
    .subscribe();
}

function getAccessDeniedPanel() {
  let panel = document.getElementById("access-denied");
  if (panel) {
    return panel;
  }

  panel = document.createElement("section");
  panel.id = "access-denied";
  panel.className = "view-panel";
  panel.innerHTML = `
    <div class="access-denied-card">
      <p class="eyebrow">Erisim Engellendi</p>
      <h3>Bu sayfayi goruntuleme yetkiniz yoktur.</h3>
      <p>Bu oda icin uygun role sahip degilsin. Gerekirse yonetici bu kanalin erisim ayarini panelden degistirebilir.</p>
    </div>
  `;

  document.querySelector(".content-area")?.appendChild(panel);
  return panel;
}

function showAccessDenied(label) {
  channelButtons.forEach((button) => {
    button.classList.toggle("active", button.textContent.trim() === label);
  });

  document.querySelectorAll(".view-panel").forEach((panel) => {
    panel.classList.remove("active");
  });

  getAccessDeniedPanel().classList.add("active");
  viewTitle.textContent = label || "Yetkisiz Alan";
  updateSearchVisibility("access-denied");
}

function setActiveView(nextView, label) {
  channelButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.view === nextView);
  });

  document.querySelectorAll(".view-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === nextView);
  });

  if (label) {
    viewTitle.textContent = label;
  }

  updateSearchVisibility(nextView);
  markChannelRead(nextView);
}

function updateSearchVisibility(viewId) {
  if (!messageSearchInput) {
    return;
  }

  const isTextChannel = TEXT_CHANNEL_VIEWS.has(viewId);
  messageSearchInput.classList.toggle("hidden", !isTextChannel);
  messageSearchInput.value = "";
  clearSearchHighlights();
}

function clearSearchHighlights() {
  document.querySelectorAll(".message-line.search-hit").forEach((line) => {
    line.classList.remove("search-hit");
  });
}

function searchActiveChannel() {
  if (!messageSearchInput) {
    return;
  }

  const query = messageSearchInput.value.trim().toLowerCase();
  clearSearchHighlights();

  if (!query) {
    return;
  }

  const activePanel = document.querySelector(".view-panel.active.text-channel-view");
  const chat = activePanel?.querySelector(".channel-chat");
  const lines = Array.from(activePanel?.querySelectorAll(".message-line, .chat-message") || []);
  const foundLine = lines.find((line) => line.textContent.toLowerCase().includes(query));

  if (!foundLine || !chat) {
    messageSearchInput.classList.add("search-empty");
    window.setTimeout(() => messageSearchInput.classList.remove("search-empty"), 450);
    return;
  }

  foundLine.classList.add("search-hit");
  chat.scrollTo({
    top: foundLine.offsetTop - chat.offsetTop - 40,
    behavior: "smooth"
  });
}

function setAuthTab(nextTab) {
  authTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.authTab === nextTab);
  });

  authPanels.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.authPanel === nextTab);
  });

  guestForm.classList.add("hidden");
  authTabsWrap.classList.remove("hidden");
  authPanelsWrap.classList.remove("hidden");
}

function openAuthModal(tab = "signin") {
  setAuthTab(tab);
  authBackdrop.classList.remove("hidden");
  document.body.classList.add("modal-open");
}

function closeAuthModal() {
  authBackdrop.classList.add("hidden");
  document.body.classList.remove("modal-open");
  setAuthTab("signin");
}

function updateIdentity(name, roleId, options = {}) {
  const role = getRole(roleId);
  const moderation = getUserModeration(options.userId);
  const savedProfile = readLocalProfile();
  const displayName = options.nameOverride || savedProfile.name || name;
  const avatarImage = options.avatarImage ?? savedProfile.avatarImage ?? null;
  const session = {
    mode: options.mode || (roleId === "guest" ? "guest" : "member"),
    name: displayName,
    roleId,
    userId: options.userId || null,
    isMuted: options.isMuted ?? moderation.isMuted,
    isBanned: options.isBanned ?? moderation.isBanned,
    avatarImage
  };

  authState = {
    mode: session.mode,
    name: displayName,
    role: role ? role.name : "Uye",
    roleId,
    userId: session.userId,
    isMuted: session.isMuted,
    isBanned: session.isBanned,
    avatarImage
  };

  ensureSidebarMember({
    id: authState.userId,
    name: authState.name,
    roleId: authState.roleId,
    avatarImage: authState.avatarImage
  });

  profileName.textContent = displayName;
  profileRole.textContent = role ? role.name : "Uye";
  profileRole.style.color = role?.color || "";
  paintAvatar(profileAvatar, displayName, avatarImage, role?.color || "#f1a126");

  ensureLogoutButton();
  guestCard.classList.add("hidden");
  identityCard.classList.remove("hidden");

  if (authOpenButton) {
    authOpenButton.textContent = roleId === "guest" ? "Misafir Aktif" : "Hesabim";
  }

  if (options.persist !== false) {
    saveSession(session);
  }

  refreshChatAdminControls();
  initializeStaticMessageControls();
  renderMembersSidebar();
  subscribeToPresence();
  trackRealtimePresence();
  updatePresence(true);
  loadDirectoryUsers();
}

function finishAuth(name, roleId, options = {}) {
  if (options.userId) {
    saveSession({
      mode: options.mode || (roleId === "guest" ? "guest" : "member"),
      name,
      roleId,
      userId: options.userId,
      isMuted: options.isMuted || false,
      isBanned: options.isBanned || false
    });
  }

  updateIdentity(name, roleId, options);
  closeAuthModal();

  if (pendingView) {
    const nextButton = Array.from(channelButtons).find((button) => button.dataset.view === pendingView);
    const nextLabel = nextButton ? nextButton.textContent.trim() : "";
    const targetView = pendingView;
    pendingView = null;
    if (canAccessView(targetView)) {
      setActiveView(targetView, nextLabel);
    } else {
      showAccessDenied(nextLabel);
    }
  }
}

function resetIdentity() {
  untrackRealtimePresence();
  updatePresence(false);
  authState = {
    mode: "visitor",
    name: "Ziyaretci",
    role: "Ziyaretci",
    roleId: null,
    userId: null,
    isMuted: false,
    isBanned: false,
    avatarImage: null
  };

  clearSavedSession();
  identityCard.classList.add("hidden");
  guestCard.classList.remove("hidden");

  if (authOpenButton) {
    authOpenButton.textContent = "Giris Yap";
  }

  refreshChatAdminControls();
  const activePanel = document.querySelector(".view-panel.active");
  if (activePanel && !PUBLIC_VIEWS.has(activePanel.id)) {
    setActiveView("dashboard", "Anasayfa");
  }

  renderMembersSidebar();
}

function restoreSavedSession() {
  const savedSession = readSavedSession();
  if (!savedSession?.name || !savedSession.roleId || !savedSession.userId) {
    return;
  }

  updateIdentity(savedSession.name, savedSession.roleId, {
    mode: savedSession.mode,
    userId: savedSession.userId,
    isMuted: savedSession.isMuted,
    isBanned: savedSession.isBanned,
    avatarImage: savedSession.avatarImage,
    persist: false
  });
}

function openProfileModal() {
  if (!profileBackdrop || authState.mode === "visitor") {
    return;
  }

  const role = getRole(authState.roleId);
  profileDisplayNameInput.value = authState.name;
  profileEditorName.textContent = authState.name;
  profileEditorRole.textContent = role ? role.name : "Uye";
  profileEditorRole.style.color = role?.color || "";
  paintAvatar(profileEditorAvatar, authState.name, authState.avatarImage, role?.color || "#f1a126");
  profileBackdrop.classList.remove("hidden");
  document.body.classList.add("modal-open");
}

function closeProfileModal() {
  profileBackdrop?.classList.add("hidden");
  document.body.classList.remove("modal-open");
}

async function saveProfileChanges() {
  const nextName = profileDisplayNameInput.value.trim() || authState.name;
  const nextProfile = {
    name: nextName,
    avatarImage: authState.avatarImage
  };

  saveLocalProfile(nextProfile);
  updateIdentity(nextName, authState.roleId, {
    mode: authState.mode,
    userId: authState.userId,
    isMuted: authState.isMuted,
    isBanned: authState.isBanned,
    avatarImage: nextProfile.avatarImage
  });

  if (supabaseClient && authState.userId) {
    await upsertAppUser({
      id: authState.userId,
      displayName: nextName,
      roleId: authState.roleId,
      isMuted: authState.isMuted,
      isBanned: authState.isBanned,
      isOnline: true
    });
  }

  ensureSidebarMember({
    id: authState.userId,
    name: nextName,
    roleId: authState.roleId,
    avatarImage: nextProfile.avatarImage
  });
  trackRealtimePresence();
  renderMembersSidebar();
  closeProfileModal();
}

function openGuestInline() {
  authTabsWrap.classList.add("hidden");
  authPanelsWrap.classList.add("hidden");
  guestForm.classList.remove("hidden");
  guestNameInput.focus();
}

function initializeTextChannelComposers() {
  document.querySelectorAll(".text-channel-view").forEach((panel) => {
    const composer = panel.querySelector(".message-composer");
    if (!composer) {
      return;
    }

    const placeholder = panel.dataset.channelName || composer.querySelector("span")?.textContent || "Kanala yaz...";
    const actionsMarkup = composer.querySelector(".composer-actions")?.outerHTML || "";

    composer.innerHTML = `
      <form class="composer-form" data-composer-view="${panel.id}">
        <input class="composer-input" type="text" placeholder="${placeholder} kanalina yaz..." maxlength="240" />
        <button class="composer-submit" type="submit">Gonder</button>
      </form>
      ${actionsMarkup}
    `;
  });

  document.querySelectorAll(".composer-form").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const panelId = form.dataset.composerView;
      const input = form.querySelector(".composer-input");

      if (authState.mode === "visitor") {
        pendingView = panelId;
        openAuthModal("signin");
        return;
      }

      if (!hasPermission("send_messages")) {
        window.alert("Bu rol mesaj gonderme yetkisine sahip degil.");
        return;
      }

      if (authState.isBanned) {
        window.alert("Bu hesabin sunucu erisimi kapatilmis.");
        resetIdentity();
        return;
      }

      if (authState.isMuted) {
        window.alert("Bu hesap susturuldugu icin mesaj gonderemez.");
        return;
      }

      const text = input.value.trim();
      if (!text) {
        return;
      }

      const currentRole = getRole(authState.roleId);
      const roleLabel = currentRole ? currentRole.name : "Uye";

      if (supabaseClient) {
        try {
          const userSaved = await upsertAppUser({
            id: authState.userId,
            displayName: authState.name,
            roleId: authState.roleId
          });
          const { data, error } = await withTimeout(
            supabaseClient
              .from("messages")
              .insert({
                channel_id: panelId,
                author_id: userSaved ? authState.userId : null,
                author_name: authState.name,
                author_role: roleLabel,
                content: text
              })
              .select()
              .single(),
            "Mesaj kaydi"
          );

          if (error) {
            throw error;
          }

          addChatMessage(panelId, data, { notify: false });
        } catch (error) {
          console.warn("Supabase mesaj kaydi basarisiz, yerel mesaj eklendi:", error.message);
          addChatMessage(panelId, {
            id: `local-${Date.now()}`,
            channel_id: panelId,
            author_name: authState.name,
            author_role: roleLabel,
            content: text,
            created_at: new Date().toISOString()
          }, { notify: false });
        }
      } else {
        addChatMessage(panelId, {
          id: `local-${Date.now()}`,
          channel_id: panelId,
          author_name: authState.name,
          author_role: roleLabel,
          content: text,
          created_at: new Date().toISOString()
        }, { notify: false });
      }

      input.value = "";
    });
  });
}

async function loadAdminUsers() {
  const localUsers = getAllMembers().map((member) => ({
    id: member.id,
    display_name: member.name,
    role_id: member.roleId,
    is_guest: member.roleId === "guest",
    ...getUserModeration(member.id)
  }));

  if (!supabaseClient) {
    adminKnownUsers = localUsers;
    renderAdminUsers();
    return;
  }

  try {
    const { data, error } = await withTimeout(
      supabaseClient
        .from("app_users")
        .select("id, display_name, role_id, is_guest, created_at")
        .order("created_at", { ascending: false })
        .limit(100),
      "Uyeleri yukleme"
    );

    if (error) {
      throw error;
    }

    const merged = new Map(localUsers.map((user) => [user.id, user]));
    (data || []).forEach((user) => {
      const moderation = getUserModeration(user.id);
      merged.set(user.id, {
        ...user,
        isMuted: user.is_muted ?? moderation.isMuted,
        isBanned: user.is_banned ?? moderation.isBanned
      });
    });
    adminKnownUsers = Array.from(merged.values());
    renderAdminUsers();
  } catch (error) {
    console.warn("Uyeler yuklenemedi:", error.message);
    adminKnownUsers = localUsers;
    renderAdminUsers();
  }
}

function renderRoleOptions(selectedRoleId) {
  return roles
    .map((role) => `<option value="${role.id}" ${role.id === selectedRoleId ? "selected" : ""}>${escapeHtml(role.name)}</option>`)
    .join("");
}

function renderAdminUsers() {
  if (!adminUsersList) {
    return;
  }

  if (!adminKnownUsers.length) {
    adminUsersList.innerHTML = '<p class="admin-muted">Henuz kayitli uye bulunamadi.</p>';
    return;
  }

  const visibleAdminUsers = adminKnownUsers.filter((user) => !(user.isBanned ?? user.is_banned ?? false));

  if (!visibleAdminUsers.length) {
    adminUsersList.innerHTML = '<p class="admin-muted">Listelenecek aktif uye bulunamadi.</p>';
    return;
  }

  adminUsersList.innerHTML = visibleAdminUsers
    .map((user) => {
      const moderation = {
        isMuted: user.isMuted ?? user.is_muted ?? false,
        isBanned: user.isBanned ?? user.is_banned ?? false
      };
      const statusText = moderation.isBanned ? "Sunucudan atildi" : moderation.isMuted ? "Susturuldu" : "Aktif";
      return `
        <article class="member-admin-card ${moderation.isBanned ? "is-banned" : ""}">
          <div class="member-admin-main">
            <div class="member-admin-avatar">${escapeHtml((user.display_name || "U").slice(0, 1).toUpperCase())}</div>
            <div>
              <strong>${escapeHtml(user.display_name || "Isimsiz Uye")}</strong>
              <small>${escapeHtml(user.id)}${user.is_guest ? " - Misafir" : ""}</small>
              <span class="member-status">${statusText}</span>
            </div>
          </div>
          <div class="member-admin-controls">
            <select data-admin-user-role="${escapeHtml(user.id)}">
              ${renderRoleOptions(user.role_id || "student")}
            </select>
            <button class="member-action" type="button" data-user-mute="${escapeHtml(user.id)}">
              ${moderation.isMuted ? "Susturmayi Kaldir" : "Sustur"}
            </button>
            <button class="member-action danger" type="button" data-user-ban="${escapeHtml(user.id)}">
              ${moderation.isBanned ? "Geri Al" : "Sunucudan At"}
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  adminUsersList.querySelectorAll("[data-admin-user-role]").forEach((select) => {
    select.addEventListener("change", async () => {
      await assignUserRole(select.dataset.adminUserRole, select.value);
    });
  });

  adminUsersList.querySelectorAll("[data-user-mute]").forEach((button) => {
    button.addEventListener("click", () => {
      const userId = button.dataset.userMute;
      const user = adminKnownUsers.find((item) => item.id === userId);
      moderateUser(userId, { isMuted: !(user?.isMuted ?? user?.is_muted ?? false) });
    });
  });

  adminUsersList.querySelectorAll("[data-user-ban]").forEach((button) => {
    button.addEventListener("click", () => {
      const userId = button.dataset.userBan;
      const user = adminKnownUsers.find((item) => item.id === userId);
      moderateUser(userId, { isBanned: !(user?.isBanned ?? user?.is_banned ?? false) });
    });
  });
}

function renderChannelCheckboxes(container, selectedViewIds = [], namePrefix = "access") {
  if (!container) {
    return;
  }

  const selectedSet = new Set(selectedViewIds);
  container.innerHTML = getChannelOptions()
    .map((channel) => `
      <label>
        <input type="checkbox" name="${namePrefix}" value="${channel.id}" ${selectedSet.has(channel.id) ? "checked" : ""} />
        <span>${escapeHtml(channel.label)}</span>
      </label>
    `)
    .join("");
}

function getViewsForRole(roleId) {
  return getChannelOptions()
    .filter((channel) => (viewAccess[channel.id] || []).includes(roleId))
    .map((channel) => channel.id);
}

function setViewsForRole(roleId, selectedViewIds) {
  const selectedSet = new Set(selectedViewIds);
  getChannelOptions().forEach((channel) => {
    const allowedRoles = new Set(viewAccess[channel.id] || []);
    if (selectedSet.has(channel.id)) {
      allowedRoles.add(roleId);
    } else {
      allowedRoles.delete(roleId);
    }
    viewAccess[channel.id] = Array.from(allowedRoles);
  });
  saveAccess();
}

function renderNewRoleAccess() {
  renderChannelCheckboxes(newRoleAccess, getChannelOptions().map((channel) => channel.id), "new-role-access");
}

function renderAdminRoles() {
  if (!adminRolesList) {
    return;
  }

  adminRolesList.innerHTML = roles
    .map((role) => `
      <article class="role-editor-card" data-role-card="${role.id}">
        <div class="role-editor-head">
          <div class="role-swatch" style="background: ${escapeHtml(role.color || "#f1a126")}"></div>
          <div>
            <strong>${escapeHtml(role.name)}</strong>
            <small>${role.system ? "Sistem rolu" : "Ozel rol"}</small>
          </div>
          ${role.system ? "" : `<button class="role-delete" type="button" data-delete-role="${role.id}">Sil</button>`}
        </div>
    <div class="role-editor-tools">
      <label>
        <span>Renk</span>
        <input type="color" data-role-color="${role.id}" value="${escapeHtml(role.color || "#f1a126")}" />
      </label>
      <label>
        <span>Sira</span>
        <input class="role-order-input" type="number" min="1" max="99" data-role-order="${role.id}" value="${Number(role.order ?? 99)}" />
      </label>
      <label class="mini-check">
            <input type="checkbox" data-role-admin="${role.id}" ${role.permissions.includes("admin_access") ? "checked" : ""} ${role.id === "admin" ? "disabled" : ""} />
            Admin yetkisi
          </label>
        </div>
        <div class="access-picker role-access-picker" data-role-access="${role.id}"></div>
      </article>
    `)
    .join("");

  adminRolesList.querySelectorAll("[data-role-access]").forEach((container) => {
    const roleId = container.dataset.roleAccess;
    renderChannelCheckboxes(container, getViewsForRole(roleId), `role-access-${roleId}`);
    container.querySelectorAll("input").forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const selectedViews = Array.from(container.querySelectorAll("input:checked")).map((input) => input.value);
        setViewsForRole(roleId, selectedViews);
      });
    });
  });

  adminRolesList.querySelectorAll("[data-role-color]").forEach((input) => {
    input.addEventListener("input", () => {
      const role = getRole(input.dataset.roleColor);
      if (!role) {
        return;
      }
      role.color = input.value;
      saveRoles();
      renderMembersSidebar();
      if (authState.roleId === role.id) {
        profileRole.style.color = role.color;
        profileAvatar.style.background = role.color;
      }
      const card = input.closest(".role-editor-card");
      const swatch = card?.querySelector(".role-swatch");
      if (swatch) {
        swatch.style.background = role.color;
      }
    });
  });

  adminRolesList.querySelectorAll("[data-role-order]").forEach((input) => {
    input.addEventListener("change", () => {
      const role = getRole(input.dataset.roleOrder);
      if (!role) {
        return;
      }
      role.order = Number(input.value) || 99;
      saveRoles();
      renderMembersSidebar();
      renderAdminRoles();
    });
  });

  adminRolesList.querySelectorAll("[data-role-admin]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const role = getRole(checkbox.dataset.roleAdmin);
      if (!role || role.id === "admin") {
        return;
      }

      role.permissions = checkbox.checked
        ? Array.from(new Set([...role.permissions, "admin_access"]))
        : role.permissions.filter((permission) => permission !== "admin_access");
      saveRoles();
      renderAdminRoles();
      renderMembersSidebar();
    });
  });

  adminRolesList.querySelectorAll("[data-delete-role]").forEach((button) => {
    button.addEventListener("click", () => {
      const roleId = button.dataset.deleteRole;
      roles = roles.filter((role) => role.id !== roleId);
      Object.keys(viewAccess).forEach((viewId) => {
        viewAccess[viewId] = (viewAccess[viewId] || []).filter((allowedRoleId) => allowedRoleId !== roleId);
      });
      saveRoles();
      saveAccess();
      renderAdminPanel();
    });
  });
}

function renderAdminViewSelect() {
  if (!adminViewSelect) {
    return;
  }

  const currentValue = adminViewSelect.value;
  adminViewSelect.innerHTML = getChannelOptions()
    .map((channel) => `<option value="${channel.id}">${escapeHtml(channel.label)}</option>`)
    .join("");

  if (currentValue && viewAccess[currentValue]) {
    adminViewSelect.value = currentValue;
  }
}

function renderAccessRoles() {
  if (!adminAccessRoles || !adminViewSelect) {
    return;
  }

  const selectedView = adminViewSelect.value;
  const allowedRoles = viewAccess[selectedView] || roles.map((role) => role.id);
  adminAccessRoles.innerHTML = roles
    .map((role) => `
      <label>
        <input type="checkbox" value="${role.id}" ${allowedRoles.includes(role.id) ? "checked" : ""} />
        ${escapeHtml(role.name)}
      </label>
    `)
    .join("");
}

function renderAdminPanel() {
  renderAdminUsers();
  renderNewRoleAccess();
  renderAdminRoles();
  renderAdminViewSelect();
  renderAccessRoles();
}

async function assignUserRole(userId, roleId) {
  adminKnownUsers = adminKnownUsers.map((user) => (
    user.id === userId ? { ...user, role_id: roleId } : user
  ));

  [...members, ...ephemeralMembers].forEach((member) => {
    if (member.id === userId) {
      member.roleId = roleId;
      member.subtitle = getRole(roleId)?.name || member.subtitle;
    }
  });

  if (authState.userId === userId) {
    updateIdentity(authState.name, roleId, {
      mode: authState.mode,
      userId: authState.userId
    });
  }

  if (supabaseClient) {
    try {
      const { error } = await withTimeout(
        supabaseClient
          .from("app_users")
          .update({ role_id: roleId })
          .eq("id", userId),
        "Rol atama"
      );

      if (error) {
        throw error;
      }
    } catch (error) {
      console.warn("Supabase rol atamasi kaydedilemedi:", error.message);
    }
  }

  renderMembersSidebar();
  renderAdminUsers();
}

async function moderateUser(userId, updates) {
  const updatedModeration = setUserModeration(userId, updates);

  adminKnownUsers = adminKnownUsers.map((user) => (
    user.id === userId
      ? {
          ...user,
          isMuted: updatedModeration.isMuted,
          isBanned: updatedModeration.isBanned,
          is_muted: updatedModeration.isMuted,
          is_banned: updatedModeration.isBanned
        }
      : user
  ));

  if (authState.userId === userId) {
    if (updatedModeration.isBanned) {
      window.alert("Bu hesap sunucudan atildi.");
      resetIdentity();
    } else {
      updateIdentity(authState.name, authState.roleId, {
        mode: authState.mode,
        userId: authState.userId,
        isMuted: updatedModeration.isMuted,
        isBanned: updatedModeration.isBanned
      });
    }
  }

  if (supabaseClient) {
    try {
      const { error } = await withTimeout(
        supabaseClient
          .from("app_users")
          .update({
            is_muted: updatedModeration.isMuted,
            is_banned: updatedModeration.isBanned
          })
          .eq("id", userId),
        "Uye moderasyonu"
      );

      if (error) {
        throw error;
      }
    } catch (error) {
      console.warn("Supabase moderasyon kaydi atlandi:", error.message);
    }
  }

  renderAdminUsers();
}

function openAdminModal() {
  if (!adminBackdrop) {
    return;
  }

  adminBackdrop.classList.remove("hidden");
  document.body.classList.add("modal-open");
  adminLock?.classList.remove("hidden");
  adminPanel?.classList.add("hidden");
  adminPasswordInput.value = "";
  adminPasswordInput.focus();
}

function closeAdminModal() {
  adminBackdrop?.classList.add("hidden");
  document.body.classList.remove("modal-open");
}

async function unlockAdminPanel() {
  if (adminPasswordInput.value !== ADMIN_PASSWORD) {
    window.alert("Admin sifresi hatali.");
    adminPasswordInput.focus();
    return;
  }

  adminLock?.classList.add("hidden");
  adminPanel?.classList.remove("hidden");
  await loadAdminUsers();
  renderAdminPanel();
}

channelButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextView = button.dataset.view;
    const label = button.textContent.trim();

    if (!PUBLIC_VIEWS.has(nextView) && authState.mode === "visitor") {
      pendingView = nextView;
      openAuthModal("signin");
      return;
    }

    if (!canAccessView(nextView)) {
      showAccessDenied(label);
      return;
    }

    setActiveView(nextView, label);
  });
});

if (adminMenuButton) {
  adminMenuButton.addEventListener("click", openAdminModal);
}

adminTabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextPage = button.dataset.adminPage;
    adminTabButtons.forEach((tab) => tab.classList.toggle("active", tab === button));
    adminPages.forEach((page) => {
      page.classList.toggle("active", page.dataset.adminPanelPage === nextPage);
    });
  });
});

if (adminCloseButton) {
  adminCloseButton.addEventListener("click", closeAdminModal);
}

if (adminBackdrop) {
  adminBackdrop.addEventListener("click", (event) => {
    if (event.target === adminBackdrop) {
      closeAdminModal();
    }
  });
}

if (adminUnlockButton) {
  adminUnlockButton.addEventListener("click", unlockAdminPanel);
}

if (adminPasswordInput) {
  adminPasswordInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      unlockAdminPanel();
    }
  });
}

if (adminRefreshUsersButton) {
  adminRefreshUsersButton.addEventListener("click", loadAdminUsers);
}

if (adminViewSelect) {
  adminViewSelect.addEventListener("change", renderAccessRoles);
}

if (saveAccessButton) {
  saveAccessButton.addEventListener("click", () => {
    const selectedView = adminViewSelect.value;
    const selectedRoles = Array.from(adminAccessRoles.querySelectorAll("input:checked")).map((input) => input.value);
    viewAccess[selectedView] = selectedRoles;
    saveAccess();
    window.alert("Erisim ayari kaydedildi.");
  });
}

if (createRoleButton) {
  createRoleButton.addEventListener("click", () => {
    const roleName = newRoleNameInput.value.trim();
    if (!roleName) {
      newRoleNameInput.focus();
      return;
    }

    const roleId = slugify(roleName) || `role-${Date.now()}`;
    if (roles.some((role) => role.id === roleId)) {
      window.alert("Bu isimde bir rol zaten var.");
      return;
    }

    roles.push({
      id: roleId,
      name: roleName,
      color: newRoleColorInput?.value || "#f1a126",
      permissions: newRoleAdminInput.checked
        ? ["view_channels", "send_messages", "join_voice", "admin_access"]
        : ["view_channels", "send_messages", "join_voice"],
      system: false
    });

    const selectedViews = Array.from(newRoleAccess?.querySelectorAll("input:checked") || []).map((input) => input.value);
    setViewsForRole(roleId, selectedViews);

    saveRoles();
    newRoleNameInput.value = "";
    if (newRoleColorInput) {
      newRoleColorInput.value = "#f1a126";
    }
    newRoleAdminInput.checked = false;
    renderAdminPanel();
  });
}

authTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setAuthTab(tab.dataset.authTab);
  });
});

if (messageSearchInput) {
  messageSearchInput.addEventListener("input", () => {
    window.clearTimeout(messageSearchInput.searchTimer);
    messageSearchInput.searchTimer = window.setTimeout(searchActiveChannel, 180);
  });

  messageSearchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchActiveChannel();
    }
  });
}

if (openGuestInlineButton) {
  openGuestInlineButton.addEventListener("click", openGuestInline);
}

if (openGuestInlineSignupButton) {
  openGuestInlineSignupButton.addEventListener("click", openGuestInline);
}

if (backToAuthOptionsButton) {
  backToAuthOptionsButton.addEventListener("click", () => {
    guestForm.classList.add("hidden");
    authTabsWrap.classList.remove("hidden");
    authPanelsWrap.classList.remove("hidden");
  });
}

document.querySelector('[data-auth-panel="signin"]').addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = signInEmail.value.trim().toLowerCase();
  const password = signInPassword.value.trim();

  if (supabaseClient) {
    let response;

    try {
      response = await withTimeout(
        supabaseClient.auth.signInWithPassword({
          email,
          password
        }),
        "Giris"
      );
    } catch (error) {
      window.alert("Supabase'e ulasilamadi. Simdilik demo kullanici olarak devam ediliyor.");
      const memberId = `member-${Date.now()}`;
      ephemeralMembers.push({
        id: memberId,
        name: "Line Uyesi",
        roleId: "student",
        avatarClass: "green",
        group: "Cevrim Ici",
        subtitle: "Ogrenci"
      });
      finishAuth("Line Uyesi", "student", { mode: "member", userId: memberId });
      return;
    }

    const { data, error } = response;

    if (error) {
      window.alert(`Giris basarisiz: ${error.message}`);
      return;
    }

    const displayName = data.user.user_metadata?.display_name || email.split("@")[0] || "Line Uyesi";
    const storedProfile = await getStoredUserProfile(data.user.id);
    const roleId = storedProfile.roleId || "student";

    if (storedProfile.isBanned) {
      window.alert("Bu hesap sunucudan atildigi icin giris yapamaz.");
      return;
    }

    await upsertAppUser({
      id: data.user.id,
      displayName,
      roleId,
      isMuted: storedProfile.isMuted,
      isBanned: storedProfile.isBanned,
      isOnline: true
    });
    finishAuth(displayName, roleId, {
      mode: "member",
      userId: data.user.id,
      isMuted: storedProfile.isMuted,
      isBanned: storedProfile.isBanned
    });
    return;
  }

  const memberId = `member-${Date.now()}`;
  ephemeralMembers.push({
    id: memberId,
    name: "Line Uyesi",
    roleId: "student",
    avatarClass: "green",
    group: "Cevrim Ici",
    subtitle: "Ogrenci"
  });
  finishAuth("Line Uyesi", "student", { mode: "member", userId: memberId });
});

document.querySelector('[data-auth-panel="signup"]').addEventListener("submit", async (event) => {
  event.preventDefault();
  const signUpDisplayName = signUpName.value.trim() || "Yeni Uye";

  if (supabaseClient) {
    const signUpEmail = document.getElementById("signup-email").value.trim().toLowerCase();
    const signUpPassword = document.getElementById("signup-password").value.trim();
    let response;

    try {
      response = await withTimeout(
        supabaseClient.auth.signUp({
          email: signUpEmail,
          password: signUpPassword,
          options: {
            data: {
              display_name: signUpDisplayName
            }
          }
        }),
        "Uye olma"
      );
    } catch (error) {
      window.alert("Supabase'e ulasilamadi. Simdilik demo kullanici olarak devam ediliyor.");
      const memberId = `member-${slugify(signUpDisplayName)}-${Date.now()}`;
      ephemeralMembers.push({
        id: memberId,
        name: signUpDisplayName,
        roleId: "student",
        avatarClass: "green",
        group: "Cevrim Ici",
        subtitle: "Ogrenci"
      });
      finishAuth(signUpDisplayName, "student", { mode: "member", userId: memberId });
      return;
    }

    const { data, error } = response;

    if (error) {
      window.alert(`Uye olma basarisiz: ${error.message}`);
      return;
    }

    if (!data.session) {
      window.alert("Uyelik olustu. Supabase ayarina gore e-posta onayi gerekebilir; lutfen e-postani kontrol et.");
      return;
    }

    const storedProfile = await getStoredUserProfile(data.user.id);
    const roleId = storedProfile.roleId || "student";
    await upsertAppUser({
      id: data.user.id,
      displayName: signUpDisplayName,
      roleId,
      isMuted: storedProfile.isMuted,
      isBanned: storedProfile.isBanned,
      isOnline: true
    });
    finishAuth(signUpDisplayName, roleId, {
      mode: "member",
      userId: data.user.id,
      isMuted: storedProfile.isMuted,
      isBanned: storedProfile.isBanned
    });
    return;
  }

  const memberId = `member-${slugify(signUpDisplayName)}-${Date.now()}`;
  ephemeralMembers.push({
    id: memberId,
    name: signUpDisplayName,
    roleId: "student",
    avatarClass: "green",
    group: "Cevrim Ici",
    subtitle: "Ogrenci"
  });
  finishAuth(signUpDisplayName, "student", { mode: "member", userId: memberId });
});

guestForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const guestName = guestNameInput.value.trim();
  if (!guestName) {
    guestNameInput.focus();
    return;
  }

  const guestId = `guest-${slugify(guestName)}-${Date.now()}`;
  const guestUser = {
    id: guestId,
    name: guestName,
    roleId: "guest",
    avatarClass: "amber",
    group: "Cevrim Ici",
    subtitle: "Misafir"
  };

  ephemeralMembers.push(guestUser);

  if (supabaseClient) {
    await upsertAppUser({
      id: guestId,
      displayName: guestName,
      roleId: "guest"
    });
  }

  finishAuth(guestName, "guest", { mode: "guest", userId: guestId });
});

if (authCloseButton) {
  authCloseButton.addEventListener("click", () => {
    pendingView = null;
    closeAuthModal();
  });
}

if (authOpenButton) {
  authOpenButton.addEventListener("click", () => {
    openAuthModal("signin");
  });
}

if (guestCardSignin) {
  guestCardSignin.addEventListener("click", () => {
    openAuthModal("signin");
  });
}

if (guestCardSignup) {
  guestCardSignup.addEventListener("click", () => {
    openAuthModal("signup");
  });
}

const ensuredLogoutButton = ensureLogoutButton();

if (ensuredLogoutButton) {
  ensuredLogoutButton.addEventListener("click", async () => {
    if (supabaseClient) {
      try {
        await withTimeout(supabaseClient.auth.signOut(), "Cikis");
      } catch (error) {
        console.warn("Supabase cikisi atlandi:", error.message);
      }
    }

    resetIdentity();
  });
}

if (identityCard) {
  identityCard.addEventListener("click", (event) => {
    if (event.target.closest("button")) {
      return;
    }
    openProfileModal();
  });
}

if (profileCloseButton) {
  profileCloseButton.addEventListener("click", closeProfileModal);
}

if (profileBackdrop) {
  profileBackdrop.addEventListener("click", (event) => {
    if (event.target === profileBackdrop) {
      closeProfileModal();
    }
  });
}

if (profileDisplayNameInput) {
  profileDisplayNameInput.addEventListener("input", () => {
    const nextName = profileDisplayNameInput.value.trim() || authState.name;
    profileEditorName.textContent = nextName;
    paintAvatar(profileEditorAvatar, nextName, authState.avatarImage, getRole(authState.roleId)?.color || "#f1a126");
  });
}

if (profileImageInput) {
  profileImageInput.addEventListener("change", () => {
    const file = profileImageInput.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      authState.avatarImage = reader.result;
      paintAvatar(profileEditorAvatar, authState.name, authState.avatarImage, getRole(authState.roleId)?.color || "#f1a126");
    });
    reader.readAsDataURL(file);
  });
}

if (profileRemoveImageButton) {
  profileRemoveImageButton.addEventListener("click", () => {
    authState.avatarImage = null;
    if (profileImageInput) {
      profileImageInput.value = "";
    }
    paintAvatar(profileEditorAvatar, profileDisplayNameInput.value.trim() || authState.name, null, getRole(authState.roleId)?.color || "#f1a126");
  });
}

if (profileSaveButton) {
  profileSaveButton.addEventListener("click", saveProfileChanges);
}

[
  [quickMicButton, "mic"],
  [quickAudioButton, "audio"],
  [quickCameraButton, "camera"]
].forEach(([button, key]) => {
  if (!button) {
    return;
  }

  button.addEventListener("click", (event) => {
    event.stopPropagation();
    controlState[key] = !controlState[key];
    saveControlState();
    renderQuickControls();
  });
});

if (authBackdrop) {
  authBackdrop.addEventListener("click", (event) => {
    if (event.target === authBackdrop) {
      pendingView = null;
      closeAuthModal();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && authBackdrop && !authBackdrop.classList.contains("hidden")) {
    pendingView = null;
    closeAuthModal();
  }
});

if (cameraButton && cameraPreview) {
  cameraButton.addEventListener("click", async () => {
    if (authState.mode === "visitor") {
      pendingView = "meeting-room";
      openAuthModal("signin");
      return;
    }

    if (!hasPermission("join_voice")) {
      window.alert("Bu role sesli odaya katilma yetkisi tanimlanmamis.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      });

      cameraPreview.srcObject = stream;
      cameraPreview.style.display = "block";
      cameraButton.style.display = "none";
    } catch (error) {
      window.alert("Kamera erisimi acilamadi. Tarayici izinlerini kontrol et.");
      console.error(error);
    }
  });
}

initializeAdminState();
controlState = readControlState();
renderQuickControls();
updateSearchVisibility("dashboard");
loadNotificationState();
renderNotifications();
renderMembersSidebar();
initializeTextChannelComposers();
initializeStaticMessageControls();
restoreSavedSession();
loadDirectoryUsers();
loadLocalMessages();
loadPersistedMessages();
subscribeToMessages();
subscribeToPresence();

window.addEventListener("beforeunload", () => {
  untrackRealtimePresence();
  updatePresence(false);
});

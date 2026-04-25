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

const VOICE_ROOM_LABELS = {
  "waiting-room": "Bekleme Odasi",
  "meeting-room": "Gorusme Odasi",
  "admin-room": "Yonetim Odasi",
  "trainer-room": "Egitmen Odasi",
  "board-room": "Toplanti Salonu",
  "class-1": "Sinif 1",
  "class-2": "Sinif 2",
  "class-3": "Sinif 3",
  "class-4": "Sinif 4",
  "table-1": "Masa 1",
  "table-2": "Masa 2",
  "vip-loca": "Loca"
};

const MESSAGE_CHANNEL_VIEWS = new Set([
  ...TEXT_CHANNEL_VIEWS,
  ...Object.keys(VOICE_ROOM_LABELS)
]);

const channelButtons = document.querySelectorAll(".channel-item");
const channelGroups = document.querySelector(".channel-groups");
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
const memberCardBackdrop = document.getElementById("member-card-backdrop");
const memberCardCloseButton = document.getElementById("member-card-close");
const memberCardAvatar = document.getElementById("member-card-avatar");
const memberCardName = document.getElementById("member-card-name");
const memberCardRole = document.getElementById("member-card-role");
const memberMessageButton = document.getElementById("member-message-button");
const memberMuteButton = document.getElementById("member-mute-button");
const memberBanButton = document.getElementById("member-ban-button");
const dmInboxButton = document.getElementById("dm-inbox-button");
const dmUnreadBadge = document.getElementById("dm-unread-badge");
const dmInboxBackdrop = document.getElementById("dm-inbox-backdrop");
const dmInboxCloseButton = document.getElementById("dm-inbox-close");
const dmInboxList = document.getElementById("dm-inbox-list");
const dmBackdrop = document.getElementById("dm-backdrop");
const dmCloseButton = document.getElementById("dm-close");
const dmTitle = document.getElementById("dm-title");
const dmMessages = document.getElementById("dm-messages");
const dmForm = document.getElementById("dm-form");
const dmInput = document.getElementById("dm-input");
const guestCard = document.getElementById("guest-card");
const identityCard = document.getElementById("identity-card");
const identityVoiceRoomButton = document.getElementById("identity-voice-room");
const identityVoiceRoomStatus = document.getElementById("identity-voice-room-status");
const identityVoiceRoomName = document.getElementById("identity-voice-room-name");
const identityVoiceLeaveButton = document.getElementById("identity-voice-leave");
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
const appShell = document.querySelector(".app-shell");
const channelSidebar = document.querySelector(".channel-sidebar");
const membersSidebar = document.querySelector(".members-sidebar");
const mobileChannelsToggle = document.getElementById("mobile-channels-toggle");
const mobileMembersToggle = document.getElementById("mobile-members-toggle");
const mobileDrawerBackdrop = document.getElementById("mobile-drawer-backdrop");
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
const LOCAL_DM_KEY = "line-online-academy-direct-messages";
const LOCAL_DM_UNREAD_KEY = "line-online-academy-dm-unread";
const LOCAL_DM_READ_KEY = "line-online-academy-dm-read";
const LOCAL_VOICE_CHAT_UI_KEY = "line-online-academy-voice-chat-ui";

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
let dmUnreadState = {};
let dmReadState = {};
let dmInboxMessages = [];
let dmInboxLoadedOnce = false;
let voiceChatUiState = readJson(LOCAL_VOICE_CHAT_UI_KEY, {});
let voiceState = {
  roomId: null,
  channel: null,
  localStream: null,
  peers: new Map(),
  pendingIce: new Map(),
  participants: new Map(),
  audioEnabled: true,
  videoEnabled: false,
  outputEnabled: true,
  activityAudioContext: null,
  activityAnalyser: null,
  activitySource: null,
  activityFrame: null,
  speaking: false
};
let voiceRoomDirectory = {};
let voiceDirectoryChannels = [];
let voiceDirectoryReady = {};
let notificationAudioContext = null;

const rtcConfig = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:global.stun.twilio.com:3478" }
  ]
};

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
let selectedMember = null;
let activeDmMember = null;
let renderedMembersById = new Map();

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
    window.localStorage.setItem(LOCAL_MESSAGES_KEY, JSON.stringify(messages.slice(-1000)));
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

function getNotificationAudioContext() {
  const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextConstructor) {
    return null;
  }

  if (!notificationAudioContext) {
    notificationAudioContext = new AudioContextConstructor();
  }

  return notificationAudioContext;
}

function unlockNotificationAudio() {
  const context = getNotificationAudioContext();
  if (context?.state === "suspended") {
    context.resume().catch(() => {});
  }
}

function playTone(frequency, startTime, duration, gainValue = 0.045) {
  const context = getNotificationAudioContext();
  if (!context || !controlState.audio) {
    return;
  }

  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequency, startTime);
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(gainValue, startTime + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.02);
}

function playNotificationSound(type = "message") {
  const context = getNotificationAudioContext();
  if (!context || !controlState.audio) {
    return;
  }

  if (context.state === "suspended") {
    context.resume().catch(() => {});
    return;
  }

  const now = context.currentTime;
  const patterns = {
    message: [[740, 0, 0.08], [980, 0.09, 0.11]],
    dm: [[900, 0, 0.09], [1180, 0.1, 0.12]],
    voiceJoin: [[520, 0, 0.08], [700, 0.09, 0.12]],
    voiceLeave: [[620, 0, 0.07], [420, 0.08, 0.11]]
  };

  (patterns[type] || patterns.message).forEach(([frequency, offset, duration]) => {
    playTone(frequency, now + offset, duration);
  });
}

function getMediaErrorMessage(error, deviceLabel = "medya") {
  const errorName = error?.name || "BilinmeyenHata";
  const baseMessage = `${deviceLabel} erisimi acilamadi.`;
  const helpMessages = {
    NotAllowedError: "Tarayici veya sistem izinlerinde kamera/mikrofon engellenmis. Adres cubugundaki kilit simgesinden site izinlerini acip tekrar dene.",
    SecurityError: "Tarayici guvenli baglanti istiyor. Siteyi https uzerinden actigindan emin ol.",
    NotFoundError: "Bu cihazda uygun kamera/mikrofon bulunamadi ya da tarayici cihazi goremiyor.",
    NotReadableError: "Kamera/mikrofon baska bir uygulama tarafindan kullaniliyor olabilir. Zoom, Discord, OBS veya kamera uygulamasini kapatip tekrar dene.",
    OverconstrainedError: "Secilen kamera/mikrofon ayarlari cihazla uyusmadi. Varsayilan cihazi degistirip tekrar dene.",
    AbortError: "Tarayici medya erisimini baslatirken islemi kesti. Sayfayi yenileyip tekrar dene."
  };

  return `${baseMessage}\n\n${helpMessages[errorName] || "Tarayici izinlerini ve cihaz baglantisini kontrol edip tekrar dene."}\n\nTeknik hata: ${errorName}`;
}

function loadNotificationState() {
  notificationState = readJson(LOCAL_NOTIFICATIONS_KEY, {});
}

function saveNotificationState() {
  writeJson(LOCAL_NOTIFICATIONS_KEY, notificationState);
}

function loadDmUnreadState() {
  dmUnreadState = readJson(LOCAL_DM_UNREAD_KEY, {});
  dmReadState = readJson(LOCAL_DM_READ_KEY, {});
}

function saveDmUnreadState() {
  writeJson(LOCAL_DM_UNREAD_KEY, dmUnreadState);
}

function saveDmReadState() {
  writeJson(LOCAL_DM_READ_KEY, dmReadState);
}

function refreshDmUnreadFromMessages() {
  if (!authState.userId) {
    dmUnreadState = {};
    saveDmUnreadState();
    renderDmBadge();
    return;
  }

  const nextUnread = {};
  dmInboxMessages.forEach((message) => {
    if (message.receiver_id !== authState.userId || message.sender_id === authState.userId) {
      return;
    }

    const conversationId = message.conversation_id || getConversationId(message.sender_id, message.receiver_id);
    const lastReadAt = dmReadState[conversationId] ? new Date(dmReadState[conversationId]).getTime() : 0;
    const messageTime = message.created_at ? new Date(message.created_at).getTime() : Date.now();

    if (messageTime > lastReadAt) {
      nextUnread[conversationId] = (nextUnread[conversationId] || 0) + 1;
    }
  });

  dmUnreadState = nextUnread;
  saveDmUnreadState();
  renderDmBadge();
}

function getTotalDmUnread() {
  return Object.values(dmUnreadState).reduce((total, value) => total + Number(value || 0), 0);
}

function renderDmBadge() {
  if (!dmUnreadBadge) {
    return;
  }

  const totalUnread = getTotalDmUnread();
  dmUnreadBadge.textContent = String(Math.min(totalUnread, 99));
  dmUnreadBadge.classList.toggle("hidden", totalUnread === 0);
  dmInboxButton?.classList.toggle("has-unread", totalUnread > 0);
}

function markDmRead(conversationId) {
  if (!conversationId) {
    return;
  }

  dmReadState[conversationId] = new Date().toISOString();
  saveDmReadState();
  delete dmUnreadState[conversationId];
  saveDmUnreadState();
  refreshDmUnreadFromMessages();
  renderDmBadge();
  renderDmInbox();
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
  if (!MESSAGE_CHANNEL_VIEWS.has(viewId)) {
    return;
  }

  notificationState[viewId] = { count: 0, mentions: 0 };
  if (VOICE_ROOM_LABELS[viewId]) {
    clearVoiceChatUnread(viewId);
  }
  saveNotificationState();
  renderNotifications();
}

function registerChannelNotification(panelId, message, options = {}) {
  if (!MESSAGE_CHANNEL_VIEWS.has(panelId) || options.notify === false) {
    return;
  }

  const isOwnMessage = message.author_id && authState.userId && message.author_id === authState.userId;
  const isSameVoiceRoomOpen = getActiveViewId() === panelId && !isVoiceChatCollapsed(panelId);
  if (isOwnMessage || isSameVoiceRoomOpen) {
    markChannelRead(panelId);
    return;
  }

  const currentState = notificationState[panelId] || { count: 0, mentions: 0 };
  notificationState[panelId] = {
    count: currentState.count + 1,
    mentions: currentState.mentions + (messageMentionsCurrentUser(message) ? 1 : 0)
  };
  saveNotificationState();
  if (VOICE_ROOM_LABELS[panelId]) {
    incrementVoiceChatUnread(panelId);
  }
  renderNotifications();
  playNotificationSound(messageMentionsCurrentUser(message) ? "dm" : "message");
}

function paintAvatar(element, name, image, fallbackColor = "#f1a126") {
  if (!element) {
    return;
  }

  element.textContent = image ? "" : (name || "U").slice(0, 1).toUpperCase();
  element.style.background = image ? `center / cover no-repeat url("${image}")` : fallbackColor;
}

function getMemberAvatarImage(memberId, fallbackName = "") {
  if (memberId && authState.userId === memberId) {
    return authState.avatarImage || null;
  }

  const knownMember = memberId ? findMemberById(memberId) : null;
  if (knownMember?.avatarImage) {
    return knownMember.avatarImage;
  }

  if (fallbackName && authState.name === fallbackName && authState.avatarImage) {
    return authState.avatarImage;
  }

  return null;
}

function updateQuickControl(button, isActive) {
  if (!button) {
    return;
  }

  button.classList.toggle("active", isActive);
  button.classList.toggle("muted", !isActive);
}

function renderQuickControls() {
  const micActive = voiceState.roomId ? voiceState.audioEnabled : controlState.mic;
  const audioActive = voiceState.roomId ? voiceState.outputEnabled !== false : controlState.audio;
  const cameraActive = voiceState.roomId ? voiceState.videoEnabled : controlState.camera;

  updateQuickControl(quickMicButton, micActive);
  updateQuickControl(quickAudioButton, audioActive);
  updateQuickControl(quickCameraButton, cameraActive);
}

function renderVoiceSpeakingState(isSpeaking) {
  const changed = voiceState.speaking !== isSpeaking;
  voiceState.speaking = isSpeaking;
  if (!authState.userId) {
    return;
  }

  getVoiceGrid()?.querySelector(`[data-voice-tile="${CSS.escape(authState.userId)}"]`)?.classList.toggle("speaking", isSpeaking);
  if (changed && voiceState.roomId) {
    sendVoiceSignal("speaking", null, { speaking: isSpeaking });
  }
}

function stopVoiceActivityMonitor() {
  if (voiceState.activityFrame) {
    window.cancelAnimationFrame(voiceState.activityFrame);
    voiceState.activityFrame = null;
  }

  try {
    voiceState.activitySource?.disconnect();
  } catch (error) {}

  voiceState.activitySource = null;
  voiceState.activityAnalyser = null;

  try {
    voiceState.activityAudioContext?.close();
  } catch (error) {}

  voiceState.activityAudioContext = null;
  renderVoiceSpeakingState(false);
}

function startVoiceActivityMonitor(stream) {
  stopVoiceActivityMonitor();

  const [audioTrack] = stream?.getAudioTracks?.() || [];
  if (!audioTrack) {
    return;
  }

  const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextConstructor) {
    return;
  }

  try {
    const audioContext = new AudioContextConstructor();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.82;
    const source = audioContext.createMediaStreamSource(new MediaStream([audioTrack]));
    source.connect(analyser);

    const samples = new Uint8Array(analyser.frequencyBinCount);
    voiceState.activityAudioContext = audioContext;
    voiceState.activityAnalyser = analyser;
    voiceState.activitySource = source;

    const tick = () => {
      if (!voiceState.activityAnalyser || !voiceState.localStream) {
        return;
      }

      voiceState.activityAnalyser.getByteFrequencyData(samples);
      const average = samples.reduce((sum, value) => sum + value, 0) / Math.max(samples.length, 1);
      renderVoiceSpeakingState(voiceState.audioEnabled && average > 18);
      voiceState.activityFrame = window.requestAnimationFrame(tick);
    };

    tick();
  } catch (error) {
    console.warn("Ses aktivitesi izlenemedi:", error.message);
  }
}

function renderIdentityVoiceCard() {
  if (!identityVoiceRoomButton || !identityVoiceRoomName || !identityVoiceRoomStatus) {
    return;
  }

  const hasVoiceRoom = Boolean(voiceState.roomId);
  identityVoiceRoomButton.classList.toggle("active-room", hasVoiceRoom);
  identityVoiceRoomStatus.textContent = hasVoiceRoom ? "Canli" : "Bos";
  identityVoiceRoomName.textContent = hasVoiceRoom ? (VOICE_ROOM_LABELS[voiceState.roomId] || "Sesli Oda") : "Sesli Oda";
}

function getVoiceRoomPanel(roomId = voiceState.roomId) {
  return roomId ? document.getElementById(roomId) : null;
}

function getVoiceGrid(roomId = voiceState.roomId) {
  return getVoiceRoomPanel(roomId)?.querySelector("[data-voice-grid]");
}

function getVoiceChat(roomId = voiceState.roomId) {
  return getVoiceRoomPanel(roomId)?.querySelector("[data-voice-chat-stream]");
}

function getVoiceParticipantList(roomId = voiceState.roomId) {
  return getVoiceRoomPanel(roomId)?.querySelector("[data-voice-participants]");
}

function getVoiceStatus(roomId = voiceState.roomId) {
  return getVoiceRoomPanel(roomId)?.querySelector("[data-voice-status]");
}

function getVoiceName() {
  return authState.name || "Uye";
}

function getVoiceMemberPayload() {
  return {
    id: authState.userId,
    name: getVoiceName(),
    roleId: authState.roleId,
    avatarImage: authState.avatarImage || null
  };
}

function setVoiceStatus(text, roomId = voiceState.roomId) {
  const status = getVoiceStatus(roomId);
  if (status) {
    status.textContent = text;
  }
}

function applyVoiceOutputState(enabled) {
  voiceState.outputEnabled = enabled;
  getVoiceGrid()?.querySelectorAll("video").forEach((video) => {
    if (video.closest(".voice-tile.local")) {
      video.muted = true;
      return;
    }
    video.muted = !enabled;
  });
  controlState.audio = enabled;
  saveControlState();
  renderQuickControls();
}

function saveVoiceChatUiState() {
  writeJson(LOCAL_VOICE_CHAT_UI_KEY, voiceChatUiState);
}

function isVoiceChatCollapsed(roomId) {
  if (!roomId) {
    return true;
  }
  return voiceChatUiState?.[roomId]?.collapsed ?? true;
}

function getVoiceChatUnreadCount(roomId) {
  return Number(voiceChatUiState?.[roomId]?.unread || 0);
}

function clearVoiceChatUnread(roomId) {
  if (!roomId) {
    return;
  }
  voiceChatUiState[roomId] = {
    ...(voiceChatUiState[roomId] || {}),
    unread: 0
  };
  saveVoiceChatUiState();
  renderVoiceChatPanels();
}

function incrementVoiceChatUnread(roomId) {
  if (!roomId) {
    return;
  }
  voiceChatUiState[roomId] = {
    ...(voiceChatUiState[roomId] || {}),
    unread: getVoiceChatUnreadCount(roomId) + 1
  };
  saveVoiceChatUiState();
  renderVoiceChatPanels();
}

function toggleVoiceChatPanel(roomId) {
  if (!roomId) {
    return;
  }
  const collapsed = !isVoiceChatCollapsed(roomId);
  voiceChatUiState[roomId] = {
    ...(voiceChatUiState[roomId] || {}),
    collapsed
  };
  if (!collapsed && voiceState.roomId === roomId) {
    voiceChatUiState[roomId].unread = 0;
  }
  saveVoiceChatUiState();
  renderVoiceChatPanels();
}

function renderVoiceChatPanels() {
  document.querySelectorAll(".voice-channel-view").forEach((panel) => {
    const roomId = panel.id;
    const chatPanel = panel.querySelector(".voice-chat-panel");
    const stageLayout = panel.querySelector(".voice-stage-layout");
    const toggleLabel = panel.querySelector("[data-voice-chat-toggle-label]");
    const handleBadge = panel.querySelector("[data-voice-chat-handle-unread]");
    const handle = panel.querySelector("[data-voice-chat-toggle]");
    const dockBadge = panel.querySelector("[data-voice-chat-dock-unread]");
    const chatButton = panel.querySelector("[data-voice-chat-button]");
    if (!chatPanel || !toggleLabel) {
      return;
    }

    const collapsed = isVoiceChatCollapsed(roomId);
    const unread = getVoiceChatUnreadCount(roomId);
    chatPanel.classList.toggle("collapsed", collapsed);
    stageLayout?.classList.toggle("chat-open", !collapsed);
    chatButton?.classList.toggle("active", !collapsed);
    chatButton?.classList.toggle("has-unread", unread > 0);
    handle?.classList.toggle("has-unread", unread > 0);
    handleBadge?.classList.toggle("hidden", unread <= 0);
    dockBadge?.classList.toggle("hidden", unread <= 0);
    if (handleBadge) {
      handleBadge.textContent = unread > 99 ? "99+" : String(unread);
    }
    if (dockBadge) {
      dockBadge.textContent = unread > 99 ? "99+" : String(unread);
    }
    toggleLabel.textContent = collapsed ? ">" : "<";
  });
}

function getVoiceDirectoryChannel(roomId) {
  return voiceDirectoryChannels.find((item) => item.roomId === roomId)?.channel || null;
}

function clearVoiceRoomMessages(roomId, deleteRemote = false) {
  if (!roomId) {
    return;
  }

  const panel = document.getElementById(roomId);
  panel?.querySelectorAll("[data-voice-chat-stream] .message-line[data-message-id]").forEach((line) => {
    renderedMessageIds.delete(line.dataset.messageId);
  });
  panel?.querySelector("[data-voice-chat-stream]")?.replaceChildren();
  notificationState[roomId] = { count: 0, mentions: 0 };
  voiceChatUiState[roomId] = {
    ...(voiceChatUiState[roomId] || {}),
    unread: 0,
    collapsed: true
  };
  saveNotificationState();
  saveVoiceChatUiState();
  renderNotifications();
  renderVoiceChatPanels();

  if (!deleteRemote || !supabaseClient) {
    return;
  }

  withTimeout(
    supabaseClient.from("messages").delete().eq("channel_id", roomId),
    "Ses odasi sohbet temizleme"
  ).catch((error) => {
    console.warn("Ses odasi sohbeti temizlenemedi:", error.message);
  });
}

async function loadVoiceRoomMessages(roomId) {
  if (!supabaseClient || !roomId || !VOICE_ROOM_LABELS[roomId]) {
    return;
  }

  clearVoiceRoomMessages(roomId, false);

  try {
    const { data, error } = await withTimeout(
      supabaseClient
        .from("messages")
        .select("*")
        .eq("channel_id", roomId)
        .order("created_at", { ascending: true }),
      "Ses odasi mesajlarini yukleme"
    );

    if (error) {
      throw error;
    }

    (data || []).forEach((message) => addChatMessage(roomId, message, { notify: false }));
  } catch (error) {
    console.warn("Ses odasi mesajlari yuklenemedi:", error.message);
  }
}

function renderVoiceParticipants() {
  const list = getVoiceParticipantList();
  if (!list) {
    return;
  }

  const participants = Array.from(voiceState.participants.values());
  list.innerHTML = participants.length
    ? participants.map((participant) => `
        <div class="voice-participant">
          <div class="voice-dot"></div>
          <span>${escapeHtml(participant.name || "Uye")}</span>
        </div>
      `).join("")
    : '<p class="admin-muted">Odada henuz kimse yok.</p>';
}

function renderSidebarVoiceMembers() {
  document.querySelectorAll("[data-voice-members-for]").forEach((element) => element.remove());

  Object.entries(voiceRoomDirectory).forEach(([roomId, participants]) => {
    const channelButton = document.querySelector(`.channel-item.voice[data-view="${CSS.escape(roomId)}"]`);
    if (!channelButton || !participants.length) {
      return;
    }

    const list = document.createElement("div");
    list.className = "voice-channel-members";
    list.dataset.voiceMembersFor = roomId;
    list.innerHTML = participants.map((participant) => {
      const role = getRole(participant.roleId);
      const initials = (participant.name || "U")
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
      const avatarStyle = participant.avatarImage
        ? `background: center / cover no-repeat url("${participant.avatarImage}")`
        : `background: ${escapeHtml(role?.color || "#f1a126")}`;

      return `
        <div class="voice-channel-member">
          <div class="voice-channel-avatar" style='${avatarStyle}'>${participant.avatarImage ? "" : escapeHtml(initials)}</div>
          <span>${escapeHtml(participant.name || "Uye")}</span>
        </div>
      `;
    }).join("");

    channelButton.insertAdjacentElement("afterend", list);
  });
}

function notifyVoiceDirectoryChanges(roomId, nextParticipants) {
  const previousParticipants = voiceRoomDirectory[roomId] || [];
  const previousIds = new Set(previousParticipants.map((participant) => participant.id));
  const nextIds = new Set(nextParticipants.map((participant) => participant.id));

  if (!voiceDirectoryReady[roomId]) {
    voiceDirectoryReady[roomId] = true;
    return;
  }

  if (voiceState.roomId !== roomId) {
    return;
  }

  const someoneJoined = nextParticipants.some((participant) => participant.id !== authState.userId && !previousIds.has(participant.id));
  const someoneLeft = previousParticipants.some((participant) => participant.id !== authState.userId && !nextIds.has(participant.id));

  if (someoneJoined) {
    playNotificationSound("voiceJoin");
  }

  if (someoneLeft) {
    playNotificationSound("voiceLeave");
  }
}

function subscribeToVoiceRoomDirectory() {
  if (!supabaseClient) {
    return;
  }

  Object.keys(VOICE_ROOM_LABELS).forEach((roomId) => {
    const channel = supabaseClient
      .channel(`line-online-academy-voice-directory-${roomId}`, {
        config: {
          presence: { key: `${roomId}-${authState.userId || `visitor-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`}` }
        }
      })
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        const uniqueParticipants = new Map();
        Object.values(state).flat().forEach((participant) => {
          if (participant.id) {
            uniqueParticipants.set(participant.id, participant);
          }
        });
        const nextParticipants = Array.from(uniqueParticipants.values());
        notifyVoiceDirectoryChanges(roomId, nextParticipants);
        if (nextParticipants.length === 0 && (voiceRoomDirectory[roomId] || []).length > 0) {
          clearVoiceRoomMessages(roomId, true);
        }
        voiceRoomDirectory[roomId] = nextParticipants;
        renderSidebarVoiceMembers();
      })
      .subscribe();

    voiceDirectoryChannels.push({ roomId, channel });
  });
}

function renderVoiceControls() {
  document.querySelectorAll(".voice-channel-view").forEach((panel) => {
    const isActiveRoom = voiceState.roomId === panel.id;
    panel.querySelector("[data-voice-call]")?.classList.toggle("in-call", isActiveRoom);
    panel.querySelector("[data-voice-join]")?.classList.toggle("hidden", isActiveRoom);
    panel.querySelector("[data-voice-leave]")?.classList.toggle("hidden", !isActiveRoom);
    panel.querySelector("[data-voice-mic]")?.classList.toggle("active", isActiveRoom && voiceState.audioEnabled);
    panel.querySelector("[data-voice-camera]")?.classList.toggle("active", isActiveRoom && voiceState.videoEnabled);
    panel.querySelector("[data-voice-mic]")?.classList.toggle("muted", isActiveRoom && !voiceState.audioEnabled);
    panel.querySelector("[data-voice-camera]")?.classList.toggle("muted", isActiveRoom && !voiceState.videoEnabled);
  });
}

function createVoiceTile(member, stream, isLocal = false) {
  const grid = getVoiceGrid();
  if (!grid || !member?.id) {
    return;
  }

  const existingTile = grid.querySelector(`[data-voice-tile="${CSS.escape(member.id)}"]`);
  const preserveSpeaking = Boolean(existingTile?.classList.contains("speaking"));
  existingTile?.remove();

  const role = getRole(member.roleId);
  const tile = document.createElement("article");
  const hasVideo = Boolean(stream?.getVideoTracks().length);
  tile.className = `voice-tile${isLocal ? " local" : ""}${hasVideo ? "" : " audio-only"}`;
  if (preserveSpeaking || (isLocal && voiceState.speaking)) {
    tile.classList.add("speaking");
  }
  tile.dataset.voiceTile = member.id;
  tile.innerHTML = `
    <video autoplay playsinline ${isLocal ? "muted" : ""}></video>
    <div class="voice-avatar-fallback"></div>
    <div class="voice-tile-meta">
      <strong>${escapeHtml(member.name || "Uye")}${isLocal ? " (Sen)" : ""}</strong>
      <span>${escapeHtml(role?.name || "Katilimci")}</span>
    </div>
  `;

  const video = tile.querySelector("video");
  const fallback = tile.querySelector(".voice-avatar-fallback");
  video.srcObject = stream || null;
  video.muted = isLocal || voiceState.outputEnabled === false;
  paintAvatar(fallback, member.name, member.avatarImage, role?.color || "#f1a126");
  grid.appendChild(tile);
}

function removeVoiceTile(memberId) {
  if (!memberId) {
    return;
  }

  getVoiceGrid()?.querySelector(`[data-voice-tile="${CSS.escape(memberId)}"]`)?.remove();
}

function sendVoiceSignal(type, to, payload = {}) {
  if (!voiceState.channel || !authState.userId) {
    return;
  }

  voiceState.channel.send({
    type: "broadcast",
    event: "signal",
    payload: {
      type,
      to,
      from: authState.userId,
      member: getVoiceMemberPayload(),
      ...payload
    }
  });
}

async function applyPendingIce(remoteId, peer) {
  const queue = voiceState.pendingIce.get(remoteId) || [];
  voiceState.pendingIce.delete(remoteId);

  for (const candidate of queue) {
    try {
      await peer.addIceCandidate(candidate);
    } catch (error) {
      console.warn("ICE adayi eklenemedi:", error.message);
    }
  }
}

async function createPeerConnection(remoteMember, shouldOffer = false) {
  if (!remoteMember?.id || remoteMember.id === authState.userId) {
    return null;
  }

  const existingPeer = voiceState.peers.get(remoteMember.id);
  if (existingPeer) {
    return existingPeer;
  }

  const peer = new RTCPeerConnection(rtcConfig);
  voiceState.peers.set(remoteMember.id, peer);
  voiceState.participants.set(remoteMember.id, remoteMember);
  renderVoiceParticipants();

  voiceState.localStream?.getTracks().forEach((track) => {
    peer.addTrack(track, voiceState.localStream);
  });

  peer.ontrack = (event) => {
    const [remoteStream] = event.streams;
    createVoiceTile(remoteMember, remoteStream, false);
  };

  peer.onicecandidate = (event) => {
    if (event.candidate) {
      sendVoiceSignal("ice", remoteMember.id, { candidate: event.candidate });
    }
  };

  peer.onconnectionstatechange = () => {
    if (["failed", "closed", "disconnected"].includes(peer.connectionState)) {
      peer.close();
      voiceState.peers.delete(remoteMember.id);
      voiceState.participants.delete(remoteMember.id);
      removeVoiceTile(remoteMember.id);
      renderVoiceParticipants();
    }
  };

  if (shouldOffer) {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    sendVoiceSignal("offer", remoteMember.id, { description: peer.localDescription });
  }

  return peer;
}

async function handleVoiceSignal(payload) {
  if (!voiceState.roomId || !payload || payload.from === authState.userId) {
    return;
  }

  if (payload.to && payload.to !== authState.userId) {
    return;
  }

  const remoteMember = payload.member || { id: payload.from, name: "Uye" };

  if (payload.type === "join") {
    await createPeerConnection(remoteMember, true);
    return;
  }

  if (payload.type === "leave") {
    voiceState.peers.get(payload.from)?.close();
    voiceState.peers.delete(payload.from);
    voiceState.participants.delete(payload.from);
    removeVoiceTile(payload.from);
    renderVoiceParticipants();
    return;
  }

  if (payload.type === "speaking") {
    getVoiceGrid()?.querySelector(`[data-voice-tile="${CSS.escape(payload.from)}"]`)?.classList.toggle("speaking", Boolean(payload.speaking));
    return;
  }

  if (payload.type === "offer") {
    const peer = await createPeerConnection(remoteMember, false);
    await peer.setRemoteDescription(payload.description);
    await applyPendingIce(remoteMember.id, peer);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    sendVoiceSignal("answer", remoteMember.id, { description: peer.localDescription });
    return;
  }

  if (payload.type === "answer") {
    const peer = voiceState.peers.get(payload.from);
    if (peer) {
      await peer.setRemoteDescription(payload.description);
      await applyPendingIce(payload.from, peer);
    }
    return;
  }

  if (payload.type === "ice") {
    const peer = voiceState.peers.get(payload.from);
    if (peer?.remoteDescription) {
      await peer.addIceCandidate(payload.candidate);
    } else {
      const queue = voiceState.pendingIce.get(payload.from) || [];
      queue.push(payload.candidate);
      voiceState.pendingIce.set(payload.from, queue);
    }
  }
}

async function startVoiceRoom(roomId) {
  if (authState.mode === "visitor") {
    pendingView = roomId;
    openAuthModal("signin");
    return;
  }

  if (!hasPermission("join_voice")) {
    window.alert("Bu role sesli odaya katilma yetkisi tanimlanmamis.");
    return;
  }

  if (!supabaseClient) {
    window.alert("Sesli odalar icin Supabase baglantisi gerekiyor.");
    return;
  }

  if (!navigator.mediaDevices?.getUserMedia) {
    window.alert("Tarayicin mikrofon/kamera erisimini desteklemiyor.");
    return;
  }

  if (voiceState.roomId && voiceState.roomId !== roomId) {
    await leaveVoiceRoom();
  }

  if (voiceState.roomId === roomId) {
    return;
  }

  setVoiceStatus("Baglaniyor...", roomId);
  controlState.mic = true;
  controlState.audio = true;
  controlState.camera = false;
  saveControlState();

  try {
    voiceState.localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
  } catch (error) {
    window.alert(getMediaErrorMessage(error, "Mikrofon"));
    setVoiceStatus("Mikrofon izni bekleniyor.", roomId);
    console.error(error);
    return;
  }

  voiceState.roomId = roomId;
  voiceState.audioEnabled = true;
  voiceState.videoEnabled = false;
  voiceState.outputEnabled = true;
  voiceState.peers = new Map();
  voiceState.pendingIce = new Map();
  voiceState.participants = new Map([[authState.userId, getVoiceMemberPayload()]]);
  voiceState.localStream.getAudioTracks().forEach((track) => {
    track.enabled = voiceState.audioEnabled;
  });
  createVoiceTile(getVoiceMemberPayload(), voiceState.localStream, true);
  startVoiceActivityMonitor(voiceState.localStream);
  renderVoiceParticipants();
  renderVoiceControls();
  renderIdentityVoiceCard();
  renderQuickControls();
  clearVoiceChatUnread(roomId);
  await loadVoiceRoomMessages(roomId);

  const directoryChannel = getVoiceDirectoryChannel(roomId);
  if (directoryChannel) {
    try {
      await directoryChannel.track(getVoiceMemberPayload());
    } catch (error) {
      console.warn("Sesli oda dizin takibi baslatilamadi:", error.message);
    }
  }

  voiceState.channel = supabaseClient
    .channel(`line-online-academy-voice-${roomId}`, {
      config: {
        broadcast: { self: false },
        presence: { key: authState.userId }
      }
    })
    .on("broadcast", { event: "signal" }, ({ payload }) => {
      handleVoiceSignal(payload).catch((error) => console.warn("Sesli oda sinyali islenemedi:", error.message));
    })
    .on("presence", { event: "sync" }, () => {
      const state = voiceState.channel.presenceState();
      Object.values(state).flat().forEach((participant) => {
        if (participant.id && participant.id !== authState.userId) {
          voiceState.participants.set(participant.id, participant);
        }
      });
      renderVoiceParticipants();
    })
    .subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        await voiceState.channel.track(getVoiceMemberPayload());
        sendVoiceSignal("join", null);
        voiceRoomDirectory[roomId] = [
          ...voiceRoomDirectory[roomId]?.filter((participant) => participant.id !== authState.userId) || [],
          getVoiceMemberPayload()
        ];
        renderSidebarVoiceMembers();
        playNotificationSound("voiceJoin");
        setVoiceStatus(`${VOICE_ROOM_LABELS[roomId] || "Oda"} odasindasin.`);
      }
    });
}

async function leaveVoiceRoom() {
  if (!voiceState.roomId) {
    return;
  }

  sendVoiceSignal("leave", null);
  voiceState.peers.forEach((peer) => peer.close());
  voiceState.localStream?.getTracks().forEach((track) => track.stop());
  stopVoiceActivityMonitor();
  const directoryChannel = getVoiceDirectoryChannel(voiceState.roomId);

  try {
    await directoryChannel?.untrack();
    await voiceState.channel?.untrack();
    await voiceState.channel?.unsubscribe();
  } catch (error) {
    console.warn("Sesli odadan cikis tamamlanamadi:", error.message);
  }

  const previousRoom = voiceState.roomId;
  getVoiceGrid(previousRoom)?.replaceChildren();
  voiceRoomDirectory[previousRoom] = (voiceRoomDirectory[previousRoom] || []).filter(
    (participant) => participant.id !== authState.userId
  );
  voiceState = {
    roomId: null,
    channel: null,
    localStream: null,
    peers: new Map(),
    pendingIce: new Map(),
    participants: new Map(),
    audioEnabled: true,
    videoEnabled: false,
    outputEnabled: true,
    activityAudioContext: null,
    activityAnalyser: null,
    activitySource: null,
    activityFrame: null,
    speaking: false
  };
  setVoiceStatus("Odaya katilmaya hazir.", previousRoom);
  renderSidebarVoiceMembers();
  renderVoiceControls();
  renderIdentityVoiceCard();
  renderQuickControls();
  playNotificationSound("voiceLeave");
}

function renegotiateVoicePeers() {
  voiceState.peers.forEach(async (peer, remoteId) => {
    try {
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);
      sendVoiceSignal("offer", remoteId, { description: peer.localDescription });
    } catch (error) {
      console.warn("Sesli oda yeniden baglanti teklifi basarisiz:", error.message);
    }
  });
}

function toggleVoiceMic() {
  if (!voiceState.localStream) {
    return;
  }

  voiceState.audioEnabled = !voiceState.audioEnabled;
  voiceState.localStream.getAudioTracks().forEach((track) => {
    track.enabled = voiceState.audioEnabled;
  });
  if (!voiceState.audioEnabled) {
    renderVoiceSpeakingState(false);
  }
  controlState.mic = voiceState.audioEnabled;
  saveControlState();
  renderVoiceControls();
  renderQuickControls();
}

async function toggleVoiceCamera() {
  if (!voiceState.localStream) {
    return;
  }

  if (voiceState.videoEnabled) {
    voiceState.localStream.getVideoTracks().forEach((track) => {
      voiceState.peers.forEach((peer) => {
        const sender = peer.getSenders().find((item) => item.track === track);
        if (sender) {
          peer.removeTrack(sender);
        }
      });
      track.stop();
      voiceState.localStream.removeTrack(track);
    });
    voiceState.videoEnabled = false;
    controlState.camera = false;
    saveControlState();
    createVoiceTile(getVoiceMemberPayload(), voiceState.localStream, true);
    renderVoiceControls();
    renderQuickControls();
    renegotiateVoicePeers();
    return;
  }

  try {
    const cameraStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    const [videoTrack] = cameraStream.getVideoTracks();
    voiceState.localStream.addTrack(videoTrack);
    voiceState.peers.forEach((peer) => peer.addTrack(videoTrack, voiceState.localStream));
    voiceState.videoEnabled = true;
    controlState.camera = true;
    saveControlState();
    createVoiceTile(getVoiceMemberPayload(), voiceState.localStream, true);
    renderVoiceControls();
    renderQuickControls();
    renegotiateVoicePeers();
  } catch (error) {
    window.alert(getMediaErrorMessage(error, "Kamera"));
    console.error(error);
  }
}

function initializeVoiceRooms() {
  document.querySelectorAll(".voice-channel-view").forEach((panel) => {
    if (panel.querySelector("[data-voice-call]")) {
      return;
    }

    const roomLabel = VOICE_ROOM_LABELS[panel.id] || panel.querySelector("h3")?.textContent || "Oda";
    const callShell = document.createElement("section");
    callShell.className = "voice-call-shell";
    callShell.dataset.voiceCall = panel.id;
    callShell.innerHTML = `
      <div class="voice-call-lobby">
        <div class="voice-lobby-orb">🎧</div>
        <p class="section-kicker">Sesli Toplanti</p>
        <h3>${escapeHtml(roomLabel)}</h3>
        <p>Bu odaya katilarak mikrofonunu kullanabilir, kamerani acabilir ve diger katilimcilarla gorusebilirsin.</p>
        <button class="accent-button" type="button" data-voice-join>Sesli Toplantiya Gir</button>
        <span data-voice-status>Odaya katilmaya hazir.</span>
      </div>
      <div class="voice-call-stage">
        <div class="voice-call-topline">
          <div>
            <p class="section-kicker">Canli Baglanti</p>
            <h4>${escapeHtml(roomLabel)}</h4>
          </div>
          <div class="voice-participants-mini" data-voice-participants><p class="admin-muted">Odada henuz kimse yok.</p></div>
        </div>
        <div class="voice-stage-layout">
          <div class="voice-call-grid" data-voice-grid></div>
          <aside class="voice-chat-panel">
            <button class="voice-chat-handle" type="button" data-voice-chat-toggle aria-label="Oda sohbetini ac veya kapat">
              <span class="voice-chat-handle-icon" data-voice-chat-toggle-label>></span>
              <strong class="voice-chat-handle-unread hidden" data-voice-chat-handle-unread>0</strong>
            </button>
            <div class="voice-chat-head">
              <div>
                <p class="section-kicker">Oda Sohbeti</p>
                <strong>${escapeHtml(roomLabel)} Metin Alani</strong>
              </div>
            </div>
            <div class="voice-chat-stream" data-voice-chat-stream></div>
            <form class="voice-chat-form composer-form" data-composer-view="${panel.id}">
              <input class="composer-input" type="text" placeholder="${escapeHtml(roomLabel)} odasina mesaj yaz..." maxlength="240" />
              <button class="composer-submit" type="submit">Gonder</button>
            </form>
          </aside>
        </div>
        <div class="voice-call-dock">
          <button class="voice-control active" type="button" data-voice-mic><span>🎙</span><small>Mik</small></button>
          <button class="voice-control muted" type="button" data-voice-camera><span>📷</span><small>Kamera</small></button>
          <button class="voice-control" type="button" data-voice-share><span>🖥</span><small>Ekran</small></button>
          <button class="voice-control" type="button" data-voice-activity><span>✦</span><small>Aktivite</small></button>
          <button class="voice-control" type="button" data-voice-more><span>⋯</span><small>Daha</small></button>
          <button class="voice-control danger hidden" type="button" data-voice-leave><span>☎</span><small>Ayril</small></button>
        </div>
      </div>
    `;

    panel.appendChild(callShell);
    const moreButton = callShell.querySelector("[data-voice-more]");
    const chatDockButton = document.createElement("button");
    chatDockButton.className = "voice-control voice-chat-dock-button";
    chatDockButton.type = "button";
    chatDockButton.dataset.voiceChatButton = "true";
    chatDockButton.innerHTML = `<span>&#128172;</span><small>Chat</small><strong class="voice-chat-dock-unread hidden" data-voice-chat-dock-unread>0</strong>`;
    moreButton?.insertAdjacentElement("beforebegin", chatDockButton);

    callShell.querySelector("[data-voice-join]").addEventListener("click", () => startVoiceRoom(panel.id));
    callShell.querySelector("[data-voice-leave]").addEventListener("click", leaveVoiceRoom);
    callShell.querySelector("[data-voice-mic]").addEventListener("click", toggleVoiceMic);
    callShell.querySelector("[data-voice-camera]").addEventListener("click", toggleVoiceCamera);
    callShell.querySelector("[data-voice-chat-toggle]")?.addEventListener("click", () => toggleVoiceChatPanel(panel.id));
    chatDockButton.addEventListener("click", () => toggleVoiceChatPanel(panel.id));
    callShell.querySelector("[data-voice-share]").addEventListener("click", () => window.alert("Ekran paylasimi sonraki adimda entegre edilecek."));
    callShell.querySelector("[data-voice-activity]").addEventListener("click", () => window.alert("Aktivite secimi sonraki adimda entegre edilecek."));
    callShell.querySelector("[data-voice-more]").addEventListener("click", () => window.alert("Ek toplantı ayarlari sonraki adimda eklenecek."));
  });

  renderVoiceControls();
  renderVoiceChatPanels();
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

function initializeSidebarOrder() {
  if (!channelGroups) {
    return;
  }

  const sections = Array.from(channelGroups.querySelectorAll(":scope > section"));
  if (!sections.length) {
    return;
  }

  const pagesSection = sections.find((section) => section.querySelector('[data-view="dashboard"]'));
  const lobiSection = sections.find((section) => section.querySelector('[data-view="waiting-room"]'));
  const siniflarSection = sections.find((section) => section.querySelector('[data-view="class-1"]'));
  const yonetimSection = sections.find((section) => section.querySelector('[data-view="admin-room"]'));
  const kantinSection = sections.find((section) => section.querySelector('[data-view="canteen-chat"]'));
  const kutuphaneSection = sections.find((section) => section.querySelector('[data-view="piano-notes"]'));

  [
    pagesSection,
    lobiSection,
    siniflarSection,
    yonetimSection,
    kantinSection,
    kutuphaneSection
  ].filter(Boolean).forEach((section) => channelGroups.appendChild(section));
}

function titleCaseSidebarLabels() {
  channelGroups?.querySelectorAll(".channel-item").forEach((button) => {
    const labelNode = Array.from(button.childNodes).find((node) => node.nodeType === Node.TEXT_NODE);
    if (!labelNode) {
      return;
    }

    const currentText = labelNode.textContent.trim();
    if (!currentText) {
      return;
    }

    const withoutDecorativePrefix = currentText.replace(/^[^\p{L}\p{N}]+/u, "");
    const normalized = withoutDecorativePrefix
      .split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    labelNode.textContent = ` ${normalized}`;
  });
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
    if (!isVisibleRealMember(member)) {
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

function findMemberById(memberId) {
  return getAllMembers().find((member) => member.id === memberId);
}

function getConversationId(firstId, secondId) {
  return [firstId, secondId].sort().join("__");
}

function readLocalDirectMessages() {
  return readJson(LOCAL_DM_KEY, []);
}

function writeLocalDirectMessages(messages) {
  writeJson(LOCAL_DM_KEY, messages.slice(-500));
}

function rememberLocalDirectMessage(message) {
  if (!message?.id) {
    return;
  }

  const messages = readLocalDirectMessages();
  if (messages.some((item) => item.id === message.id)) {
    return;
  }

  writeLocalDirectMessages([...messages, message]);
}

function getDmPeerId(message) {
  return message.sender_id === authState.userId ? message.receiver_id : message.sender_id;
}

function getDmPeerName(message) {
  return message.sender_id === authState.userId ? message.receiver_name : message.sender_name;
}

function buildDmConversations(messages) {
  const conversations = new Map();

  messages
    .filter((message) => message.sender_id === authState.userId || message.receiver_id === authState.userId)
    .forEach((message) => {
      const conversationId = message.conversation_id || getConversationId(message.sender_id, message.receiver_id);
      const existing = conversations.get(conversationId);
      if (!existing || new Date(message.created_at) > new Date(existing.latest.created_at)) {
        conversations.set(conversationId, {
          conversationId,
          peerId: getDmPeerId(message),
          peerName: getDmPeerName(message) || "Uye",
          latest: message
        });
      }
    });

  return Array.from(conversations.values()).sort(
    (first, second) => new Date(second.latest.created_at) - new Date(first.latest.created_at)
  );
}

function renderDmInbox() {
  renderDmBadge();

  if (!dmInboxList) {
    return;
  }

  if (authState.mode === "visitor") {
    dmInboxList.innerHTML = '<p class="admin-muted">Mesajlarini gormek icin giris yapmalisin.</p>';
    return;
  }

  const conversations = buildDmConversations(dmInboxMessages);
  dmInboxList.innerHTML = conversations.length
    ? conversations.map((conversation) => {
        const peer = findMemberById(conversation.peerId);
        const name = peer?.name || conversation.peerName;
        const role = getRole(peer?.roleId);
        const unread = dmUnreadState[conversation.conversationId] || 0;
        const latestText = conversation.latest.content || "";
        const time = conversation.latest.created_at ? formatMessageTime(conversation.latest.created_at) : "";
        const avatarStyle = peer?.avatarImage
          ? `background: center / cover no-repeat url("${peer.avatarImage}")`
          : `background: ${escapeHtml(role?.color || "#f1a126")}`;

        return `
          <button class="dm-inbox-item${unread ? " has-unread" : ""}" type="button" data-dm-peer-id="${escapeHtml(conversation.peerId)}" data-dm-conversation-id="${escapeHtml(conversation.conversationId)}">
            <div class="avatar ${escapeHtml(peer?.avatarClass || "")}" style='${avatarStyle}'>${peer?.avatarImage ? "" : escapeHtml(name.slice(0, 1).toUpperCase())}</div>
            <div>
              <strong>${escapeHtml(name)}</strong>
              <p>${escapeHtml(latestText)}</p>
            </div>
            <div class="dm-inbox-item-time">
              <span>${time}</span>
              ${unread ? `<em>${Math.min(unread, 99)}</em>` : ""}
            </div>
          </button>
        `;
      }).join("")
    : '<p class="admin-muted">Henuz ozel mesaj yok.</p>';

  dmInboxList.querySelectorAll("[data-dm-peer-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const member =
        findMemberById(button.dataset.dmPeerId) ||
        {
          id: button.dataset.dmPeerId,
          name: button.querySelector("strong")?.textContent || "Uye",
          roleId: "student"
        };
      markDmRead(button.dataset.dmConversationId);
      closeDmInbox();
      openDirectMessage(member);
    });
  });
}

async function loadDmInbox() {
  if (!authState.userId) {
    dmInboxMessages = [];
    renderDmInbox();
    return [];
  }

  if (supabaseClient) {
    try {
      const pageSize = 500;
      const allMessages = [];
      let from = 0;

      while (true) {
        const { data, error } = await withTimeout(
          supabaseClient
            .from("direct_messages")
            .select("*")
            .or(`sender_id.eq.${authState.userId},receiver_id.eq.${authState.userId}`)
            .order("created_at", { ascending: true })
            .range(from, from + pageSize - 1),
          "Ozel mesaj arsivini yukleme"
        );

        if (error) {
          throw error;
        }

        allMessages.push(...(data || []));

        if (!data || data.length < pageSize) {
          break;
        }

        from += pageSize;
      }

      const nextMessages = allMessages;
      if (dmInboxLoadedOnce) {
        const knownIds = new Set(dmInboxMessages.map((message) => message.id));
        nextMessages
          .filter((message) => message.id && !knownIds.has(message.id))
          .forEach(registerDmNotification);
      }

      dmInboxMessages = nextMessages;
      dmInboxLoadedOnce = true;
      refreshDmUnreadFromMessages();
      renderDmInbox();
      return dmInboxMessages;
    } catch (error) {
      console.warn("Ozel mesaj arsivi Supabase'den yuklenemedi:", error.message);
    }
  }

  dmInboxMessages = readLocalDirectMessages().filter(
    (message) => message.sender_id === authState.userId || message.receiver_id === authState.userId
  );
  dmInboxLoadedOnce = true;
  refreshDmUnreadFromMessages();
  renderDmInbox();
  return dmInboxMessages;
}

function renderMembersSidebar() {
  const visibleMembers = getVisibleMembers();
  renderedMembersById = new Map(visibleMembers.map((member) => [member.id, member]));

  const grouped = visibleMembers.reduce((accumulator, member) => {
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

          const isOffline = !(member.isOnline || member.bot);
          const subtitleClass = isOffline
            ? "role offline-role"
            : member.roleId === "admin" || member.roleId === "guest"
              ? "role green"
              : "";
          const roleColor = isOffline ? "#8e949d" : (getRole(member.roleId)?.color || "#f1a126");
          const offlineClass = member.isOnline || member.bot ? "" : " offline";
          const avatarStyle = member.avatarImage
            ? `background: center / cover no-repeat url("${member.avatarImage}")`
            : `background: ${escapeHtml(roleColor)}`;

          return `
            <button class="member-row${offlineClass}" type="button" data-member-id="${escapeHtml(member.id)}">
              <div class="avatar ${escapeHtml(member.avatarClass || "")}" style='${avatarStyle}'>${member.avatarImage ? "" : initials}</div>
              <div class="member-meta">
                <strong>${escapeHtml(member.name)}</strong>
                <p class="${subtitleClass}" style="color: ${escapeHtml(roleColor)}">${escapeHtml(member.subtitle || "")}</p>
              </div>
              ${member.bot ? '<span class="bot-tag">BOT</span>' : ""}
            </button>
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

  membersGroups.querySelectorAll("[data-member-id]").forEach((button) => {
    button.addEventListener("click", (event) => {
      const member = renderedMembersById.get(button.dataset.memberId) || findMemberById(button.dataset.memberId);
      if (member) {
        openMemberCard(member, event.currentTarget);
      }
    });
  });
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
  const chat = panel?.querySelector(".channel-chat, [data-voice-chat-stream]");
  if (!chat) {
    return;
  }

  const roleLabel = message.author_role || "Uye";
  const authorName = message.author_name || "Uye";
  const authorKey = message.author_id || authorName;
  const authorAvatarImage = message.author_avatar || getMemberAvatarImage(message.author_id, authorName);
  const authorRole = getRole(message.author_role_id || findMemberById(message.author_id)?.roleId);
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
    const avatarStyle = authorAvatarImage
      ? `background: center / cover no-repeat url("${authorAvatarImage}")`
      : `background: ${escapeHtml(authorRole?.color || "#f1a126")}`;
    chatMessage.innerHTML = `
      <div class="avatar red" style='${avatarStyle}'>${authorAvatarImage ? "" : escapeHtml(authorName.slice(0, 1).toUpperCase())}</div>
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
        avatar_image: user.avatarImage || null,
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
        .select("role_id, is_muted, is_banned, avatar_image")
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
      isBanned: data?.is_banned || false,
      avatarImage: data?.avatar_image || null
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
        .select("id, display_name, role_id, is_guest, is_muted, is_banned, is_online, last_seen, avatar_image")
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
        avatarImage: user.avatar_image || null,
        avatarClass: "blue",
        subtitle: user.is_guest ? "Misafir" : user.is_online ? getRole(user.role_id)?.name || "Uye" : "Cevrimdisi",
        isOnline: user.is_guest ? false : Boolean(user.is_online),
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
        avatarImage: null,
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

  const pageSize = 1000;
  let from = 0;

  while (true) {
    let response;

    try {
      response = await withTimeout(
        supabaseClient
          .from("messages")
          .select("*")
          .in("channel_id", Array.from(TEXT_CHANNEL_VIEWS))
          .order("created_at", { ascending: true })
          .range(from, from + pageSize - 1),
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

    (data || []).forEach((message) => addChatMessage(message.channel_id, message, { notify: false }));

    if (!data || data.length < pageSize) {
      break;
    }

    from += pageSize;
  }
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

function registerDmNotification(message) {
  if (!message || !authState.userId || message.receiver_id !== authState.userId || message.sender_id === authState.userId) {
    return;
  }

  const conversationId = message.conversation_id || getConversationId(message.sender_id, message.receiver_id);
  const activeConversationId = activeDmMember ? getConversationId(authState.userId, activeDmMember.id) : null;

  if (activeConversationId === conversationId && dmBackdrop && !dmBackdrop.classList.contains("hidden")) {
    markDmRead(conversationId);
    return;
  }

  refreshDmUnreadFromMessages();
  playNotificationSound("dm");
  renderDmInbox();
}

function subscribeToDirectMessages() {
  if (!supabaseClient) {
    return;
  }

  supabaseClient
    .channel("line-online-academy-direct-messages")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "direct_messages"
      },
      async (payload) => {
        const message = payload.new;
        if (!authState.userId || (message.sender_id !== authState.userId && message.receiver_id !== authState.userId)) {
          return;
        }

        dmInboxMessages = [...dmInboxMessages.filter((item) => item.id !== message.id), message];
        rememberLocalDirectMessage(message);
        registerDmNotification(message);

        if (activeDmMember && getConversationId(authState.userId, activeDmMember.id) === message.conversation_id) {
          renderDirectMessages(await loadDirectMessages(activeDmMember));
        } else {
          renderDmInbox();
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
  closeMobileDrawers();

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
  if (VOICE_ROOM_LABELS[nextView] && !isVoiceChatCollapsed(nextView)) {
    clearVoiceChatUnread(nextView);
  }
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

function isMobileLayout() {
  return window.matchMedia("(max-width: 920px)").matches;
}

function syncMobileDrawerUi() {
  const channelsOpen = Boolean(appShell?.classList.contains("mobile-channels-open"));
  const membersOpen = Boolean(appShell?.classList.contains("mobile-members-open"));
  const overlayOpen = channelsOpen || membersOpen;

  document.body.classList.toggle("mobile-drawer-open", overlayOpen);
  mobileDrawerBackdrop?.classList.toggle("hidden", !overlayOpen);
  mobileChannelsToggle?.classList.toggle("active", channelsOpen);
  mobileMembersToggle?.classList.toggle("active", membersOpen);
}

function closeMobileDrawers() {
  appShell?.classList.remove("mobile-channels-open", "mobile-members-open");
  syncMobileDrawerUi();
}

function openMobileDrawer(type) {
  if (!isMobileLayout() || !appShell) {
    return;
  }

  appShell.classList.toggle("mobile-channels-open", type === "channels");
  appShell.classList.toggle("mobile-members-open", type === "members");
  syncMobileDrawerUi();
}

function toggleMobileDrawer(type) {
  if (!isMobileLayout() || !appShell) {
    return;
  }

  const className = type === "channels" ? "mobile-channels-open" : "mobile-members-open";
  const isOpen = appShell.classList.contains(className);
  if (isOpen) {
    closeMobileDrawers();
    return;
  }

  openMobileDrawer(type);
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
  closeMobileDrawers();
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
  renderAdminUsers();
  renderMembersSidebar();
  subscribeToPresence();
  trackRealtimePresence();
  updatePresence(true);
  loadDirectoryUsers();
  loadDmInbox();

  if (voiceState.roomId && voiceState.localStream && authState.userId) {
    const localMember = getVoiceMemberPayload();
    voiceState.participants.set(authState.userId, localMember);
    createVoiceTile(localMember, voiceState.localStream, true);
    renderVoiceParticipants();
    voiceRoomDirectory[voiceState.roomId] = [
      ...(voiceRoomDirectory[voiceState.roomId] || []).filter((participant) => participant.id !== authState.userId),
      localMember
    ];
    renderSidebarVoiceMembers();
    voiceState.channel?.track(localMember).catch((error) => {
      console.warn("Sesli oda profili guncellenemedi:", error.message);
    });
    getVoiceDirectoryChannel(voiceState.roomId)?.track(localMember).catch((error) => {
      console.warn("Sesli oda dizin profili guncellenemedi:", error.message);
    });
  }
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
  leaveVoiceRoom();
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
  dmInboxMessages = [];
  dmInboxLoadedOnce = false;
  renderDmInbox();
  renderIdentityVoiceCard();

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

  closeMobileDrawers();
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
      avatarImage: nextProfile.avatarImage,
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

async function sendChannelMessage(panelId, text) {
  if (authState.mode === "visitor") {
    pendingView = panelId;
    openAuthModal("signin");
    return false;
  }

  if (!hasPermission("send_messages")) {
    window.alert("Bu rol mesaj gonderme yetkisine sahip degil.");
    return false;
  }

  if (authState.isBanned) {
    window.alert("Bu hesabin sunucu erisimi kapatilmis.");
    resetIdentity();
    return false;
  }

  if (authState.isMuted) {
    window.alert("Bu hesap susturuldugu icin mesaj gonderemez.");
    return false;
  }

  const trimmedText = text.trim();
  if (!trimmedText) {
    return false;
  }

  const currentRole = getRole(authState.roleId);
  const roleLabel = currentRole ? currentRole.name : "Uye";

  if (supabaseClient) {
    try {
      const userSaved = await upsertAppUser({
        id: authState.userId,
        displayName: authState.name,
        roleId: authState.roleId,
        avatarImage: authState.avatarImage
      });
      const { data, error } = await withTimeout(
        supabaseClient
          .from("messages")
          .insert({
            channel_id: panelId,
            author_id: userSaved ? authState.userId : null,
            author_name: authState.name,
            author_role: roleLabel,
            content: trimmedText
          })
          .select()
          .single(),
        "Mesaj kaydi"
      );

      if (error) {
        throw error;
      }

      addChatMessage(panelId, data, { notify: false });
      return true;
    } catch (error) {
      console.warn("Supabase mesaj kaydi basarisiz, yerel mesaj eklendi:", error.message);
      addChatMessage(panelId, {
        id: `local-${Date.now()}`,
        channel_id: panelId,
        author_name: authState.name,
        author_role: roleLabel,
        content: trimmedText,
        created_at: new Date().toISOString()
      }, { notify: false });
      return true;
    }
  }

  addChatMessage(panelId, {
    id: `local-${Date.now()}`,
    channel_id: panelId,
    author_name: authState.name,
    author_role: roleLabel,
    content: trimmedText,
    created_at: new Date().toISOString()
  }, { notify: false });
  return true;
}

function bindComposerForm(form) {
  if (!form || form.dataset.composerBound === "true") {
    return;
  }

  form.dataset.composerBound = "true";
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const panelId = form.dataset.composerView;
    const input = form.querySelector(".composer-input");
    if (!panelId || !input) {
      return;
    }

    const sent = await sendChannelMessage(panelId, input.value);
    if (sent) {
      input.value = "";
    }
  });
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

  document.querySelectorAll(".composer-form").forEach(bindComposerForm);
}

async function loadAdminUsers() {
  const localUsers = getAllMembers().map((member) => ({
    id: member.id,
    display_name: member.name,
    role_id: member.roleId,
    is_guest: member.roleId === "guest",
    avatarImage: member.avatarImage || null,
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
        .select("id, display_name, role_id, is_guest, created_at, avatar_image")
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
        avatarImage: user.avatar_image || merged.get(user.id)?.avatarImage || null,
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
      const roleColor = getRole(user.role_id || "student")?.color || "#f1a126";
      const avatarStyle = user.avatarImage
        ? `background: center / cover no-repeat url("${user.avatarImage}")`
        : `background: ${escapeHtml(roleColor)}`;
      return `
        <article class="member-admin-card ${moderation.isBanned ? "is-banned" : ""}">
          <div class="member-admin-main">
            <div class="member-admin-avatar" style='${avatarStyle}'>${user.avatarImage ? "" : escapeHtml((user.display_name || "U").slice(0, 1).toUpperCase())}</div>
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

function positionMemberCard(anchorElement) {
  const modal = memberCardBackdrop?.querySelector(".member-card-modal");
  if (!modal) {
    return;
  }

  if (isMobileLayout()) {
    modal.style.left = "12px";
    modal.style.right = "12px";
    modal.style.top = "max(12px, env(safe-area-inset-top))";
    return;
  }

  if (!anchorElement) {
    return;
  }

  const anchorRect = anchorElement.getBoundingClientRect();
  const modalRect = modal.getBoundingClientRect();
  const gap = 12;
  const margin = 12;
  const hasRoomOnLeft = anchorRect.left >= modalRect.width + gap + margin;
  const left = hasRoomOnLeft
    ? anchorRect.left - modalRect.width - gap
    : Math.min(anchorRect.right + gap, window.innerWidth - modalRect.width - margin);
  const top = Math.min(
    Math.max(anchorRect.top - 18, margin),
    window.innerHeight - modalRect.height - margin
  );

  modal.style.left = `${left}px`;
  modal.style.top = `${top}px`;
}

function openMemberCard(member, anchorElement = null) {
  if (!memberCardBackdrop) {
    return;
  }

  closeMobileDrawers();

  selectedMember = member;
  const role = getRole(member.roleId);
  memberCardName.textContent = member.name;
  memberCardRole.textContent = role ? role.name : "Uye";
  memberCardRole.style.color = role?.color || "";
  paintAvatar(memberCardAvatar, member.name, member.avatarImage, role?.color || "#f1a126");

  const canModerate = isAdminUser() && !member.bot && member.id !== authState.userId;
  memberMuteButton.classList.toggle("hidden", !canModerate);
  memberBanButton.classList.toggle("hidden", !canModerate);

  const moderation = {
    ...getUserModeration(member.id),
    isMuted: member.isMuted ?? member.is_muted ?? getUserModeration(member.id).isMuted,
    isBanned: member.isBanned ?? member.is_banned ?? getUserModeration(member.id).isBanned
  };
  memberMuteButton.textContent = moderation.isMuted ? "Susturmayi Kaldir" : "Sustur";
  memberBanButton.textContent = "Sunucudan At";
  memberMessageButton.disabled = member.id === authState.userId || authState.mode === "visitor";

  memberCardBackdrop.classList.remove("hidden");
  window.requestAnimationFrame(() => positionMemberCard(anchorElement));
}

function closeMemberCard() {
  memberCardBackdrop?.classList.add("hidden");
  const modal = memberCardBackdrop?.querySelector(".member-card-modal");
  if (modal) {
    modal.style.left = "";
    modal.style.right = "";
    modal.style.top = "";
  }
}

async function loadDirectMessages(member) {
  if (!member || !authState.userId) {
    return [];
  }

  const conversationId = getConversationId(authState.userId, member.id);

  if (supabaseClient) {
    try {
      const pageSize = 500;
      const allMessages = [];
      let from = 0;

      while (true) {
        const { data, error } = await withTimeout(
          supabaseClient
            .from("direct_messages")
            .select("*")
            .eq("conversation_id", conversationId)
            .order("created_at", { ascending: true })
            .range(from, from + pageSize - 1),
          "Ozel mesajlari yukleme"
        );

        if (error) {
          throw error;
        }

        allMessages.push(...(data || []));

        if (!data || data.length < pageSize) {
          break;
        }

        from += pageSize;
      }

      return allMessages;
    } catch (error) {
      console.warn("Ozel mesajlar Supabase'den yuklenemedi:", error.message);
    }
  }

  return readLocalDirectMessages().filter((message) => message.conversation_id === conversationId);
}

function renderDirectMessages(messages) {
  if (!dmMessages) {
    return;
  }

  dmMessages.innerHTML = messages.length
    ? messages.map((message) => `
        <div class="dm-line ${message.sender_id === authState.userId ? "own" : ""}">
          <strong>${escapeHtml(message.sender_name || "Uye")}</strong>
          <p>${escapeHtml(message.content || "")}</p>
        </div>
      `).join("")
    : '<p class="admin-muted">Henuz ozel mesaj yok.</p>';

  dmMessages.scrollTop = dmMessages.scrollHeight;
}

async function openDirectMessage(member) {
  if (!member || !dmBackdrop || authState.mode === "visitor") {
    return;
  }

  closeMobileDrawers();
  activeDmMember = member;
  markDmRead(getConversationId(authState.userId, member.id));
  dmTitle.textContent = member.name;
  dmBackdrop.classList.remove("hidden");
  document.body.classList.add("modal-open");
  renderDirectMessages(await loadDirectMessages(member));
  dmInput?.focus();
}

function closeDirectMessage() {
  dmBackdrop?.classList.add("hidden");
  document.body.classList.remove("modal-open");
  activeDmMember = null;
}

function openDmInbox() {
  if (!dmInboxBackdrop || authState.mode === "visitor") {
    openAuthModal("signin");
    return;
  }

  closeMobileDrawers();
  loadDmInbox();
  dmInboxBackdrop.classList.remove("hidden");
  document.body.classList.add("modal-open");
}

function closeDmInbox() {
  dmInboxBackdrop?.classList.add("hidden");
  document.body.classList.remove("modal-open");
}

async function sendDirectMessage(content) {
  if (!activeDmMember || !authState.userId || !content.trim()) {
    return;
  }

  const conversationId = getConversationId(authState.userId, activeDmMember.id);
  const message = {
    id: `local-dm-${Date.now()}`,
    conversation_id: conversationId,
    sender_id: authState.userId,
    receiver_id: activeDmMember.id,
    sender_name: authState.name,
    receiver_name: activeDmMember.name,
    content: content.trim(),
    created_at: new Date().toISOString()
  };

  if (supabaseClient) {
    try {
      const { data, error } = await withTimeout(
        supabaseClient
          .from("direct_messages")
          .insert({
            conversation_id: conversationId,
            sender_id: message.sender_id,
            receiver_id: message.receiver_id,
            sender_name: message.sender_name,
            receiver_name: message.receiver_name,
            content: message.content
          })
          .select()
          .single(),
        "Ozel mesaj gonderme"
      );

      if (error) {
        throw error;
      }

      dmInboxMessages = [...dmInboxMessages.filter((item) => item.id !== data.id), data];
      renderDmInbox();
      renderDirectMessages(await loadDirectMessages(activeDmMember));
      return;
    } catch (error) {
      console.warn("Ozel mesaj Supabase'e kaydedilemedi:", error.message);
    }
  }

  const messages = readLocalDirectMessages();
  writeLocalDirectMessages([...messages, message]);
  dmInboxMessages = [...dmInboxMessages.filter((item) => item.id !== message.id), message];
  renderDmInbox();
  renderDirectMessages(await loadDirectMessages(activeDmMember));
}

function openAdminModal() {
  if (!adminBackdrop) {
    return;
  }

  closeMobileDrawers();
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
      avatarImage: storedProfile.avatarImage || null,
      isMuted: storedProfile.isMuted,
      isBanned: storedProfile.isBanned,
      isOnline: true
    });
    finishAuth(displayName, roleId, {
      mode: "member",
      userId: data.user.id,
      isMuted: storedProfile.isMuted,
      isBanned: storedProfile.isBanned,
      avatarImage: storedProfile.avatarImage || null
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
      avatarImage: storedProfile.avatarImage || null,
      isMuted: storedProfile.isMuted,
      isBanned: storedProfile.isBanned,
      isOnline: true
    });
    finishAuth(signUpDisplayName, roleId, {
      mode: "member",
      userId: data.user.id,
      isMuted: storedProfile.isMuted,
      isBanned: storedProfile.isBanned,
      avatarImage: storedProfile.avatarImage || null
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
      roleId: "guest",
      avatarImage: null,
      isOnline: true
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

if (memberCardCloseButton) {
  memberCardCloseButton.addEventListener("click", closeMemberCard);
}

if (memberCardBackdrop) {
  memberCardBackdrop.addEventListener("click", (event) => {
    if (event.target === memberCardBackdrop) {
      closeMemberCard();
    }
  });
}

document.addEventListener("click", (event) => {
  if (!memberCardBackdrop || memberCardBackdrop.classList.contains("hidden")) {
    return;
  }

  const clickedInsideCard = event.target.closest(".member-card-modal");
  const clickedMemberRow = event.target.closest(".member-row");

  if (!clickedInsideCard && !clickedMemberRow) {
    closeMemberCard();
  }
});

if (memberMessageButton) {
  memberMessageButton.addEventListener("click", () => {
    if (!selectedMember) {
      return;
    }
    closeMemberCard();
    openDirectMessage(selectedMember);
  });
}

if (memberMuteButton) {
  memberMuteButton.addEventListener("click", async () => {
    if (!selectedMember || !isAdminUser()) {
      return;
    }
    const moderation = getUserModeration(selectedMember.id);
    await moderateUser(selectedMember.id, { isMuted: !moderation.isMuted });
    selectedMember = findMemberById(selectedMember.id) || selectedMember;
    openMemberCard(selectedMember);
  });
}

if (memberBanButton) {
  memberBanButton.addEventListener("click", async () => {
    if (!selectedMember || !isAdminUser()) {
      return;
    }
    await moderateUser(selectedMember.id, { isBanned: true });
    closeMemberCard();
    renderMembersSidebar();
  });
}

if (dmCloseButton) {
  dmCloseButton.addEventListener("click", closeDirectMessage);
}

if (dmInboxButton) {
  dmInboxButton.addEventListener("click", (event) => {
    event.stopPropagation();
    openDmInbox();
  });
}

if (identityVoiceRoomButton) {
  identityVoiceRoomButton.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!voiceState.roomId) {
      return;
    }

    const button = Array.from(channelButtons).find((item) => item.dataset.view === voiceState.roomId);
    setActiveView(voiceState.roomId, button?.textContent.trim() || VOICE_ROOM_LABELS[voiceState.roomId] || "Sesli Oda");
  });
}

if (identityVoiceLeaveButton) {
  identityVoiceLeaveButton.addEventListener("click", (event) => {
    event.stopPropagation();
    leaveVoiceRoom();
  });
}

if (dmInboxCloseButton) {
  dmInboxCloseButton.addEventListener("click", closeDmInbox);
}

if (dmInboxBackdrop) {
  dmInboxBackdrop.addEventListener("click", (event) => {
    if (event.target === dmInboxBackdrop) {
      closeDmInbox();
    }
  });
}

if (dmBackdrop) {
  dmBackdrop.addEventListener("click", (event) => {
    if (event.target === dmBackdrop) {
      closeDirectMessage();
    }
  });
}

if (dmForm) {
  dmForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const content = dmInput.value;
    dmInput.value = "";
    await sendDirectMessage(content);
  });
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

    if (voiceState.roomId) {
      if (key === "mic") {
        toggleVoiceMic();
        return;
      }

      if (key === "camera") {
        toggleVoiceCamera();
        return;
      }

      if (key === "audio") {
        applyVoiceOutputState(!(voiceState.outputEnabled !== false));
        return;
      }
    }

    controlState[key] = !controlState[key];
    saveControlState();
    renderQuickControls();
  });
});

if (mobileChannelsToggle) {
  mobileChannelsToggle.addEventListener("click", () => toggleMobileDrawer("channels"));
}

if (mobileMembersToggle) {
  mobileMembersToggle.addEventListener("click", () => toggleMobileDrawer("members"));
}

if (mobileDrawerBackdrop) {
  mobileDrawerBackdrop.addEventListener("click", closeMobileDrawers);
}

window.addEventListener("resize", () => {
  if (!isMobileLayout()) {
    closeMobileDrawers();
  }
});

let mobileGestureStart = null;

document.addEventListener("touchstart", (event) => {
  if (!isMobileLayout()) {
    mobileGestureStart = null;
    return;
  }

  const touch = event.changedTouches?.[0];
  if (!touch) {
    return;
  }

  mobileGestureStart = {
    x: touch.clientX,
    y: touch.clientY,
    target: event.target
  };
}, { passive: true });

document.addEventListener("touchend", (event) => {
  if (!isMobileLayout() || !mobileGestureStart) {
    return;
  }

  const touch = event.changedTouches?.[0];
  if (!touch) {
    mobileGestureStart = null;
    return;
  }

  const deltaX = touch.clientX - mobileGestureStart.x;
  const deltaY = Math.abs(touch.clientY - mobileGestureStart.y);
  const startedInField = mobileGestureStart.target?.closest("input, textarea, select, [contenteditable='true']");
  const startedInScrollable = mobileGestureStart.target?.closest(".channel-groups, .members-scroll-area, .voice-chat-stream, .dm-messages, .dm-inbox-list, .channel-chat");
  const startedInContent = mobileGestureStart.target?.closest(".content-area, .view-panel, .topbar");
  const openedChannels = Boolean(appShell?.classList.contains("mobile-channels-open"));
  const openedMembers = Boolean(appShell?.classList.contains("mobile-members-open"));
  if (!startedInField && deltaY < 80) {
    if (!openedChannels && !openedMembers && !startedInScrollable) {
      if (startedInContent && deltaX > 64) {
        openMobileDrawer("channels");
      } else if (startedInContent && deltaX < -64) {
        openMobileDrawer("members");
      }
    } else if (openedChannels && deltaX < -64) {
      closeMobileDrawers();
    } else if (openedMembers && deltaX > 64) {
      closeMobileDrawers();
    }
  }

  mobileGestureStart = null;
}, { passive: true });

document.addEventListener("pointerdown", unlockNotificationAudio, { once: true });
document.addEventListener("keydown", unlockNotificationAudio, { once: true });

document.addEventListener("click", (event) => {
  return;
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
      window.alert(getMediaErrorMessage(error, "Kamera"));
      console.error(error);
    }
  });
}

initializeAdminState();
controlState = readControlState();
renderQuickControls();
updateSearchVisibility("dashboard");
loadNotificationState();
loadDmUnreadState();
renderNotifications();
renderDmBadge();
initializeSidebarOrder();
titleCaseSidebarLabels();
renderMembersSidebar();
initializeVoiceRooms();
initializeTextChannelComposers();
initializeStaticMessageControls();
restoreSavedSession();
loadDirectoryUsers();
loadLocalMessages();
loadPersistedMessages();
subscribeToMessages();
subscribeToDirectMessages();
subscribeToPresence();
subscribeToVoiceRoomDirectory();

window.setInterval(() => {
  if (authState.userId) {
    loadDmInbox();
  }
}, 15000);

window.addEventListener("beforeunload", () => {
  leaveVoiceRoom();
  untrackRealtimePresence();
  updatePresence(false);
});

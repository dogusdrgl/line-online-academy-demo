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
const DEFAULT_MEMBER_ROLE_ID = "member";
const DEFAULT_GUEST_ROLE_ID = "guest";
const LEGACY_ROLE_IDS = {
  student: DEFAULT_MEMBER_ROLE_ID
};

const VOICE_ROOM_LABELS = {
  "waiting-room": "Bekleme Odası",
  "meeting-room": "Görüşme Odası",
  "admin-room": "Yönetim Odası",
  "trainer-room": "Eğitmen Odası",
  "board-room": "Toplantı Salonu",
  "class-1": "Sınıf 1",
  "class-2": "Sınıf 2",
  "class-3": "Sınıf 3",
  "class-4": "Sınıf 4",
  "table-1": "Masa 1",
  "table-2": "Masa 2",
  "vip-loca": "Loca"
};

const MESSAGE_CHANNEL_VIEWS = new Set([
  ...TEXT_CHANNEL_VIEWS,
  ...Object.keys(VOICE_ROOM_LABELS)
]);

const channelButtons = document.querySelectorAll(".channel-item");
const viewJumpButtons = document.querySelectorAll("[data-view-jump]");
const channelGroups = document.querySelector(".channel-groups");
const viewPanels = document.querySelectorAll(".view-panel");
const viewTitle = document.getElementById("view-title");
const dashboardEditorToolbar = document.getElementById("dashboard-editor-toolbar");
const dashboardEditToggle = document.getElementById("dashboard-edit-toggle");
const dashboardSaveButton = document.getElementById("dashboard-save-button");
const homeDashboard = document.getElementById("home-dashboard");
const homeDashboardGrid = document.getElementById("home-dashboard-grid");
const homeEditableFields = document.querySelectorAll("[data-home-field]");
const homeCards = document.querySelectorAll("[data-home-card]");
const homeBoxFields = document.querySelectorAll("[data-home-box]");
const homeResizeHandles = document.querySelectorAll("[data-home-resize]");
const aboutEditableFields = document.querySelectorAll("[data-about-field]");
const aboutCards = document.querySelectorAll("[data-about-card]");
const aboutBoxFields = document.querySelectorAll("[data-about-box]");
const aboutResizeHandles = document.querySelectorAll("[data-about-resize]");
const aboutPageRoot = document.getElementById("about");
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
const openGuestPriorityButton = document.getElementById("open-guest-priority");
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
const adminResetUsersButton = document.getElementById("admin-reset-users");
const adminMemberSearchInput = document.getElementById("admin-member-search");
const adminMemberStats = document.getElementById("admin-member-stats");
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
const SUPABASE_TIMEOUT_MS = 8000;
const ADMIN_PASSWORD = "Line5367";
const LOCAL_MESSAGES_KEY = "line-online-academy-messages";
const LOCAL_SESSION_KEY = "line-online-academy-session";
const SESSION_STORAGE_KEY = "line-online-academy-session-tab";
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
const LOCAL_HOME_PAGE_SETTINGS_KEY = "line-online-academy-home-page-settings";

let authState = {
  mode: "visitor",
  name: "Ziyaretci",
  role: "Ziyaretci",
  roleId: null,
  roleIds: [],
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
  remoteStreams: new Map(),
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
let focusedVoiceParticipantId = null;
let voiceFullscreenRoomId = null;
let voiceFullscreenUiVisible = true;
let voiceFullscreenUiTimer = null;
let homePageEditMode = false;
let homePageSettingsChannel = null;
let homePageResizeState = null;
let homePageSettings = null;
let homePageSettingsStore = null;
let homePageSettingsRevision = 0;
let aboutPageEditMode = false;
let aboutPageSettingsChannel = null;
let aboutPageResizeState = null;
let aboutPageSettings = null;
let aboutPageSettingsStore = null;
let aboutPageSettingsRevision = 0;
let activeEditableBoxDrag = null;
let currentResponsiveLayoutVariant = null;
let responsiveLayoutRefreshTimer = null;

const DEFAULT_HOME_PAGE_SETTINGS = {
  text: {
    heroEyebrow: "LINE Online Academy",
    heroTitle: "Muzigi topluluk hissiyle bulusturan kampus",
    heroDescription: "Line Online Academy; ogrencinin sinifina, materyaline ve canli iletisime tek akista ulasabilecegi premium bir dijital muzik okulu olarak tasarlandi. Ders, sohbet, canli oda ve kutuphane deneyimini tek kampus mantiginda bir araya getiriyoruz.",
    primaryButtonText: "Bilgi Almak Icin Tiklayin",
    secondaryButtonText: "Kampuse Goz At",
    heroPulseLabel: "Topluluk",
    heroPulseText: "Canli siniflar, mesajlasma ve not kutuphanesi ayni deneyimde.",
    featuredKicker: "Deneyim",
    featuredTitle: "Tek panelde okul akisi",
    featuredBody: "Solda odalar ve siniflar, ortada aktif ders ve icerikler, sagda ise uyeler ve kimlik karti yer alir. Kullanici ilk anda kampusun mantigini kavrar ve kaybolmadan dersine gecer.",
    stat1Value: "Canli",
    stat1Title: "Sesli ve goruntulu siniflar",
    stat1Body: "Canli dersler, etut odalari ve yonetim gorusmeleri ayni cati altinda.",
    stat2Value: "Akis",
    stat2Title: "Mesaj, oda ve kaynak bir arada",
    stat2Body: "Metin kanallari, anlik iletisim ve materyal paylasimi kopmadan ilerler."
  },
  cards: {
    hero: { minHeight: 224 },
    featured: { minHeight: 146, colSpan: 2 },
    stat1: { minHeight: 146, colSpan: 1 },
    stat2: { minHeight: 146, colSpan: 1 }
  },
  boxes: {
    heroTitle: { width: 720, height: 98, x: 0, y: 0 },
    heroDescription: { width: 620, height: 116, x: 0, y: 0 },
    heroPulseText: { width: 300, height: 70, x: 0, y: 0 },
    featuredTitle: { width: 310, height: 52, x: 0, y: 0 },
    featuredBody: { width: 560, height: 108, x: 0, y: 0 },
    stat1Title: { width: 280, height: 52, x: 0, y: 0 },
    stat1Body: { width: 260, height: 92, x: 0, y: 0 },
    stat2Title: { width: 290, height: 52, x: 0, y: 0 },
    stat2Body: { width: 260, height: 92, x: 0, y: 0 }
  }
};

const DEFAULT_ABOUT_PAGE_SETTINGS = {
  text: {
    introEyebrow: "Marka Kimligi",
    introTitle: "Welcome to hakkimizda.",
    introBody: "Burasi Line Online Academy'nin giris noktasi. Kampusun tonu, topluluk yaklasimi ve premium egitim deneyimi burada baslar; kullanici ilk anda bir sunucuda degil, ozel tasarlanmis bir dijital okulda oldugunu hisseder.",
    statementLabel: "Kampus Tasarimi",
    statementTitle: "Topluluk, ders ve oda deneyimi tek omurgada",
    statementBody: "Sol tarafta yapisal navigasyon, merkezde icerik ve etkilesim, sagda ise kisi ve kimlik alani bulunur. Bu denge Discord hissini korurken urunu daha premium ve kurumsal hale getirir.",
    visionKicker: "Vizyon",
    visionTitle: "Her ders bir oda, her oda bir topluluk",
    visionBody: "Ogrenci sinifina girer, materyaline ulasir, hocasiyla gorusur ve toplulukla ayni akista kalir. Arayuz bu gecisi hizlandirmak icin olabildigince tanidik ve net tasarlandi.",
    experienceKicker: "Deneyim",
    experienceTitle: "Discord hissi, okul mantigi",
    experienceBody: "Solda kanal bazli okul haritasi, ortada aktif ders veya bilgi sayfasi, sagda ise roller ve anlik kullanici listesi bulunur. Bu iskelet ileride tam canli ders sistemine kolayca donusebilir.",
    composerText: "Line Online Academy icinde gezin..."
  },
  cards: {
    intro: { minHeight: 232 },
    statement: { minHeight: 360 },
    vision: { minHeight: 210 },
    experience: { minHeight: 210 },
    composer: { minHeight: 78 }
  },
  boxes: {
    introTitle: { width: 560, height: 130, x: 0, y: 0 },
    introBody: { width: 760, height: 120, x: 0, y: 0 },
    statementTitle: { width: 420, height: 58, x: 0, y: 0 },
    statementBody: { width: 420, height: 110, x: 0, y: 0 },
    visionTitle: { width: 360, height: 58, x: 0, y: 0 },
    visionBody: { width: 360, height: 104, x: 0, y: 0 },
    experienceTitle: { width: 360, height: 58, x: 0, y: 0 },
    experienceBody: { width: 360, height: 110, x: 0, y: 0 },
    composerText: { width: 320, height: 40, x: 0, y: 0 }
  }
};

function getResponsiveLayoutVariant() {
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0;
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
  const isPortrait = viewportHeight >= viewportWidth;
  const isTabletWidth = viewportWidth >= 768;
  const isDesktopLikeLandscape = isTabletWidth && !isPortrait;

  if (isDesktopLikeLandscape) {
    return "desktop";
  }

  return isPortrait ? "mobilePortrait" : "mobileLandscape";
}

function getResponsiveLayoutVariantLabel(variant = getResponsiveLayoutVariant()) {
  if (variant === "mobilePortrait") {
    return "Telefon Dikey";
  }

  if (variant === "mobileLandscape") {
    return "Telefon Yatay";
  }

  return "Masaustu / Tablet Yatay";
}

function isResponsiveSettingsStore(value) {
  return Boolean(value && typeof value === "object" && value.variants && typeof value.variants === "object");
}

function buildResponsiveSettingsStore(rawValue, defaults, sanitizeFn) {
  const nextStore = { variants: {} };

  if (isResponsiveSettingsStore(rawValue)) {
    Object.entries(rawValue.variants).forEach(([variant, settings]) => {
      nextStore.variants[variant] = sanitizeFn(settings);
    });
  } else if (rawValue && typeof rawValue === "object") {
    nextStore.variants.desktop = sanitizeFn(rawValue);
  }

  if (!nextStore.variants.desktop) {
    nextStore.variants.desktop = sanitizeFn(defaults);
  }

  return nextStore;
}

function resolveResponsiveSettingsVariant(storeValue, defaults, sanitizeFn, variant = getResponsiveLayoutVariant()) {
  const nextStore = buildResponsiveSettingsStore(storeValue, defaults, sanitizeFn);
  return cloneHomePageSettings(nextStore.variants[variant] || nextStore.variants.desktop || sanitizeFn(defaults));
}

function mergeResponsiveSettingsVariant(storeValue, defaults, sanitizeFn, variant, settings) {
  const nextStore = buildResponsiveSettingsStore(storeValue, defaults, sanitizeFn);
  nextStore.variants[variant] = sanitizeFn(settings);
  return nextStore;
}

function applyResponsiveSettingsForCurrentVariant() {
  if (homePageSettingsStore) {
    applyHomePageSettings(resolveResponsiveSettingsVariant(homePageSettingsStore, DEFAULT_HOME_PAGE_SETTINGS, sanitizeHomePageSettings, currentResponsiveLayoutVariant || getResponsiveLayoutVariant()));
  }

  if (aboutPageSettingsStore) {
    applyAboutPageSettings(resolveResponsiveSettingsVariant(aboutPageSettingsStore, DEFAULT_ABOUT_PAGE_SETTINGS, sanitizeAboutPageSettings, currentResponsiveLayoutVariant || getResponsiveLayoutVariant()));
  }
}

function handleResponsiveLayoutVariantChange() {
  const nextVariant = getResponsiveLayoutVariant();
  if (nextVariant === currentResponsiveLayoutVariant) {
    renderDashboardEditorToolbar();
    return;
  }

  const wasEditingHome = homePageEditMode;
  const wasEditingAbout = aboutPageEditMode;
  currentResponsiveLayoutVariant = nextVariant;

  if (wasEditingHome) {
    setHomePageEditMode(false, { restoreSaved: true, silent: true });
  }

  if (wasEditingAbout) {
    setAboutPageEditMode(false, { restoreSaved: true, silent: true });
  }

  applyResponsiveSettingsForCurrentVariant();
  renderDashboardEditorToolbar();

  if ((wasEditingHome || wasEditingAbout) && isAdminUser()) {
    window.alert("Ekran profili degisti. Bu profilin kayitli duzeni yuklendi.");

    if (wasEditingHome) {
      setHomePageEditMode(true, { restoreSaved: false });
    }

    if (wasEditingAbout) {
      setAboutPageEditMode(true, { restoreSaved: false });
    }
  }
}

function scheduleResponsiveLayoutRefresh() {
  window.clearTimeout(responsiveLayoutRefreshTimer);
  responsiveLayoutRefreshTimer = window.setTimeout(handleResponsiveLayoutVariantChange, 120);
}

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
    id: "member",
    name: "Uye",
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
    permissions: ["view_channels"],
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
let directoryRealtimeChannel = null;
let messageRealtimeChannel = null;
let directMessageRealtimeChannel = null;
let selectedMember = null;
let activeDmMember = null;
let renderedMembersById = new Map();
let directoryRefreshTimer = null;

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
    group: "Çevrimiçi",
    subtitle: "Misafir"
  },
  {
    id: "ezgi",
    name: "Ezgi",
    roleId: "member",
    avatarClass: "coral",
    group: "Çevrimiçi",
    subtitle: "Piyano Uyesi"
  },
  {
    id: "mert",
    name: "Mert",
    roleId: "member",
    avatarClass: "amber",
    group: "Çevrimiçi",
    subtitle: "Davul Uyesi"
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

function removeUserModeration(userId) {
  if (!userId) {
    return;
  }

  const moderation = readModeration();
  delete moderation[userId];
  saveModeration(moderation);
}

function isProtectedOwnerUser(user) {
  const normalizedName = normalizeMention(user?.display_name || user?.name || "");
  return normalizedName === "dogus";
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

function normalizeRoleId(roleId, fallbackRoleId = DEFAULT_MEMBER_ROLE_ID) {
  const normalizedFallback = LEGACY_ROLE_IDS[fallbackRoleId] || fallbackRoleId || DEFAULT_MEMBER_ROLE_ID;
  const normalizedRoleId = LEGACY_ROLE_IDS[roleId] || roleId;
  return normalizedRoleId || normalizedFallback;
}

function normalizeRoleIds(roleIds, fallbackRoleId = DEFAULT_MEMBER_ROLE_ID) {
  const incoming = Array.isArray(roleIds)
    ? roleIds
    : roleIds
      ? [roleIds]
      : [];
  const normalizedIncoming = incoming
    .map((roleId) => normalizeRoleId(roleId, fallbackRoleId))
    .filter(Boolean);
  const normalizedFallback = normalizeRoleId(fallbackRoleId, DEFAULT_MEMBER_ROLE_ID);
  const validRoleIds = normalizedIncoming.filter(
    (roleId, index) => roleId && roles.some((role) => role.id === roleId) && normalizedIncoming.indexOf(roleId) === index
  );
  return validRoleIds.length ? validRoleIds : [normalizedFallback];
}

function getPrimaryRoleIdFromRoleIds(roleIds, fallbackRoleId = DEFAULT_MEMBER_ROLE_ID) {
  const normalized = normalizeRoleIds(roleIds, fallbackRoleId);
  return normalized
    .slice()
    .sort((firstRoleId, secondRoleId) => {
      const firstRole = getRole(firstRoleId);
      const secondRole = getRole(secondRoleId);
      const firstOrder = Number(firstRole?.order ?? 99);
      const secondOrder = Number(secondRole?.order ?? 99);
      return firstOrder - secondOrder || String(firstRole?.name || firstRoleId).localeCompare(String(secondRole?.name || secondRoleId), "tr");
    })[0];
}

function getRoleIdsForMember(member) {
  return normalizeRoleIds(
    member?.roleIds || member?.role_ids || member?.roleId || member?.role_id,
    member?.roleId || member?.role_id || DEFAULT_MEMBER_ROLE_ID
  );
}

function getPrimaryRoleIdForMember(member) {
  return getPrimaryRoleIdFromRoleIds(getRoleIdsForMember(member), member?.roleId || member?.role_id || DEFAULT_MEMBER_ROLE_ID);
}

function getRoleNamesFromRoleIds(roleIds) {
  return normalizeRoleIds(roleIds)
    .slice()
    .sort((firstRoleId, secondRoleId) => {
      const firstRole = getRole(firstRoleId);
      const secondRole = getRole(secondRoleId);
      const firstOrder = Number(firstRole?.order ?? 99);
      const secondOrder = Number(secondRole?.order ?? 99);
      return firstOrder - secondOrder || String(firstRole?.name || firstRoleId).localeCompare(String(secondRole?.name || secondRoleId), "tr");
    })
    .map((roleId) => getRole(roleId)?.name || roleId)
    .filter(Boolean);
}

function getRoleLabelFromRoleIds(roleIds, separator = " • ") {
  return getRoleNamesFromRoleIds(roleIds).join(separator);
}

function getRoleColorFromRoleIds(roleIds) {
  return getRole(getPrimaryRoleIdFromRoleIds(roleIds))?.color || "#f1a126";
}

function renderSidebarRoleBadges(roleIds) {
  return normalizeRoleIds(roleIds, DEFAULT_MEMBER_ROLE_ID)
    .slice()
    .sort((firstRoleId, secondRoleId) => {
      const firstRole = getRole(firstRoleId);
      const secondRole = getRole(secondRoleId);
      const firstOrder = Number(firstRole?.order ?? 99);
      const secondOrder = Number(secondRole?.order ?? 99);
      return firstOrder - secondOrder || String(firstRole?.name || firstRoleId).localeCompare(String(secondRole?.name || secondRoleId), "tr");
    })
    .map((roleId, index) => {
      const role = getRole(roleId);
      const separator = index > 0 ? '<span class="member-role-separator">/</span>' : "";
      return `${separator}<span class="member-role-badge" style="--member-role-color: ${escapeHtml(role?.color || "#f1a126")}">${escapeHtml(role?.name || roleId)}</span>`;
    })
    .join("");
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
    const rawLocalSession = window.localStorage.getItem(LOCAL_SESSION_KEY);
    if (rawLocalSession) {
      return JSON.parse(rawLocalSession);
    }
  } catch (error) {
    console.warn("Kayitli oturum localStorage'dan okunamadi:", error.message);
  }

  try {
    const rawTabSession = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    return rawTabSession ? JSON.parse(rawTabSession) : null;
  } catch (error) {
    console.warn("Kayitli oturum sessionStorage'dan okunamadi:", error.message);
    return null;
  }
}

function saveSession(session) {
  const serialized = JSON.stringify(session);

  try {
    window.localStorage.setItem(LOCAL_SESSION_KEY, serialized);
  } catch (error) {
    console.warn("Oturum localStorage'a kaydedilemedi:", error.message);
  }

  try {
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, serialized);
  } catch (error) {
    console.warn("Oturum sessionStorage'a kaydedilemedi:", error.message);
  }
}

function clearSavedSession() {
  try {
    window.localStorage.removeItem(LOCAL_SESSION_KEY);
  } catch (error) {
    console.warn("Oturum localStorage'dan temizlenemedi:", error.message);
  }

  try {
    window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
  } catch (error) {
    console.warn("Oturum sessionStorage'dan temizlenemedi:", error.message);
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

function getVoiceCallShell(roomId = voiceState.roomId) {
  return getVoiceRoomPanel(roomId)?.querySelector("[data-voice-call]");
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

function clearVoiceFullscreenUiTimer() {
  if (voiceFullscreenUiTimer) {
    window.clearTimeout(voiceFullscreenUiTimer);
    voiceFullscreenUiTimer = null;
  }
}

function applyVoiceFullscreenUi(roomId = voiceState.roomId) {
  const shell = getVoiceCallShell(roomId);
  if (!shell) {
    return;
  }

  shell.classList.toggle("voice-fullscreen", voiceFullscreenRoomId === roomId);
  shell.classList.toggle("voice-fullscreen-ui-visible", voiceFullscreenUiVisible || voiceFullscreenRoomId !== roomId);
  shell.classList.toggle(
    "voice-stage-ui-visible",
    isMobileLayout() || voiceState.roomId !== roomId || voiceFullscreenUiVisible
  );
}

function scheduleVoiceFullscreenUiHide(roomId = voiceState.roomId) {
  clearVoiceFullscreenUiTimer();
  if (isMobileLayout() || voiceState.roomId !== roomId) {
    return;
  }

  voiceFullscreenUiTimer = window.setTimeout(() => {
    voiceFullscreenUiVisible = false;
    applyVoiceFullscreenUi(roomId);
  }, 2200);
}

async function enterVoiceFullscreen(memberId = focusedVoiceParticipantId || authState.userId) {
  const roomId = voiceState.roomId;
  const shell = getVoiceCallShell(roomId);
  if (!shell || !document.fullscreenEnabled) {
    return;
  }

  if (memberId) {
    setFocusedVoiceParticipant(memberId);
  }

  try {
    await shell.requestFullscreen();
    voiceFullscreenRoomId = roomId;
    voiceFullscreenUiVisible = true;
    applyVoiceFullscreenUi(roomId);
    scheduleVoiceFullscreenUiHide(roomId);
  } catch (error) {
    console.warn("Tam ekran acilamadi:", error.message);
  }
}

async function exitVoiceFullscreen() {
  if (document.fullscreenElement) {
    try {
      await document.exitFullscreen();
    } catch (error) {
      console.warn("Tam ekrandan cikilamadi:", error.message);
    }
  }

  clearVoiceFullscreenUiTimer();
  voiceFullscreenRoomId = null;
  voiceFullscreenUiVisible = true;
  applyVoiceFullscreenUi();
}

function toggleVoiceFullscreenUi(roomId = voiceState.roomId) {
  if (voiceState.roomId !== roomId) {
    return;
  }

  voiceFullscreenUiVisible = !voiceFullscreenUiVisible;
  applyVoiceFullscreenUi(roomId);
  if (voiceFullscreenUiVisible) {
    scheduleVoiceFullscreenUiHide(roomId);
  } else {
    clearVoiceFullscreenUiTimer();
  }
}

function getVoiceName() {
  return authState.name || "Uye";
}

function getVoiceMemberPayload() {
  return {
    id: authState.userId,
    name: getVoiceName(),
    roleId: authState.roleId,
    avatarImage: authState.avatarImage || null,
    videoEnabled: Boolean(voiceState.videoEnabled)
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

function pruneLocalVoiceDirectoryMembership(userId = authState.userId, keepRoomId = null) {
  if (!userId) {
    return;
  }

  Object.keys(voiceRoomDirectory).forEach((roomId) => {
    if (keepRoomId && roomId === keepRoomId) {
      return;
    }
    voiceRoomDirectory[roomId] = (voiceRoomDirectory[roomId] || []).filter((participant) => participant.id !== userId);
  });
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
  const participants = Array.from(voiceState.participants.values());
  if (list) {
    list.innerHTML = participants.length
      ? participants.map((participant) => `
        <div class="voice-participant">
          <div class="voice-dot"></div>
          <span>${escapeHtml(participant.name || "Uye")}</span>
        </div>
      `).join("")
      : '<p class="admin-muted">Odada henuz kimse yok.</p>';
  }

  const grid = getVoiceGrid();
  if (!grid) {
    return;
  }

  const orderedParticipants = participants
    .slice()
    .sort((a, b) => {
      if (a.id === authState.userId) return -1;
      if (b.id === authState.userId) return 1;
      return (a.name || "").localeCompare(b.name || "", "tr");
    });

  const visibleIds = new Set(orderedParticipants.map((participant) => participant.id));
  Array.from(grid.querySelectorAll(".voice-tile")).forEach((tile) => {
    const tileId = tile.dataset.voiceTile;
    if (!visibleIds.has(tileId)) {
      tile.remove();
    }
  });

  orderedParticipants.forEach((participant) => {
    const isLocal = participant.id === authState.userId;
    const stream = isLocal
      ? voiceState.localStream
      : (voiceState.remoteStreams.get(participant.id) || null);
    createVoiceTile(participant, stream, isLocal);
  });

  grid.classList.remove("solo-layout");
  grid.querySelector(".voice-promo-card")?.remove();

  if (focusedVoiceParticipantId && !visibleIds.has(focusedVoiceParticipantId)) {
    focusedVoiceParticipantId = null;
  }
  setFocusedVoiceParticipant(focusedVoiceParticipantId);
}

function setFocusedVoiceParticipant(memberId) {
  const grid = getVoiceGrid();
  if (!grid) {
    return;
  }

  const tiles = Array.from(grid.querySelectorAll(".voice-tile"));
  const validFocusId = memberId && tiles.some((tile) => tile.dataset.voiceTile === memberId)
    ? memberId
    : (tiles.find((tile) => tile.dataset.voiceTile === authState.userId)?.dataset.voiceTile || tiles[0]?.dataset.voiceTile || null);
  focusedVoiceParticipantId = validFocusId;
  const hasFocus = Boolean(focusedVoiceParticipantId);
  grid.classList.toggle("spotlight-active", hasFocus);
  grid.classList.toggle("solo-focus", hasFocus && tiles.length <= 1);

  let spotlightColumn = grid.querySelector(".voice-spotlight-column");
  let sidebarColumn = grid.querySelector(".voice-sidebar-column");
  if (hasFocus) {
    if (!spotlightColumn) {
      spotlightColumn = document.createElement("div");
      spotlightColumn.className = "voice-spotlight-column";
      grid.appendChild(spotlightColumn);
    }
    if (!sidebarColumn) {
      sidebarColumn = document.createElement("div");
      sidebarColumn.className = "voice-sidebar-column";
      grid.appendChild(sidebarColumn);
    }
  } else {
    spotlightColumn?.remove();
    sidebarColumn?.remove();
  }

  tiles.forEach((tile) => {
    const isFocused = hasFocus && tile.dataset.voiceTile === focusedVoiceParticipantId;
    tile.classList.toggle("spotlight", isFocused);
    tile.classList.toggle("dimmed", false);
    tile.classList.toggle("picture-in-picture", hasFocus && !isFocused);
    tile.querySelector(".voice-tile-expand")?.classList.toggle("visible", isFocused);
    if (!hasFocus) {
      grid.appendChild(tile);
    }
  });

  if (hasFocus) {
    const focusedTile = tiles.find((tile) => tile.dataset.voiceTile === focusedVoiceParticipantId);
    if (focusedTile && spotlightColumn) {
      spotlightColumn.replaceChildren(focusedTile);
    }
    if (sidebarColumn) {
      sidebarColumn.replaceChildren(...tiles.filter((tile) => tile.dataset.voiceTile !== focusedVoiceParticipantId));
    }
  }
  renderVoiceControls();
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
    const isActiveRoom = voiceState.roomId === panel.id && Boolean(voiceState.localStream);
    panel.querySelector("[data-voice-call]")?.classList.toggle("in-call", isActiveRoom);
    panel.querySelector("[data-voice-join]")?.classList.toggle("hidden", isActiveRoom);
    panel.querySelector("[data-voice-leave]")?.classList.toggle("hidden", !isActiveRoom);
    panel.querySelector("[data-voice-mic]")?.classList.toggle("active", isActiveRoom && voiceState.audioEnabled);
    panel.querySelector("[data-voice-camera]")?.classList.toggle("active", isActiveRoom && voiceState.videoEnabled);
    panel.querySelector("[data-voice-mic]")?.classList.toggle("muted", isActiveRoom && !voiceState.audioEnabled);
    panel.querySelector("[data-voice-camera]")?.classList.toggle("muted", isActiveRoom && !voiceState.videoEnabled);
    panel.querySelector("[data-voice-fullscreen]")?.classList.toggle("active", voiceFullscreenRoomId === panel.id);
    panel.querySelector("[data-voice-stage-fullscreen]")?.classList.toggle("active", voiceFullscreenRoomId === panel.id);
    panel.querySelector("[data-voice-window]")?.classList.toggle("active", isActiveRoom && Boolean(focusedVoiceParticipantId));
    panel.querySelector("[data-voice-window]")?.classList.toggle("hidden", !isActiveRoom || !focusedVoiceParticipantId);
    applyVoiceFullscreenUi(panel.id);
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
  const hasVideoTrack = Boolean(stream?.getVideoTracks().some((track) => track.readyState === "live"));
  const hasVideo = member.videoEnabled !== false && hasVideoTrack;
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
  tile.addEventListener("click", (event) => {
    if (voiceFullscreenRoomId === voiceState.roomId) {
      event.stopPropagation();
      if (focusedVoiceParticipantId !== member.id) {
        setFocusedVoiceParticipant(member.id);
        voiceFullscreenUiVisible = true;
        applyVoiceFullscreenUi(voiceState.roomId);
        scheduleVoiceFullscreenUiHide(voiceState.roomId);
        return;
      }
      toggleVoiceFullscreenUi(voiceState.roomId);
      return;
    }
    setFocusedVoiceParticipant(member.id);
  });
  grid.appendChild(tile);
  setFocusedVoiceParticipant(focusedVoiceParticipantId);
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
    voiceState.remoteStreams.set(remoteMember.id, remoteStream);
    const knownMember = voiceState.participants.get(remoteMember.id) || remoteMember;
    voiceState.participants.set(remoteMember.id, {
      ...knownMember,
      ...remoteMember,
      videoEnabled: knownMember.videoEnabled ?? Boolean(remoteStream?.getVideoTracks().length)
    });
    createVoiceTile(voiceState.participants.get(remoteMember.id), remoteStream, false);
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
      voiceState.remoteStreams.delete(remoteMember.id);
      voiceState.participants.delete(remoteMember.id);
      removeVoiceTile(remoteMember.id);
      renderVoiceParticipants();
      if (focusedVoiceParticipantId === remoteMember.id) {
        setFocusedVoiceParticipant(null);
      }
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
    voiceState.remoteStreams.delete(payload.from);
    voiceState.participants.delete(payload.from);
    removeVoiceTile(payload.from);
    renderVoiceParticipants();
    if (focusedVoiceParticipantId === payload.from) {
      setFocusedVoiceParticipant(null);
    }
    return;
  }

  if (payload.type === "speaking") {
    getVoiceGrid()?.querySelector(`[data-voice-tile="${CSS.escape(payload.from)}"]`)?.classList.toggle("speaking", Boolean(payload.speaking));
    return;
  }

  if (payload.type === "media_state") {
    const existingMember = voiceState.participants.get(payload.from) || remoteMember;
    const updatedMember = {
      ...existingMember,
      ...remoteMember,
      videoEnabled: Boolean(payload.videoEnabled)
    };
    voiceState.participants.set(payload.from, updatedMember);
    const remoteStream = voiceState.remoteStreams.get(payload.from) || null;
    createVoiceTile(updatedMember, remoteStream, false);
    renderVoiceParticipants();
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
    await leaveVoiceRoom({ navigateToDashboard: false });
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
  pruneLocalVoiceDirectoryMembership(authState.userId, roomId);
  createVoiceTile(getVoiceMemberPayload(), voiceState.localStream, true);
  startVoiceActivityMonitor(voiceState.localStream);
  voiceFullscreenUiVisible = true;
  renderVoiceParticipants();
  renderVoiceControls();
  renderIdentityVoiceCard();
  renderQuickControls();
  clearVoiceChatUnread(roomId);
  applyVoiceFullscreenUi(roomId);
  scheduleVoiceFullscreenUiHide(roomId);
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
        pruneLocalVoiceDirectoryMembership(authState.userId, roomId);
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

async function leaveVoiceRoom(options = {}) {
  if (!voiceState.roomId) {
    return;
  }

  const { navigateToDashboard = true } = options;
  if (voiceFullscreenRoomId === voiceState.roomId) {
    exitVoiceFullscreen();
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
  pruneLocalVoiceDirectoryMembership(authState.userId);
  getVoiceGrid(previousRoom)?.replaceChildren();
  voiceRoomDirectory[previousRoom] = (voiceRoomDirectory[previousRoom] || []).filter(
    (participant) => participant.id !== authState.userId
  );
  focusedVoiceParticipantId = null;
  voiceState = {
    roomId: null,
    channel: null,
    localStream: null,
    peers: new Map(),
    remoteStreams: new Map(),
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

  if (navigateToDashboard) {
    setActiveView("dashboard", "Anasayfa");
  }
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
    const nextLocalMember = getVoiceMemberPayload();
    voiceState.participants.set(authState.userId, nextLocalMember);
    createVoiceTile(nextLocalMember, voiceState.localStream, true);
    renderVoiceControls();
    renderQuickControls();
    sendVoiceSignal("media_state", null, { videoEnabled: false });
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
    const nextLocalMember = getVoiceMemberPayload();
    voiceState.participants.set(authState.userId, nextLocalMember);
    createVoiceTile(nextLocalMember, voiceState.localStream, true);
    renderVoiceControls();
    renderQuickControls();
    sendVoiceSignal("media_state", null, { videoEnabled: true });
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
    const isClassRoom = /^class-\d+$/.test(panel.id);
    const voiceLobbyKicker = isClassRoom ? "Ders Başlıyor" : "Sesli Toplantı";
    const voiceJoinLabel = isClassRoom ? "Derse Gir" : "Sesli Toplantıya Gir";
    const legacyHeader = panel.querySelector(".panel-header");
    legacyHeader?.remove();

    const callShell = document.createElement("section");
    callShell.className = "voice-call-shell";
    callShell.dataset.voiceCall = panel.id;
    callShell.innerHTML = `
      <div class="voice-call-lobby">
        <div class="voice-lobby-orb">&#127911;</div>
        <p class="section-kicker">${voiceLobbyKicker}</p>
        <h3>${escapeHtml(roomLabel)}</h3>
        <p>Bu odaya katilarak mikrofonunu kullanabilir, kamerani acabilir ve diger katilimcilarla gorusebilirsin.</p>
        <button class="accent-button" type="button" data-voice-join>${voiceJoinLabel}</button>
        <span data-voice-status>Odaya katilmaya hazir.</span>
      </div>
      <div class="voice-call-stage">
        <button class="voice-fullscreen-exit" type="button" data-voice-exit-fullscreen aria-label="Tam ekrandan cik">&#10005;</button>
        <div class="voice-call-topline">
          <div class="voice-call-room-badge">
            <span>&#128266;</span>
            <h4>${escapeHtml(roomLabel)}</h4>
          </div>
          <div class="voice-call-top-actions">
            <div class="voice-participants-mini" data-voice-participants><p class="admin-muted">Odada henuz kimse yok.</p></div>
            <button class="voice-top-chat-button" type="button" data-voice-chat-toggle aria-label="Oda sohbetini ac veya kapat">&#128172;</button>
          </div>
        </div>
        <div class="voice-stage-layout">
          <div class="voice-call-grid" data-voice-grid></div>
          <aside class="voice-chat-panel">
            <button class="voice-chat-handle" type="button" data-voice-chat-toggle aria-label="Oda sohbetini ac veya kapat">
              <span class="voice-chat-handle-icon" data-voice-chat-toggle-label>></span>
              <strong class="voice-chat-handle-unread hidden" data-voice-chat-handle-unread>0</strong>
            </button>
            <div class="voice-chat-stream" data-voice-chat-stream></div>
            <form class="voice-chat-form composer-form" data-composer-view="${panel.id}">
              <input class="composer-input" type="text" placeholder="${escapeHtml(roomLabel)} odasina mesaj yaz..." maxlength="240" />
              <button class="composer-submit" type="submit">Gonder</button>
            </form>
          </aside>
        </div>
        <div class="voice-call-dock">
          <button class="voice-control active" type="button" data-voice-mic><span>&#127908;</span><small>Mik</small></button>
          <button class="voice-control muted" type="button" data-voice-camera><span>&#128247;</span><small>Kamera</small></button>
          <button class="voice-control" type="button" data-voice-share><span>&#128421;</span><small>Ekran</small></button>
          <button class="voice-control" type="button" data-voice-activity><span>&#10022;</span><small>Aktivite</small></button>
          <button class="voice-control" type="button" data-voice-more><span>&#8942;</span><small>Daha</small></button>
          <button class="voice-control danger hidden" type="button" data-voice-leave><span>&#9742;</span><small>Ayril</small></button>
        </div>
      </div>
    `;
    panel.replaceChildren(callShell);
    const moreButton = callShell.querySelector("[data-voice-more]");
    const chatDockButton = document.createElement("button");
    const fullscreenDockButton = document.createElement("button");
    const stageUtilityDock = document.createElement("div");
    const windowModeButton = document.createElement("button");
    const stageFullscreenButton = document.createElement("button");
    chatDockButton.className = "voice-control voice-chat-dock-button";
    chatDockButton.type = "button";
    chatDockButton.dataset.voiceChatButton = "true";
    chatDockButton.innerHTML = `<span>&#128172;</span><small>Chat</small><strong class="voice-chat-dock-unread hidden" data-voice-chat-dock-unread>0</strong>`;
    fullscreenDockButton.className = "voice-control";
    fullscreenDockButton.type = "button";
    fullscreenDockButton.dataset.voiceFullscreen = "true";
    fullscreenDockButton.innerHTML = `<span>&#9974;</span><small>Tam Ekran</small>`;
    stageUtilityDock.className = "voice-stage-utilities";
    windowModeButton.className = "voice-stage-utility hidden";
    windowModeButton.type = "button";
    windowModeButton.dataset.voiceWindow = "true";
    windowModeButton.setAttribute("aria-label", "Spotlight gorunumunden cik");
    windowModeButton.innerHTML = `&#9635;`;
    stageFullscreenButton.className = "voice-stage-utility";
    stageFullscreenButton.type = "button";
    stageFullscreenButton.dataset.voiceStageFullscreen = "true";
    stageFullscreenButton.setAttribute("aria-label", "Tam ekran gecisi");
    stageFullscreenButton.innerHTML = `&#9974;`;
    stageUtilityDock.append(windowModeButton, stageFullscreenButton);
    moreButton?.insertAdjacentElement("beforebegin", chatDockButton);
    callShell.querySelector(".voice-call-stage")?.appendChild(stageUtilityDock);
    callShell.querySelector("[data-voice-leave]")?.insertAdjacentElement("afterend", fullscreenDockButton);

    callShell.querySelector("[data-voice-join]").addEventListener("click", () => startVoiceRoom(panel.id));
    callShell.querySelector("[data-voice-leave]").addEventListener("click", leaveVoiceRoom);
    callShell.querySelector("[data-voice-mic]").addEventListener("click", toggleVoiceMic);
    callShell.querySelector("[data-voice-camera]").addEventListener("click", toggleVoiceCamera);
    callShell.querySelectorAll("[data-voice-chat-toggle]").forEach((element) => {
      element.addEventListener("click", () => toggleVoiceChatPanel(panel.id));
    });
    chatDockButton.addEventListener("click", () => toggleVoiceChatPanel(panel.id));
    fullscreenDockButton.addEventListener("click", () => {
      if (voiceFullscreenRoomId === panel.id) {
        exitVoiceFullscreen();
        return;
      }
      enterVoiceFullscreen(focusedVoiceParticipantId || authState.userId);
    });
    stageFullscreenButton.addEventListener("click", () => {
      if (voiceFullscreenRoomId === panel.id) {
        exitVoiceFullscreen();
        return;
      }
      enterVoiceFullscreen(focusedVoiceParticipantId || authState.userId);
    });
    windowModeButton.addEventListener("click", () => {
      setFocusedVoiceParticipant(null);
      voiceFullscreenUiVisible = true;
      applyVoiceFullscreenUi(panel.id);
      scheduleVoiceFullscreenUiHide(panel.id);
      renderVoiceControls();
    });
    callShell.querySelector("[data-voice-exit-fullscreen]")?.addEventListener("click", () => exitVoiceFullscreen());
    callShell.querySelector("[data-voice-share]").addEventListener("click", () => window.alert("Ekran paylasimi sonraki adimda entegre edilecek."));
    callShell.querySelector("[data-voice-activity]").addEventListener("click", () => window.alert("Aktivite secimi sonraki adimda entegre edilecek."));
    callShell.querySelector("[data-voice-more]").addEventListener("click", () => window.alert("Ek toplanti ayarlari sonraki adimda eklenecek."));
    callShell.addEventListener("mousemove", () => {
      if (voiceState.roomId !== panel.id || isMobileLayout()) {
        return;
      }
      voiceFullscreenUiVisible = true;
      applyVoiceFullscreenUi(panel.id);
      scheduleVoiceFullscreenUiHide(panel.id);
    });
    callShell.addEventListener("mouseleave", () => {
      if (voiceState.roomId !== panel.id || isMobileLayout()) {
        return;
      }
      scheduleVoiceFullscreenUiHide(panel.id);
    });
    callShell.querySelector(".voice-call-stage")?.addEventListener("click", (event) => {
      if (voiceState.roomId !== panel.id) {
        return;
      }
      if (event.target.closest("button, input, .voice-chat-panel, .voice-call-dock, .voice-stage-utilities")) {
        return;
      }
      voiceFullscreenUiVisible = true;
      applyVoiceFullscreenUi(panel.id);
      scheduleVoiceFullscreenUiHide(panel.id);
      if (voiceFullscreenRoomId === panel.id) {
        toggleVoiceFullscreenUi(panel.id);
      }
    });
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

  const roleIds = normalizeRoleIds(user.roleIds || user.role_id || user.roleId, user.roleId || "student");
  const primaryRoleId = getPrimaryRoleIdFromRoleIds(roleIds, user.roleId || "student");
  const existingIndex = directoryUsers.findIndex((member) => member.id === user.id);
  const nextMember = {
    id: user.id,
    name: user.name || user.display_name || "Isimsiz Uye",
    roleId: primaryRoleId,
    roleIds,
    avatarImage: user.avatarImage || user.avatar_image || null,
    avatarClass: roleIds.includes("guest") ? "amber" : "green",
    subtitle: getRoleLabelFromRoleIds(roleIds) || (roleIds.includes("guest") ? "Misafir" : "Uye"),
    isOnline: true,
    isGuest: roleIds.includes("guest"),
    isMuted: Boolean(user.isMuted || user.is_muted),
    isBanned: Boolean(user.isBanned || user.is_banned),
    lastSeen: user.lastSeen || user.last_seen || new Date().toISOString()
  };

  if (existingIndex >= 0) {
    directoryUsers[existingIndex] = {
      ...directoryUsers[existingIndex],
      ...nextMember
    };
  } else {
    directoryUsers.push(nextMember);
  }
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
  const roleIds = normalizeRoleIds(authState.roleIds || authState.roleId, authState.roleId || "student");
  const permissions = new Set();

  roleIds.forEach((roleId) => {
    const role = getRole(roleId);
    (role?.permissions || []).forEach((permission) => permissions.add(permission));
  });

  return Array.from(permissions);
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

  const activeRoleIds = normalizeRoleIds(authState.roleIds || authState.roleId, authState.roleId || DEFAULT_MEMBER_ROLE_ID);
  const activeRoles = activeRoleIds
    .map((roleId) => getRole(roleId))
    .filter(Boolean);

  if (!activeRoles.some((role) => role.permissions.includes("view_channels"))) {
    return false;
  }

  if (activeRoles.some((role) => role.permissions.includes("admin_access"))) {
    return true;
  }

  const allowedRoles = viewAccess[viewId];
  return !allowedRoles || activeRoleIds.some((roleId) => allowedRoles.includes(roleId));
}

function isVisibleRealMember(member) {
  if (!member?.id) {
    return false;
  }

  if (member.bot) {
    return true;
  }

  return !(member.isBanned || member.is_banned || getUserModeration(member.id).isBanned);
}

function buildDirectoryMemberFromRecord(record, presenceMap = new Map()) {
  const roleIds = normalizeRoleIds(record.roleIds || record.role_ids || record.roleId || record.role_id, record.roleId || record.role_id || "student");
  const primaryRoleId = getPrimaryRoleIdFromRoleIds(roleIds, record.roleId || record.role_id || "student");
  const presenceMember = presenceMap.get(record.id);
  const isOnline = Boolean(presenceMember?.isOnline ?? record.isOnline ?? record.is_online);
  const lastSeen = presenceMember?.lastSeen || presenceMember?.last_seen || record.lastSeen || record.last_seen || null;

  return {
    id: record.id,
    name: record.name || record.display_name || "Isimsiz Uye",
    roleId: primaryRoleId,
    roleIds,
    role_id: primaryRoleId,
    role_ids: roleIds,
    avatarImage: presenceMember?.avatarImage || record.avatarImage || record.avatar_image || null,
    avatarClass: roleIds.includes("guest") ? "amber" : "green",
    subtitle: isOnline ? (getRoleLabelFromRoleIds(roleIds) || (roleIds.includes("guest") ? "Misafir" : "Uye")) : "Cevrimdisi",
    isOnline,
    isGuest: Boolean(record.isGuest || record.is_guest || roleIds.includes("guest")),
    isMuted: Boolean(record.isMuted || record.is_muted),
    isBanned: Boolean(record.isBanned || record.is_banned),
    lastSeen
  };
}

function getPresenceMap() {
  return new Map(
    livePresenceMembers
      .filter((member) => member?.id)
      .map((member) => [member.id, member])
  );
}

function getAllMembers() {
  const visibleBots = members.filter((member) => member.bot && isVisibleRealMember(member));
  const presenceMap = getPresenceMap();
  const merged = new Map();

  directoryUsers
    .filter(isVisibleRealMember)
    .forEach((member) => {
      const normalizedMember = buildDirectoryMemberFromRecord(member, presenceMap);
      merged.set(normalizedMember.id, normalizedMember);
    });

  if (authState.userId && authState.mode !== "visitor") {
    const selfRoleIds = normalizeRoleIds(authState.roleIds || authState.roleId, authState.roleId || "student");
    const selfMember = buildDirectoryMemberFromRecord({
      id: authState.userId,
      name: authState.name,
      roleId: authState.roleId,
      roleIds: selfRoleIds,
      avatarImage: authState.avatarImage || null,
      isOnline: true,
      isGuest: selfRoleIds.includes("guest"),
      isMuted: authState.isMuted,
      isBanned: authState.isBanned,
      lastSeen: new Date().toISOString()
    }, presenceMap);
    merged.set(selfMember.id, {
      ...(merged.get(selfMember.id) || {}),
      ...selfMember
    });
  }

  visibleBots.forEach((bot) => {
    const botRoleIds = normalizeRoleIds(bot.roleIds || bot.roleId, bot.roleId || "assistant");
    merged.set(bot.id, {
      ...bot,
      roleId: getPrimaryRoleIdFromRoleIds(botRoleIds, bot.roleId || "assistant"),
      roleIds: botRoleIds,
      isOnline: true
    });
  });

  return Array.from(merged.values());
}

function getVisibleMembers() {
  return getAllMembers().map((member) => {
    const roleIds = getRoleIdsForMember(member);
    const primaryRoleId = getPrimaryRoleIdFromRoleIds(roleIds, member.roleId || "student");
    const primaryRole = getRole(primaryRoleId);
    const isOnline = Boolean(member.isOnline || member.bot);

    return {
      ...member,
      roleIds,
      roleId: primaryRoleId,
      role_id: primaryRoleId,
      group: isOnline ? primaryRole?.name || "Uye" : "Cevrimdisi",
      roleName: primaryRole?.name || "Uye",
      subtitle: member.bot ? member.subtitle : isOnline ? (getRoleLabelFromRoleIds(roleIds) || primaryRole?.name || "Uye") : "Cevrimdisi",
      roleOrder: Number(primaryRole?.order ?? 99)
    };
  });
}

function getMemberRecency(member) {
  const rawValue = member?.lastSeen || member?.last_seen || member?.createdAt || member?.created_at || null;
  if (!rawValue) {
    return 0;
  }

  const timestamp = new Date(rawValue).getTime();
  return Number.isFinite(timestamp) ? timestamp : 0;
}

function findMemberById(memberId) {
  return getAllMembers().find((member) => member.id === memberId);
}

function scheduleDirectoryRefresh(delay = 450) {
  if (directoryRefreshTimer) {
    window.clearTimeout(directoryRefreshTimer);
  }

  directoryRefreshTimer = window.setTimeout(() => {
    directoryRefreshTimer = null;
    loadDirectoryUsers();
  }, delay);
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

  if (!hasPermission("send_messages")) {
    dmInboxList.innerHTML = '<p class="admin-muted">Misafir hesaplar yalnizca goz atabilir. Mesajlasmak icin uye girisi yap.</p>';
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
          roleId: DEFAULT_MEMBER_ROLE_ID
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
  if (!membersGroups) {
    return;
  }

  let visibleMembers = [];
  try {
    visibleMembers = getVisibleMembers();
  } catch (error) {
    console.error("Uye listesi hazirlanamadi:", error);
  }

  if (!visibleMembers.length && authState.mode !== "visitor" && authState.name) {
    const fallbackRoleIds = normalizeRoleIds(
      authState.roleIds || authState.roleId,
      authState.roleId || (authState.mode === "guest" ? DEFAULT_GUEST_ROLE_ID : DEFAULT_MEMBER_ROLE_ID)
    );
    const fallbackPrimaryRoleId = getPrimaryRoleIdFromRoleIds(
      fallbackRoleIds,
      authState.roleId || (authState.mode === "guest" ? DEFAULT_GUEST_ROLE_ID : DEFAULT_MEMBER_ROLE_ID)
    );
    const fallbackPrimaryRole = getRole(fallbackPrimaryRoleId);
    visibleMembers = [{
      id: authState.userId || ("session-" + slugify(authState.name || "uye")),
      name: authState.name,
      roleId: fallbackPrimaryRoleId,
      roleIds: fallbackRoleIds,
      roleName: fallbackPrimaryRole?.name || "Uye",
      group: fallbackPrimaryRole?.name || "Uye",
      roleOrder: Number(fallbackPrimaryRole?.order ?? 99),
      subtitle: getRoleLabelFromRoleIds(fallbackRoleIds) || fallbackPrimaryRole?.name || "Uye",
      isOnline: true,
      isGuest: authState.mode === "guest",
      isMuted: Boolean(authState.isMuted),
      isBanned: Boolean(authState.isBanned),
      avatarImage: authState.avatarImage || null,
      avatarClass: fallbackRoleIds.includes("guest") ? "amber" : "green"
    }];
  }

  renderedMembersById = new Map(visibleMembers.map((member) => [member.id, member]));

  const grouped = visibleMembers.reduce((accumulator, member) => {
    const groupName = member.group || "Cevrimdisi";
    accumulator[groupName] ||= [];
    accumulator[groupName].push(member);
    return accumulator;
  }, {});

  Object.values(grouped).forEach((membersInGroup) => {
    membersInGroup.sort((firstMember, secondMember) => {
      const firstOnline = Boolean(firstMember.isOnline || firstMember.bot);
      const secondOnline = Boolean(secondMember.isOnline || secondMember.bot);
      if (firstOnline !== secondOnline) {
        return firstOnline ? -1 : 1;
      }

      const firstRoleOrder = Number(firstMember.roleOrder ?? 99);
      const secondRoleOrder = Number(secondMember.roleOrder ?? 99);
      const firstSeen = getMemberRecency(firstMember);
      const secondSeen = getMemberRecency(secondMember);
      return firstRoleOrder - secondRoleOrder || secondSeen - firstSeen || String(firstMember.name || "").localeCompare(String(secondMember.name || ""), "tr");
    });
  });

  const preferredGroupOrder = [...getSortedRoles().map((role) => role.name), "Cevrimdisi"];
  const groupOrder = [
    ...preferredGroupOrder,
    ...Object.keys(grouped).filter((group) => !preferredGroupOrder.includes(group))
  ];

  membersGroups.innerHTML = groupOrder
    .filter((group) => grouped[group]?.length)
    .map((group) => {
      const rows = grouped[group]
        .map((member) => {
          const initials = String(member.name || "U")
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
          const roleIds = getRoleIdsForMember(member);
          const isOffline = !(member.isOnline || member.bot);
          const roleColor = isOffline ? "#8e949d" : getRoleColorFromRoleIds(roleIds);
          const avatarStyle = member.avatarImage
            ? "background: center / cover no-repeat url(\"" + member.avatarImage + "\")"
            : "background: " + escapeHtml(roleColor);
          const subtitleMarkup = member.bot
            ? escapeHtml(member.subtitle || "")
            : isOffline
              ? '<span class="offline-role">Cevrimdisi</span>'
              : renderSidebarRoleBadges(roleIds);

          return [
            '<button class="member-row' + (isOffline ? ' offline' : '') + '" type="button" data-member-id="' + escapeHtml(member.id) + '">',
            '  <div class="avatar ' + escapeHtml(member.avatarClass || "") + '" style="' + avatarStyle + '">' + (member.avatarImage ? "" : initials) + '</div>',
            '  <div class="member-meta">',
            '    <strong>' + escapeHtml(member.name) + '</strong>',
            '    <p class="role' + (isOffline ? ' offline-role' : ' role-badges') + '">' + subtitleMarkup + '</p>',
            '  </div>',
            member.bot ? '<span class="bot-tag">BOT</span>' : '',
            '</button>'
          ].join("");
        })
        .join("");

      return [
        '<div class="members-group">',
        '  <p class="member-heading">' + escapeHtml(group) + ' &bull; ' + grouped[group].length + '</p>',
        rows,
        '</div>'
      ].join("");
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


function cloneHomePageSettings(value) {
  return JSON.parse(JSON.stringify(value));
}

function readEditableFieldText(field) {
  if (!field) {
    return "";
  }

  const clone = field.cloneNode(true);
  clone.querySelectorAll(".editable-box-drag-handle").forEach((handle) => handle.remove());
  return repairPossiblyBrokenText(clone.innerText || clone.textContent || "");
}

function repairPossiblyBrokenText(value) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/\u00c3\u00bc/g, "u")
    .replace(/\u00c3\u0153/g, "U")
    .replace(/\u00c3\u00b6/g, "o")
    .replace(/\u00c3\u2013/g, "O")
    .replace(/\u00c4\u00b1/g, "i")
    .replace(/\u00c4\u00b0/g, "I")
    .replace(/\u00c5\u0178/g, "s")
    .replace(/\u00c5\u017d/g, "S")
    .replace(/\u00c3\u00a7/g, "c")
    .replace(/\u00c3\u2021/g, "C")
    .replace(/\u00c4\u0178/g, "g")
    .replace(/\u00c4\u017e/g, "G")
    .replace(/\u00e2\u20ac\u00a2/g, "•")
    .replace(/\u00e2\u20ac\u201c/g, "-")
    .replace(/\u00e2\u20ac\u201d/g, "-")
    .replace(/\u00e2\u20ac\u0153|\u00e2\u20ac\u009d/g, '"')
    .replace(/\u00e2\u20ac\u02dc|\u00e2\u20ac\u2122/g, "'")
    .replace(/\u00ef\u00bf\u00bd|�/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function sanitizeResizableBox(candidate, fallback, options = {}) {
  const minWidth = options.minWidth || 120;
  const maxWidth = options.maxWidth || 900;
  const minHeight = options.minHeight || 42;
  const maxHeight = options.maxHeight || 420;
  const minOffsetX = options.minOffsetX || -420;
  const maxOffsetX = options.maxOffsetX || 420;
  const minOffsetY = options.minOffsetY || -260;
  const maxOffsetY = options.maxOffsetY || 260;

  return {
    width: Math.round(Math.max(minWidth, Math.min(maxWidth, Number(candidate?.width) || fallback.width))),
    height: Math.round(Math.max(minHeight, Math.min(maxHeight, Number(candidate?.height) || fallback.height))),
    x: Math.round(Math.max(minOffsetX, Math.min(maxOffsetX, Number(candidate?.x) || fallback.x || 0))),
    y: Math.round(Math.max(minOffsetY, Math.min(maxOffsetY, Number(candidate?.y) || fallback.y || 0)))
  };
}

function sanitizeHomePageSettings(input) {
  const nextSettings = cloneHomePageSettings(DEFAULT_HOME_PAGE_SETTINGS);
  const incoming = input && typeof input === "object" ? input : {};
  const incomingText = incoming.text && typeof incoming.text === "object" ? incoming.text : {};
  const incomingCards = incoming.cards && typeof incoming.cards === "object" ? incoming.cards : {};
  const incomingBoxes = incoming.boxes && typeof incoming.boxes === "object" ? incoming.boxes : {};

  Object.keys(nextSettings.text).forEach((field) => {
    const fallback = nextSettings.text[field];
    const nextValue = typeof incomingText[field] === "string" ? repairPossiblyBrokenText(incomingText[field]) : "";
    nextSettings.text[field] = nextValue || fallback;
  });

  Object.keys(nextSettings.cards).forEach((cardId) => {
    const fallback = nextSettings.cards[cardId];
    const candidate = incomingCards[cardId] || {};
    const minHeight = Math.max(cardId === "hero" ? 200 : 120, Math.min(520, Number(candidate.minHeight) || fallback.minHeight));
    nextSettings.cards[cardId].minHeight = Math.round(minHeight);

    if (cardId !== "hero") {
      const colSpan = Math.max(1, Math.min(4, Number(candidate.colSpan) || fallback.colSpan));
      nextSettings.cards[cardId].colSpan = Math.round(colSpan);
    }
  });

  Object.keys(nextSettings.boxes).forEach((boxId) => {
    nextSettings.boxes[boxId] = sanitizeResizableBox(incomingBoxes[boxId], nextSettings.boxes[boxId], { minWidth: 120, maxWidth: 960, minHeight: 42, maxHeight: 320 });
  });

  return nextSettings;
}

function applyHomePageSettings(settings) {
  homePageSettings = sanitizeHomePageSettings(settings);

  homeEditableFields.forEach((field) => {
    const key = field.dataset.homeField;
    if (!key || !(key in homePageSettings.text)) {
      return;
    }

    field.textContent = homePageSettings.text[key];
  });

  homeCards.forEach((card) => {
    const cardId = card.dataset.homeCard;
    const cardSettings = homePageSettings.cards[cardId];
    if (!cardSettings) {
      return;
    }

    card.style.minHeight = cardSettings.minHeight + "px";

    if (cardId !== "hero") {
      card.dataset.homeColSpan = String(cardSettings.colSpan);
      card.style.gridColumn = "span " + cardSettings.colSpan;
    }
  });

  homeBoxFields.forEach((box) => {
    const boxId = box.dataset.homeBox;
    const boxSettings = homePageSettings.boxes[boxId];
    if (!boxSettings) {
      return;
    }

    box.style.display = "block";
    box.style.width = boxSettings.width + "px";
    box.style.maxWidth = "none";
    box.style.minHeight = boxSettings.height + "px";
    box.style.height = boxSettings.height + "px";
    box.dataset.boxX = String(boxSettings.x || 0);
    box.dataset.boxY = String(boxSettings.y || 0);
    box.style.transform = "translate(" + (boxSettings.x || 0) + "px, " + (boxSettings.y || 0) + "px)";
  });
}

function collectHomePageSettingsFromDom() {
  const nextSettings = cloneHomePageSettings(DEFAULT_HOME_PAGE_SETTINGS);

  homeEditableFields.forEach((field) => {
    const key = field.dataset.homeField;
    if (!key) {
      return;
    }

    const nextValue = readEditableFieldText(field);
    if (nextValue) {
      nextSettings.text[key] = nextValue;
    }
  });

  homeCards.forEach((card) => {
    const cardId = card.dataset.homeCard;
    const currentCard = nextSettings.cards[cardId];
    if (!currentCard) {
      return;
    }

    const rect = card.getBoundingClientRect();
    currentCard.minHeight = Math.round(rect.height);
    if (cardId !== "hero") {
      currentCard.colSpan = Math.max(1, Math.min(4, Number(card.dataset.homeColSpan) || currentCard.colSpan));
    }
  });

  homeBoxFields.forEach((box) => {
    const boxId = box.dataset.homeBox;
    const currentBox = nextSettings.boxes[boxId];
    if (!currentBox) {
      return;
    }

    const rect = box.getBoundingClientRect();
    currentBox.width = Math.round(rect.width);
    currentBox.height = Math.round(rect.height);
    currentBox.x = Number(box.dataset.boxX || 0);
    currentBox.y = Number(box.dataset.boxY || 0);
  });

  return sanitizeHomePageSettings(nextSettings);
}

function setHomeFieldEditable(field, editable) {
  if (!field) {
    return;
  }

  if (editable) {
    field.setAttribute("contenteditable", "plaintext-only");
    field.setAttribute("spellcheck", "false");
    field.classList.add("home-field-editable");
  } else {
    field.removeAttribute("contenteditable");
    field.removeAttribute("spellcheck");
    field.classList.remove("home-field-editable");
  }
}

function ensureEditableBoxHandles(boxes, type) {
  boxes.forEach((box) => {
    if (box.querySelector(".editable-box-drag-handle")) {
      return;
    }
    const handle = document.createElement("button");
    handle.type = "button";
    handle.className = "editable-box-drag-handle";
    handle.dataset.dragType = type;
    handle.setAttribute("aria-label", "Kutuyu tasi");
    handle.setAttribute("title", "Kutuyu tasi");
    handle.setAttribute("contenteditable", "false");
    box.appendChild(handle);
  });
}

function startEditableBoxDrag(event) {
  const handle = event.target.closest(".editable-box-drag-handle");
  if (!handle) {
    return;
  }

  const box = handle.parentElement;
  if (!box) {
    return;
  }

  const isHomeBox = box.hasAttribute("data-home-box");
  const isAboutBox = box.hasAttribute("data-about-box");
  if (!(isHomeBox && homePageEditMode) && !(isAboutBox && aboutPageEditMode)) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  activeEditableBoxDrag = {
    pointerId: event.pointerId,
    box,
    startX: event.clientX,
    startY: event.clientY,
    originX: Number(box.dataset.boxX || 0),
    originY: Number(box.dataset.boxY || 0)
  };

  handle.setPointerCapture(event.pointerId);
  document.addEventListener("pointermove", onEditableBoxDragMove);
  document.addEventListener("pointerup", stopEditableBoxDrag);
  document.addEventListener("pointercancel", stopEditableBoxDrag);
}

function onEditableBoxDragMove(event) {
  if (!activeEditableBoxDrag) {
    return;
  }

  const nextX = Math.round(activeEditableBoxDrag.originX + (event.clientX - activeEditableBoxDrag.startX));
  const nextY = Math.round(activeEditableBoxDrag.originY + (event.clientY - activeEditableBoxDrag.startY));
  activeEditableBoxDrag.box.dataset.boxX = String(nextX);
  activeEditableBoxDrag.box.dataset.boxY = String(nextY);
  activeEditableBoxDrag.box.style.transform = "translate(" + nextX + "px, " + nextY + "px)";
}

function stopEditableBoxDrag(event) {
  if (!activeEditableBoxDrag) {
    return;
  }
  if (event && event.pointerId !== undefined && event.pointerId !== activeEditableBoxDrag.pointerId) {
    return;
  }
  activeEditableBoxDrag = null;
  document.removeEventListener("pointermove", onEditableBoxDragMove);
  document.removeEventListener("pointerup", stopEditableBoxDrag);
  document.removeEventListener("pointercancel", stopEditableBoxDrag);
}

function getActiveEditablePageId() {
  const viewId = getActiveViewId();
  return viewId === "dashboard" || viewId === "about" ? viewId : null;
}

function isAnyPageEditorActive() {
  return homePageEditMode || aboutPageEditMode;
}

function renderDashboardEditorToolbar() {
  if (!dashboardEditorToolbar || !dashboardEditToggle || !dashboardSaveButton) {
    return;
  }

  const activeEditablePage = getActiveEditablePageId();
  const shouldShow = Boolean(activeEditablePage && isAdminUser());
  dashboardEditorToolbar.classList.toggle("hidden", !shouldShow);

  if (!shouldShow) {
    dashboardSaveButton.classList.add("hidden");
    dashboardEditToggle.textContent = "Duzenle";
    if (homePageEditMode) {
      setHomePageEditMode(false, { restoreSaved: true, silent: true });
    }
    if (aboutPageEditMode) {
      setAboutPageEditMode(false, { restoreSaved: true, silent: true });
    }
    return;
  }

  const currentEditMode = activeEditablePage === "about" ? aboutPageEditMode : homePageEditMode;
  const layoutLabel = getResponsiveLayoutVariantLabel(currentResponsiveLayoutVariant || getResponsiveLayoutVariant());
  dashboardEditToggle.textContent = currentEditMode ? "Iptal" : "Duzenle";
  dashboardEditToggle.title = "Aktif profil: " + layoutLabel;
  dashboardSaveButton.classList.toggle("hidden", !currentEditMode);
  dashboardSaveButton.title = "Bu duzen " + layoutLabel + " profiline kaydedilir.";
}

function getRevisionTimestamp(value) {
  if (!value) {
    return 0;
  }

  const timestamp = new Date(value).getTime();
  return Number.isFinite(timestamp) ? timestamp : 0;
}

function applyResolvedHomePageSettings(storeOrSettings) {
  const resolvedSettings = resolveResponsiveSettingsVariant(
    storeOrSettings,
    DEFAULT_HOME_PAGE_SETTINGS,
    sanitizeHomePageSettings,
    currentResponsiveLayoutVariant || getResponsiveLayoutVariant()
  );
  homePageSettings = sanitizeHomePageSettings(resolvedSettings);
  applyHomePageSettings(resolvedSettings);
}

function applyResolvedAboutPageSettings(storeOrSettings) {
  const resolvedSettings = resolveResponsiveSettingsVariant(
    storeOrSettings,
    DEFAULT_ABOUT_PAGE_SETTINGS,
    sanitizeAboutPageSettings,
    currentResponsiveLayoutVariant || getResponsiveLayoutVariant()
  );
  aboutPageSettings = sanitizeAboutPageSettings(resolvedSettings);
  applyAboutPageSettings(resolvedSettings);
}

function commitHomePageSettingsStore(rawSettings, updatedAt = null) {
  const nextRevision = getRevisionTimestamp(updatedAt);
  if (nextRevision && nextRevision < homePageSettingsRevision) {
    return false;
  }

  homePageSettingsRevision = Math.max(homePageSettingsRevision, nextRevision);
  homePageSettingsStore = buildResponsiveSettingsStore(rawSettings, DEFAULT_HOME_PAGE_SETTINGS, sanitizeHomePageSettings);
  applyResolvedHomePageSettings(homePageSettingsStore);
  return true;
}

function commitAboutPageSettingsStore(rawSettings, updatedAt = null) {
  const nextRevision = getRevisionTimestamp(updatedAt);
  if (nextRevision && nextRevision < aboutPageSettingsRevision) {
    return false;
  }

  aboutPageSettingsRevision = Math.max(aboutPageSettingsRevision, nextRevision);
  aboutPageSettingsStore = buildResponsiveSettingsStore(rawSettings, DEFAULT_ABOUT_PAGE_SETTINGS, sanitizeAboutPageSettings);
  applyResolvedAboutPageSettings(aboutPageSettingsStore);
  return true;
}

function setHomePageEditMode(nextMode, options = {}) {
  const allowEdit = isAdminUser();
  const shouldEdit = Boolean(nextMode && allowEdit);
  if (shouldEdit && aboutPageEditMode) {
    setAboutPageEditMode(false, { restoreSaved: true, silent: true });
  }
  homePageEditMode = shouldEdit;

  if (!shouldEdit && options.restoreSaved !== false && homePageSettings) {
    applyHomePageSettings(homePageSettings);
  }

  if (homeDashboard) {
    homeDashboard.classList.toggle("is-editing", shouldEdit);
  }

  homeEditableFields.forEach((field) => {
    setHomeFieldEditable(field, shouldEdit);
  });

  homeResizeHandles.forEach((handle) => {
    handle.classList.toggle("hidden", !shouldEdit);
  });

  if (!options.silent) {
    renderDashboardEditorToolbar();
  }
}

async function loadHomePageSettings() {
  let rawSettings = cloneHomePageSettings(DEFAULT_HOME_PAGE_SETTINGS);
  let updatedAt = null;

  if (supabaseClient) {
    try {
      const response = await withTimeout(
        supabaseClient
          .from("home_page_settings")
          .select("config_json, updated_at")
          .eq("id", "dashboard")
          .maybeSingle(),
        "Anasayfa ayarlarini yukleme"
      );

      if (response.error) {
        throw response.error;
      }

      if (response.data && response.data.config_json) {
        rawSettings = response.data.config_json;
        updatedAt = response.data.updated_at || null;
      }
    } catch (error) {
      console.warn("Anasayfa ayarlari Supabase'den okunamadi:", error.message);
      rawSettings = readJson(LOCAL_HOME_PAGE_SETTINGS_KEY, DEFAULT_HOME_PAGE_SETTINGS);
    }
  } else {
    rawSettings = readJson(LOCAL_HOME_PAGE_SETTINGS_KEY, DEFAULT_HOME_PAGE_SETTINGS);
  }

  commitHomePageSettingsStore(rawSettings, updatedAt);
}

async function saveHomePageSettings() {
  if (!isAdminUser()) {
    return;
  }

  const nextSettings = collectHomePageSettingsFromDom();
  const activeVariant = currentResponsiveLayoutVariant || getResponsiveLayoutVariant();
  const nextStore = mergeResponsiveSettingsVariant(homePageSettingsStore, DEFAULT_HOME_PAGE_SETTINGS, sanitizeHomePageSettings, activeVariant, nextSettings);
  dashboardSaveButton.disabled = true;
  dashboardSaveButton.textContent = "Kaydediliyor...";

  try {
    if (supabaseClient) {
      const response = await withTimeout(
        supabaseClient
          .from("home_page_settings")
          .upsert({
            id: "dashboard",
            config_json: nextStore,
            updated_at: new Date().toISOString()
          })
          .select("config_json, updated_at")
          .single(),
        "Anasayfa ayarlarini kaydetme"
      );

      if (response.error) {
        throw response.error;
      }

      commitHomePageSettingsStore(response.data?.config_json || nextStore, response.data?.updated_at || new Date().toISOString());
    } else {
      writeJson(LOCAL_HOME_PAGE_SETTINGS_KEY, nextStore);
      commitHomePageSettingsStore(nextStore);
    }

    setHomePageEditMode(false, { restoreSaved: false });
  } catch (error) {
    console.warn("Anasayfa ayarlari kaydedilemedi:", error.message);
    writeJson(LOCAL_HOME_PAGE_SETTINGS_KEY, nextStore);
    commitHomePageSettingsStore(nextStore);
    setHomePageEditMode(false, { restoreSaved: false });
    window.alert("Ortak kayit alinamadi. Ayarlar bu tarayicida kaydedildi.");
  } finally {
    dashboardSaveButton.disabled = false;
    dashboardSaveButton.textContent = "Kaydet";
    renderDashboardEditorToolbar();
  }
}

function startHomePageResize(event) {
  if (!homePageEditMode) {
    return;
  }

  const handle = event.target.closest("[data-home-resize]");
  const card = handle ? handle.closest("[data-home-card]") : null;
  const cardId = card ? card.dataset.homeCard : null;
  if (!card || !cardId) {
    return;
  }

  event.preventDefault();
  const rect = card.getBoundingClientRect();
  homePageResizeState = {
    pointerId: event.pointerId,
    card,
    cardId,
    startX: event.clientX,
    startY: event.clientY,
    startHeight: rect.height,
    startSpan: Number(card.dataset.homeColSpan) || 1
  };

  handle.setPointerCapture(event.pointerId);
  document.addEventListener("pointermove", onHomePageResizeMove);
  document.addEventListener("pointerup", stopHomePageResize);
  document.addEventListener("pointercancel", stopHomePageResize);
}

function onHomePageResizeMove(event) {
  if (!homePageResizeState) {
    return;
  }

  const deltaY = event.clientY - homePageResizeState.startY;
  const nextHeight = Math.max(homePageResizeState.cardId === "hero" ? 200 : 120, Math.min(520, homePageResizeState.startHeight + deltaY));
  homePageResizeState.card.style.minHeight = Math.round(nextHeight) + "px";

  if (homePageResizeState.cardId !== "hero" && homeDashboardGrid) {
    const styles = window.getComputedStyle(homeDashboardGrid);
    const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
    const columnWidth = (homeDashboardGrid.clientWidth - gap * 3) / 4;
    const currentWidth = Math.max(columnWidth, homePageResizeState.startSpan * columnWidth + (homePageResizeState.startSpan - 1) * gap + (event.clientX - homePageResizeState.startX));
    const span = Math.max(1, Math.min(4, Math.round((currentWidth + gap) / (columnWidth + gap))));
    homePageResizeState.card.dataset.homeColSpan = String(span);
    homePageResizeState.card.style.gridColumn = "span " + span;
  }
}

function stopHomePageResize(event) {
  if (!homePageResizeState) {
    return;
  }

  if (event && event.pointerId !== undefined && event.pointerId !== homePageResizeState.pointerId) {
    return;
  }

  homePageResizeState = null;
  document.removeEventListener("pointermove", onHomePageResizeMove);
  document.removeEventListener("pointerup", stopHomePageResize);
  document.removeEventListener("pointercancel", stopHomePageResize);
}

function initializeHomePageEditor() {
  applyHomePageSettings(DEFAULT_HOME_PAGE_SETTINGS);
  renderDashboardEditorToolbar();
  ensureEditableBoxHandles(homeBoxFields, "home");
  homeResizeHandles.forEach((handle) => {
    handle.addEventListener("pointerdown", startHomePageResize);
  });
}

function sanitizeAboutPageSettings(input) {
  const nextSettings = cloneHomePageSettings(DEFAULT_ABOUT_PAGE_SETTINGS);
  const incoming = input && typeof input === "object" ? input : {};
  const incomingText = incoming.text && typeof input.text === "object" ? input.text : {};
  const incomingCards = incoming.cards && typeof input.cards === "object" ? input.cards : {};
  const incomingBoxes = incoming.boxes && typeof input.boxes === "object" ? input.boxes : {};

  Object.keys(nextSettings.text).forEach((field) => {
    const fallback = nextSettings.text[field];
    const nextValue = typeof incomingText[field] === "string" ? repairPossiblyBrokenText(incomingText[field]) : "";
    nextSettings.text[field] = nextValue || fallback;
  });

  Object.keys(nextSettings.cards).forEach((cardId) => {
    const fallback = nextSettings.cards[cardId];
    const candidate = incomingCards[cardId] || {};
    nextSettings.cards[cardId].minHeight = Math.round(Math.max(58, Math.min(640, Number(candidate.minHeight) || fallback.minHeight)));
  });

  Object.keys(nextSettings.boxes).forEach((boxId) => {
    nextSettings.boxes[boxId] = sanitizeResizableBox(incomingBoxes[boxId], nextSettings.boxes[boxId], { minWidth: 120, maxWidth: 820, minHeight: 34, maxHeight: 320 });
  });

  return nextSettings;
}

function applyAboutPageSettings(settings) {
  aboutPageSettings = sanitizeAboutPageSettings(settings);

  aboutEditableFields.forEach((field) => {
    const key = field.dataset.aboutField;
    if (!key || !(key in aboutPageSettings.text)) {
      return;
    }
    field.textContent = aboutPageSettings.text[key];
  });

  aboutCards.forEach((card) => {
    const cardId = card.dataset.aboutCard;
    const cardSettings = aboutPageSettings.cards[cardId];
    if (!cardSettings) {
      return;
    }
    card.style.minHeight = cardSettings.minHeight + "px";
  });

  aboutBoxFields.forEach((box) => {
    const boxId = box.dataset.aboutBox;
    const boxSettings = aboutPageSettings.boxes[boxId];
    if (!boxSettings) {
      return;
    }
    box.style.display = "block";
    box.style.width = boxSettings.width + "px";
    box.style.maxWidth = "none";
    box.style.minHeight = boxSettings.height + "px";
    box.style.height = boxSettings.height + "px";
    box.dataset.boxX = String(boxSettings.x || 0);
    box.dataset.boxY = String(boxSettings.y || 0);
    box.style.transform = "translate(" + (boxSettings.x || 0) + "px, " + (boxSettings.y || 0) + "px)";
  });
}

function collectAboutPageSettingsFromDom() {
  const nextSettings = cloneHomePageSettings(DEFAULT_ABOUT_PAGE_SETTINGS);

  aboutEditableFields.forEach((field) => {
    const key = field.dataset.aboutField;
    if (!key) {
      return;
    }

    const nextValue = readEditableFieldText(field);
    if (nextValue) {
      nextSettings.text[key] = nextValue;
    }
  });

  aboutCards.forEach((card) => {
    const cardId = card.dataset.aboutCard;
    const currentCard = nextSettings.cards[cardId];
    if (!currentCard) {
      return;
    }
    currentCard.minHeight = Math.round(card.getBoundingClientRect().height);
  });

  aboutBoxFields.forEach((box) => {
    const boxId = box.dataset.aboutBox;
    const currentBox = nextSettings.boxes[boxId];
    if (!currentBox) {
      return;
    }
    const rect = box.getBoundingClientRect();
    currentBox.width = Math.round(rect.width);
    currentBox.height = Math.round(rect.height);
    currentBox.x = Number(box.dataset.boxX || 0);
    currentBox.y = Number(box.dataset.boxY || 0);
  });

  return sanitizeAboutPageSettings(nextSettings);
}

function setAboutFieldEditable(field, editable) {
  if (!field) {
    return;
  }
  if (editable) {
    field.setAttribute("contenteditable", "plaintext-only");
    field.setAttribute("spellcheck", "false");
    field.classList.add("about-field-editable");
  } else {
    field.removeAttribute("contenteditable");
    field.removeAttribute("spellcheck");
    field.classList.remove("about-field-editable");
  }
}

function setAboutPageEditMode(nextMode, options = {}) {
  const allowEdit = isAdminUser();
  const shouldEdit = Boolean(nextMode && allowEdit);
  if (shouldEdit && homePageEditMode) {
    setHomePageEditMode(false, { restoreSaved: true, silent: true });
  }
  aboutPageEditMode = shouldEdit;

  if (!shouldEdit && options.restoreSaved !== false && aboutPageSettings) {
    applyAboutPageSettings(aboutPageSettings);
  }

  if (aboutPageRoot) {
    aboutPageRoot.classList.toggle("is-editing", shouldEdit);
  }

  aboutEditableFields.forEach((field) => {
    setAboutFieldEditable(field, shouldEdit);
  });

  aboutResizeHandles.forEach((handle) => {
    handle.classList.toggle("hidden", !shouldEdit);
  });

  if (!options.silent) {
    renderDashboardEditorToolbar();
  }
}

async function loadAboutPageSettings() {
  let rawSettings = cloneHomePageSettings(DEFAULT_ABOUT_PAGE_SETTINGS);
  let updatedAt = null;

  if (supabaseClient) {
    try {
      const response = await withTimeout(
        supabaseClient.from("home_page_settings").select("config_json, updated_at").eq("id", "about").maybeSingle(),
        "Hakkimizda ayarlarini yukleme"
      );
      if (response.error) {
        throw response.error;
      }
      if (response.data && response.data.config_json) {
        rawSettings = response.data.config_json;
        updatedAt = response.data.updated_at || null;
      }
    } catch (error) {
      console.warn("Hakkimizda ayarlari okunamadi:", error.message);
      rawSettings = readJson(LOCAL_HOME_PAGE_SETTINGS_KEY + "-about", DEFAULT_ABOUT_PAGE_SETTINGS);
    }
  } else {
    rawSettings = readJson(LOCAL_HOME_PAGE_SETTINGS_KEY + "-about", DEFAULT_ABOUT_PAGE_SETTINGS);
  }

  commitAboutPageSettingsStore(rawSettings, updatedAt);
}

async function saveAboutPageSettings() {
  if (!isAdminUser()) {
    return;
  }

  const nextSettings = collectAboutPageSettingsFromDom();
  const activeVariant = currentResponsiveLayoutVariant || getResponsiveLayoutVariant();
  const nextStore = mergeResponsiveSettingsVariant(aboutPageSettingsStore, DEFAULT_ABOUT_PAGE_SETTINGS, sanitizeAboutPageSettings, activeVariant, nextSettings);
  dashboardSaveButton.disabled = true;
  dashboardSaveButton.textContent = "Kaydediliyor...";

  try {
    if (supabaseClient) {
      const response = await withTimeout(
        supabaseClient.from("home_page_settings").upsert({
          id: "about",
          config_json: nextStore,
          updated_at: new Date().toISOString()
        }).select("config_json, updated_at").single(),
        "Hakkimizda ayarlarini kaydetme"
      );
      if (response.error) {
        throw response.error;
      }

      commitAboutPageSettingsStore(response.data?.config_json || nextStore, response.data?.updated_at || new Date().toISOString());
    } else {
      writeJson(LOCAL_HOME_PAGE_SETTINGS_KEY + "-about", nextStore);
      commitAboutPageSettingsStore(nextStore);
    }

    setAboutPageEditMode(false, { restoreSaved: false });
  } catch (error) {
    console.warn("Hakkimizda ayarlari kaydedilemedi:", error.message);
    writeJson(LOCAL_HOME_PAGE_SETTINGS_KEY + "-about", nextStore);
    commitAboutPageSettingsStore(nextStore);
    setAboutPageEditMode(false, { restoreSaved: false });
    window.alert("Ortak kayit alinamadi. Hakkimizda ayarlari bu tarayicida saklandi.");
  } finally {
    dashboardSaveButton.disabled = false;
    dashboardSaveButton.textContent = "Kaydet";
    renderDashboardEditorToolbar();
  }
}

function startAboutPageResize(event) {
  if (!aboutPageEditMode) {
    return;
  }

  const handle = event.target.closest("[data-about-resize]");
  const card = handle ? handle.closest("[data-about-card]") : null;
  const cardId = card ? card.dataset.aboutCard : null;
  if (!card || !cardId) {
    return;
  }

  event.preventDefault();
  const rect = card.getBoundingClientRect();
  aboutPageResizeState = {
    pointerId: event.pointerId,
    card,
    cardId,
    startY: event.clientY,
    startHeight: rect.height
  };

  handle.setPointerCapture(event.pointerId);
  document.addEventListener("pointermove", onAboutPageResizeMove);
  document.addEventListener("pointerup", stopAboutPageResize);
  document.addEventListener("pointercancel", stopAboutPageResize);
}

function onAboutPageResizeMove(event) {
  if (!aboutPageResizeState) {
    return;
  }
  const deltaY = event.clientY - aboutPageResizeState.startY;
  const nextHeight = Math.max(58, Math.min(640, aboutPageResizeState.startHeight + deltaY));
  aboutPageResizeState.card.style.minHeight = Math.round(nextHeight) + "px";
}

function stopAboutPageResize(event) {
  if (!aboutPageResizeState) {
    return;
  }
  if (event && event.pointerId !== undefined && event.pointerId !== aboutPageResizeState.pointerId) {
    return;
  }
  aboutPageResizeState = null;
  document.removeEventListener("pointermove", onAboutPageResizeMove);
  document.removeEventListener("pointerup", stopAboutPageResize);
  document.removeEventListener("pointercancel", stopAboutPageResize);
}

function initializeAboutPageEditor() {
  applyAboutPageSettings(DEFAULT_ABOUT_PAGE_SETTINGS);
  ensureEditableBoxHandles(aboutBoxFields, "about");
  aboutResizeHandles.forEach((handle) => {
    handle.addEventListener("pointerdown", startAboutPageResize);
  });
}

function subscribeAboutPageSettings() {
  if (!supabaseClient || aboutPageSettingsChannel) {
    return;
  }

  try {
    aboutPageSettingsChannel = supabaseClient
      .channel("line-online-about-page-settings")
      .on("postgres_changes", { event: "*", schema: "public", table: "home_page_settings" }, (payload) => {
        const nextRow = payload.new || payload.old;
        if (!nextRow || nextRow.id !== "about") {
          return;
        }
        if (payload.new && payload.new.config_json) {
          commitAboutPageSettingsStore(payload.new.config_json, payload.new.updated_at || null);
        } else {
          loadAboutPageSettings();
        }
      })
      .subscribe();
  } catch (error) {
    console.warn("Hakkimizda realtime baglantisi kurulamad?:", error.message);
  }
}

function subscribeToHomePageSettings() {
  if (!supabaseClient || homePageSettingsChannel) {
    return;
  }

  try {
    homePageSettingsChannel = supabaseClient
      .channel("line-online-home-page-settings")
      .on("postgres_changes", { event: "*", schema: "public", table: "home_page_settings" }, (payload) => {
        const nextRow = payload.new || payload.old;
        if (!nextRow || nextRow.id !== "dashboard") {
          return;
        }

        if (payload.new && payload.new.config_json) {
          commitHomePageSettingsStore(payload.new.config_json, payload.new.updated_at || null);
        } else {
          loadHomePageSettings();
        }
      })
      .subscribe();
  } catch (error) {
    console.warn("Anasayfa ayarlari icin realtime baglanti kurulamadi:", error.message);
  }
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

async function upsertAppUser(user, options = {}) {
  if (!supabaseClient || !user?.id) {
    return false;
  }

  try {
    const shouldPreserveRoles = options.allowRoleOverwrite !== true;
    const shouldPreserveModeration = options.allowModerationOverwrite !== true;
    const existingRecord =
      shouldPreserveRoles || shouldPreserveModeration
        ? await fetchAppUserRecord(user.id)
        : null;
    const resolvedRoleIds =
      shouldPreserveRoles && existingRecord
        ? normalizeRoleIds(existingRecord.role_ids || existingRecord.role_id, existingRecord.role_id || user.roleId || DEFAULT_MEMBER_ROLE_ID)
        : normalizeRoleIds(user.roleIds || user.roleId, user.roleId || DEFAULT_MEMBER_ROLE_ID);
    const resolvedRoleId = getPrimaryRoleIdFromRoleIds(
      resolvedRoleIds,
      (shouldPreserveRoles && existingRecord ? existingRecord.role_id : user.roleId) || DEFAULT_MEMBER_ROLE_ID
    );
    const resolvedMuted = shouldPreserveModeration && existingRecord ? Boolean(existingRecord.is_muted) : Boolean(user.isMuted);
    const resolvedBanned = shouldPreserveModeration && existingRecord ? Boolean(existingRecord.is_banned) : Boolean(user.isBanned);

    const { error } = await withTimeout(
      supabaseClient.from("app_users").upsert({
        id: user.id,
        display_name: user.displayName,
        role_id: resolvedRoleId,
        role_ids: resolvedRoleIds,
        is_guest: Boolean(user.isGuest ?? user.is_guest ?? resolvedRoleIds.includes("guest")),
        avatar_image: user.avatarImage || null,
        is_muted: resolvedMuted,
        is_banned: resolvedBanned,
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
          role_id: getPrimaryRoleIdFromRoleIds(user.roleIds || user.roleId, user.roleId || DEFAULT_MEMBER_ROLE_ID),
          role_ids: normalizeRoleIds(user.roleIds || user.roleId, user.roleId || DEFAULT_MEMBER_ROLE_ID),
          is_guest: Boolean(user.isGuest ?? normalizeRoleIds(user.roleIds || user.roleId, user.roleId || DEFAULT_MEMBER_ROLE_ID).includes("guest")),
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

function upsertDirectoryUser(user) {
  if (!user?.id) {
    return;
  }

  const roleIds = normalizeRoleIds(user.roleIds || user.role_id || user.roleId, user.roleId || user.role_id || "student");
  const primaryRoleId = getPrimaryRoleIdFromRoleIds(roleIds, user.roleId || user.role_id || "student");
  const nextRecord = {
    id: user.id,
    display_name: user.displayName || user.display_name || user.name || "Isimsiz Uye",
    role_id: primaryRoleId,
    role_ids: roleIds,
    is_guest: Boolean(user.isGuest ?? user.is_guest ?? roleIds.includes("guest")),
    is_muted: Boolean(user.isMuted ?? user.is_muted),
    is_banned: Boolean(user.isBanned ?? user.is_banned),
    is_online: Boolean(user.isOnline ?? user.is_online),
    last_seen: user.lastSeen || user.last_seen || new Date().toISOString(),
    avatar_image: user.avatarImage || user.avatar_image || null,
    created_at: user.createdAt || user.created_at || new Date().toISOString()
  };

  const existingIndex = directoryUsers.findIndex((member) => member.id === nextRecord.id);
  if (existingIndex >= 0) {
    directoryUsers[existingIndex] = {
      ...directoryUsers[existingIndex],
      ...nextRecord
    };
  } else {
    directoryUsers.push(nextRecord);
  }
}

async function resolveMemberAuthState(userId, fallback = {}) {
  const storedProfile = await getStoredUserProfile(userId);
  const roleIds = normalizeRoleIds(
    fallback.roleIds || storedProfile.roleIds || storedProfile.roleId || fallback.roleId || "student",
    storedProfile.roleId || fallback.roleId || "student"
  );
  const roleId = getPrimaryRoleIdFromRoleIds(roleIds, storedProfile.roleId || fallback.roleId || "student");

  return {
    userId,
    displayName: fallback.displayName || fallback.name || "Line Uyesi",
    roleId,
    roleIds,
    avatarImage: fallback.avatarImage ?? storedProfile.avatarImage ?? null,
    isMuted: Boolean(storedProfile.isMuted),
    isBanned: Boolean(storedProfile.isBanned)
  };
}

async function activateDirectorySession(options = {}) {
  const roleIds = normalizeRoleIds(options.roleIds || options.roleId, options.roleId || "student");
  const primaryRoleId = getPrimaryRoleIdFromRoleIds(roleIds, options.roleId || "student");
  const isGuest = roleIds.includes("guest") || options.mode === "guest";

  upsertDirectoryUser({
    id: options.userId,
    displayName: options.displayName,
    roleId: primaryRoleId,
    roleIds,
    isGuest,
    isMuted: options.isMuted,
    isBanned: options.isBanned,
    isOnline: true,
    avatarImage: options.avatarImage || null,
    lastSeen: new Date().toISOString()
  });

  finishAuth(options.displayName, primaryRoleId, {
    mode: options.mode || (isGuest ? "guest" : "member"),
    userId: options.userId,
    roleIds,
    isMuted: options.isMuted,
    isBanned: options.isBanned,
    avatarImage: options.avatarImage || null
  });
}

async function ensureGuestDirectoryRecord(guestId, guestName, isOnline = true) {
  if (!guestId || !guestName) {
    return false;
  }

  const saved = await upsertAppUser({
    id: guestId,
    displayName: guestName,
    roleId: "guest",
    roleIds: ["guest"],
    avatarImage: null,
    isOnline
  });

  if (saved) {
    return true;
  }

  if (!supabaseConfig.url || !supabaseConfig.anonKey || typeof fetch !== "function") {
    return false;
  }

  try {
    const endpoint = `${supabaseConfig.url}/rest/v1/app_users?on_conflict=id`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        apikey: supabaseConfig.anonKey,
        Authorization: `Bearer ${supabaseConfig.anonKey}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=minimal"
      },
      body: JSON.stringify([{
        id: guestId,
        display_name: guestName,
        role_id: "guest",
        role_ids: ["guest"],
        is_guest: true,
        is_online: isOnline,
        last_seen: new Date().toISOString()
      }])
    });

    return response.ok;
  } catch (error) {
    console.warn("Misafir dizin kaydi REST fallback ile de basarisiz:", error.message);
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
        .select("role_id, role_ids, is_muted, is_banned, avatar_image")
        .eq("id", userId)
        .maybeSingle(),
      "Kullanici profilini okuma"
    );

    if (error) {
      throw error;
    }

    return {
      roleId: data?.role_id || null,
      roleIds: normalizeRoleIds(data?.role_ids || data?.role_id, data?.role_id || "student"),
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
          .select("role_id, role_ids")
          .eq("id", userId)
          .maybeSingle(),
        "Kullanici rolunu okuma"
      );

      if (fallbackError) {
        throw fallbackError;
      }

      return {
        roleId: data?.role_id || null,
        roleIds: normalizeRoleIds(data?.role_ids || data?.role_id, data?.role_id || "student"),
        ...getUserModeration(userId)
      };
    } catch (fallbackError) {
      console.warn("Kullanici rolu okunamadi:", fallbackError.message);
      return getUserModeration(userId);
    }
  }
}

async function fetchAppUserRecord(userId) {
  if (!supabaseClient || !userId) {
    return null;
  }

  try {
    const { data, error } = await withTimeout(
      supabaseClient
        .from("app_users")
        .select("id, display_name, role_id, role_ids, is_guest, is_muted, is_banned, is_online, last_seen, avatar_image, created_at")
        .eq("id", userId)
        .maybeSingle(),
      "Kullanici kaydini dogrulama"
    );

    if (error) {
      throw error;
    }

    return data || null;
  } catch (error) {
    console.warn("Kullanici kaydi geri okunamadi:", error.message);
    return null;
  }
}

function syncAuthStateFromDirectoryRecord(record) {
  if (!record?.id || !authState.userId || record.id !== authState.userId || authState.mode === "visitor") {
    return;
  }

  const nextRoleIds = normalizeRoleIds(record.role_ids || record.roleId || record.role_id, record.role_id || authState.roleId || DEFAULT_MEMBER_ROLE_ID);
  const nextRoleId = getPrimaryRoleIdFromRoleIds(nextRoleIds, record.role_id || authState.roleId || DEFAULT_MEMBER_ROLE_ID);
  const nextMuted = Boolean(record.is_muted ?? record.isMuted);
  const nextBanned = Boolean(record.is_banned ?? record.isBanned);
  const nextAvatar = record.avatar_image || record.avatarImage || null;
  const currentRoleIds = normalizeRoleIds(authState.roleIds || authState.roleId, authState.roleId || DEFAULT_MEMBER_ROLE_ID);
  const roleChanged = nextRoleId !== authState.roleId || JSON.stringify(nextRoleIds) !== JSON.stringify(currentRoleIds);
  const moderationChanged = nextMuted !== Boolean(authState.isMuted) || nextBanned !== Boolean(authState.isBanned);
  const avatarChanged = nextAvatar !== (authState.avatarImage || null);

  if (!roleChanged && !moderationChanged && !avatarChanged) {
    return;
  }

  updateIdentity(record.display_name || authState.name, nextRoleId, {
    mode: authState.mode,
    userId: authState.userId,
    roleIds: nextRoleIds,
    isMuted: nextMuted,
    isBanned: nextBanned,
    avatarImage: nextAvatar,
    persist: true
  });
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
        .select("id, display_name, role_id, role_ids, is_guest, is_muted, is_banned, is_online, last_seen, avatar_image, created_at")
        .order("last_seen", { ascending: false, nullsFirst: false })
        .limit(500),
      "Uye dizinini yukleme"
    );

    if (error) {
      throw error;
    }

    directoryUsers = (data || []).filter((user) => !user.is_banned);
  } catch (error) {
    console.warn("Uye dizini yuklenemedi:", error.message);
  }

  if (authState.userId && authState.mode !== "visitor") {
    const currentUserRecord = directoryUsers.find((user) => user.id === authState.userId);
    if (currentUserRecord) {
      syncAuthStateFromDirectoryRecord(currentUserRecord);
    }

    upsertDirectoryUser({
      id: authState.userId,
      displayName: authState.name,
      roleId: authState.roleId,
      roleIds: authState.roleIds,
      isGuest: authState.mode === "guest",
      isMuted: authState.isMuted,
      isBanned: authState.isBanned,
      isOnline: true,
      avatarImage: authState.avatarImage || null,
      lastSeen: new Date().toISOString()
    });
  }

  renderMembersSidebar();
}

async function updatePresence(isOnline) {
  if (!supabaseClient || !authState.userId) {
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
      "Ã‡evrimiÃ§i durumu"
    );
  } catch (error) {
    console.warn("Ã‡evrimiÃ§i durumu kaydedilemedi:", error.message);
  }
}

function sendPresenceKeepalive(userId, isOnline) {
  if (!userId || !supabaseConfig.url || !supabaseConfig.anonKey || typeof fetch !== "function") {
    return;
  }

  try {
    const endpoint = `${supabaseConfig.url}/rest/v1/app_users?id=eq.${encodeURIComponent(userId)}`;
    fetch(endpoint, {
      method: "PATCH",
      headers: {
        apikey: supabaseConfig.anonKey,
        Authorization: `Bearer ${supabaseConfig.anonKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: JSON.stringify({
        is_online: isOnline,
        last_seen: new Date().toISOString()
      }),
      keepalive: true
    }).catch(() => {});
  } catch (error) {
    console.warn("Keepalive presence gonderilemedi:", error.message);
  }
}

function sendGuestDirectoryKeepalive(userId, displayName, isOnline = false) {
  if (!userId || !displayName || !supabaseConfig.url || !supabaseConfig.anonKey || typeof fetch !== "function") {
    return;
  }

  try {
    const endpoint = `${supabaseConfig.url}/rest/v1/app_users?on_conflict=id`;
    fetch(endpoint, {
      method: "POST",
      headers: {
        apikey: supabaseConfig.anonKey,
        Authorization: `Bearer ${supabaseConfig.anonKey}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=minimal"
      },
      body: JSON.stringify([{
        id: userId,
        display_name: displayName,
        role_id: "guest",
        role_ids: ["guest"],
        is_guest: true,
        is_online: isOnline,
        last_seen: new Date().toISOString()
      }]),
      keepalive: true
    }).catch(() => {});
  } catch (error) {
    console.warn("Misafir keepalive gonderilemedi:", error.message);
  }
}

function getRealtimePresencePayload() {
  return {
    id: authState.userId,
    name: authState.name,
    roleId: authState.roleId,
    roleIds: normalizeRoleIds(authState.roleIds || authState.roleId, authState.roleId || "student"),
    avatarImage: authState.avatarImage,
    isGuest: normalizeRoleIds(authState.roleIds || authState.roleId, authState.roleId || "student").includes("guest"),
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
    .map((presence) => {
      const roleIds = normalizeRoleIds(presence.roleIds || presence.roleId, presence.roleId || "guest");
      const primaryRoleId = getPrimaryRoleIdFromRoleIds(roleIds, presence.roleId || "guest");

      return {
        id: presence.id,
        name: presence.name || "Isimsiz Uye",
        roleId: primaryRoleId,
        roleIds,
        avatarImage: presence.avatarImage || null,
        avatarClass: roleIds.includes("guest") ? "amber" : "green",
        subtitle: getRoleLabelFromRoleIds(roleIds) || (roleIds.includes("guest") ? "Misafir" : "Uye"),
        isOnline: true,
        isGuest: Boolean(presence.isGuest),
        lastSeen: presence.onlineAt || new Date().toISOString()
      };
    });

  renderMembersSidebar();
  scheduleDirectoryRefresh(250);
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

function subscribeToDirectoryRealtime() {
  if (!supabaseClient || directoryRealtimeChannel) {
    return;
  }

  directoryRealtimeChannel = supabaseClient
    .channel("line-online-academy-users")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "app_users" },
      () => {
        scheduleDirectoryRefresh(80);
      }
    )
    .subscribe((status) => {
      if (status === "SUBSCRIBED") {
        scheduleDirectoryRefresh(80);
      }
    });
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
  if (!supabaseClient || messageRealtimeChannel) {
    return;
  }

  messageRealtimeChannel = supabaseClient
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
  if (!supabaseClient || directMessageRealtimeChannel) {
    return;
  }

  directMessageRealtimeChannel = supabaseClient
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

  if (VOICE_ROOM_LABELS[nextView]) {
    try {
      initializeVoiceRooms();
    } catch (error) {
      console.error("Sesli oda arayuzu acilamadi:", error);
    }
  }

  renderDashboardEditorToolbar();
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
  return window.matchMedia("(max-width: 920px), (max-width: 1024px) and (orientation: portrait)").matches;
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
  const roleIds = normalizeRoleIds(options.roleIds || roleId, roleId || "student");
  const primaryRoleId = getPrimaryRoleIdFromRoleIds(roleIds, roleId || "student");
  const role = getRole(primaryRoleId);
  const moderation = getUserModeration(options.userId);
  const savedProfile = readLocalProfile();
  const displayName = options.nameOverride || name || savedProfile.name || "Line Uyesi";
  const avatarImage = options.avatarImage ?? savedProfile.avatarImage ?? null;
  const session = {
    mode: options.mode || (roleIds.includes("guest") ? "guest" : "member"),
    name: displayName,
    roleId: primaryRoleId,
    roleIds,
    userId: options.userId || null,
    isMuted: options.isMuted ?? moderation.isMuted,
    isBanned: options.isBanned ?? moderation.isBanned,
    avatarImage
  };

  authState = {
    mode: session.mode,
    name: displayName,
    role: role ? role.name : "Uye",
    roleId: primaryRoleId,
    roleIds,
    userId: session.userId,
    isMuted: session.isMuted,
    isBanned: session.isBanned,
    avatarImage
  };

  ensureSidebarMember({
    id: authState.userId,
    name: authState.name,
    roleId: authState.roleId,
    roleIds: authState.roleIds,
    avatarImage: authState.avatarImage
  });

  profileName.textContent = displayName;
  profileRole.textContent = getRoleLabelFromRoleIds(roleIds) || (role ? role.name : "Uye");
  profileRole.style.color = role?.color || "";
  paintAvatar(profileAvatar, displayName, avatarImage, role?.color || "#f1a126");

  ensureLogoutButton();
  guestCard.classList.add("hidden");
  identityCard.classList.remove("hidden");

  if (authOpenButton) {
    authOpenButton.textContent = roleIds.includes("guest") ? "Misafir Aktif" : "Hesabim";
  }

  if (options.persist !== false) {
    saveSession(session);
  }

  refreshChatAdminControls();
  renderDashboardEditorToolbar();
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
    pruneLocalVoiceDirectoryMembership(authState.userId, voiceState.roomId);
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
  const roleIds = normalizeRoleIds(options.roleIds || roleId, roleId || "student");
  const primaryRoleId = getPrimaryRoleIdFromRoleIds(roleIds, roleId || "student");
  if (options.userId) {
    saveSession({
      mode: options.mode || (roleIds.includes("guest") ? "guest" : "member"),
      name,
      roleId: primaryRoleId,
      roleIds,
      userId: options.userId,
      isMuted: options.isMuted || false,
      isBanned: options.isBanned || false,
      avatarImage: options.avatarImage || null
    });
  }

  updateIdentity(name, primaryRoleId, { ...options, roleIds });
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
  const currentUserId = authState.userId;
  const currentUserName = authState.name;
  const currentRoleIds = normalizeRoleIds(authState.roleIds || authState.roleId, authState.roleId || "student");
  leaveVoiceRoom({ navigateToDashboard: false });
  untrackRealtimePresence();
  updatePresence(false);
  sendPresenceKeepalive(currentUserId, false);
  if (currentUserId && currentRoleIds.includes("guest")) {
    ensureGuestDirectoryRecord(currentUserId, currentUserName, false)
      .then(() => loadDirectoryUsers())
      .catch(() => {});
  }
  authState = {
    mode: "visitor",
    name: "Ziyaretci",
    role: "Ziyaretci",
    roleId: null,
    roleIds: [],
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
  renderDashboardEditorToolbar();
  const activePanel = document.querySelector(".view-panel.active");
  if (activePanel && !PUBLIC_VIEWS.has(activePanel.id)) {
    setActiveView("dashboard", "Anasayfa");
  }

  renderMembersSidebar();
  window.setTimeout(() => {
    loadDirectoryUsers();
  }, 250);
}

async function restoreSavedSession() {
  const savedSession = readSavedSession();
  if (!savedSession?.name || !savedSession.roleId || !savedSession.userId) {
    return false;
  }

  updateIdentity(savedSession.name, savedSession.roleId, {
    mode: savedSession.mode,
    userId: savedSession.userId,
    roleIds: savedSession.roleIds || [savedSession.roleId],
    isMuted: savedSession.isMuted,
    isBanned: savedSession.isBanned,
    avatarImage: savedSession.avatarImage,
    persist: false
  });

  upsertDirectoryUser({
    id: savedSession.userId,
    displayName: savedSession.name,
    roleId: savedSession.roleId,
    roleIds: savedSession.roleIds || [savedSession.roleId],
    isGuest: savedSession.mode === "guest",
    isMuted: savedSession.isMuted,
    isBanned: savedSession.isBanned,
    isOnline: true,
    avatarImage: savedSession.avatarImage || null,
    lastSeen: new Date().toISOString()
  });
  renderMembersSidebar();

  if (!supabaseClient) {
    return true;
  }

  try {
    const latestProfile = await getStoredUserProfile(savedSession.userId);
    const nextRoleIds = normalizeRoleIds(latestProfile.roleIds || latestProfile.roleId || savedSession.roleIds || savedSession.roleId, latestProfile.roleId || savedSession.roleId || "student");
    const nextRoleId = getPrimaryRoleIdFromRoleIds(nextRoleIds, latestProfile.roleId || savedSession.roleId || "student");
    const roleChanged = nextRoleId !== authState.roleId;
    const moderationChanged =
      Boolean(latestProfile.isMuted) !== Boolean(authState.isMuted) ||
      Boolean(latestProfile.isBanned) !== Boolean(authState.isBanned);
    const avatarChanged = (latestProfile.avatarImage || null) !== (authState.avatarImage || null);

    if (roleChanged || moderationChanged || avatarChanged) {
      updateIdentity(savedSession.name, nextRoleId, {
        mode: savedSession.mode,
        userId: savedSession.userId,
        roleIds: nextRoleIds,
        isMuted: latestProfile.isMuted,
        isBanned: latestProfile.isBanned,
        avatarImage: latestProfile.avatarImage || savedSession.avatarImage || null,
        persist: true
      });
    }

    return true;
  } catch (error) {
    console.warn("Kayitli oturum rolu guncellenemedi:", error.message);
    return true;
  }
}

async function bootstrapAuthSession() {
  const restored = await restoreSavedSession();

  if (!supabaseClient?.auth?.getSession) {
    return restored;
  }

  try {
    const { data, error } = await withTimeout(supabaseClient.auth.getSession(), "Oturum geri yukleme");
    if (error) {
      throw error;
    }

    const sessionUser = data?.session?.user;
    if (!sessionUser || authState.mode === "guest") {
      return restored;
    }

    const nextState = await resolveMemberAuthState(sessionUser.id, {
      displayName: sessionUser.user_metadata?.display_name || sessionUser.email?.split("@")[0] || authState.name || "Line Uyesi",
      roleId: authState.roleId || "student",
      roleIds: authState.roleIds || [authState.roleId || "student"],
      avatarImage: authState.avatarImage || null
    });

    await upsertAppUser({
      id: nextState.userId,
      displayName: nextState.displayName,
      roleId: nextState.roleId,
      roleIds: nextState.roleIds,
      avatarImage: nextState.avatarImage,
      isMuted: nextState.isMuted,
      isBanned: nextState.isBanned,
      isOnline: true
    });

    await activateDirectorySession({
      mode: "member",
      userId: nextState.userId,
      displayName: nextState.displayName,
      roleId: nextState.roleId,
      roleIds: nextState.roleIds,
      isMuted: nextState.isMuted,
      isBanned: nextState.isBanned,
      avatarImage: nextState.avatarImage
    });

    return true;
  } catch (error) {
    console.warn("Supabase oturumu geri yuklenemedi:", error.message);
    return restored;
  }
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
      roleIds: authState.roleIds,
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

async function findReusableGuestIdByName(guestName) {
  if (!supabaseClient || !guestName) {
    return null;
  }

  try {
    const { data, error } = await withTimeout(
      supabaseClient
        .from("app_users")
        .select("id, display_name, is_banned, last_seen")
        .eq("is_guest", true)
        .eq("display_name", guestName)
        .order("last_seen", { ascending: false, nullsFirst: false })
        .limit(5),
      "Misafir kaydi arama"
    );

    if (error) {
      throw error;
    }

    const reusableGuest = (data || []).find((user) => !user.is_banned);
    return reusableGuest?.id || null;
  } catch (error) {
    console.warn("Mevcut misafir kaydi aranirken hata:", error.message);
    return null;
  }
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
        roleIds: authState.roleIds,
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
    if (form.dataset.composerSending === "true") {
      return;
    }

    const panelId = form.dataset.composerView;
    const input = form.querySelector(".composer-input");
    const submitButton = form.querySelector(".composer-submit");
    if (!panelId || !input) {
      return;
    }

    form.dataset.composerSending = "true";
    if (submitButton) {
      submitButton.disabled = true;
    }

    try {
      const sent = await sendChannelMessage(panelId, input.value);
      if (sent) {
        input.value = "";
      }
    } finally {
      form.dataset.composerSending = "false";
      if (submitButton) {
        submitButton.disabled = false;
      }
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
  const localUsers = getAllMembers()
    .filter((member) => !member.bot)
    .map((member) => ({
      id: member.id,
      display_name: member.name,
      role_id: getPrimaryRoleIdFromRoleIds(member.roleIds || member.roleId, member.roleId || "student"),
      role_ids: normalizeRoleIds(member.roleIds || member.roleId, member.roleId || "student"),
      is_guest: normalizeRoleIds(member.roleIds || member.roleId, member.roleId || "student").includes("guest"),
      is_online: Boolean(member.isOnline),
      last_seen: member.lastSeen || null,
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
        .select("id, display_name, role_id, role_ids, is_guest, created_at, avatar_image, is_muted, is_banned, is_online, last_seen")
        .order("created_at", { ascending: false })
        .limit(500),
      "Uyeleri yukleme"
    );

    if (error) {
      throw error;
    }

    adminKnownUsers = (data || []).map((user) => ({
      ...user,
      avatarImage: user.avatar_image || null,
      isMuted: Boolean(user.is_muted),
      isBanned: Boolean(user.is_banned),
      isOnline: Boolean(user.is_online)
    }));
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

function renderRoleCheckboxes(selectedRoleIds, userId) {
  const selectedSet = new Set(getRoleIdsForMember({ roleIds: selectedRoleIds }));
  return getSortedRoles()
    .map((role) => `
      <label class="member-role-choice">
        <input type="checkbox" data-admin-user-role-toggle="${escapeHtml(userId)}" value="${escapeHtml(role.id)}" ${selectedSet.has(role.id) ? "checked" : ""} />
        <span>${escapeHtml(role.name)}</span>
      </label>
    `)
    .join("");
}

function renderAdminRolePills(roleIds) {
  return normalizeRoleIds(roleIds, DEFAULT_MEMBER_ROLE_ID)
    .map((roleId) => {
      const role = getRole(roleId);
      return `<span class="member-role-pill" style="--role-color: ${escapeHtml(role?.color || "#f1a126")}">${escapeHtml(role?.name || roleId)}</span>`;
    })
    .join("");
}

function renderAdminMemberStats(users) {
  if (!adminMemberStats) {
    return;
  }

  const total = users.length;
  const online = users.filter((user) => Boolean(user.isOnline ?? user.is_online)).length;
  const offline = Math.max(0, total - online);
  const banned = users.filter((user) => Boolean(user.isBanned ?? user.is_banned)).length;

  adminMemberStats.innerHTML = `
    <article class="admin-kpi">
      <span>Toplam Uye</span>
      <strong>${total}</strong>
    </article>
    <article class="admin-kpi is-online">
      <span>Cevrimici</span>
      <strong>${online}</strong>
    </article>
    <article class="admin-kpi is-offline">
      <span>Cevrimdisi</span>
      <strong>${offline}</strong>
    </article>
    <article class="admin-kpi is-danger">
      <span>Yasakli</span>
      <strong>${banned}</strong>
    </article>
  `;
}

function renderAdminUsers() {
  if (!adminUsersList) {
    return;
  }

  const sortedUsers = [...adminKnownUsers].sort((firstUser, secondUser) => {
    const firstBanned = Boolean(firstUser.isBanned ?? firstUser.is_banned);
    const secondBanned = Boolean(secondUser.isBanned ?? secondUser.is_banned);
    const firstOnline = Boolean(firstUser.isOnline ?? firstUser.is_online);
    const secondOnline = Boolean(secondUser.isOnline ?? secondUser.is_online);
    const firstPrimaryRole = getPrimaryRoleIdFromRoleIds(firstUser.role_ids || firstUser.role_id, firstUser.role_id || "student");
    const secondPrimaryRole = getPrimaryRoleIdFromRoleIds(secondUser.role_ids || secondUser.role_id, secondUser.role_id || "student");
    const firstRoleOrder = Number(getRole(firstPrimaryRole)?.order ?? 99);
    const secondRoleOrder = Number(getRole(secondPrimaryRole)?.order ?? 99);
    const firstSeen = getMemberRecency(firstUser);
    const secondSeen = getMemberRecency(secondUser);

    if (firstBanned !== secondBanned) {
      return firstBanned ? 1 : -1;
    }

    if (firstOnline !== secondOnline) {
      return firstOnline ? -1 : 1;
    }

    return firstRoleOrder - secondRoleOrder || secondSeen - firstSeen || String(firstUser.display_name || "").localeCompare(String(secondUser.display_name || ""), "tr");
  });

  renderAdminMemberStats(sortedUsers);

  if (!sortedUsers.length) {
    adminUsersList.innerHTML = '<p class="admin-muted">Henuz kayitli uye bulunamadi.</p>';
    return;
  }

  const searchTerm = (adminMemberSearchInput?.value || "").trim().toLocaleLowerCase("tr");
  const filteredUsers = searchTerm
    ? sortedUsers.filter((user) => {
        const roleLabel = getRoleLabelFromRoleIds(user.role_ids || user.role_id);
        const searchable = [user.display_name || "", user.id || "", roleLabel || ""].join(" ").toLocaleLowerCase("tr");
        return searchable.includes(searchTerm);
      })
    : sortedUsers;

  if (!filteredUsers.length) {
    adminUsersList.innerHTML = '<p class="admin-muted">Aramana uyan uye bulunamadi.</p>';
    return;
  }

  adminUsersList.innerHTML = filteredUsers
    .map((user) => {
      const moderation = {
        isMuted: user.isMuted ?? user.is_muted ?? false,
        isBanned: user.isBanned ?? user.is_banned ?? false
      };
      const roleIds = normalizeRoleIds(user.role_ids || user.role_id, user.role_id || "student");
      const primaryRoleId = getPrimaryRoleIdFromRoleIds(roleIds, user.role_id || "student");
      const primaryRole = getRole(primaryRoleId);
      const isOnline = Boolean(user.isOnline ?? user.is_online);
      const statusText = moderation.isBanned ? "Sunucudan atildi" : moderation.isMuted ? "Susturuldu" : (isOnline ? "Cevrimici" : "Cevrimdisi");
      const roleColor = getRoleColorFromRoleIds(roleIds);
      const avatarStyle = user.avatarImage
        ? `background: center / cover no-repeat url("${user.avatarImage}")`
        : `background: ${escapeHtml(roleColor)}`;

      return `
        <article class="member-admin-card ${moderation.isBanned ? "is-banned" : ""}">
          <div class="member-admin-main">
            <div class="member-admin-avatar" style='${avatarStyle}'>${user.avatarImage ? "" : escapeHtml((user.display_name || "U").slice(0, 1).toUpperCase())}</div>
            <div class="member-admin-meta">
              <div class="member-admin-topline">
                <strong>${escapeHtml(user.display_name || "Isimsiz Uye")}</strong>
                <span class="member-status">${statusText}</span>
              </div>
              <small>${escapeHtml(user.id)}${roleIds.includes("guest") ? " - Misafir" : ""}</small>
              <p class="member-role-summary">Ust rol: ${escapeHtml(primaryRole?.name || "Uye")}</p>
              <div class="member-role-pills">${renderAdminRolePills(roleIds)}</div>
            </div>
          </div>
          <div class="member-admin-controls">
            <div class="member-role-matrix">
              ${renderRoleCheckboxes(roleIds, user.id)}
            </div>
            <div class="member-admin-actions">
              <button class="member-action" type="button" data-user-mute="${escapeHtml(user.id)}">
                ${moderation.isMuted ? "Susturmayi Kaldir" : "Sustur"}
              </button>
              <button class="member-action danger" type="button" data-user-ban="${escapeHtml(user.id)}">
                ${moderation.isBanned ? "Geri Al" : "Sunucudan At"}
              </button>
              <button class="member-action ghost-danger" type="button" data-user-remove="${escapeHtml(user.id)}">
                Kalici Kaldir
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  adminUsersList.querySelectorAll("[data-admin-user-role-toggle]").forEach((checkbox) => {
    checkbox.addEventListener("change", async () => {
      const userId = checkbox.dataset.adminUserRoleToggle;
      const container = checkbox.closest(".member-role-matrix");
      const selectedRoleIds = Array.from(container.querySelectorAll("[data-admin-user-role-toggle]:checked")).map((input) => input.value);
      await assignUserRoles(userId, selectedRoleIds);
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

  adminUsersList.querySelectorAll("[data-user-remove]").forEach((button) => {
    button.addEventListener("click", () => {
      removeUserRecord(button.dataset.userRemove);
    });
  });
}

async function resetUsersExceptOwner() {
  const confirmed = window.confirm("Doğuş hesabı dışındaki tüm kullanıcı kayıtlarını sıfırlamak istiyor musun?");
  if (!confirmed) {
    return;
  }

  const removableUsers = adminKnownUsers.filter((user) => !isProtectedOwnerUser(user) && !user.bot);
  const removableIds = removableUsers.map((user) => user.id).filter(Boolean);

  if (!removableIds.length) {
    window.alert("Silinecek ek kullanici kaydi bulunamadi.");
    return;
  }

  adminKnownUsers = adminKnownUsers.filter((user) => !removableIds.includes(user.id));
  directoryUsers = directoryUsers.filter((user) => !removableIds.includes(user.id));
  livePresenceMembers = livePresenceMembers.filter((user) => !removableIds.includes(user.id));

  for (let index = ephemeralMembers.length - 1; index >= 0; index -= 1) {
    if (removableIds.includes(ephemeralMembers[index]?.id)) {
      ephemeralMembers.splice(index, 1);
    }
  }

  removableIds.forEach(removeUserModeration);

  if (authState.userId && removableIds.includes(authState.userId)) {
    resetIdentity();
  }

  if (supabaseClient) {
    try {
      const { error } = await withTimeout(
        supabaseClient
          .from("app_users")
          .delete()
          .in("id", removableIds),
        "Toplu uye sifirlama"
      );

      if (error) {
        throw error;
      }

      await withTimeout(
        supabaseClient
          .from("messages")
          .delete()
          .in("author_id", removableIds),
        "Toplu mesaj temizligi"
      ).catch(() => {});

      const dmFilters = removableIds
        .flatMap((id) => [`sender_id.eq.${id}`, `receiver_id.eq.${id}`])
        .join(",");

      if (dmFilters) {
        await withTimeout(
          supabaseClient
            .from("direct_messages")
            .delete()
            .or(dmFilters),
          "Toplu DM temizligi"
        ).catch(() => {});
      }
    } catch (error) {
      console.warn("Toplu uye sifirlama Supabase'de tamamlanamadi:", error.message);
      window.alert("Veritabani silme yetkisi eksik olabilir. Sana SQL de verecegim; bir kez calistirinca tam sifirlanir.");
    }
  }

  renderMembersSidebar();
  renderAdminUsers();
  scheduleDirectoryRefresh(120);
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

async function assignUserRoles(userId, roleIds) {
  const nextRoleIds = normalizeRoleIds(roleIds, "student");
  const primaryRoleId = getPrimaryRoleIdFromRoleIds(nextRoleIds, "student");

  adminKnownUsers = adminKnownUsers.map((user) => (
    user.id === userId ? { ...user, role_id: primaryRoleId, role_ids: nextRoleIds, is_guest: nextRoleIds.includes("guest") } : user
  ));

  [...members, ...ephemeralMembers].forEach((member) => {
    if (member.id === userId) {
      member.roleId = primaryRoleId;
      member.roleIds = nextRoleIds;
      member.subtitle = getRoleLabelFromRoleIds(nextRoleIds) || member.subtitle;
    }
  });

  directoryUsers = directoryUsers.map((user) => (
    user.id === userId ? { ...user, roleId: primaryRoleId, roleIds: nextRoleIds, role_id: primaryRoleId, role_ids: nextRoleIds, isGuest: nextRoleIds.includes("guest"), is_guest: nextRoleIds.includes("guest") } : user
  ));
  livePresenceMembers = livePresenceMembers.map((user) => (
    user.id === userId ? { ...user, roleId: primaryRoleId, roleIds: nextRoleIds, role_id: primaryRoleId, role_ids: nextRoleIds, isGuest: nextRoleIds.includes("guest"), is_guest: nextRoleIds.includes("guest") } : user
  ));

  if (authState.userId === userId) {
    updateIdentity(authState.name, primaryRoleId, {
      mode: authState.mode,
      userId: authState.userId,
      roleIds: nextRoleIds,
      avatarImage: authState.avatarImage,
      isMuted: authState.isMuted,
      isBanned: authState.isBanned
    });
  }

  if (supabaseClient) {
    try {
      const knownUser =
        adminKnownUsers.find((user) => user.id === userId) ||
        directoryUsers.find((user) => user.id === userId) ||
        members.find((user) => user.id === userId) ||
        ephemeralMembers.find((user) => user.id === userId) ||
        (authState.userId === userId
          ? {
              id: authState.userId,
              display_name: authState.name,
              avatar_image: authState.avatarImage || null,
              is_muted: authState.isMuted,
              is_banned: authState.isBanned
            }
          : null);

      const saved = await upsertAppUser({
        id: userId,
        displayName: knownUser?.display_name || knownUser?.displayName || knownUser?.name || "Line Uyesi",
        roleId: primaryRoleId,
        roleIds: nextRoleIds,
        isGuest: nextRoleIds.includes("guest"),
        avatarImage: knownUser?.avatar_image || knownUser?.avatarImage || null,
        isMuted: Boolean(knownUser?.is_muted ?? knownUser?.isMuted),
        isBanned: Boolean(knownUser?.is_banned ?? knownUser?.isBanned),
        isOnline: Boolean(knownUser?.is_online ?? knownUser?.isOnline ?? true)
      }, {
        allowRoleOverwrite: true,
        allowModerationOverwrite: true
      });

      if (!saved) {
        throw new Error("Rol kaydi dogrulanamadi.");
      }
    } catch (error) {
      console.warn("Supabase rol atamasi kaydedilemedi:", error.message);
    }
  }

  const confirmedRecord = await fetchAppUserRecord(userId);
  if (confirmedRecord) {
    adminKnownUsers = adminKnownUsers.map((user) => (
      user.id === userId
        ? {
            ...user,
            ...confirmedRecord,
            isMuted: Boolean(confirmedRecord.is_muted),
            isBanned: Boolean(confirmedRecord.is_banned),
            isOnline: Boolean(confirmedRecord.is_online),
            avatarImage: confirmedRecord.avatar_image || null
          }
        : user
    ));

    directoryUsers = directoryUsers.map((user) => (
      user.id === userId ? { ...user, ...confirmedRecord, roleId: confirmedRecord.role_id, roleIds: confirmedRecord.role_ids } : user
    ));

    if (authState.userId === userId) {
      syncAuthStateFromDirectoryRecord(confirmedRecord);
    }
  }

  if (authState.userId === userId) {
    saveSession({
      mode: authState.mode,
      name: authState.name,
      roleId: primaryRoleId,
      roleIds: nextRoleIds,
      userId: authState.userId,
      isMuted: authState.isMuted,
      isBanned: authState.isBanned,
      avatarImage: authState.avatarImage
    });
  }

  renderMembersSidebar();
  renderAdminUsers();
  scheduleDirectoryRefresh(60);
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

async function removeUserRecord(userId) {
  if (!userId) {
    return;
  }

  const user = adminKnownUsers.find((item) => item.id === userId) || findMemberById(userId);
  const displayName = user?.display_name || user?.name || "bu uye";
  const confirmed = window.confirm(`${displayName} kaydini listeden kalici olarak kaldirmak istiyor musun?`);

  if (!confirmed) {
    return;
  }

  if (authState.userId === userId) {
    resetIdentity();
  }

  adminKnownUsers = adminKnownUsers.filter((item) => item.id !== userId);
  directoryUsers = directoryUsers.filter((item) => item.id !== userId);
  livePresenceMembers = livePresenceMembers.filter((item) => item.id !== userId);

  const memberIndex = members.findIndex((item) => item.id === userId);
  if (memberIndex >= 0) {
    members.splice(memberIndex, 1);
  }

  for (let index = ephemeralMembers.length - 1; index >= 0; index -= 1) {
    if (ephemeralMembers[index]?.id === userId) {
      ephemeralMembers.splice(index, 1);
    }
  }

  Object.keys(voiceRoomDirectory).forEach((roomId) => {
    voiceRoomDirectory[roomId] = (voiceRoomDirectory[roomId] || []).filter((participant) => participant.id !== userId);
  });

  removeUserModeration(userId);

  if (supabaseClient) {
    try {
      const { error } = await withTimeout(
        supabaseClient
          .from("app_users")
          .delete()
          .eq("id", userId),
        "Uye kaydini kalici kaldirma"
      );

      if (error) {
        throw error;
      }

      await withTimeout(
        supabaseClient
          .from("messages")
          .delete()
          .eq("author_id", userId),
        "Uye mesajlarini temizleme"
      ).catch(() => {});

      await withTimeout(
        supabaseClient
          .from("direct_messages")
          .delete()
          .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`),
        "Uye DM kayitlarini temizleme"
      ).catch(() => {});
    } catch (error) {
      console.warn("Uye kaydi Supabase'den silinemedi:", error.message);
    }
  }

  renderSidebarVoiceMembers();
  renderMembersSidebar();
  renderAdminUsers();
  scheduleDirectoryRefresh(150);
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
  memberMessageButton.disabled = member.id === authState.userId || authState.mode === "visitor" || !hasPermission("send_messages");

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
  if (!member || !dmBackdrop) {
    return;
  }

  if (authState.mode === "visitor") {
    openAuthModal("signin");
    return;
  }

  if (!hasPermission("send_messages")) {
    window.alert("Misafir hesaplar ozel mesaj gonderemez. Uye girisi yapman gerekiyor.");
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
  if (!dmInboxBackdrop) {
    return;
  }

  if (authState.mode === "visitor") {
    openAuthModal("signin");
    return;
  }

  if (!hasPermission("send_messages")) {
    window.alert("Misafir hesaplar ozel mesaj gonderemez. Uye girisi yapman gerekiyor.");
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

  if (!hasPermission("send_messages")) {
    window.alert("Bu rol ozel mesaj gonderemez.");
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
    if (isAnyPageEditorActive() && nextView !== getActiveEditablePageId()) {
      return;
    }
    const label = button.textContent.trim();

    if (isMobileLayout()) {
      closeMobileDrawers();
    }

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

viewJumpButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (isAnyPageEditorActive()) {
      return;
    }

    const nextView = button.dataset.viewJump;
    if (!nextView) {
      return;
    }
    const targetButton = Array.from(channelButtons).find((item) => item.dataset.view === nextView);
    const nextLabel = targetButton?.textContent.trim() || button.textContent.trim();

    if (!PUBLIC_VIEWS.has(nextView) && authState.mode === "visitor") {
      pendingView = nextView;
      openAuthModal("signin");
      return;
    }

    if (!canAccessView(nextView)) {
      showAccessDenied(nextLabel);
      return;
    }

    setActiveView(nextView, nextLabel);
  });
});

if (dashboardEditToggle) {
  dashboardEditToggle.addEventListener("click", () => {
    if (!isAdminUser()) {
      return;
    }

    const activeEditablePage = getActiveEditablePageId();
    if (activeEditablePage === "about") {
      if (aboutPageEditMode) {
        setAboutPageEditMode(false, { restoreSaved: true });
      } else {
        setAboutPageEditMode(true, { restoreSaved: false });
      }
      return;
    }

    if (homePageEditMode) {
      setHomePageEditMode(false, { restoreSaved: true });
      return;
    }

    setHomePageEditMode(true, { restoreSaved: false });
  });
}

if (dashboardSaveButton) {
  dashboardSaveButton.addEventListener("click", () => {
    const activeEditablePage = getActiveEditablePageId();
    if (activeEditablePage === "about") {
      saveAboutPageSettings();
      return;
    }
    saveHomePageSettings();
  });
}

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

if (adminMemberSearchInput) {
  adminMemberSearchInput.addEventListener("input", renderAdminUsers);
}

if (adminResetUsersButton) {
  adminResetUsersButton.addEventListener("click", resetUsersExceptOwner);
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

  if (!supabaseClient) {
    window.alert("Supabase baglantisi bulunamadi.");
    return;
  }

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
    window.alert("Giris sirasinda Supabase'e ulasilamadi.");
    return;
  }

  const { data, error } = response;

  if (error || !data?.user?.id) {
    const message = error?.message || "Kullanici bulunamadi.";
    const extra = /confirm|verified|email/i.test(message)
      ? " E-posta dogrulamasi aciksa Supabase once mail onayi bekler."
      : "";
    window.alert(`Giris basarisiz: ${message}${extra}`);
    return;
  }

  const nextState = await resolveMemberAuthState(data.user.id, {
    displayName: data.user.user_metadata?.display_name || email.split("@")[0] || "Line Uyesi",
    roleId: DEFAULT_MEMBER_ROLE_ID
  });

  if (nextState.isBanned) {
    window.alert("Bu hesap sunucudan atildigi icin giris yapamaz.");
    return;
  }

  await upsertAppUser({
    id: nextState.userId,
    displayName: nextState.displayName,
    roleId: nextState.roleId,
    roleIds: nextState.roleIds,
    avatarImage: nextState.avatarImage,
    isMuted: nextState.isMuted,
    isBanned: nextState.isBanned,
    isOnline: true
  });

  await activateDirectorySession({
    mode: "member",
    userId: nextState.userId,
    displayName: nextState.displayName,
    roleId: nextState.roleId,
    roleIds: nextState.roleIds,
    isMuted: nextState.isMuted,
    isBanned: nextState.isBanned,
    avatarImage: nextState.avatarImage
  });
});

document.querySelector('[data-auth-panel="signup"]').addEventListener("submit", async (event) => {
  event.preventDefault();
  const signUpDisplayName = signUpName.value.trim() || "Yeni Uye";
  const signUpEmail = document.getElementById("signup-email").value.trim().toLowerCase();
  const signUpPassword = document.getElementById("signup-password").value.trim();

  if (!supabaseClient) {
    window.alert("Supabase baglantisi bulunamadi.");
    return;
  }

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
    window.alert("Uye olma sirasinda Supabase'e ulasilamadi.");
    return;
  }

  const { data, error } = response;

  if (error || !data?.user?.id) {
    window.alert(`Uye olma basarisiz: ${error?.message || "Kullanici olusturulamadi."}`);
    return;
  }

  let activeUser = data.user;
  let activeSession = data.session;

  if (!activeSession) {
    try {
      const signInResponse = await withTimeout(
        supabaseClient.auth.signInWithPassword({
          email: signUpEmail,
          password: signUpPassword
        }),
        "Yeni uye oturumu"
      );

      if (signInResponse.error || !signInResponse.data?.user?.id) {
        throw signInResponse.error || new Error("Oturum acilamadi.");
      }

      activeUser = signInResponse.data.user;
      activeSession = signInResponse.data.session;
    } catch (signInError) {
      window.alert("Uyelik olustu ama otomatik giris acilamadi. Supabase Authentication ayarlarinda Confirm email kapatilirse uye olur olmaz giris yapar.");
      return;
    }
  }

  const nextState = await resolveMemberAuthState(activeUser.id, {
    displayName: signUpDisplayName,
    roleId: DEFAULT_MEMBER_ROLE_ID
  });

  await upsertAppUser({
    id: nextState.userId,
    displayName: nextState.displayName,
    roleId: nextState.roleId,
    roleIds: nextState.roleIds,
    avatarImage: nextState.avatarImage,
    isMuted: nextState.isMuted,
    isBanned: nextState.isBanned,
    isOnline: true
  });

  await activateDirectorySession({
    mode: "member",
    userId: nextState.userId,
    displayName: nextState.displayName,
    roleId: nextState.roleId,
    roleIds: nextState.roleIds,
    isMuted: nextState.isMuted,
    isBanned: nextState.isBanned,
    avatarImage: nextState.avatarImage
  });
});

guestForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const guestName = guestNameInput.value.trim();
  if (!guestName) {
    guestNameInput.focus();
    return;
  }

  const reusableGuestId = await findReusableGuestIdByName(guestName);
  const guestId = reusableGuestId || `guest-${slugify(guestName)}-${Date.now()}`;

  upsertDirectoryUser({
    id: guestId,
    displayName: guestName,
    roleId: "guest",
    roleIds: ["guest"],
    isGuest: true,
    isOnline: true,
    lastSeen: new Date().toISOString()
  });

  await activateDirectorySession({
    mode: "guest",
    userId: guestId,
    displayName: guestName,
    roleId: "guest",
    roleIds: ["guest"],
    isMuted: false,
    isBanned: false,
    avatarImage: null
  });

  if (supabaseClient) {
    ensureGuestDirectoryRecord(guestId, guestName, true)
      .then(() => loadDirectoryUsers())
      .catch((error) => console.warn("Misafir dizin kaydi basarisiz:", error.message));
  }
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

if (openGuestPriorityButton) {
  openGuestPriorityButton.addEventListener("click", openGuestInline);
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
    leaveVoiceRoom({ navigateToDashboard: true });
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
  mobileChannelsToggle.addEventListener("click", () => {
    if (isAnyPageEditorActive()) {
      return;
    }
    toggleMobileDrawer("channels");
  });
}

if (mobileMembersToggle) {
  mobileMembersToggle.addEventListener("click", () => {
    if (isAnyPageEditorActive()) {
      return;
    }
    toggleMobileDrawer("members");
  });
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
  if (!isMobileLayout() || isAnyPageEditorActive()) {
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
  if (!isMobileLayout() || isAnyPageEditorActive() || !mobileGestureStart) {
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
  const startedInScrollable = mobileGestureStart.target?.closest(".channel-groups, .members-scroll-area, .voice-chat-stream, .dm-messages, .dm-inbox-list");
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

document.addEventListener("pointerdown", startEditableBoxDrag);

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
initializeHomePageEditor();
initializeAboutPageEditor();
controlState = readControlState();
renderQuickControls();
updateSearchVisibility("dashboard");
currentResponsiveLayoutVariant = getResponsiveLayoutVariant();
loadNotificationState();
loadHomePageSettings();
loadAboutPageSettings();
subscribeToHomePageSettings();
subscribeAboutPageSettings();
loadDmUnreadState();
renderNotifications();
renderDmBadge();
initializeSidebarOrder();
titleCaseSidebarLabels();
function safelyRunStartupTask(label, task) {
  try {
    return task();
  } catch (error) {
    console.error(label + " baslatilamadi:", error);
    return null;
  }
}

safelyRunStartupTask("Uye paneli", renderMembersSidebar);
safelyRunStartupTask("Sesli oda arayuzu", initializeVoiceRooms);
initializeTextChannelComposers();
initializeStaticMessageControls();
(async () => {
  try {
    await bootstrapAuthSession();
  } catch (error) {
    console.error("Oturum geri yuklenemedi:", error);
  }

  try {
    await loadDirectoryUsers();
  } catch (error) {
    console.error("Uye dizini yuklenemedi:", error);
  }

  safelyRunStartupTask("Uye paneli yenileme", renderMembersSidebar);
  safelyRunStartupTask("Sesli oda yenileme", initializeVoiceRooms);
})();
if (supabaseClient?.auth?.onAuthStateChange) {
  supabaseClient.auth.onAuthStateChange(async (event, session) => {
    if ((event === "SIGNED_IN" || event === "INITIAL_SESSION") && session?.user && authState.mode !== "guest") {
      const nextState = await resolveMemberAuthState(session.user.id, {
        displayName: session.user.user_metadata?.display_name || session.user.email?.split("@")[0] || authState.name || "Line Uyesi",
        roleId: DEFAULT_MEMBER_ROLE_ID
      });

      if (!nextState.isBanned) {
        upsertDirectoryUser({
          id: nextState.userId,
          displayName: nextState.displayName,
          roleId: nextState.roleId,
          roleIds: nextState.roleIds,
          isOnline: true,
          avatarImage: nextState.avatarImage,
          isMuted: nextState.isMuted,
          isBanned: nextState.isBanned,
          lastSeen: new Date().toISOString()
        });

        updateIdentity(nextState.displayName, nextState.roleId, {
          mode: "member",
          userId: nextState.userId,
          roleIds: nextState.roleIds,
          isMuted: nextState.isMuted,
          isBanned: nextState.isBanned,
          avatarImage: nextState.avatarImage,
          persist: true
        });
      }
    }
  });
}
loadLocalMessages();
loadPersistedMessages();
subscribeToMessages();
subscribeToDirectMessages();
subscribeToPresence();
subscribeToDirectoryRealtime();
subscribeToVoiceRoomDirectory();

window.setInterval(() => {
  if (authState.userId) {
    loadDmInbox();
  }
}, 15000);

window.setInterval(() => {
  if (supabaseClient) {
    loadDirectoryUsers();
  }
}, 10000);

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && supabaseClient) {
    scheduleDirectoryRefresh(120);
  }
});

window.addEventListener("focus", () => {
  if (supabaseClient) {
    scheduleDirectoryRefresh(120);
  }
});

window.addEventListener("resize", scheduleResponsiveLayoutRefresh);
window.addEventListener("orientationchange", scheduleResponsiveLayoutRefresh);

document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    clearVoiceFullscreenUiTimer();
    voiceFullscreenRoomId = null;
    voiceFullscreenUiVisible = true;
    applyVoiceFullscreenUi();
    return;
  }

  voiceFullscreenUiVisible = true;
  applyVoiceFullscreenUi(voiceFullscreenRoomId || voiceState.roomId);
  scheduleVoiceFullscreenUiHide(voiceFullscreenRoomId || voiceState.roomId);
});

window.addEventListener("beforeunload", () => {
  const currentUserId = authState.userId;
  const currentUserName = authState.name;
  const currentRoleIds = normalizeRoleIds(authState.roleIds || authState.roleId, authState.roleId || "student");
  leaveVoiceRoom({ navigateToDashboard: false });
  untrackRealtimePresence();
  updatePresence(false);
  sendPresenceKeepalive(currentUserId, false);
  if (currentUserId && currentRoleIds.includes("guest")) {
    sendGuestDirectoryKeepalive(currentUserId, currentUserName, false);
  }
});

window.addEventListener("pagehide", () => {
  const currentUserId = authState.userId;
  const currentUserName = authState.name;
  const currentRoleIds = normalizeRoleIds(authState.roleIds || authState.roleId, authState.roleId || "student");
  if (!currentUserId) {
    return;
  }
  sendPresenceKeepalive(currentUserId, false);
  if (currentRoleIds.includes("guest")) {
    sendGuestDirectoryKeepalive(currentUserId, currentUserName, false);
  }
});





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
const guestCard = document.getElementById("guest-card");
const identityCard = document.getElementById("identity-card");
const guestCardSignin = document.getElementById("guest-card-signin");
const guestCardSignup = document.getElementById("guest-card-signup");
const membersGroups = document.getElementById("members-groups");

let authState = {
  mode: "visitor",
  name: "Ziyaretci",
  role: "Ziyaretci",
  roleId: null,
  userId: null
};

let pendingView = null;

const roles = [
  {
    id: "admin",
    name: "Admin",
    permissions: ["view_channels", "send_messages", "join_voice"],
    system: true
  },
  {
    id: "student",
    name: "Ogrenci",
    permissions: ["view_channels", "send_messages", "join_voice"],
    system: true
  },
  {
    id: "guest",
    name: "Misafir",
    permissions: ["view_channels", "send_messages", "join_voice"],
    system: true
  },
  {
    id: "assistant",
    name: "Asistan",
    permissions: ["view_channels"],
    system: true
  }
];

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

function getRole(roleId) {
  return roles.find((role) => role.id === roleId);
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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

function getAllMembers() {
  return [...members, ...ephemeralMembers];
}

function getVisibleMembers() {
  return getAllMembers().map((member) => {
    const role = getRole(member.roleId);
    const group =
      role?.id === "admin"
        ? "Yonetici"
        : member.bot
          ? "Asistan"
          : "Cevrim Ici";

    return {
      ...member,
      group,
      roleName: role ? role.name : "Rol Yok",
      subtitle: member.bot ? member.subtitle : member.subtitle || (role ? role.name : "Uye")
    };
  });
}

function renderMembersSidebar() {
  const grouped = getVisibleMembers().reduce((accumulator, member) => {
    accumulator[member.group] ||= [];
    accumulator[member.group].push(member);
    return accumulator;
  }, {});

  const order = ["Yonetici", "Asistan", "Cevrim Ici"];

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

          return `
            <div class="member-row">
              <div class="avatar ${member.avatarClass}">${initials}</div>
              <div class="member-meta">
                <strong>${member.name}</strong>
                <p class="${subtitleClass}">${member.subtitle}</p>
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

function setActiveView(nextView, label) {
  channelButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.view === nextView);
  });

  viewPanels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === nextView);
  });

  if (label) {
    viewTitle.textContent = label;
  }
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

  authState = {
    mode: options.mode || (roleId === "guest" ? "guest" : "member"),
    name,
    role: role ? role.name : "Uye",
    roleId,
    userId: options.userId || null
  };

  profileName.textContent = name;
  profileRole.textContent = role ? role.name : "Uye";
  profileAvatar.textContent = name.slice(0, 1).toUpperCase();

  guestCard.classList.add("hidden");
  identityCard.classList.remove("hidden");

  if (authOpenButton) {
    authOpenButton.textContent = roleId === "guest" ? "Misafir Aktif" : "Hesabim";
  }

  renderMembersSidebar();
}

function finishAuth(name, roleId, options = {}) {
  updateIdentity(name, roleId, options);
  closeAuthModal();

  if (pendingView) {
    const nextButton = Array.from(channelButtons).find((button) => button.dataset.view === pendingView);
    const nextLabel = nextButton ? nextButton.textContent.trim() : "";
    const targetView = pendingView;
    pendingView = null;
    setActiveView(targetView, nextLabel);
  }
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
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const panelId = form.dataset.composerView;
      const panel = document.getElementById(panelId);
      const input = form.querySelector(".composer-input");
      const chat = panel.querySelector(".channel-chat");

      if (authState.mode === "visitor") {
        pendingView = panelId;
        openAuthModal("signin");
        return;
      }

      if (!hasPermission("send_messages")) {
        window.alert("Bu rol mesaj gonderme yetkisine sahip degil.");
        return;
      }

      const text = input.value.trim();
      if (!text) {
        return;
      }

      const timestamp = new Date().toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit"
      });

      const currentRole = getRole(authState.roleId);
      const roleLabel = currentRole ? currentRole.name : "Uye";
      const chatMessage = document.createElement("article");
      chatMessage.className = "chat-message";
      chatMessage.innerHTML = `
        <div class="avatar red">${authState.name.slice(0, 1).toUpperCase()}</div>
        <div class="chat-body">
          <div class="chat-meta">
            <strong>${authState.name}</strong>
            <span>Bugun ${timestamp}</span>
          </div>
          <p>${text}</p>
          <small class="chat-role-note">${roleLabel}</small>
        </div>
      `;

      chat.appendChild(chatMessage);
      input.value = "";
      chat.scrollIntoView({ block: "end", behavior: "smooth" });
    });
  });
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

    if (!hasPermission("view_channels") && !PUBLIC_VIEWS.has(nextView)) {
      window.alert("Bu alana erismek icin uygun role sahip degilsin.");
      return;
    }

    setActiveView(nextView, label);
  });
});

authTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setAuthTab(tab.dataset.authTab);
  });
});

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

document.querySelector('[data-auth-panel="signin"]').addEventListener("submit", (event) => {
  event.preventDefault();

  const email = signInEmail.value.trim().toLowerCase();
  const password = signInPassword.value.trim();

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

document.querySelector('[data-auth-panel="signup"]').addEventListener("submit", (event) => {
  event.preventDefault();
  const signUpDisplayName = signUpName.value.trim() || "Yeni Uye";
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

guestForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const guestName = guestNameInput.value.trim();
  if (!guestName) {
    guestNameInput.focus();
    return;
  }

  const guestId = `guest-${slugify(guestName)}-${Date.now()}`;
  ephemeralMembers.push({
    id: guestId,
    name: guestName,
    roleId: "guest",
    avatarClass: "amber",
    group: "Cevrim Ici",
    subtitle: "Misafir"
  });

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

renderMembersSidebar();
initializeTextChannelComposers();

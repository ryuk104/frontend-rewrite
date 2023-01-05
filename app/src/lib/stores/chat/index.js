import { writable } from "svelte/store";
import { browser } from "$app/environment";

export const callRejected = writable(false);
export const callAnswered = writable(false);
export const showIncomingCallModal = writable(false);
export const showVideoChatModal = writable(false);
export const latitude = writable(null);
export const longitude = writable(null);
export const peer = writable(null);
export const peerInstance = writable(null);
export const showSearchBar = writable(false);
export const myDoc = writable(null);
export const userAvatar = writable(null);
export const todos = writable([]);
export const lastMsgArray = writable([]);
export const lastMsg = writable(false);
export const foundUser = writable({});
export const isSignout = writable(false);
export const selectedMembers = writable([]);
export const selectedUser = writable(null);
export const selectedUserReady = writable(false);
export const currentContact = writable(null);
export const showAddPeopleModal = writable(false);
export const showAboutModal = writable(false);
export const showToolModalMobile = writable(false);
export const showSettingsModalMobile = writable(false);
export const widthLessthan1200 = writable(false);
export const widthLessthan1000 = writable(false);
export const isAudioPlayed = writable(false);
export const showAddFriendModal = writable(false);
export const showAddGroupModal = writable(false);
export const showAddRoomModal = writable(false);
export const allUsers = writable([]);
export const privateChat = writable(true);
export const groupChat = writable(false);
export const publicChat = writable(false);
export const showActionMenu = writable(false);
export const storedImageURL = writable(null);
export const storedPictureURL = writable(null);
export const showImagePreviewModal = writable(false);
export const showSidebarMenu = writable(true);
export const selectedUsernameMatched = writable(false);
export const showGradientMenu = writable(false);
export const showThemeMenu = writable(false);
export const showMapModal = writable(false);
export const disabled = writable(false);
export const selectedFile = writable(null);
export const file = writable(null);
export const background = writable(null);
export const showToolModal = writable(false);
export const isMobile = writable(false);
export const message = writable("");
export const showEmojiMenu = writable(false);
export const leftSide = writable(null);
export const audioURL = writable(null);
export const audioBlob = writable(null);
export const audioConfirmed = writable(null);
export const audioFile = writable(null);
export const pictureConfirmed = writable(false);
export const videoStream = writable(null);
export const pictureBlob = writable(null);
export const showAudioPlayerModal = writable(false);
export const showAudioRecordingModal = writable(false);
export const showPhotoModal = writable(false);
export const showCameraPreviewModal = writable(false);
export const pictureFile = writable(null);
export const pictureURI = writable(null);
export const active = writable(false);
export const profileUpdated = writable(false);
export const loginState = writable(false);
export const user = writable(null);
export const userLogout = writable(false);
export const userDocCreated = writable(false);
export const userList = writable([]);
export const mobile = writable(false);
export const phone = writable(false);
export const keyword = writable("");
export const activeItem = writable(null);
export const loginFormShow = writable(false);
export const profileUpdate = writable(false);
export const showPicModal = writable(false);
export const showThemeModal = writable(false);
export const showCameraModal = writable(false);
export const showSettingsModal = writable(false);
export const showBgSettingsModal = writable(false);
export const leftsideState = writable(true);
export const rightsideState = writable(true);
export const menubarState = writable(true);
export const showSearchFriendModal = writable(false);
export const peerId = writable('')
export const remotePeerId = writable('')

export const msgCount = writable(0)
// export const msgCount = writable(
//   browser && (localStorage.getItem("message count: ") || 0)
// );
// msgCount.subscribe(
//   (val) => browser && localStorage.setItem("message count: ", val)
// );

export const userEmail = writable(
  browser && (localStorage.getItem("user email") || null)
);
userEmail.subscribe(
  (val) => browser && localStorage.setItem("user email", val)
);

export const initial = writable(
  browser && (localStorage.getItem("initial") || false)
);
initial.subscribe((val) => browser && localStorage.setItem("initial", val));

export const isLogout = writable(
  browser && (localStorage.getItem("logout state") || false)
);
isLogout.subscribe(
  (val) => browser && localStorage.setItem("logout state", val)
);

export const currentSelectedUser = writable(
  (browser && localStorage.getItem("selected user")) || {}
);
currentSelectedUser.subscribe(
  (val) => browser && localStorage.setItem("selected user", val)
);

export const selectedUsername = writable(
  (browser && localStorage.getItem("selected user name")) || {}
);
selectedUsername.subscribe(
  (val) => browser && localStorage.setItem("selected user name", val)
);

export const selectedUseremail = writable(
  (browser && localStorage.getItem("selected user email")) || {}
);
selectedUseremail.subscribe(
  (val) => browser && localStorage.setItem("selected user email", val)
);

export const imageTitle = writable(
  browser && (localStorage.getItem("image title") || "Default")
);
imageTitle.subscribe(
  (val) => browser && localStorage.setItem("image title", val)
);

export const bgOpacity = writable(
  browser && (localStorage.getItem("backround opacity") || 0.06)
);
bgOpacity.subscribe(
  (val) => browser && localStorage.setItem("backround opacity", val)
);

export const bgColor = writable(
  browser && (localStorage.getItem("backround color") || "#ebebeb")
);
bgColor.subscribe(
  (val) => browser && localStorage.setItem("backround color", val)
);

export const imageURL = writable(
  browser &&
    (localStorage.getItem("image url") ||
      "https://previews.123rf.com/images/dimapolie/dimapolie1808/dimapolie180800074/106049740-patr%C3%B3n-de-la-escuela-del-vector-escuela-de-fondo-sin-fisuras-ilustraci%C3%B3n-vectorial.jpg")
);
imageURL.subscribe((val) => browser && localStorage.setItem("image url", val));

export const selectedImg = writable(
  browser && localStorage.getItem("selected image")
);
selectedImg.subscribe(
  (val) => browser && localStorage.setItem("selected image", val)
);

export const loginUserEmail = writable(
  browser && JSON.parse(localStorage.getItem("login user email"))
);
loginUserEmail.subscribe(
  (val) =>
    browser && localStorage.setItem("login user email", JSON.stringify(val))
);

export const loggedinUser = writable(
  // browser && JSON.parse(localStorage.getItem("login user") || null)
  browser && JSON.parse(localStorage.getItem("login user")) || null
);
loggedinUser.subscribe(
  (val) => browser && localStorage.setItem("login user", JSON.stringify(val))
);

export const connection = writable(
  browser && localStorage.getItem("internet connection")
);
connection.subscribe(
  (val) => browser && localStorage.setItem("internet connection", val)
);

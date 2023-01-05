import * as api from '$lib/api';


//import type { RequestParams } from "../../types";


/*
type Fetch = (input: RequestInfo, init?: RequestInit) => Promise<Response>;
type APIResponse = {
	body?: {
		[key: string]: string;
		value: string;
	};
	status: number;
	ok: boolean;
};
*/
//defaults.baseURL = BASE_URL;
//defaults.withCredentials = true;

export async function signupUser(fetch: Fetch, params?: RequestParams): Promise<APIResponse> {
	// Turn Object's Key-Value pairs into string
	const urlParams = queryParams(params);
	// Make fetch call
	const response = await fetch(`/api/auth/register`, {
		method: "POST",
		body: urlParams,

		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
	});
	const data = await response
	// If request fails, return error.
	if (!response.ok) {
		return {
			body: response.statusText,
			status: response.status,
			ok: response.ok,
		};
	}

	// Return successful response.
	return {
		body: data,
		status: response.status,
		ok: response.ok,
	};
}


/*
export async function logoutUser(fetch: Fetch, params?: RequestParams): Promise<APIResponse> {
	// Turn Object's Key-Value pairs into string
	const urlParams = queryParams(params);
	// Make fetch call
	const response = await fetch(`/api/auth/register`, {
		method: "POST",
		body: urlParams,

		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
	});
	const data = await response
	// If request fails, return error.
	if (!response.ok) {
		return {
			body: response.statusText,
			status: response.status,
			ok: response.ok,
		};
	}

	// Return successful response.
	return {
		body: data,
		status: response.status,
		ok: response.ok,
	};
}
*/


export const logoutUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await api.get("/api/auth/logout");
    if (res.data.type === "success") {
      localStorage.removeItem("token");
    }
    return res.data;
  } catch (error) {
    console.log(error);
    return;
  }
};



export const getUserById = async (userId) => {
  try {
    const res = await api.get(`/api/user/${userId}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const editUser = async (userId, data) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    const res = await api.put(`/api/user/${userId}`, data);
    return res.data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const deleteUser = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    const res = await api.del(`/api/user/${userId}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getUsers = async ({ page = 0, limit = 5 }) => {
  try {
    const res = await api.get(`/api/user?page=${page}&limit=${limit}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const searchUsers = async (search) => {
  try {
    const res = await api.get(`/api/user?search=${search}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const followUser = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    const res = await api.put(`/api/user/${userId}/follow`);
    return res.data;
  } catch (error) {
    return;
  }
};

export const unFollowuser = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    const res = await api.put(`/api/user/${userId}/unfollow`);
    return res.data;
  } catch (error) {
    return;
  }
};

export function reportError(error: any, val: string) {
  return api
    .post(`error_report`, {
      json: {
        message: error.message,
        name: error.name,
        stack: error.stack,
        user_message: val,
        url: location.href,
      },
    })
    
}


export function getUser() {
  return api.get(`user`)
}

export function updateUser(
  data: UpdateUserRequest,
  socketID: string
) {
  return api.patch(`user`, { json: { ...data, socketID } })   
}

export function changeStatus(status: number) {
  return api.post(`settings/status`, {
      json: { status },
    })
}

export function changeCustomStatus(CustomStatus: string) {
  return api.post(`settings/custom-status`, {
      json: { custom_status: CustomStatus },
    })  
}

export function registerFCM(token: string) {
  return api.post(`devices`, {
      json: { token },
    })
}

export function addRole(
  serverID: string,
  id: string,
  roleID: string
) {
  return api.patch(`servers/${serverID}/members/${id}/roles/${roleID}`)
}

export function removeRole(
  serverID: string,
  id: string,
  roleID: string
) {
  return api.delete(`servers/${serverID}/members/${id}/roles/${roleID}`)
}

export function deleteAccount(password: string) {
  return api.delete(`user/delete-account`, { json: { password } })
}
export function editHtmlProfile(html: string) {
  return api.post(`user/html-profile`, { json: { html } })
}

export function getHtmlProfile(): Promise<jsonHtml[]> {
  return api
    .get(`user/html-profile`)
    .json()
    .then((result: any) => {
      const jsonString = unzipAlt(result);
      return jsonString ? JSON.parse(jsonString) : null;
    });
}
export function deleteHtmlProfile() {
  return api.delete(`user/html-profile`)
}

export interface ReturnedUser {
  user: User & UserExtra;
  commonServersArr: string[];
  commonFriendsArr: string[];
}
interface UserExtra {
  about_me: AboutMe;
  created: number;
  badges?: number;
  createdBy?: User;
  htmlProfile?: jsonHtml;
}
export interface jsonHtml {
  tag: string;
  attributes: { [key: string]: string };
  content: (jsonHtml | string)[];
}
export interface AboutMe {
  about_me: string;
  age: string;
  continent: string;
  country: string;
  gender: string;
  name: string;
}

export function fetchUser(id: string): Promise<ReturnedUser> {
  return api.get(`user/${id}`)
}

export function updateSurvay(data: AboutMe) {
  return api.put(`user/survey`, { json: data })
}

export function logout() {
  return api.delete(`user/logout`)
}

// move to relationshipService.ts
export function blockUser(id: string) {
  return api.post(`user/block`, { json: { id } })
}

export function UnblockUser(id: string) {
  return api.delete(`user/block`, { json: { id } })
}


//------------------------------ Post -----------------------------

export const createPost = async (data) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    const res = await api.post(`/api/post/`, data);
    return res.data;
  } catch (error) {
    return;
  }
};

export const updatePost = async (postId, data) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    const res = await api.put(`/api/post/${postId}`, data);
    return res.data;
  } catch (error) {
    return;
  }
};

export const getAllPosts = async ({ page = 0, limit = 5 }) => {
  try {
    const res = await api.get(`/api/post?page=${page}&limit=${limit}`);

    return res.data;
  } catch (error) {
    return;
  }
};

export const explorePosts = async ({ page = 0, limit = 5 }) => {
  try {
    const token = localStorage.getItem("token");

    const res = await api.get(
      `/api/post/explore?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    return;
  }
};

export const deletePost = async (postId) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    const res = await api.del(`/api/post/${postId}`);
    return res.data;
  } catch (error) {
    return;
  }
};

export const likePost = async (postId) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    const res = await api.put(`/api/post/${postId}/like`);
    return res.data;
  } catch (error) {
    return;
  }
};

export const disLike = async (postId) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    const res = await api.put(`/api/post/${postId}/unlike`);
    return res.data;
  } catch (error) {
    return;
  }
};

//------------------------------ Admin -----------------------------

export interface Stats {
  userCount: number;
  serverCount: number;
  messageCount: number;
}
export function fetchStats() {
  return api.get(`admin/stats`)
}
export interface ExpandedUser {
  avatar: string | null;
  created: number;
  email: string;
  id: string;
  ip: string;
  tag: string;
  username: string;
  banner?: string;
  banned?: boolean;
  bot?: boolean;
}
export function fetchRecentUsers(){
  return api.get(`admin/users/recent`)
}

enum ActionType {
  SUSPEND_USER = "SUSPEND_USER",
  UNSUSPEND_USER = "UNSUSPEND_USER",
  BAN_IP = "BAN_IP",
  UNBAN_IP = "UNBAN_IP",
}
export interface Action {
  action: ActionType;
  reason?: string;
  user?: User;
  admin: User;
  bannedIP?: string;
  date: number;
}

export function fetchRecentActions() {
  return api.get(`admin/actions/recent`)
}
/*
export function searchUsers(value: string){
  return api
    .get(`admin/users/search/${encodeURIComponent(value)}`)
    
}
*/
export function searchUsersByIP(user_id: string){
  return api.get(`admin/users/ip/${encodeURIComponent(user_id)}`)
    
}
export function suspendUser(
  id: string,
  password: string,
  reason: string
) {
  return api.post(`admin/users/${id}/suspend`, { json: { password, reason } })
    
}
export function unsuspendUser(
  id: string,
  password: string,
  removeIPBan: boolean
) {
  return api
    .delete(`admin/users/${id}/suspend`, { json: { password, removeIPBan } })
    
}

//------------------------------ Bot -----------------------------

export function getBots() {
  return api.get("bots")
}

export function createBot() {
  return api.post("bots")
}

export function inviteBot(
  botID: string,
  serverID: string,
  permissions = 0
) {
  return api.put(`bots/${botID}/servers/${serverID}`, { json: { permissions } })
}

export function deleteBot(botID: string) {
  return api.delete(`bots/${botID}`)
}

export function getBot(
  botID: string,
  getToken?: boolean,
  getServers?: boolean
) {
  const searchParams: [string, string][] = [];
  if (getToken) {
    searchParams.push(["token", getToken.toString()]);
  }
  if (getServers) {
    searchParams.push(["myservers", getServers.toString()]);
  }
  return api.get(`bots/${botID}`, { searchParams })
}

export function updateBot(botID: string, data: any) {
  // idk why post... it should be patch. dumb fishie/pankeki/supertig-whatever.
  return api.post(`bots/${botID}`, { json: data })
}

export function resetBotToken(botID: string) {
  return api.post(`bots/${botID}/reset-token`)
}

export function getBotCommands(botIDs: string[]) {
  let params = "";
  for (let i = 0; i < botIDs.length; i++) {
    const id = botIDs[i];
    if (params === "") {
      params = `0=${id}`;
      continue;
    }
    params += `&${i}=${id}`;
  }
  return api.get("bots/commands", { searchParams: params })
}


//------------------------------ Channel -----------------------------


interface Response {
  channel: ReturnedDmChannel;
  status: boolean;
}
interface ReturnedDmChannel {
  type: ChannelType
  channelId: string;
  recipients: User[];
}
export function getChannelByUserId(id: string): Promise<Response> {
  return api.post(`channels/${id}`)
}

export function muteServerChannel(
  serverID: string,
  channelId: string
) {
  return api.put(`servers/${serverID}/channels/${channelId}/mute`)
}
export function unmuteServerChannel(
  serverID: string,
  channelId: string
) {
  return api
    .delete(`servers/${serverID}/channels/${channelId}/mute`)
    
}

export function updateServerChannel(
  channelId: string,
  serverID: string,
  data: any
) {
  return api
    .patch(`servers/${serverID}/channels/${channelId}`, { json: data })
    
}
export function deleteServerChannel(
  channelId: string,
  serverID: string
) {
  return api.delete(`servers/${serverID}/channels/${channelId}`)
}
export function createServerChannel(serverID: string, name: string, type = 1) {
  return api
    .put(`servers/${serverID}/channels`, {
      json: { name, type },
    })
    
}
export function updateServerChannelPosition(
  serverID: string,
  channelIDArr: string[],
  category?: null | {id: string | null, channelId: string}
) {
  return api
    .put(`servers/${serverID}/channels/position`, {
      json: { channel_position: channelIDArr, category },
    })
    
}
export function hideDMChannel(channelId: string) {
  return api.delete(`channels/${channelId}`)
}


//------------------------------ Messaging -----------------------------

interface ResponseFetch {
  channelId: string;
  messages: Message[];
}
interface ResponsePost {
  tempID: string;
  messageCreated: Message;
}
export function fetchMessages(channelId: string): Promise<ResponseFetch> {
  return api.get(`messages/channels/${channelId}`)
}
export function fetchMessagesContinue(
  channelId: string,
  continueMessageID: string
): Promise<ResponseFetch> {
  return api
    .get(`messages/channels/${channelId}?continue=${continueMessageID}`)
    
}
export function deleteMessages(
  channelId: string,
  messageIds: string[]
): Promise<ResponseFetch> {
  return api
    .delete(`messages/${channelId}/bulk`, { json: { ids: messageIds } })
    
}
export function fetchMessagesBefore(
  channelId: string,
  beforeMessageID: string
): Promise<ResponseFetch> {
  return api
    .get(`messages/channels/${channelId}?before=${beforeMessageID}`)
    
}
export function fetchMessagesAround(
  channelId: string,
  messageID: string
): Promise<ResponseFetch> {
  return api
    .get(`messages/channels/${channelId}?around=${messageID}`)
    
}

export interface PostReaction {
  emojiID?: string;
  gif?: boolean;
  unicode?: string;
}

export function addReaction(
  channelId: string,
  messageID: string,
  reaction: PostReaction
) {
  return api
    .post(`messages/${messageID}/channels/${channelId}/reactions`, {
      json: reaction,
    })
    
}
export function getReactedUsers(
  channelId: string,
  messageID: string,
  limit: number,
  emojiID?: string,
  unicode?: string
) {
  const searchParams: any = { limit };
  if (emojiID) {
    searchParams.emojiID = emojiID;
  } else {
    searchParams.unicode = unicode;
  }
  return api
    .get(`messages/${messageID}/channels/${channelId}/reactions/users`, {
      searchParams,
    })
    
}
export function removeReaction(
  channelId: string,
  messageID: string,
  reaction: PostReaction
) {
  return api
    .delete(`messages/${messageID}/channels/${channelId}/reactions`, {
      json: reaction,
    })
    
}

export function deleteMessage(
  channelId: string,
  messageID: string
) {
  return api.delete(`messages/${messageID}/channels/${channelId}`)
}
export function postMessage(
  message: string,
  tempID: string,
  channelId: string
): Promise<ResponsePost> {
  return api
    .post(`messages/channels/${channelId}`, {
      json: { message, tempID, socketID: socket.id },
    })
    
}

export function editMessage(
  messageID: string,
  channelId: string,
  data: any
): Promise<ResponsePost> {
  return api
    .patch(`messages/${messageID}/channels/${channelId}`, {
      json: data,
    })
    
}
export function buttonClick(
  channelId: string,
  messageID: string,
  buttonID: string
) {
  return api
    .post(`channels/${channelId}/messages/${messageID}/button/${buttonID}`)
    
}

export function postTypingStatus(channelId: string): Promise<ResponsePost> {
  return api.post(`messages/${channelId}/typing`)
}

export function postFormDataMessage(
  message: string,
  cdn: number,
  channelId: string,
  file: File,
  isImage: boolean,
  compress: boolean,
  callback: (error: any, progress: number | null, done: boolean | null) => void
) {
  const formData = new FormData();
  if (message) {
    formData.append("message", message);
  }
  formData.append("upload_cdn", cdn.toString());
  if (isImage && compress) {
    formData.append("compress", "1");
  }
  formData.append("file", file);

  const request = new XMLHttpRequest();
  request.open(
    "POST",
    process.env.VUE_APP_FETCH_PREFIX + `/messages/channels/${channelId}`
  );
  request.setRequestHeader(
    "authorization",
    localStorage.getItem("hauthid") || ""
  );

  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      if (request.status === 200) {
        callback(null, null, true);
      } else {
        callback(JSON.parse(request.response), null, null);
      }
    }
  };
  request.upload.onprogress = (progressEvent) => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );

    // execute the callback
    if (callback) callback(null, percentCompleted, null);

    return percentCompleted;
  };

  request.send(formData);

  // return api
  //   .post(`messages/chanfnels/${channelId}`, {
  //     body: formData,

  //   })
  //   
}



//------------------------------ Relationship -----------------------------


export function sendFriendRequest(username: string, tag: string) {
  return api
    .post(`user/relationship`, { json: { username, tag } })
    
}
export function deleteFriend(id: string) {
  return api
    .delete(`user/relationship`, { json: { id: id } })
    
}
export function acceptRequest(id: string) {
  return api
    .put(`user/relationship`, { json: { id: id } })
    
}


//------------------------------ Roles -----------------------------

export function createServerRole(serverID: string): Promise<ServerRole> {
  return api.post(`servers/${serverID}/roles`)
}
export function updateServerRole(
  serverID: string,
  roleID: string,
  data: Partial<ServerRole>
): Promise<Partial<ServerRole>> {
  return api
    .patch(`servers/${serverID}/roles/${roleID}`, { json: data })
    
}
export function deleteServerRole(
  serverID: string,
  roleID: string
) {
  return api.delete(`servers/${serverID}/roles/${roleID}`)
}
export function updateRolePosition(
  serverID: string,
  data: { roleID: string; order: number }
) {
  return api.patch(`servers/${serverID}/roles`, { json: data })
}


//------------------------------ Server/Guild -----------------------------


export interface UpdateServerRequest {
  avatar?: string;
  banner?: string;
  default_channel_id?: string;
  name?: string;
}
export function kickMember(serverID: string, id: string) {
  return api.delete(`servers/${serverID}/members/${id}`)
}
export function getBannedUsers(serverID: string) {
  return api.get(`servers/${serverID}/bans`)
}
export function banMember(serverID: string, id: string) {
  return api.put(`servers/${serverID}/bans/${id}`)
}
export function unbanMember(serverID: string, id: string) {
  return api.delete(`servers/${serverID}/bans/${id}`)
}
export function muteServer(serverID: string, type: number) {
  return api.put(`servers/${serverID}/mute`, { json: { type } })
}
export function leaveServer(serverID: string) {
  return api.delete(`servers/${serverID}`)
}
export function deleteServer(serverID: string) {
  return api.post(`servers/${serverID}/delete`)
}

export function joinServerById(server_id: string, optionalData: any) {
  return api
    .post(`servers/invite/servers/${server_id}`, { json: optionalData })
    
}
export function createServer(name: string) {
  return api.post(`servers`, { json: { name } })
}
export function updateServer(
  serverID: string,
  data: UpdateServerRequest
) {
  return api.patch(`servers/${serverID}`, { json: data })
}
export function getServerInfoByCode(code: string) {
  return api.get(`servers/invite/${code}`)
}
export function joinServerByCode(code: string, data?: any) {
  return api.post(`servers/invite/${code}`, { json: data })
}
export function getInvites(serverID: string) {
  return api.get(`servers/${serverID}/invites`)
}
export function deleteInvite(inviteCode: string) {
  return api.delete(`servers/invite/${inviteCode}`)
}
export function createInvite(serverID: string) {
  return api.post(`servers/${serverID}/invite`)
}
export function changeServerPosition(serverPosition: string[]) {
  return api
    .put(`settings/server_position`, {
      json: { server_position: serverPosition },
    })
    
}

export function createCustomInvite(
  serverID: string,
  code: string
) {
  return api
    .post(`servers/${serverID}/invites/custom`, {
      json: {
        customCode: code,
      },
    })
    
}


//------------------------------ voice -----------------------------


export function joinCall(channelId: string) {
  return api
    .post(`voice/channels/${channelId}`, { json: { socketId: socket.id } })
    
}
export function leaveCall() {
  return api.post(`voice/leave`)
}


//------------------------------ Post -----------------------------
//------------------------------ Post -----------------------------




//------------------------------ Photo -----------------------------
/**
  * 
  * @param {string} albumId 
  * @param {AddAssetsDto} addAssetsDto 
  * @param {*} [options] Override http request option.
  * @throws {RequiredError}
*/

/*
export const addAssetsToAlbum = async (albumId: string, addAssetsDto: AddAssetsDto) => {
  // verify required parameter 'albumId' is not null or undefined
  assertParamExists('addAssetsToAlbum', 'albumId', albumId)
  // verify required parameter 'addAssetsDto' is not null or undefined
  assertParamExists('addAssetsToAlbum', 'addAssetsDto', addAssetsDto)

  const res = await api.put(`/album/{albumId}/assets`
  .replace(`{${"albumId"}}`, encodeURIComponent(String(albumId)));

  
  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)



  localVarHeaderParameter['Content-Type'] = 'application/json';

    localVarRequestOptions.data = serializeDataIfNeeded(addAssetsDto, localVarRequestOptions, configuration)

  return res.data;
},
*/


/**
         * 
         * @param {string} albumId 
         * @param {AddUsersDto} addUsersDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */

/*
 export const addUsersToAlbum = async (albumId: string, addUsersDto: AddUsersDto) => {
  // verify required parameter 'albumId' is not null or undefined
  assertParamExists('addUsersToAlbum', 'albumId', albumId)
  // verify required parameter 'addUsersDto' is not null or undefined
  assertParamExists('addUsersToAlbum', 'addUsersDto', addUsersDto)

  const res = await api.put(`/album/{albumId}/users`
  .replace(`{${"albumId"}}`, encodeURIComponent(String(albumId)));

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)


  localVarHeaderParameter['Content-Type'] = 'application/json';

    localVarRequestOptions.data = serializeDataIfNeeded(addUsersDto, localVarRequestOptions, configuration)

  return {};
},

*/



/**
         * 
         * @param {CreateAlbumDto} createAlbumDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */

/*
 export const createAlbum = async (createAlbumDto: CreateAlbumDto ) => {
  // verify required parameter 'createAlbumDto' is not null or undefined
  assertParamExists('createAlbum', 'createAlbumDto', createAlbumDto)

  const res = await api.posr(`/api/photo/album`);
  

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)



  localVarHeaderParameter['Content-Type'] = 'application/json';

    localVarRequestOptions.data = serializeDataIfNeeded(createAlbumDto, localVarRequestOptions, configuration)

  return {};
},

*/


/**
         * 
         * @param {string} albumId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */

/*
 exxport const deleteAlbum = async (albumId: string, ) => {
  // verify required parameter 'albumId' is not null or undefined
  assertParamExists('deleteAlbum', 'albumId', albumId)

  const res = await api.del(`/album/{albumId}`
  .replace(`{${"albumId"}}`, encodeURIComponent(String(albumId)));

  

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)



  
  return {};
},


*/


/**
         * 
         * @param {string} albumId 
         * @param {number} [skip] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */

/*
 export const downloadArchive = async (albumId: string, skip?: number, ) => {
  // verify required parameter 'albumId' is not null or undefined
  assertParamExists('downloadArchive', 'albumId', albumId)
  const localVarPath = `/album/{albumId}/download`
      .replace(`{${"albumId"}}`, encodeURIComponent(String(albumId)));

      const res = await api.get(`/api/`);  


  const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
  

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)

  if (skip !== undefined) {
      localVarQueryParameter['skip'] = skip;
  }



  
  return {};
},






export const getAlbumCountByUserId = async () => {
  const localVarPath = `/album/count-by-user-id`;

  const res = await api.get(`/api/`);  

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)



  
  return {};
},



export const getAlbumInfo = async (albumId: string, ) => {
  // verify required parameter 'albumId' is not null or undefined
  assertParamExists('getAlbumInfo', 'albumId', albumId)
  const localVarPath = `/album/{albumId}`
      .replace(`{${"albumId"}}`, encodeURIComponent(String(albumId)));

  const res = await api.get(`/api/post/${postId}/unlike`);

  const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
  

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)



  
  return {};
},






export const getAllAlbums = async (shared?: boolean, assetId?: string, ) => {

  const res = await api.get(`/photo/album`);

  
  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)

  if (shared !== undefined) {
      localVarQueryParameter['shared'] = shared;
  }

  if (assetId !== undefined) {
      localVarQueryParameter['assetId'] = assetId;
  }



  
  return {};
},









export const removeAssetFromAlbum = async (albumId: string, removeAssetsDto: RemoveAssetsDto, ) => {
  // verify required parameter 'albumId' is not null or undefined
  assertParamExists('removeAssetFromAlbum', 'albumId', albumId)
  // verify required parameter 'removeAssetsDto' is not null or undefined
  assertParamExists('removeAssetFromAlbum', 'removeAssetsDto', removeAssetsDto)
  const localVarPath = `/album/{albumId}/assets`
      .replace(`{${"albumId"}}`, encodeURIComponent(String(albumId)));

  const res = await api.del(`/post/${postId}/unlike`);

  

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)



  localVarHeaderParameter['Content-Type'] = 'application/json';

    localVarRequestOptions.data = serializeDataIfNeeded(removeAssetsDto, localVarRequestOptions, configuration)

  return {};
},




export const removeUserFromAlbum = async (albumId: string, userId: string, ) => {
  // verify required parameter 'albumId' is not null or undefined
  assertParamExists('removeUserFromAlbum', 'albumId', albumId)
  // verify required parameter 'userId' is not null or undefined
  assertParamExists('removeUserFromAlbum', 'userId', userId)
  const localVarPath = `/album/{albumId}/user/{userId}`
      .replace(`{${"albumId"}}`, encodeURIComponent(String(albumId)))
      .replace(`{${"userId"}}`, encodeURIComponent(String(userId)));

  const res = await api.del(`/api/post/${postId}/unlike`);

  

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)



  
  return {};
},


export const updateAlbumInfo = async (albumId: string, updateAlbumDto: UpdateAlbumDto, ) => {
            // verify required parameter 'albumId' is not null or undefined
            assertParamExists('updateAlbumInfo', 'albumId', albumId)
            // verify required parameter 'updateAlbumDto' is not null or undefined
            assertParamExists('updateAlbumInfo', 'updateAlbumDto', updateAlbumDto)
            const localVarPath = `/album/{albumId}`
                .replace(`{${"albumId"}}`, encodeURIComponent(String(albumId)));
                      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const res = await api.put(`/api/post/${postId}/unlike`);

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
  
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(updateAlbumDto, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};
*/
//------------------------------ Album -----------------------------

      /**
       * 
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */

      /*
      export const getConfig = async () => {
                  


          const res = await api.get(`/system-config`);


          // authentication bearer required
          // http bearer authentication required
          await setBearerAuthToObject(localVarHeaderParameter, configuration)


  
          setSearchParams(localVarUrlObj, localVarQueryParameter);
          let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
          localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

          return {
              url: toPathString(localVarUrlObj),
              options: localVarRequestOptions,
          };
      },

      */


      /**
       * 
       * @param {object} body 
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */
      /*
      export const updateConfig = async (body: object, ) => {
          // verify required parameter 'body' is not null or undefined
          assertParamExists('updateConfig', 'body', body)
                  

          const res = await api.put(`/photo/system-config`);

          // authentication bearer required
          // http bearer authentication required
          await setBearerAuthToObject(localVarHeaderParameter, configuration)

          return {};
      }

*/






// photo server
/**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */

/*
 export const getServerInfo = async () => {

  const res = await api.get(`/photo/server-info`);
  
  return {};
},

*/
/**
* 
* @param {*} [options] Override http request option.
* @throws {RequiredError}
*/

/*
export const getServerVersion = async () => {

  const res = await api.get(`/photo/server-info/version`);
  
  return {};
},
*/
/**
* 
* @param {*} [options] Override http request option.
* @throws {RequiredError}
*/
/*
export const getStats = async () => {

  const res = await api.get(`/photo/server-info/stats`);
  
  return {};
},
*/
/**
* 
* @param {*} [options] Override http request option.
* @throws {RequiredError}
*/
/*
export const pingServer =  async () => {

  const res = await api.get(`/photo/server-info/ping`);

  
  return {};
},
*/

/**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        /*
 export const getAllJobsStatus = async () => {

  const res = await api.put(`/photo/jobs`);  

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)

  return {};
},
*/
/**
* 
* @param {JobId} jobId 
* @param {*} [options] Override http request option.
* @throws {RequiredError}
*/
/*
export const getJobStatus = async (jobId: JobId, ) => {
  // verify required parameter 'jobId' is not null or undefined
  assertParamExists('getJobStatus', 'jobId', jobId)
  const localVarPath = `/jobs/{jobId}`
      .replace(`{${"jobId"}}`, encodeURIComponent(String(jobId)));


  const res = await api.get(`/api/post/${postId}/unlike`);
  

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)

  
  return {};
},
*/
/**
* 
* @param {JobId} jobId 
* @param {JobCommandDto} jobCommandDto 
* @param {*} [options] Override http request option.
* @throws {RequiredError}
*/
/*
export const sendJobCommand = async (jobId: JobId, jobCommandDto: JobCommandDto, ) => {
  // verify required parameter 'jobId' is not null or undefined
  assertParamExists('sendJobCommand', 'jobId', jobId)
  // verify required parameter 'jobCommandDto' is not null or undefined
  assertParamExists('sendJobCommand', 'jobCommandDto', jobCommandDto)
  const localVarPath = `/jobs/{jobId}`
      .replace(`{${"jobId"}}`, encodeURIComponent(String(jobId)));

  const res = await api.put(`/photo/`);
  

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)


    localVarRequestOptions.data = serializeDataIfNeeded(jobCommandDto, localVarRequestOptions, configuration)

  return {};
}

*/


        /**
         * 
         * @param {CreateDeviceInfoDto} createDeviceInfoDto 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        /*
         createDeviceInfo: async (createDeviceInfoDto: CreateDeviceInfoDto, ) => {
          // verify required parameter 'createDeviceInfoDto' is not null or undefined
          assertParamExists('createDeviceInfo', 'createDeviceInfoDto', createDeviceInfoDto)                  

          const res = await api.post(`/photo/device-info`);

          // authentication bearer required
          // http bearer authentication required
          await setBearerAuthToObject(localVarHeaderParameter, configuration)


          return {
            
          };
      },
      */
      /**
       * 
       * @param {UpdateDeviceInfoDto} updateDeviceInfoDto 
       * @param {*} [options] Override http request option.
       * @throws {RequiredError}
       */

      /*
      export const updateDeviceInfo = async (updateDeviceInfoDto: UpdateDeviceInfoDto, ) => {
          // verify required parameter 'updateDeviceInfoDto' is not null or undefined
          assertParamExists('updateDeviceInfo', 'updateDeviceInfoDto', updateDeviceInfoDto)
                  
          const res = await api.put(`/photo/device-info`);

          const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};

          // authentication bearer required
          // http bearer authentication required
          await setBearerAuthToObject(localVarHeaderParameter, configuration)

          return {
          };
      }









export const getAssetSearchTerms = async () => {

  const res = await api.get(`/photo/asset/search-terms`);
  

  // authentication bearer required
  // http bearer authentication required
  await setBearerAuthToObject(localVarHeaderParameter, configuration)


  return {};
},

*/


import { io } from "socket.io-client";

import userss from "$stores/users";
import friend from "$stores/friend";
import server from "$stores/server";



export const socket = io("http://localhost:4000", {
    transports: ['websocket']
})







socket.on("message", (message) => {
    console.log(message)
})

socket.on("connect", (data) => {

  const servers: any = {};
  const channels: any = {};
    
})

socket.on("authenticated", (data) => {
     //WE GOT IT
  //make another page for WS
  server.set(data.user.servers)
  friend.set(data.user.friends)

    MeModule.SetConnectionDetails({ connected: true, message: null });
    userss.set({
      email: data.user.email,
      username: data.user.username,
      avatar: data.user.avatar,
      banner: data.user.banner,
      tag: data.user.tag,
      id: data.user.id,
      type: data.user.type,
      badges: data.user.badges,
      status: data.user.status,
      googleDriveLinked: data.settings.GDriveLinked,
    });

  const users: any = {};
  //const friend: any = {};
  //set friend
  for (let i = 0; i < data.user.friends.length; i++) {
    const friend = data.user.friends[i];
    const user = friend.recipient;
    users[user.id] = user;
    friends[user.id] = {
      status: friend.status,
      id: user.id,
    };
  }

  // set servers
  const servers: any = {};
  const channels: any = {};

  // dm channel
  for (let i = 0; i < data.dms.length; i++) {
    const channel = data.dms[i];
    if (channel.recipients)
      for (let i = 0; i < channel.recipients.length; i++) {
        const recipient = channel.recipients[i];
        users[recipient.id] = recipient;
      }
    channels[channel.channelId] = {
      channelId: channel.channelId,
      lastMessaged: channel.lastMessaged,
      recipients: channel.recipients?.map((r) => r.id),
    };
  }
  for (let i = 0; i < data.user.servers.length; i++) {
    const server = data.user.servers[i];
    servers[server.server_id] = {
      avatar: server.avatar,
      banner: server.banner,
      creator: server.creator,
      default_channel_id: server.default_channel_id,
      name: server.name,
      server_id: server.server_id,
      verified: server.verified,
      channel_position: server.channel_position,
    };
    // server channels
    for (let x = 0; x < server.channels.length; x++) {
      const channel = server.channels[x];
      channels[channel.channelId] = {
        channelId: channel.channelId,
        type: channel.type,
        name: channel.name,
        categoryId: channel.categoryId,
        server_id: channel.server_id,
        lastMessaged: channel.lastMessaged,
        permissions: channel.permissions,
        icon: channel.icon,
        rateLimit: channel.rateLimit || 0,
      };
    }
  }

  // server members
  const serverMembers: any = {};
  for (let i = 0; i < data.serverMembers.length; i++) {
    const serverMember = data.serverMembers[i];

    if (!serverMembers[serverMember.server_id]) {
      serverMembers[serverMember.server_id] = {};
    }
    serverMembers[serverMember.server_id][serverMember.member.id] = {
      type: serverMember.type,
      id: serverMember.member.id,
      server_id: serverMember.server_id,
      roleIdArr: serverMember.roles || [],
    };
    users[serverMember.member.id] = serverMember.member;
  }

  const presenceObj: any = {};
  for (let i = 0; i < data.memberStatusArr.length; i++) {
    const id = data.memberStatusArr[i][0];
    const status = data.memberStatusArr[i][1];
    presenceObj[id] = parseInt(status);
  }

  const serverRolesObj: any = {};
  for (let i = 0; i < data.serverRoles.length; i++) {
    const role = data.serverRoles[i];
    if (serverRolesObj[role.server_id]) {
      serverRolesObj[role.server_id][role.id] = role;
      continue;
    }
    serverRolesObj[role.server_id] = { [role.id]: role };
  }

  const notifications: any = {};
  for (let i = 0; i < data.notifications.length; i++) {
    const notification = data.notifications[i];
    notifications[notification.channelId] = notification;
  }

  // current calls
  const calls = {};
  for (const channelId in data.callingChannelUserIds) {
    const userIds = data.callingChannelUserIds[channelId];
    calls[channelId] = {};
    for (let i = 0; i < userIds.length; i++) {
      const userId = userIds[i];
      calls[channelId][userId] = {};
    }
  }
  voiceChannelModule.InitVoiceChannels(calls);

  // muted servers
  const mutedServersObj: any = {};
  for (let i = 0; i < data.mutedServers.length; i++) {
    const obj = data.mutedServers[i];
    mutedServersObj[obj.server_id] = { type: obj.muted };
  }

  // custom status
  const customStatusObj: any = {};
  for (let i = 0; i < data.customStatusArr.length; i++) {
    const element = data.customStatusArr[i];
    customStatusObj[element[0]] = element[1];
  }
  // programActivity
  const programActivityObj: any = {};
  for (let i = 0; i < data.programActivityArr.length; i++) {
    const programActivity = data.programActivityArr[i];
    programActivityObj[programActivity.user_id] = {
      status: programActivity.status,
      name: programActivity.name,
    };
  }

    
  
})













// message events
socket.on("message:created", (data) => messageEvents.onMessage(socket, data));
socket.on("message:updated", (data) =>
  messageEvents.onMessageUpdate(socket, data)
);
socket.on("message:deleted", (data) =>
  messageEvents.onMessageDelete(socket, data)
);
socket.on("message:deleted_bulk", (data) =>
  messageEvents.onMessageDeleteBulk(socket, data)
);
socket.on("message:reaction_updated", (data) =>
  messageEvents.onReactionUpdate(socket, data)
);

// channel events
socket.on("channel:created", (data) => channelEvents.onChannelCreated(data));
socket.on("server:channel_created", (data) =>
  channelEvents.onServerChannelCreated(data)
);
socket.on("server:channel_updated", (data) =>
  channelEvents.onServerChannelUpdate(data)
);
socket.on("server:channel_deleted", (data) =>
  channelEvents.onServerChannelRemoved(data)
);
socket.on("channel:deleted", (data) => channelEvents.onChannelRemoved(data));
socket.on("channel:unmuted", (data) => channelEvents.onChannelUnmute(data));
socket.on("channel:muted", (data) => channelEvents.onChannelMute(data));
socket.on("server:channel_position_updated", (data) =>
  channelEvents.onServerChannelPositionChange(data)
);

// notification events
socket.on("notification:dismissed", (data) =>
  notificationEvents.onNotificationDismiss(data)
);

// server events
socket.on("server:position_updated", (data) => serverEvents.onPositionChanged(data));
socket.on("server:role_added_to_member", (data) =>
  serverEvents.onMemberRoleAdded(data)
);
socket.on("server:role_removed_from_member", (data) =>
  serverEvents.onMemberRoleRemoved(data)
);
socket.on("server:joined", (data) => serverEvents.onJoined(socket, data));
socket.on("server:left", (data) => serverEvents.onLeave(data));
// get all members after joining the server
socket.on("server:member_added", (data) => serverEvents.onMembers(data));
// get all roles after joining the server
socket.on("server:roles", (data) => serverEvents.onRoles(data));
socket.on("server:roles_updated", (data) => serverEvents.onRolesUpdate(data));
socket.on("server:role_created", (data) => serverEvents.onRoleCreated(data));
socket.on("server:role_updated", (data) => serverEvents.onRoleUpdated(data));
socket.on("server:role_deleted", (data) => serverEvents.onRoleRemoved(data));
socket.on("server:muted", (data) => serverEvents.onMute(data));
socket.on("server:member_added", (data) => serverEvents.onMemberAdd(data));
socket.on("server:member_removed", (data) => serverEvents.onMemberRemove(data));

// user events
socket.on("user:status_changed", (data) => userEvents.onStatusChange(data));
socket.on("multiDeviceStatus", (data) => userEvents.onSelfStatusChange(data));
socket.on("user:custom_status_changed", (data) =>
  userEvents.onCustomStatusChange(data)
);
socket.on("multiDeviceCustomStatus", (data) =>
  userEvents.onSelfCustomStatusChange(data)
);
socket.on("user:program_activity_changed", (data) =>
  userEvents.onProgramActivityChange(data)
);
socket.on("user:blocked", (data) => userEvents.onUserBlocked(data));
socket.on("user:unblocked", (data) => userEvents.onUserUnblocked(data));

// call events
socket.on("user:call_joined", (data) => callEvents.onJoin(data));
socket.on("user:call_left", (data) => callEvents.onLeave(data));
socket.on("voice:signal_received", (data) => callEvents.onReceiveSignal(data));
socket.on("voice:return_signal_received", (data) =>
  callEvents.onReceiveReturnSignal(data)
);

// relationship events
socket.on("relationship:accepted", (data) => relationshipEvents.onAccept(data));
socket.on("relationship:deleted", (data) => relationshipEvents.onRemove(data));
socket.on("relationship:added", (data) => relationshipEvents.onAdd(data));

// customEmoji Events

socket.on("custom_emoji:uploaded", (data) => customEmojiEvents.onUploaded(data));
socket.on("custom_emoji:renamed", (data) => customEmojiEvents.onRenamed(data));
socket.on("custom_emoji:deleted", (data) => customEmojiEvents.onRemoved(data));
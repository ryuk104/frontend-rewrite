<script lang="ts">
  /*
  import { ServersModule } from "$lib/stores/servers";
  import { UsersModule } from "$lib/stores/users";
  import { MeModule } from "$lib/stores/me";
  
  import ConnectionStatus from "$lib/components/server/popouts/ConnectionStatusPopout.svelte";
  import BrowserTitleHandler from "$lib/components/server/renderless/BrowserIcoHandler";
  import ElectronBadgeHandler from "$lib/components/server/renderless/ElectronBadgeHandler";
  import ElectronActivityHandler from "$lib/components/server/renderless/ElectronActivityHandler";
  import UpdateChecker from "$lib/components/server/renderless/UpdateChecker";
  
  import { loadAllCacheToState, loadCache } from "$lib/utils/localCache";
  import { ChannelsModule } from "$lib/store/modules/channels";
  import { ServerMembersModule } from "$lib/store/modules/serverMembers";
  import { ServerRolesModule } from "$lib/store/modules/serverRoles";
  import { useWindowProperties } from "$lib/utils/windowProperties";
  import { FriendsModule } from "$lib/store/modules/friends";
  
  import { LastSelectedServersModule } from "$lib/store/modules/lastSelectedServer";
  import { AppUpdateModule } from "$lib/store/modules/appUpdate";
  import { applyTheme } from "$lib/utils/CSSTheme";
  import { TabsModule } from "$lib/store/modules/tabs";
  import store from "$lib/store";
  import { PopoutsModule } from "$lib/store/modules/popouts";
  import { voiceChannelModule } from "$lib/store/modules/voiceChannels";


  import Drawers from "$lib/components/server/drawers/Drawers.svelte";
  import NavBar from "$lib/components/server/NavBar.svelte";
  import LeftDrawer from "$lib/components/server/drawers/LeftDrawer.svelte";
  import RightDrawer from "$lib/components/server/drawers/RightDrawer.svelte";
  import MobileInCallFooter from "$lib/components/server/MobileInCallFooter.svelte";

  
  
    
        let showConnectionStatusPopout = true,
        let currentActiveProgram = null as any | null,
        let programActivityTimeout = null as any,
        let loadPage = false,
      
      function currentChannelID(): any {
        return this.$route.params.channel_id;
      },
      function currentServerID(): any {
        return this.$route.params.server_id;
      },
      function currentTab(): any {
        return this.$route.path.split("/")[2];
      },
      function isConnected(): any {
        return MeModule.connected;
      },
      function isMobileWidth() {
        return useWindowProperties().isMobileWidth;
      },
      function isInCall() {
        return voiceChannelModule.joinedChannelId;
      }
    watch: {
      currentChannelID: {
        handler: "saveLastSelected",
      },
      currentServerID: {
        handler: "saveLastSelected",
      },
      currentTab: {
        handler: "saveLastSelected",
      },
      isConnected: {
        handler: "showConnectionPopout",
      },
    },
    mounted() {
      this.$socket.connect();
      if (window.BroadcastChannel) {
        const channel = new BroadcastChannel("sw-messages");
        // hack to fix disconnects using service workers;
        channel.addEventListener("message", (event) => {
          if (event.data !== "ping") return;
          if (useWindowProperties().isFocused) return;
          if (!this.$socket.connected) return;
          this.$socket.emit("p");
        });
      }
    },
    created() {
      localStorage.removeItem("lastSelectedDMChannelID");
      localStorage.removeItem("lastSelectedServerID");
      this.saveLastSelected();
      this.loadCache();
      this.applyCSSTheme();
    },
    beforeUnmount() {
      store.unregisterModule("socketIO");
    },

    methods: {
      applyCSSTheme() {
        const id = localStorage["themeID"];
        if (!id) return;
        applyTheme(id);
      },
      async loadCache() {
        const tabs = await loadCache("tabs");
        if (tabs) {
          TabsModule.initTabs(tabs);
        }
        this.loadPage = true;
        await loadAllCacheToState([
          {
            storage: "me",
            state: MeModule.SetUser,
          },
          {
            storage: "serverPositions",
            state: ServersModule.SetServerPositions,
          },
          {
            storage: "servers",
            state: ServersModule.InitServers,
          },
          {
            storage: "users",
            state: UsersModule.InitUsers,
          },
          {
            storage: "channels",
            state: ChannelsModule.InitChannels,
          },
  
          {
            storage: "friends",
            state: FriendsModule.InitFriends,
          },
          {
            storage: "serverRoles",
            state: ServerRolesModule.InitServerRoles,
          },
          {
            storage: "serverMembers",
            state: ServerMembersModule.InitServerMembers,
          },
        ]);
      },
      saveLastSelected() {
        const routeName = this.$route.name as string;
        AppUpdateModule.check();
        if (!routeName?.endsWith("message-area")) return;
        if (this.currentTab === "servers") {
          LastSelectedServersModule.UpdateLastSelected({
            serverID: this.currentServerID,
            channelId: this.currentChannelID,
          });
          localStorage.setItem("lastSelectedServerID", this.currentServerID);
        } else if (this.currentTab === "dms" && this.currentChannelID) {
          localStorage.setItem("lastSelectedDMChannelID", this.currentChannelID);
        }
      },
      showConnectionPopout() {
        AppUpdateModule.check({ force: true });
        if (!this.isConnected) {
          this.showConnectionStatusPopout = true;
        }
      },
    },
  });
  */
</script>

<!-- 
<div class="app">
  <BrowserTitleHandler />
  <ElectronBadgeHandler v-if="$isElectron" />
  <ElectronActivityHandler v-if="$isElectron" />
  <UpdateChecker />
  <NavBar class="nav-bar" />
  <Drawers class="drawers">
    <div v-slot:drawer-left>
      <LeftDrawer />
    </div>
    <div v-slot:drawer-right>
      <RightDrawer v-if="currentTab === 'servers' && currentChannelID" />
    </div>
    <div v-slot:content>
      <div class="content">
        <transition name="fade" appear>
          <ConnectionStatus
            v-if="showConnectionStatusPopout"
            @close="showConnectionStatusPopout = false"
          />
        </transition>
        <router-view v-if="loadPage" />
        <MobileInCallFooter v-if="isMobileWidth && isInCall" />
      </div>
    </div>
  </Drawers>
</div>
-->


<style lang="scss" scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: 0.3s;
  }
  .fade-enter-from, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(-60px);
  }
  .app {
    display: flex;
    height: 100%;
    overflow: hidden;
  }
  
  .content {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  
  @media (max-width: 950px) {
    .app {
      flex-direction: column;
    }
    .nav-bar {
      z-index: 111111;
      background: var(--background-color);
      order: 2;
    }
    .drawers {
      order: 1;
    }
  }
  </style>
  
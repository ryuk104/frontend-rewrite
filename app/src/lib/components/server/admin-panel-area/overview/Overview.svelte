<script lang="ts">
import { ExpandedUser } from "@/services/adminService";
import Stats from "./Stats.svelte";
import Users from "./Users.svelte";
import AdminActions from "./AdminActions.svelte";
import SelectedUserPage from "./SelectedUserPage.svelte";

export default defineComponent({
  components: { Stats, Users, SelectedUserPage, AdminActions },
  data() {
    return {
      selectedUser: null as ExpandedUser | null,
    };
  },
  methods: {
    getUserComponent() {
      return this.$refs.users as InstanceType<typeof Users>;
    },
    getAdminActionsComponent() {
      return this.$refs.adminActions as InstanceType<typeof AdminActions>;
    },
    suspendUser(user?: ExpandedUser, selected = false) {
      if (!user) return;
      const newUser = { ...user, banned: true };
      this.getUserComponent().updateUser(newUser);
      selected && (this.selectedUser = newUser);
      this.getAdminActionsComponent().fetchActions();
    },
    unsuspendUser(user?: ExpandedUser, selected = false) {
      if (!user) return;
      const newUser = { ...user, banned: false };
      this.getUserComponent().updateUser(newUser);
      selected && (this.selectedUser = newUser);
      this.getAdminActionsComponent().fetchActions();
    },
  },
});
</script>

<div class="overview">
  <Stats v-show="!selectedUser" />
  <div class="content">
    <Users
      ref="users"
      v-show="!selectedUser"
      @click="selectedUser = $event"
      @suspendBatch="suspendUser($event)"
      @unsuspendBatch="unsuspendUser($event.user)"
    />
    <AdminActions v-show="!selectedUser" ref="adminActions" />

    <SelectedUserPage
      @suspended="suspendUser($event, true)"
      @unsuspend="unsuspendUser($event, true)"
      @back="selectedUser = null"
      v-if="selectedUser"
      :user="selectedUser"
    />
  </div>
</div>

<style lang="scss" scoped>
.overview {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex: 1;
}
.content {
  display: flex;
  overflow: auto;
  flex: 1;
}
</style>

<template>
  <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">

    <q-header elevated :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-primary'">
      <q-toolbar>
        <q-btn dense flat round @click="toggleLeftDrawer" icon="menu">
        </q-btn>
    
        <q-toolbar-title>
          Personal Project Management Tool
        </q-toolbar-title>

        <q-btn dense flat round icon="account_circle" size="xl">
          <q-menu
            anchor="bottom middle"
            self="top end"
            id="med-header-user-list"
            transition-show="jump-down"
            transition-hide="jump-up"
            class="med-header-list-box"
          >
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">Settings</div>
                <q-toggle v-model="blnDarkMode" @update:model-value="handleDarkMode" label="Dark Mode" />
                <q-toggle v-model="blnBluetooth" label="Bluetooth" />
              </div>

              <q-separator vertical inset class="q-mx-lg" />

              <div class="column items-center">
                <q-avatar size="72px">
                  <img src="https://cdn.quasar.dev/img/avatar4.jpg">
                </q-avatar>

                <div class="text-subtitle1 text-center q-mt-md q-mb-xs">{{ auth.userData.user_name }}</div>
                <q-btn
                  color="primary"
                  label="Logout"
                  @click="handleLogOut"
                  icon="exit_to_app"
                  glossy
                  push
                  size="sm"
                  v-close-popup
                />
              </div>
            </div>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer 
      v-model="leftDrawerOpen" 
      show-if-above
      :mini="miniState"
      @mouseenter="miniState = false"
      @mouseleave="miniState = true"
      mini-to-overlay
      :width="300"
      :breakpoint="500"
      bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-primary'"
    > 
      <q-list>
        <q-item
          v-for="item in menuItems"
          :key="item.path"
          clickable
          :active="isActive(item.path)"
          :active-class="$q.dark.isActive ? 'bg-blue text-white' : 'bg-white text-primary'"
          @click="navigateTo(item.path)"
        >
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ item.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useAuthStore } from 'src/stores/auth';
import { useRouter, useRoute } from 'vue-router';
import { Dark } from 'quasar';

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const leftDrawerOpen = ref(false);
    const auth = useAuthStore();
    const router = useRouter();
    const route = useRoute();
    // Dynamically filter menu items based on the routes
    const menuItems = computed(() => {
      return router.options.routes
        .filter(route => route.meta?.showInMenu)
        .map(route => ({
          title: route.meta.title,
          path: route.path,
          icon: route.meta.icon || 'menu'
        }));
    });

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }

    const navigateTo = (path) => {
      router.push(path);
      leftDrawerOpen.value = false;
    };

    // Check if the item is active based on the current route path
    const isActive = (path) => route.path === path;

    return {
      leftDrawerOpen,
      auth,
      menuItems,
      toggleLeftDrawer,
      navigateTo,
      isActive,
      miniState: ref(true)
    };
  },

  computed: {
    headerColorClass() {
      // Return different colors based on Dark mode
      return Dark.isActive ? 'bg-dark text-white' : 'bg-primary text-white';
    }
  },

  data() {
    return {
      // blnDarkMode: this.auth.userData.is_dark_mode == 0 ? false : true,
      blnBluetooth: false,
    }
  },

  methods: {
    handleLogOut() {
      const strAccessToken = this.auth.accessToken.accessToken;
      this.$api.post('v1/account/signout', {is_dark_mode: this.blnDarkMode ? 1 : 0}, { headers: { Authorization: `Bearer ${strAccessToken} ` } }).then((response) => {
        if (response.data.statusCode === 200) {
          this.blnDarkMode = false;
          this.handleDarkMode();
          const redirectPath = this.$route.query.redirect || '/';
          this.auth.logout();
          this.$showSuccess(response.data.message);
          this.$router.push(redirectPath);
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    handleDarkMode() {
      this.auth.userData.is_dark_mode = this.blnDarkMode ? 1 : 0;
      Dark.set(this.blnDarkMode);
    }
  },
  beforeMount() {
    // this.handleDarkMode();
  },
})
</script>
<style>
.bg-darks{
  background-color: #BDBDBD;
}
.bg-blue {
  background-color: #3B82F6; /* Use your preferred active color */
}
</style>

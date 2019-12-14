<template>
<v-app>
    <v-navigation-drawer
      app
      temporary
      v-model="drawer"
    >
      <v-list
      dense
      >
        <v-list-item
        v-for="link in links"
        :key="link.title"
        :to='link.url'
        >
          <v-list-item-action>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{link.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="isUserLoggedIn" @click="onLogout">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon
      class="hidden-md-and-up"
      @click="drawer=!drawer"
      />
      <v-toolbar-title>
        <router-link to="/" tag="span" class="pointer">App-my</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
        v-for="link in links"
      :key="link.title"
         text
         :to='link.url'
         ><v-icon left color="light-blue lighten-5">{{link.icon}}</v-icon>{{link.title}}</v-btn>
        <v-btn v-if="isUserLoggedIn" text @click="onLogout"><v-icon left color="light-blue lighten-5">mdi-exit-to-app</v-icon>Logout</v-btn>
      </v-toolbar-items>

    </v-app-bar>

    <v-content>
        <router-view></router-view>
    </v-content>
    <template v-if="error">
      <v-snackbar
            @input="closeError"
            color="error"
            :multi-line="true"
            :timeout="5000"
            :value="true"
      >
            {{error}}
            <v-btn
              dark
              text
              @click="closeError"
            >
              Close
            </v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>

export default {
  data () {
    return {
      drawer: false
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    },
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    },
    links () {
      if (this.isUserLoggedIn) {
        return [
          { title: 'Orders', icon: 'mdi-bookmark-outline', url: '/orders' },
          { title: 'New ad', icon: 'mdi-file-plus', url: '/new' },
          { title: 'My ads', icon: 'mdi-menu', url: '/list' }
        ]
      }
      return [
        { title: 'Login', icon: 'mdi-lock', url: '/login' },
        { title: 'Registration', icon: 'mdi-account', url: '/reg' }
      ]
    }
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    },
    onLogout () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/')
    }
  }
}
</script>
<style scoped>
  .pointer{
    cursor: pointer;
  }
</style>

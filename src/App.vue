<template>
  <div id="app">
    <div
      v-if="hasAccess"
      id="nav"
    >
      <router-link to="/">Home</router-link> |
      <router-link to="/protected">Protected</router-link> |
      <a v-if="oidcIsAuthenticated" href @click.prevent="signOut">Sign out</a>
      <a v-else href @click.prevent="authenticateOidcPopup">Sign in</a>|
      <a v-if="!oidcIsAuthenticated" href @click.prevent="signIn">Sign in Password</a>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from "axios";
import {oidcPasswordSettings } from './config/oidc'

export default {
  name: 'App',
  computed: {
    ...mapGetters('oidcStore', [
      'oidcIsAuthenticated'
    ]),
    hasAccess: function () {
      return this.oidcIsAuthenticated || this.$route.meta.isPublic
    }
  },
  methods: {
    ...mapActions('oidcStore', [
      'storeOidcUser',
      'oidcWasAuthenticated',
      'authenticateOidcPopup',
      'removeOidcUser'
    ]),
    userLoaded: function (e) {
      console.log('I am listening to the user loaded event in vuex-oidc', e.detail)
    },
    oidcError: function (e) {
      console.log('I am listening to the oidc oidcError event in vuex-oidc', e.detail)
    },
    automaticSilentRenewError: function (e) {
      console.log('I am listening to the automaticSilentRenewError event in vuex-oidc', e.detail)
    },
    signIn: function () {
      axios({
          url: oidcPasswordSettings.authority+'/connect/token',
          method: 'post',
          data: "client_id=jsp&client_secret=secret&grant_type=password&username=admin&password=123qwe&scope=openid profile offline_access",
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          }
      })
      .then((res) => {
          console.log('res');
          console.log(res);
          const user = {
            access_token: res.data.access_token,
            expires_at:1620577815,
            profile: {
                "s_hash": "ZmPun6JAH2RL88ld4GE2lg",
                "sid": "5AAC52F386670D6709763B7598FB1E00",
                "sub": "1",
                "auth_time": 1620550507,
                "idp": "local",
                "preferred_username": "admin",
                "name": "admin",
                "amr": [
                    "pwd"
                ]
            },
            refresh_token: res.data.refresh_token,
            id_token: res.data.access_token,
            scope: "openid profile offline_access",
            scopes: [
                "openid",
                "profile",
                "offline_access"
            ],
            session_state:null,
            state:null,
            token_type: "Bearer",
            expired: false,
            expires_in: 6965,
            error: null
          };
          this.oidcWasAuthenticated(user);
          alert(this.oidcIsAuthenticated)
          //this.storeOidcUser(user);
      }).catch((err) => {
          console.log('err');
          console.log(err);
      });
    },
    signOut: function () {
      this.removeOidcUser().then(() => {
        this.$router.push('/')
      })
    }
  },
  mounted () {
    window.addEventListener('vuexoidc:userLoaded', this.userLoaded)
    window.addEventListener('vuexoidc:oidcError', this.oidcError)
    window.addEventListener('vuexoidc:automaticSilentRenewError', this.automaticSilentRenewError)
  },
  destroyed () {
    window.removeEventListener('vuexoidc:userLoaded', this.userLoaded)
    window.removeEventListener('vuexoidc:oidcError', this.oidcError)
    window.removeEventListener('vuexoidc:automaticSilentRenewError', this.automaticSilentRenewError)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

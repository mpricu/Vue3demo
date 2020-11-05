<template>
  <header>
    <nav class="site-nav">
      <div class="logo">
        <a href="/" class="item">Cuddly Octo Pizza Store</a>
      </div>
      <ul>
        <li>
          <router-link exact to="/">Home</router-link>
        </li>
        <li>
          <router-link exact :to="{ path: '/pizza-menu' }">Menu</router-link>
        </li>
        <li>
          <router-link exact :to="{ path: '/cart' }">Shopping Cart</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link
            exact
            :to="{
              name: 'UserProfile',
              params: { id: user.id },
            }"
            >User Info</router-link
          >
        </li>
      </ul>
    </nav>
    <div class="actions" v-bind:title="actionsToolTip">
      <button v-if="isLoggedIn" class="signOut-link" @click="logOut">
        Welcome
        {{ userName }}
      </button>
      <router-link v-else to="/authenticate" class="signIn-link"
        >Login</router-link
      >
    </div>
  </header>
</template>

<script>
import { computed, getCurrentInstance } from "vue";

export default {
  props: {
    user: Object,
  },
  setup(props) {
    const { proxy } = getCurrentInstance();

    const actionsToolTip = "User's actions";

    const userName = computed(() => {
      return `${props.user.firstName} ${props.user.lastName}`;
    });

    const isLoggedIn = computed(() => {
      return !!props.user;
    });

    function logOut() {
      localStorage.removeItem("user");
      proxy.emitter.emit("userLoggedOut");
    }

    return {
      actionsToolTip,
      userName,
      isLoggedIn,
      logOut,
    };
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  cursor: pointer;
}
header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 1px 10px 3px rgb(156, 156, 156);
}
header > nav {
  display: flex;
  flex-direction: row;
}
header > nav > .logo {
  font-size: 1.4rem;
  place-self: center;
  padding: 10px 20px;
}
header > nav > ul {
  display: flex;
  flex-direction: row;
  gap: 10px;
  list-style: none;
}
header > nav > ul > li:not(:first-of-type)::before {
  content: "|";
  opacity: 0.4;
  padding-right: 10px;
}
.site-nav {
  display: flex;
  margin: 0;
  padding: 0;
}
.actions {
  margin-left: auto;
  display: flex;
  margin-right: 10px;
}
.signIn-link {
  color: #bb4a4a;
  font-size: 0.8rem;
  text-transform: uppercase;
  padding: 0 10px;
}
.router-link-active {
  border-bottom: 2px solid tomato;
}
.signOut-link {
  all: unset;
  font-size: 0.8rem;
  text-transform: uppercase;
  padding: 0 10px;
  color: #4a4abb;
}
</style>

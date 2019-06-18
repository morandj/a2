import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";
import SignUp from "./views/SignUp.vue";
import SignIn from "./views/SignIn.vue";
import ShowHunts from "./views/ShowHunts.vue";
import NewHunt from "./views/NewHunt.vue";
import EditHunt from "./views/EditHunt.vue";
import PlayHunt from "./views/PlayHunt.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      component: Home
    },
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/signin",
      name: "signin",
      component: SignIn,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/showhunts",
      name: "showhunts",
      component: ShowHunts,
      meta: {
        requiresAuth: true
      }
    },

    {
      path: "/newhunt",
      name: "newhunt",
      component: NewHunt,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/edithunt/:index",
      name: "edithunt",
      component: EditHunt,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/playhunt/:index",
      name: "playhunt",
      component: PlayHunt,
      meta: {
        requiresAuth: true
      }
    }
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});

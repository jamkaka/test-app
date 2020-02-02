import Vue from "vue";
import Router from "vue-router";
import store from "./../store/store";
//
import questionRoutes from "./questionRoutes";
import testRoutes from "./testRoutes";
const Login = () => import("./../views/Login");
const Register = () => import("./../views/Register");
const Home = () => import("./../views/Home");
const EditSettings = () => import("./../views/EditSettings");
const NotFound = () => import("./../views/PageNotFound");

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: "/settings",
      name: "EditSettings",
      component: EditSettings,
      meta: { requiresAuth: true }
    },
    ...questionRoutes,
    ...testRoutes,
    {
      path: "/not-found",
      component: NotFound
    },
    {
      path: "*",
      redirect: "/not-found"
    }
  ]
});

router.beforeEach((to, from, next) => {
  const vuex = router.app.$store;
  const vuexAuth = vuex.state.auth;
  if (!vuexAuth.isLoggedIn) vuex.dispatch("auth/authenticateOnInit");
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!vuexAuth.isLoggedIn) {
      next({
        path: "/login"
      });
    } else {
      next();
    }
  } else {
    const checkIfAuthRouter = to.path === "/login" || to.path === "/register";
    if (checkIfAuthRouter && vuexAuth.isLoggedIn) next({ path: "/" });
    next();
  }
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresFreshQuestions))
    await store.dispatch("questions/fetchAndPopulateStoreWithQuestions");
  if (to.matched.some(record => record.meta.requiresFreshTests))
    await store.dispatch("tests/fetchAndPopulateStoreWithTests");
  next();
});

export default router;

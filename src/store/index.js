import { createStore } from "vuex";
import { menuModule } from "./menu";
import { snackBar } from "./snackbar";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    snackbarModule: snackBar,
    menuModule: menuModule,
  },
});

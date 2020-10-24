import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { NavBar, Tabbar, TabbarItem, Picker, Popup } from "vant";

createApp(App)
	.use(NavBar)
	.use(Tabbar)
	.use(TabbarItem)
	.use(Picker)
	.use(Popup)

	.use(store)
	.use(router)
	.mount("#app");

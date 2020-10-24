import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
	{
		path: "/",
		redirect: "/home",
	},
	{
		path: "/home",
		name: "Home",
		component: Home,
		children: [
			{
				path: "/home/:goods",
				name: "Goods",
				component: () => import("../components/GoodsList.vue"),
			},
		],
	},
	{
		path: "/order",
		name: "Order",
		component: () => import("../views/Order.vue"),
	},
	{
		path: "/orders",
		name: "Orders",
		component: () => import("../views/Orders.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;

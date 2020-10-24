<template>
	<div class="app_container">
		<!-- header -->
		<div class="header_box">
			<van-nav-bar
				title="开心点餐"
				left-text="返回"
				right-text="按钮"
				left-arrow
				@click-left="onClickLeft"
				@click-right="onClickRight"
			/>
		</div>
		<!-- content -->
		<div class="content_box">
			<router-view v-slot="{ Component }">
				<transition>
					<component :is="Component"></component>
				</transition>
			</router-view>
		</div>
		<!-- tabbar -->
		<div class="tabbar_box">
			<van-tabbar v-model="active">
				<van-tabbar-item @click="onHome" icon="wap-home-o">
					首页
				</van-tabbar-item>
				<van-tabbar-item
					@click="onOrder"
					icon="shopping-cart-o"
					:badge="goodsNum"
				>
					点单
				</van-tabbar-item>
				<van-tabbar-item
					@click="onOrders"
					icon="todo-list-o"
					:badge="ordersNum"
				>
					今日订单
				</van-tabbar-item>
			</van-tabbar>
		</div>
	</div>
</template>

<script>
import { computed, onMounted, reactive, ref, watchEffect, toRefs } from "vue";
import router from "./router";
import { useStore } from "vuex";
import { onBeforeRouteUpdate } from "vue-router";
import { getOrders } from "./request/http.js";
export default {
	setup() {
		const store = useStore();

		const state = reactive({
			active: 0,
		});
		// 设置tabbar激活的图标
		watchEffect(() => {
			switch (router.currentRoute.value.fullPath) {
				case "/order":
					state.active = 1;
					break;
				case "/orders":
					state.active = 2;
					break;
				default:
					state.active = 0;
			}
		});
		// 点单徽标
		let goodsNum = computed(() => {
			let num = 0;
			store.state.order.list.forEach((Element) => {
				num += Element.num;
			});
			return num;
		});
		// 今日订单徽标
		let ordersNum = computed(() => store.state.orderList.length);
		// 初始化首页和今日订单
		onMounted(() => {
			router.push("/home");
			getOrders().then((res) => {
				store.commit("setOrderList", res.data);
			});
		});
		// 导航按钮处理函数
		function onClickLeft() {}
		function onClickRight() {}
		// tabbar按钮处理函数
		function onHome() {
			store.commit("setActive", 0);
			router.push("/home");
		}
		function onOrder() {
			store.commit("setActive", 1);
			router.push("/order");
		}
		function onOrders() {
			store.commit("setActive", 2);
			router.push("/orders");
		}

		// tabbar点击按钮标识

		return {
			onClickLeft,
			onClickRight,
			onHome,
			onOrder,
			goodsNum,
			onOrders,
			ordersNum,
			...toRefs(state),
		};
	},
};
</script>

<style lang="scss">
body {
	overflow: hidden;
	.app_container {
		box-sizing: border-box;
		overflow: hidden;
		height: 100vh;
		.header_box {
			height: 46px;
		}
		.content_box {
			height: calc(100% - 46px - 50px);
		}
		.tabbar_box {
			height: 50px;
		}
	}

	.v-enter-from {
		opacity: 0;
		transform: translateX(100%);
	}

	.v-leave-to {
		opacity: 0;
		transform: translateX(-100%);
		position: absolute;
	}

	.v-enter-active,
	.v-leave-active {
		transition: all 0.5s ease;
	}
}
</style>

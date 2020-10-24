<template>
	<div class="orders_container">
		<!-- 标题 -->
		<div class="title">
			今日所有订单
		</div>
		<!-- 表头 -->
		<div class="header">
			<span class="s1">单号</span>
			<span class="s2">点单时间</span>
			<span class="s3">买单时间</span>
			<span class="s4">桌号</span>
		</div>
		<!-- 列表 -->
		<div class="order_box">
			<div class="order" v-for="item in list" :key="item.id">
				<span class="s1">{{ item.id }}</span>
				<span class="s2">{{ item.create_time }}</span>
				<span class="s3">{{ item.completed_time }}</span>
				<div class="s4">
					<button
						:disabled="item.completed_time != ''"
						@click="onClick(item.id)"
					>
						{{ item.table_no }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { computed, onMounted, reactive, toRefs } from "vue";
import { getOrder, getOrders } from "../request/http.js";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
	name: "Orders",
	setup() {
		const store = useStore();
		const router = useRouter();
		const state = reactive({
			list: [],
		});
		// 初始化今日订单
		onMounted(() => {
			getOrders().then((res) => {
				store.commit("setOrderList", res.data);
			});
		});
		// 点击按钮查看所选订单
		function onClick(id) {
			getOrder(id).then((res) => {
				store.commit("setOrderId", res.data[0].id);
				store.commit("setTableNo", res.data[0].table_no);
				store.commit("setDatetime", {
					d: res.data[0].create_date,
					t: res.data[0].create_time,
				});
				store.commit("setOrder_list", JSON.parse(res.data[0].list));
				store.commit("setCmpltDateTime", {
					d: res.data[0].completed_date,
					t: res.data[0].completed_time,
				});
				store.commit("setTotalPrice", res.data[0].total_price);
				router.push("/order");
			});
		}
		// 设置渲染的列表数据
		state.list = computed(() => store.state.orderList);

		return { ...toRefs(state), onClick };
	},
};
</script>
<style lang="scss" scoped>
.orders_container {
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 96%;
	.title {
		width: 100%;
		background-color: wheat;
		text-align: center;
	}
	.header {
		border-top: 1px solid #718093;
		border-bottom: 1px solid #718093;
		display: flex;
		width: 100%;
		background-color: wheat;
		span {
			text-align: center;
		}
		.s1 {
			border-right: 1px solid #718093;
			width: 10%;
		}
		.s2 {
			border-right: 1px solid #718093;
			width: 35%;
		}
		.s3 {
			border-right: 1px solid #718093;
			width: 35%;
		}
		.s4 {
			width: 20%;
		}
	}
	.order_box {
		width: 100%;
		overflow-y: auto;
		.order {
			width: 100%;
			display: flex;
			border-bottom: 1px solid #718093;
			span {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 2rem;
			}
			.s1 {
				border-right: 1px solid #718093;
				width: 10%;
			}
			.s2 {
				border-right: 1px solid #718093;
				width: 35%;
			}
			.s3 {
				border-right: 1px solid #718093;
				width: 35%;
			}
			.s4 {
				width: 20%;
				box-sizing: border-box;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 3px;
				button {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
}
</style>

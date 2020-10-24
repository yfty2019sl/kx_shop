<template>
	<div class="order_container">
		<!-- 桌号 -->
		<div class="table_box">
			<div @click="showPicker = true" class="table">
				{{ order.tableNo }}
			</div>
			<van-popup v-model:show="showPicker" round position="bottom">
				<van-picker
					:columns="columns"
					@cancel="onCancel"
					@confirm="onConfirm"
				/>
			</van-popup>
		</div>
		<!-- 时间区 -->
		<div class="create_time">提交时间：{{ order.createTime }}</div>
		<div class="cmplt_time">买单时间：{{ order.completedTime }}</div>
		<!-- 订单内容区 -->
		<div class="order_list">
			<!-- 标题 -->
			<div class="title">
				<span class="t_name">名称</span>
				<span class="t_num">数量</span>
				<span class="t_price">单价</span>
			</div>
			<!-- 列表 -->
			<div class="list_box">
				<div class="scroll_box">
					<div class="list" v-for="item in order.list" :key="item.id">
						<span class="l_name">{{ item.title }}</span>
						<span class="l_num">
							<button @click="onAdd(item)">+</button>
							<span>
								{{ item.num }}
							</span>
							<button @click="onSub(item)">-</button>
						</span>
						<span class="l_price">{{ parseFloat(item.price).toFixed(2) }}</span>
					</div>
				</div>
			</div>
			<!-- 总价区 -->
			<div class="total_price">
				<span class="s_1"></span>
				<span class="s_2">总价：</span>
				<span class="s_3">{{ parseFloat(order.totalPrice).toFixed(2) }}</span>
			</div>
		</div>
		<!-- 底部按钮区 -->
		<div class="btn_box">
			<div class="box_top">
				<button class="submit_btn" @click="onSubmit" :disabled="!btn_disabled">
					提交
				</button>
				<button class="mod_btn" @click="onCancel" :disabled="!btn_disabled">
					取消
				</button>
			</div>
		</div>
	</div>
</template>
<script>
import { computed, reactive, toRefs, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { Toast } from "vant";
import { getDate, getTime } from "../utils/time.js";
import { post, getOrders } from "../request/http.js";
import router from "../router/index.js";
export default {
	name: "Order",
	setup(props, context) {
		const store = useStore();
		// 状态
		const state = reactive({
			// 控制选桌控件显示
			showPicker: false,
			// 控制修改
			btn_disabled: true,
			// 所有桌号
			columns: ["1", "2", "3", "208", "218", "228"],
			// 总价
			totalPrice: 0.0,
			// 订单列表
			order: {
				orderId: null,
				tableNo: "选桌",
				createDate: "",
				createTime: "",
				completedDate: "",
				completedTime: "",
				totalPrice: 0.0,
				list: [],
			},
		});
		// 选桌确定处理函数
		function onConfirm(value) {
			store.commit("setTableNo", value);
			state.showPicker = false;
		}
		// 选桌取消处理函数
		function onCancel() {
			store.commit("setTableNo", "桌号");
			state.showPicker = false;
		}
		// 使用计算属性赋值列表
		state.order = computed(() => store.state.order);
		// 计算总价
		state.totalPrice = computed(() => {
			let t_price = ref(0.0);
			state.order.list.forEach((element) => {
				t_price.value += element.num * element.price;
			});
			return t_price.value;
		});
		watchEffect(() => {
			store.commit("setTotalPrice", state.totalPrice);
		});

		// 数量加减处理函数
		function onAdd(item) {
			item.num++;
			store.commit("addGood", {
				good: item,
				cate: router.currentRoute.value.params.goods,
			});
		}

		function onSub(item) {
			if (item.num > 0) {
				item.num--;
				store.commit("subGood", {
					good: item,
					cate: router.currentRoute.value.params.goods,
				});
			}
		}

		// 提交事件处理函数
		function onSubmit() {
			// 符合条件才可以提交
			if (state.order.list.length <= 0) {
				Toast.fail("您还没有点餐");
			} else if (state.order.tableNo === "选桌") {
				Toast.fail("您还没有选餐桌号");
			} else {
				// 记录创建时间
				const data = getDate();
				const time = getTime();
				store.commit("setDatetime", { d: data, t: time });

				post(state.order).then((res) => {
					console.log(res);
					store.commit("setOrderId", res.data.insertId);
					//提交后，提交按钮不可用，取消按钮不可用
					state.btn_disabled = false;
					//清空所有数据，跳转到首页
					store.commit("resetData");
					// 设置tabbar按钮哪个为激活样式
					store.commit("setActive", 0);
					// 获取今日订单
					getOrders().then((res) => {
						store.commit("setOrderList", res.data);
					});
					// 返回首页
					router.push("/home");
				});
			}
		}

		// 取消按钮处理函数
		function onCancel() {
			store.commit("resetData");
		}

		return {
			...toRefs(state),
			onConfirm,
			onCancel,
			onSubmit,
			onCancel,
			onAdd,
			onSub,
		};
	},
};
</script>
<style lang="scss" scoped>
.order_container {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	.table_box {
		width: 100%;
		height: 5rem;
		display: flex;
		justify-content: center;
		align-items: center;

		.table {
			box-sizing: border-box;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 0.5rem;
			width: 3rem;
			height: 3rem;
			background-color: #e84118;
			border: 1px solid #eee;
			border-radius: 1.5rem;
			box-shadow: 0 0 0 5px #dcdde1;
			color: yellow;
		}
		.table:active {
			box-sizing: border-box;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 1rem;
			width: 3rem;
			height: 3rem;
			background-color: #e84118;
			border: 1px solid #eee;
			border-radius: 1.5rem;
			box-shadow: 0 0 0 10px #dcdde1;
			color: yellow;
		}
	}
	.create_time {
		width: 96%;
	}
	.cmplt_time {
		width: 96%;
	}
	.order_list {
		width: 96%;
		overflow: auto;
		.title {
			border-bottom: 1px solid #718093;
			background-color: wheat;
			width: 100%;
			display: flex;
			span {
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.t_name {
				width: 50%;
			}
			.t_price {
				width: 30%;
			}
			.t_num {
				width: 20%;
			}
		}
		.list_box {
			width: 100%;
			.scroll_box {
				width: 100%;
				.list {
					width: 100%;
					height: 2rem;
					display: flex;
					border-bottom: 1px solid #718093;
					span {
						display: flex;
						align-items: center;
						justify-content: center;
					}
					.l_name {
						width: 50%;
						border-right: 1px solid #718093;
					}
					.l_price {
						width: 30%;
					}
					.l_num {
						width: 20%;
						border-right: 1px solid #718093;
						button {
							width: 30%;
						}
						span {
							width: 40%;
						}
					}
				}
			}
		}

		.total_price {
			display: flex;
			background-color: wheat;
			span {
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.s_1 {
				width: 50%;
			}
			.s_2 {
				width: 20%;
			}
			.s_3 {
				width: 30%;
			}
		}
	}
	.btn_box {
		color: yellow;
		margin-top: 0.5rem;
		width: 96%;
		display: flex;
		flex-direction: column;
		align-items: center;
		.box_top {
			display: flex;
			justify-content: space-evenly;
			width: 100%;
			.submit_btn {
				border-radius: 0.5rem;
				width: 40%;
				background-color: #9c88ff;
			}
			.mod_btn {
				border-radius: 0.5rem;
				width: 40%;
				background-color: #4cd137;
			}
		}
	}
}
</style>

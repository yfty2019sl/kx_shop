<template>
	<div class="home_container">
		<!-- 分类 -->
		<div class="cate_box">
			<div :class="isActive === 're' ? 'active_btn' : 'btn'" @click="onRe">
				热
			</div>
			<div :class="isActive === 'tang' ? 'active_btn' : 'btn'" @click="onTang">
				汤
			</div>
			<div
				:class="isActive === 'liang' ? 'active_btn' : 'btn'"
				@click="onLiang"
			>
				凉
			</div>
			<div :class="isActive === 'bai' ? 'active_btn' : 'btn'" @click="onBai">
				白
			</div>
			<div :class="isActive === 'hong' ? 'active_btn' : 'btn'" @click="onHong">
				红
			</div>
			<div :class="isActive === 'pi' ? 'active_btn' : 'btn'" @click="onPi">
				啤
			</div>
			<div :class="isActive === 'yin' ? 'active_btn' : 'btn'" @click="onYin">
				饮
			</div>
			<div :class="isActive === 'zhu' ? 'active_btn' : 'btn'" @click="onZhu">
				主
			</div>
		</div>
		<!-- 商品列表 -->
		<div class="goods_box" @scroll="onScroll">
			<router-view v-slot="{ Component }">
				<transition>
					<component :is="Component"></component>
				</transition>
			</router-view>
		</div>
	</div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import router from "../router";
import { get } from "../request/http.js";
import { useStore } from "vuex";
export default {
	name: "home",
	setup() {
		const store = useStore();

		// 状态Goods
		const state = reactive({
			isActive: "re",

			goods: {
				params: {
					cate: "re",
					pageNo: 1,
				},
				count: 0,
				list: [],
			},
		});

		onMounted(() => {
			router.push("/home/re");
			getGoods(state.goods.params);
		});
		// 根据参数从服务器获取数据
		function getData(params) {
			get(params).then((res) => {
				state.goods.count = res.data.count;
				state.goods.list = res.data.goods;
				state.goods.params.pageNo++;
				// 将商品存到公共状态中
				store.commit("setData", state.goods);
			});
		}
		// 如果没有缓存数据则请求数据，有则显示缓存即可
		function getGoods(params) {
			if (store.state.goods[params.cate].list.length === 0) {
				getData(params);
			}
		}
		// 滚动事件处理函数
		function onScroll(e) {
			// 如果列表长度小于商品总数则可以请求数据
			if (
				store.state.goods[state.goods.params.cate].list.length <
				store.state.goods[state.goods.params.cate].count
			) {
				// 当滚动到底时请求数据
				if (
					e.srcElement.clientHeight + e.srcElement.scrollTop ===
					e.srcElement.scrollHeight
				) {
					getData({
						cate: state.goods.params.cate,
						pageNo: store.state.goods[state.goods.params.cate].pageNo,
					});
				}
			}
		}

		// 按钮事件函数
		function onRe() {
			router.push("/home/re");
			state.isActive = "re";
			state.goods.params.cate = "re";
			state.goods.params.pageNo = store.state.goods.re.pageNo;
			getGoods(state.goods.params);
		}
		function onTang() {
			router.push("/home/tang");
			state.isActive = "tang";
			state.goods.params.cate = "tang";
			state.goods.params.pageNo = store.state.goods.tang.pageNo;
			getGoods(state.goods.params);
		}
		function onLiang() {
			router.push("/home/liang");
			state.isActive = "liang";
			state.goods.params.cate = "liang";
			state.goods.params.pageNo = store.state.goods.liang.pageNo;
			getGoods(state.goods.params);
		}
		function onBai() {
			router.push("/home/bai");
			state.isActive = "bai";
			state.goods.params.cate = "bai";
			state.goods.params.pageNo = store.state.goods.bai.pageNo;
			getGoods(state.goods.params);
		}
		function onHong() {
			router.push("/home/hong");
			state.isActive = "hong";
			state.goods.params.cate = "hong";
			state.goods.params.pageNo = store.state.goods.hong.pageNo;
			getGoods(state.goods.params);
		}
		function onPi() {
			router.push("/home/pi");
			state.isActive = "pi";
			state.goods.params.cate = "pi";
			state.goods.params.pageNo = store.state.goods.pi.pageNo;
			getGoods(state.goods.params);
		}
		function onYin() {
			router.push("/home/yin");
			state.isActive = "yin";
			state.goods.params.cate = "yin";
			state.goods.params.pageNo = store.state.goods.yin.pageNo;
			getGoods(state.goods.params);
		}
		function onZhu() {
			router.push("/home/zhu");
			state.isActive = "zhu";
			state.goods.params.cate = "zhu";
			state.goods.params.pageNo = store.state.goods.zhu.pageNo;
			getGoods(state.goods.params);
		}

		return {
			...toRefs(state),
			onRe,
			onTang,
			onLiang,
			onZhu,
			onBai,
			onHong,
			onPi,
			onYin,
			onScroll,
		};
	},
};
</script>
<style lang="scss" scoped>
.home_container {
	width: 100%;
	height: 100%;
	display: flex;
	.cate_box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		width: 20%;
		height: 100%;
		background-color: #353b48;
		.btn {
			width: 3rem;
			height: 3rem;
			border-radius: 1.5rem;
			background-color: #e84118;
			color: yellow;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.active_btn {
			box-sizing: border-box;
			width: 3rem;
			height: 3rem;
			border-radius: 1.5rem;
			background-color: #e84118;
			color: yellow;
			display: flex;
			justify-content: center;
			align-items: center;
			border: 1px solid #fff;
			box-shadow: 0px 0px 5px 10px #fff;
		}
	}
	.goods_box {
		width: 80%;
		height: 100%;
		background-color: #40739e;
		overflow-y: auto;
	}
}
</style>

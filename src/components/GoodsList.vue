<template>
	<div class="goods_container">
		<div class="item" v-for="item in goods.list" :key="item.id">
			<img :src="item.img" />
			<div class="desc_box">
				<span>{{ item.title }}</span>
				<span>{{ parseFloat(item.price).toFixed(2) }}</span>
			</div>
			<div class="btn_box">
				<button class="add" @click="add(item)">+</button>
				<span>x {{ item.num }}</span>
				<button class="sub" @click="sub(item)" :disabled="item.num === 0">
					-
				</button>
			</div>
		</div>
	</div>
</template>
<script>
import { computed, reactive, toRefs, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
	name: "GoodsList",
	setup() {
		const store = useStore();

		const router = useRouter();

		const state = reactive({
			goods: {},
		});

		state.goods = computed(() => {
			return store.state.goods[router.currentRoute.value.params.goods];
		});

		function add(item) {
			item.num++;
			store.commit("addGood", {
				good: item,
				cate: router.currentRoute.value.params.goods,
			});
		}

		function sub(item) {
			if (item.num > 0) {
				item.num--;
				store.commit("subGood", {
					good: item,
					cate: router.currentRoute.value.params.goods,
				});
			}
		}

		return { ...toRefs(state), add, sub };
	},
};
</script>
<style lang="scss" scoped>
.goods_container {
	// overflow-y: auto;
	box-sizing: border-box;
	padding: 0 10px;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	.item {
		background-color: #9c88ff;
		margin: 0.5rem;
		border-radius: 5px;
		padding: 5px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100px;
		width: 100%;
		img {
			border-radius: 5px;
			box-sizing: border-box;
			width: 30%;
			height: 100%;
		}
		.desc_box {
			color: yellow;
			font-size: 14px;
			padding: 5px;
			box-sizing: border-box;
			width: 50%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
		}
		.btn_box {
			background-color: #2f3640;
			color: #fff;
			padding: 5px;
			box-sizing: border-box;
			width: 20%;
			height: 100%;
			border-radius: 5px;
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			align-items: center;
			button {
				height: 40%;
				width: 100%;
				border-radius: 5px;
				font-size: 1.5rem;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.add {
				background-color: #7f8fa6;
			}
			.sub {
				background-color: #e84118;
			}
		}
	}
}
</style>

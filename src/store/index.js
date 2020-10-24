import { createStore } from "vuex";

export default createStore({
	state: {
		active: 0,
		goods: {
			re: {
				count: 0,
				pageNo: 1,
				list: [],
			},
			tang: {
				count: 0,
				pageNo: 1,
				list: [],
			},
			liang: {
				count: 0,
				pageNo: 1,
				list: [],
			},
			bai: {
				count: 0,
				pageNo: 1,
				list: [],
			},
			hong: {
				count: 0,
				pageNo: 1,
				list: [],
			},
			pi: {
				count: 0,
				pageNo: 1,
				list: [],
			},
			yin: {
				count: 0,
				pageNo: 1,
				list: [],
			},
			zhu: {
				count: 0,
				pageNo: 1,
				list: [],
			},
		},
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
		orderList: [],
	},
	mutations: {
		// 设置state.goods的数据
		setData(state, data) {
			switch (data.params.cate) {
				case "re":
					state.goods.re.count = data.count;
					state.goods.re.pageNo = data.params.pageNo;
					state.goods.re.list = state.goods.re.list.concat(data.list);
					break;
				case "tang":
					state.goods.tang.count = data.count;
					state.goods.tang.pageNo = data.params.pageNo;
					state.goods.tang.list = state.goods.tang.list.concat(data.list);
					break;
				case "liang":
					state.goods.liang.count = data.count;
					state.goods.liang.pageNo = data.params.pageNo;
					state.goods.liang.list = state.goods.liang.list.concat(data.list);
					break;
				case "bai":
					state.goods.bai.count = data.count;
					state.goods.bai.pageNo = data.params.pageNo;
					state.goods.bai.list = state.goods.bai.list.concat(data.list);
					break;
				case "hong":
					state.goods.hong.count = data.count;
					state.goods.hong.pageNo = data.params.pageNo;
					state.goods.hong.list = state.goods.hong.list.concat(data.list);
					break;
				case "pi":
					state.goods.pi.count = data.count;
					state.goods.pi.pageNo = data.params.pageNo;
					state.goods.pi.list = state.goods.pi.list.concat(data.list);
					break;
				case "yin":
					state.goods.yin.count = data.count;
					state.goods.yin.pageNo = data.params.pageNo;
					state.goods.yin.list = state.goods.yin.list.concat(data.list);
					break;
				case "zhu":
					state.goods.zhu.count = data.count;
					state.goods.zhu.pageNo = data.params.pageNo;
					state.goods.zhu.list = state.goods.zhu.list.concat(data.list);
					break;
			}
		},
		// 处理+按钮的逻辑
		addGood(state, data) {
			// 判断订单中有没有这个商品
			let index = state.order.list.findIndex((item) => {
				return item.id === data.good.id;
			});
			// 如果没有
			if (index === -1) {
				// 添加这个商品
				state.order.list.push(data.good);
			} else {
				// 如果有 将传过来的商品数据赋值给state.order
				state.order.list[index] = data.good;
			}

			// 修改state.goods的相应数据
			state.goods[data.cate].list.forEach((element) => {
				if (element.id === data.good.id) {
					element = data.good;
				}
			});
		},
		// 处理-按钮的逻辑
		subGood(state, data) {
			// 取index
			let index = state.order.list.findIndex((item) => {
				return item.id === data.good.id;
			});

			// 判断商品数量是不是0
			if (data.good.num === 0) {
				// 是0把商品从state.order中删除
				state.order.list.splice(index, 1);
			} else {
				// 把传来的数据赋值给state.order
				state.order.list[index] = data.good;
			}

			// 修改state.goods的相应数据
			state.goods[data.cate].list.forEach((element) => {
				if (element.id === data.good.id) {
					element = data.good;
				}
			});
		},
		// 储存orderId
		setOrderId(state, id) {
			state.order.orderId = id;
		},
		// 清空所有数据
		resetData(state) {
			// 清楚订单数据
			state.order = {
				orderId: null,
				tableNo: "选桌",
				createDate: "",
				createTime: "",
				completedDate: "",
				completedTime: "",
				totalPrice: 0.0,
				list: [],
			};
			// 清除分类显示数据
			state.goods = {
				re: {
					count: 0,
					pageNo: 1,
					list: [],
				},
				tang: {
					count: 0,
					pageNo: 1,
					list: [],
				},
				liang: {
					count: 0,
					pageNo: 1,
					list: [],
				},
				bai: {
					count: 0,
					pageNo: 1,
					list: [],
				},
				hong: {
					count: 0,
					pageNo: 1,
					list: [],
				},
				pi: {
					count: 0,
					pageNo: 1,
					list: [],
				},
				yin: {
					count: 0,
					pageNo: 1,
					list: [],
				},
				zhu: {
					count: 0,
					pageNo: 1,
					list: [],
				},
			};
		},
		// 设置active
		setActive(state, value) {
			state.active = value;
		},
		// 设置桌号
		setTableNo(state, value) {
			state.order.tableNo = value;
		},
		// 设置总价
		setTotalPrice(state, value) {
			state.order.totalPrice = value;
		},
		// 设置创建时间
		setDatetime(state, params) {
			state.order.createDate = params.d;
			state.order.createTime = params.t;
		},
		// 设置orderList
		setOrderList(state, data) {
			state.orderList = data;
		},
		// 设置买单时间
		setCmpltDateTime(state, params) {
			state.order.completedDate = params.d;
			state.order.completedTime = params.t;
		},
		// 设置state.order.list
		setOrder_list(state, data) {
			state.order.list = data;
		},
	},
	actions: {},
	getters: {},
	modules: {},
});

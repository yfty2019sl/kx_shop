import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api";
// 获取商品数据
export function get(params) {
	return new Promise((resolve, reject) => {
		axios
			.get("/goods", { params })
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
}
// 提交订单数据
export function post(params) {
	return new Promise((resolve, reject) => {
		axios
			.post("/order", params)
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
}
// 获取所有订单
export function getOrders() {
	return new Promise((resolve, reject) => {
		axios
			.get("/orders")
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
}
// 根据id获取订单
export function getOrder(id) {
	return new Promise((resolve, reject) => {
		axios
			.get("/order", {
				params: {
					orderId: id,
				},
			})
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

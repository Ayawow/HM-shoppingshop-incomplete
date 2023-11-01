import { changeCount, getCartList, delSelect } from "@/api/cart"
import { Toast } from "vant"

export default {
    namespaced: true,
    state() {
        return {
            cartList: []
        }
    },
    mutations: {
        setCartList(state, newList) {
            state.cartList = newList
        },

        toggleCheck(state, goodsId) {
            const goods = state.cartList.find(item => item.goods_id === goodsId)
            goods.isChecked = !goods.isChecked
        },
        toggleAllCheck(state, flag) {
            state.cartList.forEach(item => {
                item.isChecked = flag
            })
        },

        changeCount(state, { goodsId, value }) {
            const obj = state.cartList.find(item => item.goods_id === goodsId)
            obj.goods_num = value
        }
    },
    actions: {
        async getCartAction(context) {
            const { data } = await getCartList()
            data.list.forEach(item => {
                item.isChecked = true
            });
            context.commit('setCartList', data.list)
        },
        async changeCountAction(context, obj) {
            const { goodsId, value, skuId } = obj
            //本地
            context.commit('changeCount', {
                goodsId,
                value
            })
            //后台
            await changeCount(goodsId, value, skuId)
        },
        async delSelect(context) {
            const selectCartList = context.getters.selectCartList
            const cartIds = selectCartList.map(item => item.id)
            await delSelect(cartIds)
            Toast('删除成功')

            context.dispatch('getCartAction')
        }

    },
    getters: {
        //商品总数
        cartTotal(state) {
            return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
        },

        //选中商品
        selectCartList(state) {
            return state.cartList.filter(item => item.isChecked)

        },

        //选中的总数
        selCount(state, getters) {
            return getters.selectCartList.reduce((sum, item) => sum + item.goods_num, 0)
        },

        //选中商品总价
        selPrice(state, getters) {
            return getters.selectCartList.reduce((sum, item) => sum + item.goods_num * item.goods.goods_price_min, 0).toFixed(2)
        },

        //全选
        isAllChecked(state) {
            return state.cartList.every(item => item.isChecked)
        }
    }
}
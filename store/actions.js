const actions = {
    add({ commit, state }, cart) {
        commit('setCart', cart)
    },
}

export default actions

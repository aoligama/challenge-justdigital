const actions = {
    add({ commit, state }, cart) {
        commit('setCart', cart)
    },
    updateInventory({ commit, state }, inventory) {
        commit('setInventory', inventory)
    }
}

export default actions

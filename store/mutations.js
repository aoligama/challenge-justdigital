const mutations = {
    showSnackbar (state, value) {
      state.snackbar.show = true
      state.snackbar.text = value.text
      state.snackbar.timeout = value.timeout ? value.timeout : 5000
      state.snackbar.color = value.color ? value.color : 'primary'
      state.snackbar.top = value.top ? value.top : false
      state.snackbar.textclose = 'Fechar'
    }
}
  
export default mutations
  
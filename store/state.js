const state = () => ({
  snackbar: {
    show: false,
    text: '',
    timeout: 3000,
    color: 'primary',
    top: false
  },
  cart: [],
  inventory: [],
  showCart: false
})
  
export default state

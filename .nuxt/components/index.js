export { default as Header } from '../../components/Header.vue'
export { default as ProductsList } from '../../components/ProductsList.vue'

export const LazyHeader = import('../../components/Header.vue' /* webpackChunkName: "components/header" */).then(c => c.default || c)
export const LazyProductsList = import('../../components/ProductsList.vue' /* webpackChunkName: "components/products-list" */).then(c => c.default || c)

import geo from './modules/geo'
import home from './modules/home'
export const modules = {
  geo,
  home
}
export const actions = {
  async nuxtServerInit ({ commit }, { req, app }) {
    const { status: status1, data: { province, city } } = await app.$axios.get('/geo/getPosition')
    commit('geo/setPosition', status1 === 200 ? { city, province } : { city: '', province: '' })
    const { status: status2, data: { menu } } = await app.$axios.get('geo/menu')
    commit('home/setMenu', status2 === 200 ? menu : [])
    const { status: status3, data: { result } } = await app.$axios.get('/search/hotPlace', {
      params: {
        city: app.store.state.geo.position.city.replace('市', '')
      }
    })
    commit('home/setHotPlace', status3 === 200 ? result : [])
  }
}

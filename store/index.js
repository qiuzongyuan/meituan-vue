import geo from './modules/geo'
import home from './modules/home'

export const modules = {
  geo,
  home
}
export const actions = {
  async nuxtServerInit ({ commit }, { req, app }) {
    let cookie, city
    if (req.headers.cookie) {
      if (req.headers.cookie.includes('city')) {
        cookie = decodeURIComponent(req.headers.cookie)
        let array = cookie.split(';')
        array = array.filter(item => item.includes('city') === true)
        const string = array[0].trim().split('=')[1]
        const obj = JSON.parse(string)
        city = obj.geo.position.city
      } else {
        return false
      }
    }
    if (city) {
      commit('geo/setPosition', city)
      const { status: status2, data: { result } } = await app.$axios.get('/search/hotPlace', {
        params: {
          city: city.replace('市', '')
        }
      })
      commit('home/setHotPlace', status2 === 200 ? result : [])
    } else {
      const { status: status1, data: { city, province } } = await app.$axios.get('/geo/getPosition')
      commit('geo/setPosition', status1 === 200 ? { city, province } : { city: '', province: '' })
      const { status: status2, data: { result } } = await app.$axios.get('/search/hotPlace', {
        params: {
          city: app.store.state.geo.position.city.replace('市', '')
        }
      })
      commit('home/setHotPlace', status2 === 200 ? result : [])
    }
    const { status: status3, data: { menu } } = await app.$axios.get('/geo/menu')
    commit('home/setMenu', status3 === 200 ? menu : [])
  }
}

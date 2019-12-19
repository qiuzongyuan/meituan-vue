import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'city',
      paths: ['geo'],
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: false }),
        removeItem: key => Cookies.remove(key)
      }
    })(store)
  })
}

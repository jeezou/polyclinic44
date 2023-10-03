export const state = () => ({
  api: 'https://api.dgp44.spb.ru/wp-json/wp/v2',
  posts: 'https://api.dgp44.spb.ru/wp-json/wp/v2/posts',
  tags: 'https://api.dgp44.spb.ru/wp-json/wp/v2/tags',
  wpJson: 'https://api.dgp44.spb.ru/wp-json',

  isAlert: true,

  isPopup: false,
  popupText: null,
  popupStatus: 'ok',

  isMetaMenu: false,
  metaMenuType: '',
})

export const mutations = {
  closeAlert(state) {
    state.isAlert = false
  },
  openAlert(state) {
    state.isAlert = true
  },
  openPopup(state, data) {
    state.popupText = data.text
    state.isPopup = true
    state.popupStatus = data.type
  },
  closePopup(state) {
    state.isPopup = false
  },
  openMetaMenu(state, val) {
    state.isMetaMenu = true
    state.metaMenuType = val
  },
  closeMetaMenu(state) {
    state.isMetaMenu = false
    state.metaMenuType = ''
  },
}

export const actions = {
  popup({ commit }, text) {
    commit('openPopup', text)
    setTimeout(() => {
      commit('closePopup')
    }, 4000)
  },
}

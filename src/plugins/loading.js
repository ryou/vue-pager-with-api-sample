import Vue from 'vue'
import Loading from '../components/Loading'

class LoadingManager {
  constructor() {
    this.vm = null
    this.counter = 0
  }

  _createElement() {
    const node = document.createElement('div')
    document.body.appendChild(node)

    this.vm = new Vue({
      el: node,

      render: h =>
        h(Loading, {
          ref: 'loading',
        }),
    })
  }

  show() {
    if (this.vm === null) {
      this._createElement()
    }

    this.vm.$refs.loading.show()
    this.counter++
  }

  hide() {
    this.counter--

    if (this.counter <= 0) {
      this.vm.$refs.loading.hide()
    }
  }
}

export default {
  install(Vue) {
    Vue.prototype.$loading = new LoadingManager()
  },
}

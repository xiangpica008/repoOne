import Vue from 'vue'
import App from './App'

import md5 from "/common/libs/md5.js"
Vue.component("md5",md5)

import jim from "/common/libs/jmessage-wxapplet-sdk-1.4.0.min.js"
Vue.component("jim",jim)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

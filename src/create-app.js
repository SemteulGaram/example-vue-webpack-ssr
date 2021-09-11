import Vue from "vue"
import VueMeta from 'vue-meta'

import Hello from "./Hello.vue"

Vue.use(VueMeta)

export function createApp() {
  const app = new Vue({
    el: "#app",
    render: cretaeElement => cretaeElement(Hello)
  })

  return { app }
}

const Vue = require('vue');
const VueRouter = require('vue-router');
const routes = require('./routes')
const App = require('./app.vue');
Vue.use(VueRouter);
const router = new VueRouter({
  routes: routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});

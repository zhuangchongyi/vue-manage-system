import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import i18n from './lang';
import VueParticles from 'vue-particles'
import cookie from 'vue-cookie';
import directive from './directives';
import store from './store';

import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import 'babel-polyfill';
import './settings';
import './permission';
import './icons';

Vue.config.productionTip = false;

Vue.use(VueI18n);
Vue.use(ElementUI, {
  size: 'small',
  i18n: (key, value) => i18n.t(key, value)
});
Vue.use(directive);
Vue.use(VueParticles)


Vue.prototype.$cookie = cookie;

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app');
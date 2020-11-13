import dialogDrag from './dialogDrag'


const install = function (Vue) {
  Vue.directive('dialogDrag', dialogDrag) //v-dialogDrag
}

if (window.Vue) {
  window['dialogDrag'] = dialogDrag
  Vue.use(install); // eslint-disable-line
}

export default install
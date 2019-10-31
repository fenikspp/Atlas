import DropDown from '../../components/plugins/Dropdown/Main.vue'

const DropdownPlugin = {
    install(Vue) {
        Vue.component('drop-down', DropDown)
    }
}

export default DropdownPlugin
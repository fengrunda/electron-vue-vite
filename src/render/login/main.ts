import { createApp } from 'vue'
import LoginForm from './login-form.vue'
import {
  Form,
  Input,
  Button,
} from 'ant-design-vue'

createApp(LoginForm)
  .use(Form)
  .use(Input)
  .use(Button)
  .mount('#app')
  .$nextTick(window.removeLoading)

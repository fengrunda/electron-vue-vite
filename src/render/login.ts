import { createApp } from 'vue'
import LoginForm from './login-form.vue'
import {
  Card,
  Form,
  Input,
  Button,
} from 'ant-design-vue'

createApp(LoginForm)
.use(Card)
  .use(Form)
  .use(Input)
  .use(Button)
  .mount('#app')
  .$nextTick(window.bridge.removeLoading)

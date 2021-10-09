<template>
  <div class="login-panel">
    <div class="login-left">
      <h1 style="margin: 140px 0 0 44px">BANNER</h1>
    </div>
    <div class="login-right">
      <a-card>
        <a-form
          ref="formRef"
          :model="formState"
          :rules="formRules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-item label="用户" name="username">
            <a-input
              v-model:value="formState.username"
              placeholder="请输入用户"
            />
          </a-form-item>
          <a-form-item label="密码" name="password">
            <a-input
              v-model:value="formState.password"
              placeholder="请输入密码"
              type="password"
            />
          </a-form-item>
          <a-form-item style="text-align: center">
            <a-button type="primary" @click="onSubmit">登录</a-button>
            <a-button style="margin-left: 10px" @click="onReset">重置</a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import type { UnwrapRef } from "vue";

interface FormState {
  username: string;
  password: string;
}

const initFormState = {
  username: "",
  password: "",
};

export default defineComponent({
  setup() {
    const formRef = ref();
    const formState: UnwrapRef<FormState> = reactive({ ...initFormState });
    const formRules = {
      username: [
        {
          required: true,
          message: "请输入用户",
        },
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
        },
      ],
    };

    const onSubmit = () => {
      formRef.value
        .validate()
        .then((values) => {
          console.log("User info", values);
          window.bridge.login();
        })
        .catch((error) => {
          console.warn("Validate error:", error);
        });
    };

    const onReset = () => {
      formRef.value.resetFields();
    };

    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      formRef,
      formState,
      formRules,
      onSubmit,
      onReset,
    };
  },
});
</script>

<style lang="less">
.login-panel {
  display: flex;
  width: 100%;
  height: 100%;

  .login-left {
    width: 200px;
  }

  .login-right {
    flex-grow: 1;
    width: 0;

    .ant-card {
      height: 100%;
    }
  }
}
</style>

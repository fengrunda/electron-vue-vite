<template>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="formRules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item label="用户" name="username">
      <a-input v-model:value="formState.username" placeholder="请输入用户" />
    </a-form-item>
    <a-form-item label="密码" name="password">
      <a-input
        v-model:value="formState.password"
        placeholder="请输入密码"
        type="password"
      />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">登录</a-button>
      <a-button style="margin-left: 10px" @click="onReset">重置</a-button>
    </a-form-item>
  </a-form>
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


<template>
  <div class="login-panel">
    <div class="login-left">
      <h1 style="margin: 140px 0 0 44px">BANNER</h1>
    </div>
    <div class="login-right">
      <el-card>
        <div style="height: 90px;" />
        <el-form
          ref="formRef"
          :model="formState"
          :rules="formRules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <el-form-item label="用户" prop="username">
            <el-input
              v-model="formState.username"
              placeholder="请输入用户"
            />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="formState.password"
              placeholder="请输入密码"
              type="password"
            />
          </el-form-item>
          <el-form-item style="text-align: center">
            <el-button type="primary" @click="onSubmit">登录</el-button>
            <el-button style="margin-left: 10px" @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
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
    flex-shrink: 0;
  }

  .login-right {
    flex-grow: 1;
    width: calc(100% - 200px);

    .el-card {
      height: 100%;
    }
  }
}
</style>

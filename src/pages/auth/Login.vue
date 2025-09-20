<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1>药品处方管理系统</h1>
        <p>请登录您的账户</p>
      </div>

      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        class="login-form"
        @submit.prevent="handleLogin"
      >
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
            size="large"
            :prefix-icon="User"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            size="large"
            :prefix-icon="Lock"
            show-password
          />
        </el-form-item>

        <el-form-item prop="captcha">
          <Captcha v-model="form.captcha" @change="onCaptchaChange" />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            size="large"
            :loading="loading"
            @click="handleLogin"
            class="login-btn"
          >
            {{ loading ? '登录中...' : '登录' }}
          </el-button>
        </el-form-item>
      </el-form>

      <div class="login-footer">
        <p>
          还没有账户？
          <el-button type="text" @click="goToRegister">立即注册</el-button>
        </p>
        <p class="demo-account">
          <el-tag type="info" size="small">演示账户：admin / 123456</el-tag>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { User, Lock } from '@element-plus/icons-vue';
import type { LoginForm } from '../../types/auth';
import Captcha from '../../components/Captcha.vue';
import { useAuthStore } from '../../stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const formRef = ref();
const loading = ref(false);
const captchaRef = ref();

const form = reactive<LoginForm>({
  username: '',
  password: '',
  captcha: '',
});

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      min: 3,
      max: 20,
      message: '用户名长度在 3 到 20 个字符',
      trigger: 'blur',
    },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' },
  ],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { len: 4, message: '验证码长度为 4 位', trigger: 'blur' },
  ],
};

const onCaptchaChange = (value: string) => {
  form.captcha = value;
};

const handleLogin = async () => {
  if (!formRef.value) return;

  try {
    await formRef.value.validate();

    // 验证验证码
    if (captchaRef.value && !captchaRef.value.verifyCaptcha(form.captcha)) {
      ElMessage.error('验证码错误');
      captchaRef.value.refreshCaptcha();
      return;
    }

    loading.value = true;

    const result = await authStore.loginUser(
      form.username,
      form.password,
      form.captcha
    );

    if (result.success) {
      ElMessage.success('登录成功');
      router.push('/');
    } else {
      ElMessage.error(result.message || '登录失败');
      captchaRef.value?.refreshCaptcha();
    }
  } catch (error) {
    console.error('Login error:', error);
  } finally {
    loading.value = false;
  }
};

const goToRegister = () => {
  router.push('/register');
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.login-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h1 {
  margin: 0 0 10px 0;
  color: #303133;
  font-size: 28px;
  font-weight: bold;
}

.login-header p {
  margin: 0;
  color: #606266;
  font-size: 14px;
}

.login-form {
  margin-bottom: 20px;
}

.login-btn {
  width: 100%;
  height: 45px;
  font-size: 16px;
  font-weight: 500;
}

.login-footer {
  text-align: center;
}

.login-footer p {
  margin: 10px 0;
  color: #606266;
  font-size: 14px;
}

.demo-account {
  margin-top: 20px;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .login-card {
    padding: 30px 20px;
    margin: 10px;
  }

  .login-header h1 {
    font-size: 24px;
  }
}
</style>

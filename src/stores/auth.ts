import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User } from '../types/auth';
import { login, register, logout } from '../api/auth';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);
  const loading = ref(false);

  // 计算属性
  const isAuthenticated = computed(() => !!user.value && !!token.value);
  const isAdmin = computed(() => user.value?.role === 'admin');

  // 初始化认证状态
  const initAuth = async () => {
    loading.value = true;
    try {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        token.value = storedToken;
        user.value = JSON.parse(storedUser);
      }
    } catch (error) {
      console.error('Failed to init auth:', error);
      clearAuth();
    } finally {
      loading.value = false;
    }
  };

  // 登录
  const loginUser = async (
    username: string,
    password: string,
    captcha: string
  ) => {
    loading.value = true;
    try {
      const response = await login({ username, password, captcha });

      if (response.success && response.user && response.token) {
        user.value = response.user;
        token.value = response.token;

        // 保存到 localStorage
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);

        return { success: true };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: '登录失败，请重试' };
    } finally {
      loading.value = false;
    }
  };

  // 注册
  const registerUser = async (
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    captcha: string
  ) => {
    loading.value = true;
    try {
      const response = await register({
        username,
        email,
        password,
        confirmPassword,
        captcha,
      });

      if (response.success && response.user && response.token) {
        user.value = response.user;
        token.value = response.token;

        // 保存到 localStorage
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);

        return { success: true };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, message: '注册失败，请重试' };
    } finally {
      loading.value = false;
    }
  };

  // 登出
  const logoutUser = async () => {
    loading.value = true;
    try {
      await logout();
      clearAuth();
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      clearAuth(); // 即使 API 失败也清除本地状态
      return { success: true };
    } finally {
      loading.value = false;
    }
  };

  // 清除认证状态
  const clearAuth = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return {
    user,
    token,
    loading,
    isAuthenticated,
    isAdmin,
    initAuth,
    loginUser,
    registerUser,
    logoutUser,
    clearAuth,
  };
});

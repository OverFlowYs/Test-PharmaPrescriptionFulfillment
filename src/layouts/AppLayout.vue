<template>
  <el-container style="height: 100vh">
    <el-aside width="200px" style="background-color: #304156">
      <div class="logo">
        <h3 style="color: white; text-align: center; margin: 20px 0">
          药品管理系统
        </h3>
      </div>
      <el-menu
        :default-active="$route.path"
        router
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
      >
        <el-menu-item index="/">
          <el-icon><House /></el-icon>
          <span>仪表板</span>
        </el-menu-item>
        <el-menu-item index="/drugs">
          <el-icon><ShoppingBag /></el-icon>
          <span>药品管理</span>
        </el-menu-item>
        <el-menu-item index="/pharmacies">
          <el-icon><Shop /></el-icon>
          <span>药房管理</span>
        </el-menu-item>
        <el-menu-item index="/prescriptions">
          <el-icon><Document /></el-icon>
          <span>处方履行</span>
        </el-menu-item>
        <el-menu-item index="/audits">
          <el-icon><List /></el-icon>
          <span>审计日志</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header
        style="
          background-color: #fff;
          border-bottom: 1px solid #e6e6e6;
          display: flex;
          align-items: center;
          justify-content: space-between;
        "
      >
        <div class="header-left">
          <div class="system-logo" @click="goToDashboard">
            <el-icon class="logo-icon"><ShoppingBag /></el-icon>
            <h2 class="system-title">药品处方管理系统</h2>
          </div>
        </div>
        <div class="header-right">
          <el-button type="primary" @click="refreshData">
            <el-icon><Refresh /></el-icon>
            刷新数据
          </el-button>

          <el-dropdown @command="handleCommand">
            <div class="user-info">
              <el-avatar :size="32" :src="userAvatar">
                <el-icon><User /></el-icon>
              </el-avatar>
              <span class="username">{{ authStore.user?.username }}</span>
              <el-icon class="dropdown-icon"><ArrowDown /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">
                  <el-icon><User /></el-icon>
                  个人资料
                </el-dropdown-item>
                <el-dropdown-item command="settings">
                  <el-icon><Setting /></el-icon>
                  系统设置
                </el-dropdown-item>
                <el-dropdown-item divided command="logout">
                  <el-icon><SwitchButton /></el-icon>
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-main style="background-color: #f5f5f5; padding: 20px">
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
  House,
  ShoppingBag,
  Shop,
  Document,
  List,
  Refresh,
  User,
  ArrowDown,
  Setting,
  SwitchButton,
} from '@element-plus/icons-vue';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const userAvatar = computed(() => {
  // 可以根据用户信息生成头像
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${authStore.user?.username}`;
});

const goToDashboard = () => {
  router.push('/');
};

const refreshData = () => {
  // 刷新当前页面数据
  window.location.reload();
};

const handleCommand = async (command: string) => {
  switch (command) {
    case 'profile':
      ElMessage.info('个人资料功能开发中...');
      break;
    case 'settings':
      ElMessage.info('系统设置功能开发中...');
      break;
    case 'logout':
      try {
        await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        });

        await authStore.logoutUser();
        ElMessage.success('已退出登录');
        router.push('/login');
      } catch (error) {
        // 用户取消
      }
      break;
  }
};
</script>

<style scoped>
.logo {
  border-bottom: 1px solid #434a50;
}

.el-menu {
  border-right: none;
}

.el-menu-item {
  height: 50px;
  line-height: 50px;
}

.el-menu-item:hover {
  background-color: #263445 !important;
}

.el-menu-item.is-active {
  background-color: #409eff !important;
  color: white !important;
}

/* 系统名称样式 */
.header-left {
  display: flex;
  align-items: center;
}

.system-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.system-logo:hover {
  background-color: #f5f7fa;
  transform: translateY(-1px);
}

.logo-icon {
  font-size: 28px;
  color: #409eff;
}

.system-title {
  margin: 0;
  color: #303133;
  font-size: 24px;
  font-weight: bold;
  background: linear-gradient(135deg, #409eff 0%, #67c23a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.user-info:hover {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
}

.username {
  font-size: 14px;
  color: #303133;
  font-weight: 500;
}

.dropdown-icon {
  font-size: 12px;
  color: #909399;
  transition: transform 0.3s ease;
}

.user-info:hover .dropdown-icon {
  transform: rotate(180deg);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .system-title {
    font-size: 18px;
  }

  .logo-icon {
    font-size: 24px;
  }

  .system-logo {
    padding: 6px 12px;
  }
}
</style>

# 药品处方管理系统 (PharmaPrescriptionFulfillment)

[![Vue 3](https://img.shields.io/badge/Vue-3.4.0-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Element Plus](https://img.shields.io/badge/Element%20Plus-2.4.0-409EFF?style=flat-square&logo=element)](https://element-plus.org/)
[![Pinia](https://img.shields.io/badge/Pinia-2.1.0-FFD700?style=flat-square&logo=pinia)](https://pinia.vuejs.org/)
[![Vitest](https://img.shields.io/badge/Vitest-1.0.0-6E9F18?style=flat-square&logo=vitest)](https://vitest.dev/)

一个基于 Vue 3 + TypeScript +
Vite 构建的现代化药品处方管理系统，提供完整的药品管理、处方管理、药房管理和审计日志功能。

## 📋 目录

- [功能特性](#功能特性)
- [技术栈](#技术栈)
- [项目结构](#项目结构)
- [快速开始](#快速开始)
- [环境配置](#环境配置)
- [开发指南](#开发指南)
- [测试](#测试)
- [部署](#部署)
- [API 文档](#api-文档)
- [贡献指南](#贡献指南)
- [许可证](#许可证)

## ✨ 功能特性

### 🏥 核心功能

- **药品管理**: 药品的增删改查、库存管理、过期提醒
- **处方管理**: 处方创建、审核、执行状态跟踪
- **药房管理**: 药房信息管理、库存统计
- **审计日志**: 完整的操作记录和审计追踪

### 🔐 用户认证

- **用户登录**: 支持用户名/密码登录
- **用户注册**: 新用户注册功能
- **验证码**: 图形验证码安全验证
- **权限控制**: 基于角色的访问控制

### 📊 数据可视化

- **仪表板**: 实时数据统计和图表展示
- **库存监控**: 低库存预警、过期药品提醒
- **操作统计**: 用户操作统计和趋势分析

### 🎨 用户体验

- **响应式设计**: 支持桌面端和移动端
- **现代化 UI**: 基于 Element Plus 的美观界面
- **实时更新**: 数据实时同步和状态更新
- **错误处理**: 完善的错误提示和异常处理

## 🛠 技术栈

### 前端框架

- **Vue 3.4.0**: 渐进式 JavaScript 框架
- **TypeScript 5.0.0**: 类型安全的 JavaScript 超集
- **Vite 5.0.0**: 下一代前端构建工具

### UI 组件库

- **Element Plus 2.4.0**: 基于 Vue 3 的桌面端组件库
- **Vue Router 4**: 官方路由管理器
- **Pinia 2.1.0**: 现代状态管理库

### 开发工具

- **ESLint**: 代码质量检查
- **Prettier**: 代码格式化
- **Vitest**: 单元测试框架
- **Vue Test Utils**: Vue 组件测试工具

### 构建和部署

- **Vite**: 快速构建和热重载
- **PostCSS**: CSS 后处理器
- **SCSS**: CSS 预处理器

## 📁 项目结构

```
pharmaPrescriptionFulfillment/
├── public/                     # 静态资源
│   ├── mockServiceWorker.js    # Mock Service Worker
│   └── vite.svg               # 项目图标
├── src/                       # 源代码
│   ├── api/                   # API 接口层
│   │   ├── __tests__/         # API 测试
│   │   ├── audits.ts          # 审计日志 API
│   │   ├── auth.ts            # 认证 API
│   │   ├── client.ts          # API 客户端
│   │   ├── drugs.ts           # 药品 API
│   │   ├── pharmacies.ts      # 药房 API
│   │   └── prescriptions.ts   # 处方 API
│   ├── components/            # 公共组件
│   │   ├── Captcha.vue        # 验证码组件
│   │   ├── CommonDetailDialog.vue  # 通用详情对话框
│   │   └── CommonTable.vue    # 通用表格组件
│   ├── layouts/               # 布局组件
│   │   └── AppLayout.vue      # 主布局
│   ├── mocks/                 # Mock 数据
│   │   ├── data.ts            # 模拟数据
│   │   ├── handlers.ts        # Mock 处理器
│   │   └── server.ts          # Mock 服务器
│   ├── pages/                 # 页面组件
│   │   ├── audits/            # 审计日志页面
│   │   ├── auth/              # 认证页面
│   │   ├── drugs/             # 药品管理页面
│   │   ├── pharmacies/        # 药房管理页面
│   │   ├── prescriptions/     # 处方管理页面
│   │   └── Dashboard.vue      # 仪表板
│   ├── stores/                # 状态管理
│   │   ├── __tests__/         # Store 测试
│   │   ├── audits.ts          # 审计日志 Store
│   │   ├── auth.ts            # 认证 Store
│   │   ├── drugs.ts           # 药品 Store
│   │   ├── pharmacies.ts      # 药房 Store
│   │   └── prescriptions.ts   # 处方 Store
│   ├── styles/                # 样式文件
│   │   └── globals.scss       # 全局样式
│   ├── types/                 # TypeScript 类型定义
│   │   ├── __tests__/         # 类型测试
│   │   ├── audit.ts           # 审计日志类型
│   │   ├── auth.ts            # 认证类型
│   │   ├── drug.ts            # 药品类型
│   │   ├── pharmacy.ts        # 药房类型
│   │   └── prescription.ts    # 处方类型
│   ├── utils/                 # 工具函数
│   │   ├── __tests__/         # 工具函数测试
│   │   └── drugUtils.ts       # 药品相关工具函数
│   ├── App.vue                # 根组件
│   ├── main.ts                # 应用入口
│   ├── pinia.ts               # Pinia 配置
│   └── router.ts              # 路由配置
├── .env                       # 环境变量
├── .env.local                 # 本地环境变量
├── .gitignore                 # Git 忽略文件
├── package.json               # 项目依赖
├── postcss.config.js          # PostCSS 配置
├── tailwind.config.js         # Tailwind CSS 配置
├── tsconfig.json              # TypeScript 配置
├── vite.config.ts             # Vite 配置
├── vitest.config.ts           # Vitest 配置
├── COVERAGE_REPORT.md         # 测试覆盖率报告
├── TEST_SUMMARY.md            # 测试总结
└── README.md                  # 项目说明
```

## 🚀 快速开始

### 环境要求

- **Node.js**: >= 20.19.0 或 >= 22.12.0
- **npm**: >= 8.0.0
- **Git**: >= 2.0.0

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/OverFlowYs/Test-PharmaPrescriptionFulfillment.git

# 进入项目目录
cd pharmaPrescriptionFulfillment

# 安装依赖
npm install
```

### 启动开发服务器

```bash
# 启动开发服务器
npm run dev

# 或者使用 yarn
yarn dev

# 或者使用 pnpm
pnpm dev
```

访问 [http://localhost:5173](http://localhost:5173) 查看应用。

### 构建生产版本

```bash
# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## ⚙️ 环境配置

### 环境变量

创建 `.env.local` 文件并配置以下变量：

```env
# 是否使用 Mock 数据
VITE_USE_MOCK=true

# API 基础 URL
VITE_API_BASE_URL=http://localhost:3000/api

# 应用标题
VITE_APP_TITLE=药品处方管理系统

# 应用版本
VITE_APP_VERSION=1.0.0
```

### Mock 数据配置

项目支持 Mock 数据模式，默认启用。要切换到真实 API：

1. 设置 `VITE_USE_MOCK=false`
2. 配置正确的 `VITE_API_BASE_URL`
3. 确保后端 API 服务正常运行

## 💻 开发指南

### 代码规范

项目使用 ESLint 和 Prettier 进行代码规范检查：

```bash
# 检查代码规范
npm run lint

# 自动修复代码规范问题
npm run lint:fix

# 格式化代码
npm run format
```

### 提交规范

使用 Conventional Commits 规范：

```bash
# 功能提交
git commit -m "feat: 添加药品管理功能"

# 修复提交
git commit -m "fix: 修复库存计算错误"

# 文档提交
git commit -m "docs: 更新 API 文档"
```

### 组件开发

1. **创建组件**: 在 `src/components/` 目录下创建组件
2. **类型定义**: 在 `src/types/` 目录下定义 TypeScript 类型
3. **状态管理**: 在 `src/stores/` 目录下创建 Pinia store
4. **API 接口**: 在 `src/api/` 目录下定义 API 接口

### 路由配置

在 `src/router.ts` 中配置路由：

```typescript
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Dashboard",
      component: () => import("./pages/Dashboard.vue"),
    },
    // ... 其他路由
  ],
});
```

## 🧪 测试

### 运行测试

```bash
# 运行所有测试
npm run test

# 运行测试并生成覆盖率报告
npm run test:coverage

# 监听模式运行测试
npm run test:watch
```

### 测试覆盖率

当前测试覆盖率：

- **API 层**: 100% (完美)
- **状态管理**: 97.67% (优秀)
- **工具函数**: 37.7% (核心函数已覆盖)
- **类型定义**: 100% (完美)

详细覆盖率报告请查看 [COVERAGE_REPORT.md](./COVERAGE_REPORT.md)

### 测试文件结构

```
src/
├── api/__tests__/           # API 层测试
├── stores/__tests__/        # 状态管理测试
├── utils/__tests__/         # 工具函数测试
├── pages/*/__tests__/       # 页面组件测试
└── types/__tests__/         # 类型定义测试
```

## 🚀 部署

### 构建生产版本

```bash
# 构建生产版本
npm run build

# 构建文件将生成在 dist/ 目录
```

### 部署到服务器

1. **上传构建文件**: 将 `dist/` 目录上传到服务器
2. **配置 Web 服务器**: 配置 Nginx 或 Apache
3. **配置 HTTPS**: 启用 SSL 证书
4. **配置环境变量**: 设置生产环境变量

### Docker 部署

```dockerfile
# Dockerfile
FROM node:20-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 📚 API 文档

### 药品管理 API

#### 获取药品列表

```http
GET /api/drugs
```

#### 添加药品

```http
POST /api/drugs
Content-Type: application/json

{
  "name": "药品名称",
  "description": "药品描述",
  "stock": 100,
  "limit": 20,
  "expiry": "2024-12-31"
}
```

#### 更新药品

```http
PUT /api/drugs/:id
Content-Type: application/json

{
  "name": "更新后的药品名称",
  "stock": 150
}
```

#### 删除药品

```http
DELETE /api/drugs/:id
```

### 认证 API

#### 用户登录

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "用户名",
  "password": "密码",
  "captcha": "验证码"
}
```

#### 用户注册

```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "用户名",
  "password": "密码",
  "email": "邮箱",
  "captcha": "验证码"
}
```

## 🤝 贡献指南

### 贡献流程

1. **Fork 项目**: 点击 Fork 按钮
2. **创建分支**: `git checkout -b feature/your-feature`
3. **提交更改**: `git commit -m "feat: 添加新功能"`
4. **推送分支**: `git push origin feature/your-feature`
5. **创建 PR**: 提交 Pull Request

### 开发规范

- 遵循 ESLint 和 Prettier 配置
- 编写单元测试
- 更新相关文档
- 遵循 Conventional Commits 规范

### 问题报告

使用 GitHub Issues 报告问题：

1. 检查是否已存在相关问题
2. 提供详细的问题描述
3. 包含复现步骤
4. 提供环境信息

## 📄 许可证

本项目采用 MIT 许可证。详情请查看 [LICENSE](./LICENSE) 文件。

## 📞 联系方式

- **项目维护者**: OverFlowYs
- **邮箱**: overflowys@163.com
- **GitHub**: [@OverFlowYs](https://github.com/OverFlowYs)

## 🙏 致谢

感谢以下开源项目的支持：

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Element Plus](https://element-plus.org/) - 桌面端组件库
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Pinia](https://pinia.vuejs.org/) - 现代状态管理库
- [Vitest](https://vitest.dev/) - 单元测试框架

---

**⭐ 如果这个项目对你有帮助，请给它一个 Star！**

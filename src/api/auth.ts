import type { LoginForm, RegisterForm, AuthResponse, User } from '../types/auth'

// 模拟用户数据
const mockUsers = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin' as const,
    password: '123456',
    createdAt: '2024-01-01T00:00:00Z'
  }
]

// 登录
export const login = async (form: LoginForm): Promise<AuthResponse> => {
  // 模拟 API 延迟
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const user = mockUsers.find(u => u.username === form.username && u.password === form.password)
  
  if (user) {
    const { password, ...userWithoutPassword } = user
    return {
      success: true,
      user: userWithoutPassword,
      token: 'mock-token-' + Date.now()
    }
  }
  
  return {
    success: false,
    message: '用户名或密码错误'
  }
}

// 注册
export const register = async (form: RegisterForm): Promise<AuthResponse> => {
  // 模拟 API 延迟
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // 检查用户名是否已存在
  const existingUser = mockUsers.find(u => u.username === form.username)
  if (existingUser) {
    return {
      success: false,
      message: '用户名已存在'
    }
  }
  
  // 检查邮箱是否已存在
  const existingEmail = mockUsers.find(u => u.email === form.email)
  if (existingEmail) {
    return {
      success: false,
      message: '邮箱已被注册'
    }
  }
  
  // 创建新用户
  const newUser: User = {
    id: Date.now().toString(),
    username: form.username,
    email: form.email,
    role: 'user',
    createdAt: new Date().toISOString()
  }
  
  mockUsers.push({
    ...newUser,
    password: form.password
  } as any)
  
  return {
    success: true,
    user: newUser,
    token: 'mock-token-' + Date.now()
  }
}

// 登出
export const logout = async (): Promise<AuthResponse> => {
  // 模拟 API 延迟
  await new Promise(resolve => setTimeout(resolve, 500))
  
  return {
    success: true,
    message: '登出成功'
  }
}

// 获取当前用户信息
export const getCurrentUser = async (): Promise<User | null> => {
  // 模拟 API 延迟
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const token = localStorage.getItem('token')
  if (!token) return null
  
  const userStr = localStorage.getItem('user')
  if (!userStr) return null
  
  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

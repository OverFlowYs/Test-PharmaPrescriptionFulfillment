export interface User {
  id: string
  username: string
  email: string
  role: 'admin' | 'user'
  createdAt: string
}

export interface LoginForm {
  username: string
  password: string
  captcha: string
}

export interface RegisterForm {
  username: string
  email: string
  password: string
  confirmPassword: string
  captcha: string
}

export interface AuthResponse {
  success: boolean
  message?: string
  user?: User
  token?: string
}

export interface CaptchaResponse {
  success: boolean
  captcha: string
  captchaId: string
}

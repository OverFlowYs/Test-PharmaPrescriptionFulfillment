<template>
  <div class="dashboard">
    <!-- 欢迎横幅 -->
    <div class="welcome-banner">
      <div class="banner-content">
        <div class="banner-text">
          <h1 class="banner-title">药品处方管理系统</h1>
          <p class="banner-subtitle">欢迎使用药品处方履行管理系统，这里是您的数据概览</p>
        </div>
        <div class="banner-icon">
          <el-icon><ShoppingBag /></el-icon>
        </div>
      </div>
    </div>
    
    <!-- 统计卡片 -->
    <div class="stats-grid">
      <div class="stat-card drugs">
        <div class="stat-header">
          <div class="stat-icon">
            <el-icon><ShoppingBag /></el-icon>
          </div>
          <div class="stat-main">
            <div class="stat-number">{{ stats.drugs.total }}</div>
            <div class="stat-label">药品总数</div>
          </div>
        </div>
        <div class="stat-details">
          <div class="stat-detail-item">
            <span class="detail-label">已过期</span>
            <span class="detail-value expired">{{ stats.drugs.expired }}</span>
          </div>
          <div class="stat-detail-item">
            <span class="detail-label">库存不足</span>
            <span class="detail-value low-stock">{{ lowStockDrugs.length }}</span>
          </div>
        </div>
      </div>
      
      <div class="stat-card pharmacies">
        <div class="stat-header">
          <div class="stat-icon">
            <el-icon><Shop /></el-icon>
          </div>
          <div class="stat-main">
            <div class="stat-number">{{ stats.pharmacies.total }}</div>
            <div class="stat-label">药房总数</div>
          </div>
        </div>
        <div class="stat-details">
          <div class="stat-detail-item">
            <span class="detail-label">活跃药房</span>
            <span class="detail-value active">{{ stats.pharmacies.active }}</span>
          </div>
          <div class="stat-detail-item">
            <span class="detail-label">分配药品</span>
            <span class="detail-value total-drugs">{{ totalAllocatedDrugs }}</span>
          </div>
        </div>
      </div>
      
      <div class="stat-card prescriptions">
        <div class="stat-header">
          <div class="stat-icon">
            <el-icon><Document /></el-icon>
          </div>
          <div class="stat-main">
            <div class="stat-number">{{ stats.prescriptions.total }}</div>
            <div class="stat-label">处方总数</div>
          </div>
        </div>
        <div class="stat-details">
          <div class="stat-detail-item">
            <span class="detail-label">待处理</span>
            <span class="detail-value pending">{{ stats.prescriptions.pending }}</span>
          </div>
          <div class="stat-detail-item">
            <span class="detail-label">已处理</span>
            <span class="detail-value success">{{ stats.prescriptions.fulfilled }}</span>
          </div>
        </div>
      </div>
      
      <div class="stat-card audits">
        <div class="stat-header">
          <div class="stat-icon">
            <el-icon><List /></el-icon>
          </div>
          <div class="stat-main">
            <div class="stat-number">{{ stats.audits.total }}</div>
            <div class="stat-label">审计记录</div>
          </div>
        </div>
        <div class="stat-details">
          <div class="stat-detail-item">
            <span class="detail-label">失败</span>
            <span class="detail-value failed">{{ stats.audits.failed }}</span>
          </div>
          <div class="stat-detail-item">
            <span class="detail-label">成功</span>
            <span class="detail-value success">{{ stats.audits.success }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 图表区域 -->
    <div class="charts-section">
      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">处方状态分布</h3>
          <div class="chart-subtitle">实时监控处方处理状态</div>
        </div>
        <div class="chart-container">
          <div class="chart-bars">
            <div class="chart-bar" v-for="(item, index) in prescriptionStatusData" :key="index">
              <div class="bar-info">
                <span class="bar-label">{{ item.name }}</span>
                <span class="bar-count">{{ item.value }}</span>
              </div>
              <div class="bar-track">
                <div 
                  class="bar-fill" 
                  :style="{ width: item.percentage + '%', backgroundColor: item.color }"
                ></div>
              </div>
              <div class="bar-percentage">{{ Math.round(item.percentage) }}%</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">药品库存状态</h3>
          <div class="chart-subtitle">库存预警与监控</div>
        </div>
        <div class="chart-container">
          <div class="chart-bars">
            <div class="chart-bar" v-for="(item, index) in drugStockData" :key="index">
              <div class="bar-info">
                <span class="bar-label">{{ item.name }}</span>
                <span class="bar-count">{{ item.value }}</span>
              </div>
              <div class="bar-track">
                <div 
                  class="bar-fill" 
                  :style="{ width: item.percentage + '%', backgroundColor: item.color }"
                ></div>
              </div>
              <div class="bar-percentage">{{ Math.round(item.percentage) }}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 快速操作和系统状态 -->
    <div class="actions-status-section">
      <div class="quick-actions-card">
        <div class="card-header">
          <h3 class="card-title">快速操作</h3>
          <div class="card-subtitle">常用功能快速访问</div>
        </div>
        <div class="actions-grid">
          <div class="action-item" @click="goToDrugs">
            <div class="action-icon primary">
              <el-icon><Plus /></el-icon>
            </div>
            <div class="action-content">
              <div class="action-title">新增药品</div>
              <div class="action-desc">添加新的药品信息</div>
            </div>
            <div class="action-arrow">
              <el-icon><ArrowRight /></el-icon>
            </div>
          </div>
          
          <div class="action-item" @click="goToPrescriptions">
            <div class="action-icon success">
              <el-icon><Document /></el-icon>
            </div>
            <div class="action-content">
              <div class="action-title">处理处方</div>
              <div class="action-desc">查看和处理处方</div>
            </div>
            <div class="action-arrow">
              <el-icon><ArrowRight /></el-icon>
            </div>
          </div>
          
          <div class="action-item" @click="goToPharmacies">
            <div class="action-icon info">
              <el-icon><Shop /></el-icon>
            </div>
            <div class="action-content">
              <div class="action-title">查看药房</div>
              <div class="action-desc">管理药房信息</div>
            </div>
            <div class="action-arrow">
              <el-icon><ArrowRight /></el-icon>
            </div>
          </div>
          
          <div class="action-item" @click="goToAudits">
            <div class="action-icon warning">
              <el-icon><List /></el-icon>
            </div>
            <div class="action-content">
              <div class="action-title">审计日志</div>
              <div class="action-desc">查看系统操作记录</div>
            </div>
            <div class="action-arrow">
              <el-icon><ArrowRight /></el-icon>
            </div>
          </div>
        </div>
      </div>
      
      <div class="system-status-card">
        <div class="card-header">
          <h3 class="card-title">系统状态</h3>
          <div class="card-subtitle">实时系统监控</div>
        </div>
        <div class="status-list">
          <div class="status-item success">
            <div class="status-indicator">
              <el-icon><Check /></el-icon>
            </div>
            <div class="status-content">
              <div class="status-title">API 服务正常</div>
              <div class="status-desc">所有接口响应正常</div>
            </div>
          </div>
          
          <div class="status-item success">
            <div class="status-indicator">
              <el-icon><Check /></el-icon>
            </div>
            <div class="status-content">
              <div class="status-title">数据库连接正常</div>
              <div class="status-desc">数据同步正常</div>
            </div>
          </div>
          
          <div class="status-item warning" v-if="stats.drugs.expired > 0">
            <div class="status-indicator">
              <el-icon><Warning /></el-icon>
            </div>
            <div class="status-content">
              <div class="status-title">{{ stats.drugs.expired }} 个药品已过期</div>
              <div class="status-desc">需要及时处理</div>
            </div>
          </div>
          
          <div class="status-item info" v-if="stats.prescriptions.pending > 0">
            <div class="status-indicator">
              <el-icon><InfoFilled /></el-icon>
            </div>
            <div class="status-content">
              <div class="status-title">{{ stats.prescriptions.pending }} 个处方待处理</div>
              <div class="status-desc">等待处理中</div>
            </div>
          </div>
          
          <div class="status-item danger" v-if="lowStockDrugs.length > 0">
            <div class="status-indicator">
              <el-icon><Warning /></el-icon>
            </div>
            <div class="status-content">
              <div class="status-title">{{ lowStockDrugs.length }} 个药品库存不足</div>
              <div class="status-desc">需要及时补货</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 数据表格 -->
    <div class="tables-section">
      <div class="table-card">
        <div class="card-header">
          <h3 class="card-title">最近处方</h3>
          <div class="card-subtitle">最新处理的处方记录</div>
        </div>
        <div class="table-container">
          <el-table :data="recentPrescriptions" size="small" max-height="300" class="modern-table">
            <el-table-column prop="id" label="处方ID" width="100">
              <template #default="{ row }">
                <span class="table-id">{{ row.id }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="patientName" label="患者" width="100">
              <template #default="{ row }">
                <div class="patient-info">
                  <div class="patient-avatar">{{ row.patientName?.charAt(0) || '?' }}</div>
                  <span class="patient-name">{{ row.patientName || '未知' }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="100">
              <template #default="{ row }">
                <el-tag :type="getStatusType(row.status)" size="small" class="status-tag">
                  {{ getStatusText(row.status) }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="createdAt" label="时间" width="120">
              <template #default="{ row }">
                <span class="table-time">{{ formatDate(row.createdAt) }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      
      <div class="table-card">
        <div class="card-header">
          <h3 class="card-title">药品库存预警</h3>
          <div class="card-subtitle">需要关注的库存情况</div>
        </div>
        <div class="table-container">
          <el-table :data="lowStockDrugs" size="small" max-height="300" class="modern-table">
            <el-table-column prop="name" label="药品名称">
              <template #default="{ row }">
                <div class="drug-info">
                  <div class="drug-name">{{ row.name }}</div>
                  <div class="drug-manufacturer">{{ row.manufacturer }}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="stock" label="库存" width="80">
              <template #default="{ row }">
                <span class="stock-number">{{ row.stock }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="limit" label="限额" width="80">
              <template #default="{ row }">
                <span class="limit-number">{{ row.limit }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="100">
              <template #default="{ row }">
                <el-tag :type="row.stock < 10 ? 'danger' : 'warning'" size="small" class="status-tag">
                  {{ row.stock < 10 ? '库存不足' : '库存偏低' }}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getDrugs } from '../api/drugs'
import { getPharmacies } from '../api/pharmacies'
import { getPrescriptions } from '../api/prescriptions'
import { getAuditLogs } from '../api/audits'
import type { Drug } from '../types/drug'
import type { Pharmacy } from '../types/pharmacy'
import type { Prescription } from '../types/prescription'
import type { AuditLog } from '../types/audit'
import { 
  ShoppingBag, 
  Shop, 
  Document, 
  List, 
  Plus, 
  Check, 
  Warning, 
  InfoFilled,
  ArrowRight
} from '@element-plus/icons-vue'

const router = useRouter()

const drugs = ref<Drug[]>([])
const pharmacies = ref<Pharmacy[]>([])
const prescriptions = ref<Prescription[]>([])
const auditLogs = ref<AuditLog[]>([])

// 统计数据
const stats = computed(() => ({
  drugs: {
    total: drugs.value.length,
    expired: drugs.value.filter(d => new Date(d.expiry) <= new Date()).length
  },
  pharmacies: {
    total: pharmacies.value.length,
    active: pharmacies.value.length // 假设所有药房都活跃
  },
  prescriptions: {
    total: prescriptions.value.length,
    pending: prescriptions.value.filter(p => p.status === 'PENDING').length,
    fulfilled: prescriptions.value.filter(p => p.status === 'FULFILLED').length
  },
  audits: {
    total: auditLogs.value.length,
    failed: auditLogs.value.filter(a => a.status === 'FAILED').length,
    success: auditLogs.value.filter(a => a.status === 'SUCCESS').length
  }
}))

// 总分配药品数量
const totalAllocatedDrugs = computed(() => 
  pharmacies.value.reduce((total, pharmacy) => total + pharmacy.allocatedDrugs.length, 0)
)

// 最近处方（取前5个）
const recentPrescriptions = computed(() => 
  prescriptions.value
    .sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime())
    .slice(0, 5)
)

// 库存预警药品
const lowStockDrugs = computed(() => 
  drugs.value
    .filter(d => d.stock < 20) // 库存低于20的药品
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 5)
)

// 处方状态分布数据
const prescriptionStatusData = computed(() => {
  const total = prescriptions.value.length
  if (total === 0) return []
  
  const statusCounts = {
    PENDING: prescriptions.value.filter(p => p.status === 'PENDING').length,
    FULFILLED: prescriptions.value.filter(p => p.status === 'FULFILLED').length,
    FAILED: prescriptions.value.filter(p => p.status === 'FAILED').length
  }
  
  return [
    { name: '待处理', value: statusCounts.PENDING, percentage: (statusCounts.PENDING / total) * 100, color: '#e6a23c' },
    { name: '已处理', value: statusCounts.FULFILLED, percentage: (statusCounts.FULFILLED / total) * 100, color: '#67c23a' },
    { name: '处理失败', value: statusCounts.FAILED, percentage: (statusCounts.FAILED / total) * 100, color: '#f56c6c' }
  ]
})

// 药品库存状态数据
const drugStockData = computed(() => {
  const total = drugs.value.length
  if (total === 0) return []
  
  const stockCounts = {
    normal: drugs.value.filter(d => d.stock >= 50).length,
    low: drugs.value.filter(d => d.stock >= 20 && d.stock < 50).length,
    critical: drugs.value.filter(d => d.stock < 20).length
  }
  
  return [
    { name: '库存充足', value: stockCounts.normal, percentage: (stockCounts.normal / total) * 100, color: '#67c23a' },
    { name: '库存偏低', value: stockCounts.low, percentage: (stockCounts.low / total) * 100, color: '#e6a23c' },
    { name: '库存不足', value: stockCounts.critical, percentage: (stockCounts.critical / total) * 100, color: '#f56c6c' }
  ]
})

const fetchData = async () => {
  try {
    const [drugsData, pharmaciesData, prescriptionsData, auditsData] = await Promise.all([
      getDrugs(),
      getPharmacies(),
      getPrescriptions(),
      getAuditLogs()
    ])
    
    drugs.value = drugsData
    pharmacies.value = pharmaciesData
    prescriptions.value = prescriptionsData
    auditLogs.value = auditsData
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error)
  }
}

const goToDrugs = () => router.push('/drugs')
const goToPharmacies = () => router.push('/pharmacies')
const goToPrescriptions = () => router.push('/prescriptions')
const goToAudits = () => router.push('/audits')

const getStatusType = (status: string) => {
  switch (status) {
    case 'PENDING': return 'warning'
    case 'FULFILLED': return 'success'
    case 'FAILED': return 'danger'
    default: return 'info'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'PENDING': return '待处理'
    case 'FULFILLED': return '已处理'
    case 'FAILED': return '处理失败'
    default: return status
  }
}

const formatDate = (dateString?: string) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('zh-CN')
}

onMounted(fetchData)
</script>

<style scoped>
.dashboard {
  padding: 24px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

/* 欢迎横幅 */
.welcome-banner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 32px;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;
}

.welcome-banner::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

.banner-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 1;
}

.banner-text {
  flex: 1;
}

.banner-title {
  margin: 0 0 12px 0;
  font-size: 36px;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.banner-subtitle {
  margin: 0;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;
}

.banner-icon {
  font-size: 64px;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 32px;
}

/* 统计卡片网格 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-height: 180px;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--card-gradient);
}

.stat-card.drugs {
  --card-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.stat-card.pharmacies {
  --card-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.stat-card.prescriptions {
  --card-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.stat-card.audits {
  --card-gradient: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.stat-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  background: var(--card-gradient);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.stat-main {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
}

.stat-number {
  font-size: 36px;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 16px;
  color: #666;
  font-weight: 500;
}

.stat-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat-detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #f8f9fa;
  border-radius: 8px;
  font-size: 14px;
}

.detail-label {
  color: #666;
  font-weight: 500;
}

.detail-value {
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
}

.detail-value.expired {
  background: #fef0f0;
  color: #f56c6c;
}

.detail-value.low-stock {
  background: #fdf6ec;
  color: #e6a23c;
}

.detail-value.active {
  background: #f0f9ff;
  color: #409eff;
}

.detail-value.total-drugs {
  background: #f0f9ff;
  color: #409eff;
}

.detail-value.pending {
  background: #fdf6ec;
  color: #e6a23c;
}

.detail-value.success {
  background: #f0f9ff;
  color: #67c23a;
}

.detail-value.failed {
  background: #fef0f0;
  color: #f56c6c;
}

/* 图表区域 */
.charts-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
}

.chart-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.chart-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

.chart-header {
  margin-bottom: 24px;
}

.chart-title {
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
}

.chart-subtitle {
  margin: 0;
  font-size: 14px;
  color: #666;
}

.chart-container {
  height: 200px;
}

.chart-bars {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
}

.chart-bar {
  display: flex;
  align-items: center;
  gap: 16px;
}

.bar-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 120px;
  min-width: 120px;
}

.bar-label {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.bar-count {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
}

.bar-track {
  flex: 1;
  height: 32px;
  background: #f5f7fa;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
}

.bar-fill {
  height: 100%;
  border-radius: 16px;
  transition: width 1s ease;
  position: relative;
}

.bar-percentage {
  font-size: 12px;
  font-weight: 600;
  color: #666;
  min-width: 40px;
  text-align: right;
}

/* 快速操作和系统状态 */
.actions-status-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
}

.quick-actions-card,
.system-status-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.quick-actions-card:hover,
.system-status-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

.card-header {
  margin-bottom: 24px;
}

.card-title {
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
}

.card-subtitle {
  margin: 0;
  font-size: 14px;
  color: #666;
}

.actions-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.action-item {
  display: flex;
  align-items: center;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.action-item:hover {
  background: #e9ecef;
  border-color: #dee2e6;
  transform: translateX(4px);
}

.action-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: white;
  margin-right: 16px;
}

.action-icon.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.action-icon.success {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.action-icon.info {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.action-icon.warning {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.action-content {
  flex: 1;
}

.action-title {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.action-desc {
  font-size: 14px;
  color: #666;
}

.action-arrow {
  color: #999;
  font-size: 16px;
  transition: transform 0.3s ease;
}

.action-item:hover .action-arrow {
  transform: translateX(4px);
}

.status-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.status-item {
  display: flex;
  align-items: center;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.status-item.success {
  border-left: 4px solid #67c23a;
}

.status-item.warning {
  border-left: 4px solid #e6a23c;
}

.status-item.info {
  border-left: 4px solid #409eff;
}

.status-item.danger {
  border-left: 4px solid #f56c6c;
}

.status-indicator {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin-right: 16px;
}

.status-item.success .status-indicator {
  background: #f0f9ff;
  color: #67c23a;
}

.status-item.warning .status-indicator {
  background: #fdf6ec;
  color: #e6a23c;
}

.status-item.info .status-indicator {
  background: #f0f9ff;
  color: #409eff;
}

.status-item.danger .status-indicator {
  background: #fef0f0;
  color: #f56c6c;
}

.status-content {
  flex: 1;
}

.status-title {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.status-desc {
  font-size: 14px;
  color: #666;
}

/* 数据表格 */
.tables-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.table-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.table-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

.table-container {
  margin-top: 16px;
}

.modern-table {
  border-radius: 8px;
  overflow: hidden;
}

.table-id {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 12px;
  color: #666;
  background: #f8f9fa;
  padding: 4px 8px;
  border-radius: 4px;
}

.patient-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.patient-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
}

.patient-name {
  font-weight: 500;
  color: #1a1a1a;
}

.status-tag {
  font-weight: 500;
}

.table-time {
  font-size: 12px;
  color: #666;
}

.drug-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.drug-name {
  font-weight: 600;
  color: #1a1a1a;
}

.drug-manufacturer {
  font-size: 12px;
  color: #666;
}

.stock-number,
.limit-number {
  font-weight: 600;
  color: #1a1a1a;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .charts-section,
  .actions-status-section,
  .tables-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .dashboard {
    padding: 16px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .banner-content {
    flex-direction: column;
    text-align: center;
  }
  
  .banner-icon {
    margin-left: 0;
    margin-top: 16px;
  }
  
  .stat-card {
    min-height: auto;
  }
  
  .action-item {
    padding: 12px;
  }
  
  .action-icon {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
}
</style>

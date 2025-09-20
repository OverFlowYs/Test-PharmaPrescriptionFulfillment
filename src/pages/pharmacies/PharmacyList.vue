<template>
  <div>
    <h2>药房管理</h2>
    
    <CommonTable
      :data="pharmacies"
      :columns="columns"
      :loading="loading"
      :show-actions="true"
      :show-refresh-button="true"
      @refresh="fetchPharmacies"
      @view="handleView"
    />
    
    <CommonDetailDialog
      v-model="showDetail"
      title="药房详情"
      :data="selectedPharmacy"
      :fields="detailFields"
      :sub-tables="subTables"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getPharmacies } from '../../api/pharmacies'
import type { Pharmacy } from '../../types/pharmacy'
import CommonTable from '../../components/CommonTable.vue'
import CommonDetailDialog from '../../components/CommonDetailDialog.vue'
import { ElMessage } from 'element-plus'
import type { TableColumn } from '../../components/CommonTable.vue'
import type { DetailField, SubTable } from '../../components/CommonDetailDialog.vue'

const loading = ref(false)
const pharmacies = ref<Pharmacy[]>([])
const showDetail = ref(false)
const selectedPharmacy = ref<Pharmacy | null>(null)

const columns: TableColumn[] = [
  { prop: 'id', label: 'ID', width: 100 },
  { prop: 'name', label: '药房名称' },
  { prop: 'address', label: '地址' },
  { prop: 'phone', label: '电话' },
  { prop: 'status', label: '状态', width: 100, slot: 'status' }
]

const detailFields: DetailField[] = [
  { key: 'id', label: '药房ID' },
  { key: 'name', label: '药房名称' },
  { key: 'address', label: '地址' },
  { key: 'phone', label: '电话' },
  { key: 'email', label: '邮箱' },
  { key: 'status', label: '状态', slot: 'status' }
]

const subTables: SubTable[] = [
  {
    key: 'drugs',
    title: '分配的药品',
    dataKey: 'allocatedDrugs',
    columns: [
      { prop: 'drugId', label: '药品ID', width: 100 },
      { prop: 'drugName', label: '药品名称' },
      { prop: 'quantity', label: '数量', width: 100 },
      { prop: 'expiry', label: '有效期', width: 120 }
    ]
  }
]

const fetchPharmacies = async () => {
  loading.value = true
  try {
    pharmacies.value = await getPharmacies()
  } catch (e: any) {
    ElMessage.error(e?.message || '加载失败')
  } finally {
    loading.value = false
  }
}

const handleView = (pharmacy: Pharmacy) => {
  selectedPharmacy.value = pharmacy
  showDetail.value = true
}

onMounted(fetchPharmacies)
</script>

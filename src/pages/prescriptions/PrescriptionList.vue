<template>
  <div>
    <h2>处方管理</h2>

    <!-- 筛选器 -->
    <CommonFilter
      :config="filterConfig"
      v-model="filters"
      @search="applyFilters"
      @reset="resetFilters"
    />

    <CommonTable
      :data="prescriptions"
      :columns="columns"
      :loading="loading"
      :show-actions="true"
      :show-refresh-button="true"
      @refresh="fetchPrescriptions"
      @view="handleView"
    >
      <template #status="{ row }">
        <el-tag :type="getStatusType(row.status)">
          {{ getStatusText(row.status) }}
        </el-tag>
      </template>

      <template #createdAt="{ row }">
        {{ formatDate(row.createdAt) }}
      </template>

      <template #actions="{ row }">
        <el-button type="primary" size="small" @click="handleView(row)">
          查看详情
        </el-button>
        <el-button
          v-if="row.status === 'PENDING'"
          type="success"
          size="small"
          @click="fulfillPrescription(row.id)"
          :loading="fulfillingId === row.id"
        >
          处理
        </el-button>
      </template>
    </CommonTable>

    <CommonDetailDialog
      v-model="showDetail"
      title="处方详情"
      :data="selectedPrescription"
      :fields="detailFields"
      :sub-tables="subTables"
    >
      <template #status="{ value }">
        <el-tag :type="getStatusType(value)">
          {{ getStatusText(value) }}
        </el-tag>
      </template>
    </CommonDetailDialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  getPrescriptions,
  fulfillPrescription as fulfillPrescriptionApi,
} from "../../api/prescriptions";
import type { Prescription } from "../../types/prescription";
import CommonTable from "../../components/CommonTable.vue";
import CommonDetailDialog from "../../components/CommonDetailDialog.vue";
import CommonFilter from "../../components/CommonFilter.vue";
import { prescriptionFilterConfig } from "../../configs/filterConfigs";
import { ElMessage, ElMessageBox } from "element-plus";
import type { TableColumn } from "../../components/CommonTable.vue";
import type {
  DetailField,
  SubTable,
} from "../../components/CommonDetailDialog.vue";

const loading = ref(false);
const fulfillingId = ref<string | null>(null);
const prescriptions = ref<Prescription[]>([]);
const showDetail = ref(false);
const selectedPrescription = ref<Prescription | null>(null);

// 筛选相关
const filters = ref({
  patientId: "",
  pharmacyId: "",
  status: "",
  dateRange: "",
});

// 筛选配置
const filterConfig = prescriptionFilterConfig;

const columns: TableColumn[] = [
  { prop: "id", label: "处方ID", width: 120 },
  { prop: "patientName", label: "患者姓名", width: 120 },
  { prop: "pharmacyName", label: "药房", width: 150 },
  { prop: "status", label: "状态", width: 100, slot: "status" },
  { prop: "createdAt", label: "创建时间", width: 180, slot: "createdAt" },
];

const detailFields: DetailField[] = [
  { key: "id", label: "处方ID" },
  { key: "patientName", label: "患者姓名" },
  { key: "patientId", label: "患者ID" },
  { key: "pharmacyName", label: "药房名称" },
  { key: "pharmacyId", label: "药房ID" },
  { key: "status", label: "状态", slot: "status" },
  { key: "createdAt", label: "创建时间", type: "date" },
  { key: "updatedAt", label: "更新时间", type: "date" },
];

const subTables: SubTable[] = [
  {
    key: "drugs",
    title: "处方药品",
    dataKey: "drugs",
    columns: [
      { prop: "drugId", label: "药品ID", width: 100 },
      { prop: "drugName", label: "药品名称" },
      { prop: "dosage", label: "剂量", width: 100 },
      { prop: "quantity", label: "数量", width: 100 },
    ],
  },
];

const fetchPrescriptions = async () => {
  loading.value = true;
  try {
    prescriptions.value = await getPrescriptions();
  } catch (e: any) {
    ElMessage.error(e?.message || "加载失败");
  } finally {
    loading.value = false;
  }
};

const handleView = (prescription: Prescription) => {
  selectedPrescription.value = prescription;
  showDetail.value = true;
};

const fulfillPrescription = async (id: string) => {
  try {
    await ElMessageBox.confirm("确认处理此处方？", "提示", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
    });

    fulfillingId.value = id;
    const result = await fulfillPrescriptionApi(id);

    if (result.success) {
      ElMessage.success("处方处理成功");
      await fetchPrescriptions(); // 刷新列表
    } else {
      ElMessage.error(`处理失败: ${result.errors?.join(", ")}`);
    }
  } catch (e: any) {
    if (e !== "cancel") {
      ElMessage.error(e?.message || "处理失败");
    }
  } finally {
    fulfillingId.value = null;
  }
};

const getStatusType = (status: string) => {
  switch (status) {
    case "PENDING":
      return "warning";
    case "FULFILLED":
      return "success";
    case "FAILED":
      return "danger";
    default:
      return "info";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "PENDING":
      return "待处理";
    case "FULFILLED":
      return "已处理";
    case "FAILED":
      return "处理失败";
    default:
      return status;
  }
};

// 筛选相关方法
const applyFilters = () => {
  // 这里可以根据筛选条件过滤数据
  // 实际项目中可能需要调用 API 传递筛选参数
  console.log("应用筛选条件:", filters.value);
  fetchPrescriptions();
};

const resetFilters = () => {
  filters.value = {
    patientId: "",
    pharmacyId: "",
    status: "",
    dateRange: "",
  };
  fetchPrescriptions();
};

const formatDate = (dateString?: string) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleString("zh-CN");
};

onMounted(fetchPrescriptions);
</script>

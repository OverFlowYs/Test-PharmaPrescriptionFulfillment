<template>
  <div>
    <h2 class="mb-4">审计日志</h2>

    <!-- 筛选器 -->
    <CommonFilter
      :config="filterConfig"
      v-model="filters"
      @search="applyFilters"
      @reset="resetFilters"
    />

    <CommonTable
      :data="auditLogs"
      :columns="columns"
      :loading="loading"
      :show-actions="true"
      :show-refresh-button="true"
      @refresh="fetchAuditLogs"
      @view="handleView"
    >
      <template #status="{ row }">
        <el-tag :type="row.status === 'SUCCESS' ? 'success' : 'danger'">
          {{ row.status === "SUCCESS" ? "成功" : "失败" }}
        </el-tag>
      </template>

      <template #timestamp="{ row }">
        {{ formatDate(row.timestamp) }}
      </template>
    </CommonTable>

    <CommonDetailDialog
      v-model="showDetail"
      title="审计日志详情"
      :data="selectedLog"
      :fields="detailFields"
      :sub-tables="subTables"
      width="800px"
    >
      <template #status="{ value }">
        <el-tag :type="value === 'SUCCESS' ? 'success' : 'danger'">
          {{ value === "SUCCESS" ? "成功" : "失败" }}
        </el-tag>
      </template>
    </CommonDetailDialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getAuditLogs, type AuditLogFilters } from "../../api/audits";
import type { AuditLog } from "../../types/audit";
import CommonTable from "../../components/CommonTable.vue";
import CommonDetailDialog from "../../components/CommonDetailDialog.vue";
import CommonFilter from "../../components/CommonFilter.vue";
import { auditFilterConfig } from "../../configs/filterConfigs";
import { ElMessage } from "element-plus";
import type { TableColumn } from "../../components/CommonTable.vue";
import type {
  DetailField,
  SubTable,
} from "../../components/CommonDetailDialog.vue";

const loading = ref(false);
const auditLogs = ref<AuditLog[]>([]);
const showDetail = ref(false);
const selectedLog = ref<AuditLog | null>(null);

const filters = ref<AuditLogFilters>({
  patientId: "",
  pharmacyId: "",
  status: "",
});

// 筛选配置
const filterConfig = auditFilterConfig;

const columns: TableColumn[] = [
  { prop: "prescriptionId", label: "处方ID", width: 120 },
  { prop: "patientName", label: "患者姓名", width: 120 },
  { prop: "pharmacyName", label: "药房", width: 150 },
  { prop: "status", label: "状态", width: 100, slot: "status" },
  { prop: "timestamp", label: "时间", width: 180, slot: "timestamp" },
];

const detailFields: DetailField[] = [
  { key: "prescriptionId", label: "处方ID" },
  { key: "patientName", label: "患者姓名" },
  { key: "patientId", label: "患者ID" },
  { key: "pharmacyName", label: "药房名称" },
  { key: "pharmacyId", label: "药房ID" },
  { key: "status", label: "状态", slot: "status" },
  { key: "timestamp", label: "时间", type: "date" },
];

const subTables: SubTable[] = [
  {
    key: "requested",
    title: "请求的药品",
    dataKey: "drugsRequested",
    columns: [
      { prop: "drugId", label: "药品ID", width: 100 },
      { prop: "drugName", label: "药品名称" },
      { prop: "dosage", label: "剂量", width: 100 },
    ],
  },
  {
    key: "dispensed",
    title: "分发的药品",
    dataKey: "drugsDispensed",
    columns: [
      { prop: "drugId", label: "药品ID", width: 100 },
      { prop: "drugName", label: "药品名称" },
      { prop: "dosage", label: "剂量", width: 100 },
    ],
  },
];

const fetchAuditLogs = async () => {
  loading.value = true;
  try {
    auditLogs.value = await getAuditLogs(filters.value);
  } catch (e: any) {
    ElMessage.error(e?.message || "加载失败");
  } finally {
    loading.value = false;
  }
};

const applyFilters = () => {
  fetchAuditLogs();
};

const resetFilters = () => {
  filters.value = { patientId: "", pharmacyId: "", status: "" };
  fetchAuditLogs();
};

const handleView = (log: AuditLog) => {
  selectedLog.value = log;
  showDetail.value = true;
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString("zh-CN");
};

onMounted(fetchAuditLogs);
</script>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getDrugs } from "../../api/drugs";
import type { Drug } from "../../types/drug";
import AddDrugDialog from "./AddDrugDialog.vue";
import CommonTable from "../../components/CommonTable.vue";
import CommonDetailDialog from "../../components/CommonDetailDialog.vue";
import { ElMessage } from "element-plus";
import type { TableColumn } from "../../components/CommonTable.vue";
import type { DetailField } from "../../components/CommonDetailDialog.vue";

const loading = ref(false);
const items = ref<Drug[]>([]);
const showAdd = ref(false);
const showDetail = ref(false);
const selectedDrug = ref<Drug | null>(null);

const isExpired = (d: Drug) => new Date(d.expiry) < new Date();

const columns: TableColumn[] = [
  { prop: "id", label: "ID", width: 100 },
  { prop: "name", label: "名称" },
  { prop: "manufacturer", label: "生产商" },
  { prop: "batch", label: "批次", width: 120 },
  { prop: "expiry", label: "有效期", width: 140, slot: "expiry" },
  { prop: "stock", label: "库存", width: 100 },
  { prop: "limit", label: "药房限额", width: 120 },
  { prop: "status", label: "状态", width: 100, slot: "status" },
];

const detailFields: DetailField[] = [
  { key: "id", label: "药品ID" },
  { key: "name", label: "药品名称" },
  { key: "manufacturer", label: "生产商" },
  { key: "batch", label: "批次" },
  { key: "expiry", label: "有效期", type: "date" },
  { key: "stock", label: "库存" },
  { key: "limit", label: "药房限额" },
  { key: "status", label: "状态", slot: "status" },
];

const fetchList = async () => {
  loading.value = true;
  try {
    items.value = await getDrugs();
  } catch (e: any) {
    ElMessage.error(e?.message || "加载失败");
  } finally {
    loading.value = false;
  }
};

const handleView = (drug: Drug) => {
  selectedDrug.value = drug;
  showDetail.value = true;
};

onMounted(fetchList);
</script>

<template>
  <div>
    <h2>药品管理</h2>

    <CommonTable
      :data="items"
      :columns="columns"
      :loading="loading"
      :show-actions="true"
      :show-add-button="true"
      :show-refresh-button="true"
      @add="showAdd = true"
      @refresh="fetchList"
      @view="handleView"
    >
      <template #expiry="{ row }">
        <el-tag :type="isExpired(row) ? 'danger' : 'success'">
          {{ row.expiry }} <span v-if="isExpired(row)">（过期）</span>
        </el-tag>
      </template>

      <template #status="{ row }">
        <el-tag v-if="isExpired(row)" type="danger">Expired</el-tag>
        <el-tag v-else type="success">OK</el-tag>
      </template>
    </CommonTable>

    <AddDrugDialog v-model="showAdd" @success="fetchList" />

    <CommonDetailDialog
      v-model="showDetail"
      title="药品详情"
      :data="selectedDrug"
      :fields="detailFields"
    >
      <template #status="{ data }">
        <el-tag v-if="isExpired(data)" type="danger">已过期</el-tag>
        <el-tag v-else type="success">正常</el-tag>
      </template>
    </CommonDetailDialog>
  </div>
</template>

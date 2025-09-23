<template>
  <div>
    <!-- 工具栏 -->
    <div
      class="mb-3 flex gap-2 justify-end"
      v-if="showAddButton || showRefreshButton"
    >
      <slot name="toolbar">
        <el-button v-if="showAddButton" type="primary" @click="$emit('add')"
          >新增</el-button
        >
        <el-button v-if="showRefreshButton" @click="$emit('refresh')"
          >刷新</el-button
        >
      </slot>
    </div>

    <!-- 表格 -->
    <el-table :data="data" v-loading="loading" style="width: 100%">
      <el-table-column
        v-for="column in columns"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        :min-width="column.minWidth"
      >
        <template #default="{ row }" v-if="column.slot">
          <slot :name="column.slot" :row="row" :column="column">
            {{ getValue(row, column.prop) }}
          </slot>
        </template>
      </el-table-column>

      <!-- 操作列 -->
      <el-table-column label="操作" :width="actionWidth" v-if="showActions">
        <template #default="{ row }">
          <slot name="actions" :row="row">
            <el-button type="primary" size="small" @click="$emit('view', row)">
              查看详情
            </el-button>
          </slot>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="mt-4" v-if="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

export interface TableColumn {
  prop: string;
  label: string;
  width?: number | string;
  minWidth?: number | string;
  slot?: string;
}

export interface PaginationConfig {
  currentPage: number;
  pageSize: number;
  total: number;
}

const props = defineProps<{
  data: any[];
  columns: TableColumn[];
  loading?: boolean;
  showActions?: boolean;
  actionWidth?: number | string;
  pagination?: PaginationConfig;
  showAddButton?: boolean;
  showRefreshButton?: boolean;
}>();

const emit = defineEmits<{
  add: [];
  refresh: [];
  view: [row: any];
  pageChange: [page: number, size: number];
}>();

const currentPage = ref(props.pagination?.currentPage || 1);
const pageSize = ref(props.pagination?.pageSize || 10);

const total = computed(() => props.pagination?.total || 0);

const getValue = (row: any, prop: string) => {
  return prop.split(".").reduce((obj, key) => obj?.[key], row);
};

const handleSizeChange = (size: number) => {
  pageSize.value = size;
  emit("pageChange", currentPage.value, size);
};

const handleCurrentChange = (page: number) => {
  currentPage.value = page;
  emit("pageChange", page, pageSize.value);
};
</script>

<style scoped>
/* 组件样式 */
</style>

<template>
  <el-dialog
    v-model="visible"
    :title="title"
    :width="width"
    @close="handleClose"
  >
    <div v-if="data">
      <!-- 基本信息 -->
      <el-descriptions :column="2" border>
        <el-descriptions-item
          v-for="field in fields"
          :key="field.key"
          :label="field.label"
        >
          <template v-if="field.slot">
            <slot
              :name="field.slot"
              :value="getValue(data, field.key)"
              :data="data"
            >
              {{ formatValue(getValue(data, field.key), field.type) }}
            </slot>
          </template>
          <template v-else>
            {{ formatValue(getValue(data, field.key), field.type) }}
          </template>
        </el-descriptions-item>
      </el-descriptions>

      <!-- 自定义内容区域 -->
      <div v-if="$slots.content" class="mt-4">
        <slot name="content" :data="data" />
      </div>

      <!-- 子表格 -->
      <div v-if="subTables && subTables.length > 0" class="mt-4">
        <div v-for="subTable in subTables" :key="subTable.title" class="mb-4">
          <h4>{{ subTable.title }}</h4>
          <el-table :data="getValue(data, subTable.dataKey)" size="small">
            <el-table-column
              v-for="column in subTable.columns"
              :key="column.prop"
              :prop="column.prop"
              :label="column.label"
              :width="column.width"
            >
              <template #default="{ row }" v-if="column.slot">
                <slot
                  :name="`${subTable.key}-${column.slot}`"
                  :row="row"
                  :column="column"
                >
                  {{ getValue(row, column.prop) }}
                </slot>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <!-- 错误信息 -->
      <div
        v-if="
          getValue(data, 'failureReasons') &&
          getValue(data, 'failureReasons').length > 0
        "
        class="mt-4"
      >
        <h4>失败原因</h4>
        <el-alert
          v-for="(reason, index) in getValue(data, 'failureReasons')"
          :key="index"
          :title="reason"
          type="error"
          :closable="false"
          class="mb-2"
        />
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">关闭</el-button>
        <slot name="footer" :data="data" />
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export interface DetailField {
  key: string;
  label: string;
  type?: 'text' | 'date' | 'status' | 'custom';
  slot?: string;
}

export interface SubTable {
  key: string;
  title: string;
  dataKey: string;
  columns: Array<{
    prop: string;
    label: string;
    width?: number | string;
    slot?: string;
  }>;
}

const props = defineProps<{
  modelValue: boolean;
  title: string;
  data: any;
  fields: DetailField[];
  subTables?: SubTable[];
  width?: string | number;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  close: [];
}>();

const visible = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
});

const getValue = (obj: any, key: string) => {
  return key.split('.').reduce((o, k) => o?.[k], obj);
};

const formatValue = (value: any, type?: string) => {
  if (value === null || value === undefined) return '-';

  switch (type) {
    case 'date':
      return new Date(value).toLocaleString('zh-CN');
    case 'status':
      return value;
    default:
      return value;
  }
};

const handleClose = () => {
  emit('update:modelValue', false);
  emit('close');
};
</script>

<style scoped>
/* 组件样式 */
</style>

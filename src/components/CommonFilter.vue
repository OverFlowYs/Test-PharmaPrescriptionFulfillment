<template>
  <el-card v-if="config.cardTitle" class="mb-4">
    <template #header>
      <div class="card-header">
        <span>{{ config.cardTitle }}</span>
      </div>
    </template>
    <el-form :model="filterValues" inline>
      <el-form-item
        v-for="field in config.fields"
        :key="field.key"
        :label="field.label"
      >
        <!-- 输入框 -->
        <el-input
          v-if="field.type === 'input'"
          v-model="filterValues[field.key]"
          :placeholder="field.placeholder"
          :clearable="field.clearable !== false"
          :style="{ width: field.width || '200px' }"
        />

        <!-- 数字输入框 -->
        <el-input-number
          v-else-if="field.type === 'number'"
          v-model="filterValues[field.key]"
          :placeholder="field.placeholder"
          :min="field.min"
          :max="field.max"
          :step="field.step || 1"
          :style="{ width: field.width || '200px' }"
          controls-position="right"
        />

        <!-- 选择器 -->
        <el-select
          v-else-if="field.type === 'select'"
          v-model="filterValues[field.key]"
          :placeholder="field.placeholder"
          :clearable="field.clearable !== false"
          :style="{ width: field.width || '200px' }"
        >
          <el-option
            v-for="option in field.options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>

        <!-- 日期选择器 -->
        <el-date-picker
          v-else-if="field.type === 'date'"
          v-model="filterValues[field.key]"
          type="date"
          :placeholder="field.placeholder"
          :clearable="field.clearable !== false"
          :format="field.format || 'YYYY-MM-DD'"
          :value-format="field.valueFormat || 'YYYY-MM-DD'"
          :style="{ width: field.width || '200px' }"
        />

        <!-- 日期范围选择器 -->
        <el-date-picker
          v-else-if="field.type === 'daterange'"
          v-model="filterValues[field.key]"
          type="daterange"
          :placeholder="field.placeholder"
          :clearable="field.clearable !== false"
          :format="field.format || 'YYYY-MM-DD'"
          :value-format="field.valueFormat || 'YYYY-MM-DD'"
          :style="{ width: field.width || '300px' }"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>

      <!-- 操作按钮 -->
      <el-form-item>
        <el-button
          v-if="config.showSearch !== false"
          type="primary"
          @click="handleSearch"
        >
          {{ config.searchText || "筛选" }}
        </el-button>
        <el-button v-if="config.showReset !== false" @click="handleReset">
          {{ config.resetText || "重置" }}
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>

  <!-- 无卡片标题的版本 -->
  <div v-else class="mb-4">
    <el-form :model="filterValues" inline>
      <el-form-item
        v-for="field in config.fields"
        :key="field.key"
        :label="field.label"
      >
        <!-- 输入框 -->
        <el-input
          v-if="field.type === 'input'"
          v-model="filterValues[field.key]"
          :placeholder="field.placeholder"
          :clearable="field.clearable !== false"
          :style="{ width: field.width || '200px' }"
        />

        <!-- 数字输入框 -->
        <el-input-number
          v-else-if="field.type === 'number'"
          v-model="filterValues[field.key]"
          :placeholder="field.placeholder"
          :min="field.min"
          :max="field.max"
          :step="field.step || 1"
          :style="{ width: field.width || '200px' }"
          controls-position="right"
        />

        <!-- 选择器 -->
        <el-select
          v-else-if="field.type === 'select'"
          v-model="filterValues[field.key]"
          :placeholder="field.placeholder"
          :clearable="field.clearable !== false"
          :style="{ width: field.width || '200px' }"
        >
          <el-option
            v-for="option in field.options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>

        <!-- 日期选择器 -->
        <el-date-picker
          v-else-if="field.type === 'date'"
          v-model="filterValues[field.key]"
          type="date"
          :placeholder="field.placeholder"
          :clearable="field.clearable !== false"
          :format="field.format || 'YYYY-MM-DD'"
          :value-format="field.valueFormat || 'YYYY-MM-DD'"
          :style="{ width: field.width || '200px' }"
        />

        <!-- 日期范围选择器 -->
        <el-date-picker
          v-else-if="field.type === 'daterange'"
          v-model="filterValues[field.key]"
          type="daterange"
          :placeholder="field.placeholder"
          :clearable="field.clearable !== false"
          :format="field.format || 'YYYY-MM-DD'"
          :value-format="field.valueFormat || 'YYYY-MM-DD'"
          :style="{ width: field.width || '300px' }"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>

      <!-- 操作按钮 -->
      <el-form-item>
        <el-button
          v-if="config.showSearch !== false"
          type="primary"
          @click="handleSearch"
        >
          {{ config.searchText || "筛选" }}
        </el-button>
        <el-button v-if="config.showReset !== false" @click="handleReset">
          {{ config.resetText || "重置" }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import type { FilterConfig, FilterValues } from "../types/filter";

// Props
interface Props {
  config: FilterConfig;
  modelValue?: FilterValues;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({}),
});

// Emits
const emit = defineEmits<{
  "update:modelValue": [value: FilterValues];
  search: [value: FilterValues];
  reset: [];
}>();

// 筛选值
const filterValues = reactive<FilterValues>({});

// 初始化筛选值
const initFilterValues = () => {
  props.config.fields.forEach((field) => {
    if (filterValues[field.key] === undefined) {
      filterValues[field.key] = props.modelValue[field.key] || "";
    }
  });
};

// 监听配置变化，重新初始化
watch(
  () => props.config,
  () => {
    initFilterValues();
  },
  { immediate: true, deep: true },
);

// 监听外部值变化
watch(
  () => props.modelValue,
  (newValue) => {
    Object.assign(filterValues, newValue);
  },
  { deep: true },
);

// 监听筛选值变化，同步到外部
watch(
  filterValues,
  (newValue) => {
    emit("update:modelValue", { ...newValue });
  },
  { deep: true },
);

// 搜索
const handleSearch = () => {
  emit("search", { ...filterValues });
};

// 重置
const handleReset = () => {
  props.config.fields.forEach((field) => {
    filterValues[field.key] = "";
  });
  emit("reset");
};
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mb-4 {
  margin-bottom: 1rem;
}
</style>

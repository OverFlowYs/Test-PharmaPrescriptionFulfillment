# CommonFilter 通用筛选组件使用指南

## 概述

`CommonFilter` 是一个高度可配置的通用筛选组件，支持多种输入类型，可以轻松适配不同模块的筛选需求。

## 基本用法

```vue
<template>
  <CommonFilter
    :config="filterConfig"
    v-model="filters"
    @search="handleSearch"
    @reset="handleReset"
  />
</template>

<script setup>
import CommonFilter from "@/components/CommonFilter.vue";
import { prescriptionFilterConfig } from "@/configs/filterConfigs";

const filters = ref({});
const filterConfig = prescriptionFilterConfig;

const handleSearch = (filterValues) => {
  console.log("搜索条件:", filterValues);
  // 执行搜索逻辑
};

const handleReset = () => {
  console.log("重置筛选");
  // 执行重置逻辑
};
</script>
```

## 支持的字段类型

### 1. 输入框 (input)

```typescript
{
  key: 'name',
  label: '名称',
  type: 'input',
  placeholder: '输入名称',
  width: '200px',
  clearable: true
}
```

### 2. 数字输入框 (number)

```typescript
{
  key: 'age',
  label: '年龄',
  type: 'number',
  placeholder: '输入年龄',
  width: '200px',
  min: 0,
  max: 120,
  step: 1
}
```

### 3. 选择器 (select)

```typescript
{
  key: 'status',
  label: '状态',
  type: 'select',
  placeholder: '选择状态',
  width: '150px',
  options: [
    { label: '启用', value: 'ACTIVE' },
    { label: '禁用', value: 'INACTIVE' }
  ]
}
```

### 4. 日期选择器 (date)

```typescript
{
  key: 'createdAt',
  label: '创建日期',
  type: 'date',
  placeholder: '选择日期',
  width: '200px',
  format: 'YYYY-MM-DD',
  valueFormat: 'YYYY-MM-DD'
}
```

### 5. 日期范围选择器 (daterange)

```typescript
{
  key: 'dateRange',
  label: '日期范围',
  type: 'daterange',
  placeholder: '选择日期范围',
  width: '300px',
  format: 'YYYY-MM-DD',
  valueFormat: 'YYYY-MM-DD'
}
```

## 配置选项

### FilterConfig 接口

```typescript
interface FilterConfig {
  fields: FilterFieldConfig[]; // 筛选字段配置
  showReset?: boolean; // 是否显示重置按钮
  showSearch?: boolean; // 是否显示搜索按钮
  resetText?: string; // 重置按钮文本
  searchText?: string; // 搜索按钮文本
  cardTitle?: string; // 卡片标题（可选）
}
```

### FilterFieldConfig 接口

```typescript
interface FilterFieldConfig {
  key: string; // 字段键名
  label: string; // 字段标签
  type: FilterFieldType; // 字段类型
  placeholder?: string; // 占位符
  width?: string; // 宽度
  clearable?: boolean; // 是否可清空
  options?: Array<{ label: string; value: any }>; // 选择器选项
  min?: number; // 最小值（数字输入框）
  max?: number; // 最大值（数字输入框）
  step?: number; // 步长（数字输入框）
  format?: string; // 显示格式（日期）
  valueFormat?: string; // 值格式（日期）
}
```

## 预设配置

项目提供了多个预设的筛选配置，可以直接使用：

```typescript
import {
  auditFilterConfig, // 审计日志筛选
  prescriptionFilterConfig, // 处方筛选
  pharmacyFilterConfig, // 药房筛选
  drugFilterConfig, // 药品筛选
} from "@/configs/filterConfigs";
```

## 自定义配置

### 使用工厂函数创建配置

```typescript
import { createFilterConfig, createField } from "@/configs/filterConfigs";

const customConfig = createFilterConfig(
  [
    createField.input("name", "名称"),
    createField.select("status", "状态", [
      { label: "启用", value: "ACTIVE" },
      { label: "禁用", value: "INACTIVE" },
    ]),
    createField.date("createdAt", "创建日期"),
    createField.daterange("dateRange", "日期范围"),
  ],
  {
    cardTitle: "自定义筛选",
    searchText: "查询",
    resetText: "清空",
  },
);
```

### 手动创建配置

```typescript
const customConfig: FilterConfig = {
  cardTitle: "筛选条件",
  fields: [
    {
      key: "keyword",
      label: "关键词",
      type: "input",
      placeholder: "输入关键词",
      width: "250px",
    },
    {
      key: "category",
      label: "分类",
      type: "select",
      placeholder: "选择分类",
      width: "150px",
      options: [
        { label: "分类1", value: "cat1" },
        { label: "分类2", value: "cat2" },
      ],
    },
  ],
  showReset: true,
  showSearch: true,
  resetText: "重置",
  searchText: "搜索",
};
```

## 事件处理

### search 事件

当用户点击搜索按钮时触发，传递当前的筛选值。

```vue
<CommonFilter :config="filterConfig" v-model="filters" @search="handleSearch" />
```

### reset 事件

当用户点击重置按钮时触发。

```vue
<CommonFilter :config="filterConfig" v-model="filters" @reset="handleReset" />
```

## 双向绑定

组件支持 v-model 双向绑定，筛选值会自动同步到父组件：

```vue
<CommonFilter :config="filterConfig" v-model="filters" />
```

## 样式定制

组件支持两种显示模式：

1. **卡片模式**：当设置了 `cardTitle` 时，会显示为卡片
2. **普通模式**：当没有设置 `cardTitle` 时，只显示表单

```typescript
// 卡片模式
const configWithCard = {
  cardTitle: '筛选条件',
  fields: [...]
};

// 普通模式
const configWithoutCard = {
  fields: [...]
};
```

## 最佳实践

1. **字段命名**：使用有意义的字段键名，便于维护
2. **宽度设置**：根据内容长度合理设置字段宽度
3. **选项配置**：为选择器提供清晰的选项标签
4. **占位符**：提供有意义的占位符文本
5. **响应式**：考虑不同屏幕尺寸下的显示效果

## 扩展性

组件设计时考虑了扩展性，可以轻松添加新的字段类型：

1. 在 `FilterFieldType` 中添加新类型
2. 在组件模板中添加对应的渲染逻辑
3. 更新类型定义和配置接口

这样的设计使得组件可以适应各种不同的业务需求。

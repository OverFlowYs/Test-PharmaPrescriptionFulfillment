import type { FilterConfig } from "../types/filter";

// 审计日志筛选配置
export const auditFilterConfig: FilterConfig = {
  cardTitle: "筛选条件",
  fields: [
    {
      key: "patientId",
      label: "患者ID",
      type: "input",
      placeholder: "输入患者ID",
      width: "200px",
    },
    {
      key: "pharmacyId",
      label: "药房ID",
      type: "input",
      placeholder: "输入药房ID",
      width: "200px",
    },
    {
      key: "status",
      label: "状态",
      type: "select",
      placeholder: "选择状态",
      width: "150px",
      options: [
        { label: "成功", value: "SUCCESS" },
        { label: "失败", value: "FAILED" },
      ],
    },
  ],
};

// 处方筛选配置
export const prescriptionFilterConfig: FilterConfig = {
  cardTitle: "筛选条件",
  fields: [
    {
      key: "patientId",
      label: "患者ID",
      type: "input",
      placeholder: "输入患者ID",
      width: "200px",
    },
    {
      key: "pharmacyId",
      label: "药房ID",
      type: "input",
      placeholder: "输入药房ID",
      width: "200px",
    },
    {
      key: "status",
      label: "状态",
      type: "select",
      placeholder: "选择状态",
      width: "150px",
      options: [
        { label: "待处理", value: "PENDING" },
        { label: "已确认", value: "CONFIRMED" },
        { label: "已拒绝", value: "REJECTED" },
        { label: "已完成", value: "COMPLETED" },
      ],
    },
    {
      key: "dateRange",
      label: "创建时间",
      type: "daterange",
      placeholder: "选择日期范围",
      width: "300px",
    },
  ],
};

// 药房筛选配置
export const pharmacyFilterConfig: FilterConfig = {
  cardTitle: "筛选条件",
  fields: [
    {
      key: "name",
      label: "药房名称",
      type: "input",
      placeholder: "输入药房名称",
      width: "200px",
    },
    {
      key: "city",
      label: "城市",
      type: "input",
      placeholder: "输入城市",
      width: "150px",
    },
    {
      key: "status",
      label: "状态",
      type: "select",
      placeholder: "选择状态",
      width: "150px",
      options: [
        { label: "营业中", value: "ACTIVE" },
        { label: "暂停营业", value: "INACTIVE" },
        { label: "维护中", value: "MAINTENANCE" },
      ],
    },
  ],
};

// 药品筛选配置
export const drugFilterConfig: FilterConfig = {
  cardTitle: "筛选条件",
  fields: [
    {
      key: "name",
      label: "药品名称",
      type: "input",
      placeholder: "输入药品名称",
      width: "200px",
    },
    {
      key: "manufacturer",
      label: "生产厂家",
      type: "input",
      placeholder: "输入生产厂家",
      width: "200px",
    },
    {
      key: "stockStatus",
      label: "库存状态",
      type: "select",
      placeholder: "选择库存状态",
      width: "150px",
      options: [
        { label: "正常", value: "normal" },
        { label: "库存不足", value: "low" },
        { label: "库存告急", value: "critical" },
      ],
    },
    {
      key: "expiryDate",
      label: "过期时间",
      type: "date",
      placeholder: "选择过期时间",
      width: "200px",
    },
  ],
};

// 通用筛选配置工厂函数
export const createFilterConfig = (
  fields: FilterConfig["fields"],
  options?: Partial<FilterConfig>,
): FilterConfig => ({
  cardTitle: "筛选条件",
  showReset: true,
  showSearch: true,
  resetText: "重置",
  searchText: "筛选",
  ...options,
  fields,
});

// 快速创建常用字段的辅助函数
export const createField = {
  input: (
    key: string,
    label: string,
    options?: Partial<FilterConfig["fields"][0]>,
  ) => ({
    key,
    label,
    type: "input" as const,
    placeholder: `输入${label}`,
    width: "200px",
    ...options,
  }),
  select: (
    key: string,
    label: string,
    options: Array<{ label: string; value: any }>,
    fieldOptions?: Partial<FilterConfig["fields"][0]>,
  ) => ({
    key,
    label,
    type: "select" as const,
    placeholder: `选择${label}`,
    width: "150px",
    options,
    ...fieldOptions,
  }),
  date: (
    key: string,
    label: string,
    options?: Partial<FilterConfig["fields"][0]>,
  ) => ({
    key,
    label,
    type: "date" as const,
    placeholder: `选择${label}`,
    width: "200px",
    ...options,
  }),
  daterange: (
    key: string,
    label: string,
    options?: Partial<FilterConfig["fields"][0]>,
  ) => ({
    key,
    label,
    type: "daterange" as const,
    placeholder: `选择${label}`,
    width: "300px",
    ...options,
  }),
  number: (
    key: string,
    label: string,
    options?: Partial<FilterConfig["fields"][0]>,
  ) => ({
    key,
    label,
    type: "number" as const,
    placeholder: `输入${label}`,
    width: "200px",
    ...options,
  }),
};

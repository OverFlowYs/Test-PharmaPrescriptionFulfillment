// 筛选字段类型
export type FilterFieldType =
  | "input"
  | "select"
  | "date"
  | "daterange"
  | "number";

// 筛选字段配置
export interface FilterFieldConfig {
  key: string;
  label: string;
  type: FilterFieldType;
  placeholder?: string;
  width?: string;
  clearable?: boolean;
  options?: Array<{ label: string; value: any }>;
  min?: number;
  max?: number;
  step?: number;
  format?: string;
  valueFormat?: string;
}

// 筛选器配置
export interface FilterConfig {
  fields: FilterFieldConfig[];
  showReset?: boolean;
  showSearch?: boolean;
  resetText?: string;
  searchText?: string;
  cardTitle?: string;
}

// 筛选值
export interface FilterValues {
  [key: string]: any;
}

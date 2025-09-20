import type { Drug } from '../types/drug';

/**
 * 检查药品是否过期
 * @param drug 药品对象
 * @returns 是否过期
 */
export const isDrugExpired = (drug: Drug): boolean => {
  return new Date(drug.expiry) <= new Date();
};

/**
 * 检查药品库存是否不足
 * @param drug 药品对象
 * @param threshold 库存阈值，默认为20
 * @returns 是否库存不足
 */
export const isLowStock = (drug: Drug, threshold: number = 20): boolean => {
  return drug.stock < threshold;
};

/**
 * 获取药品库存状态
 * @param drug 药品对象
 * @returns 库存状态：normal | low | critical
 */
export const getStockStatus = (drug: Drug): 'normal' | 'low' | 'critical' => {
  if (drug.stock < 10) return 'critical';
  if (drug.stock < 20) return 'low';
  return 'normal';
};

/**
 * 格式化药品过期日期
 * @param expiry 过期日期字符串
 * @returns 格式化后的日期字符串
 */
export const formatDrugExpiry = (expiry: string): string => {
  const date = new Date(expiry);
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }
  return date.toLocaleDateString('zh-CN');
};

/**
 * 获取药品状态标签类型
 * @param drug 药品对象
 * @returns Element Plus 标签类型
 */
export const getDrugStatusTagType = (
  drug: Drug
): 'success' | 'warning' | 'danger' | 'info' => {
  if (isDrugExpired(drug)) return 'danger';

  const stockStatus = getStockStatus(drug);
  switch (stockStatus) {
    case 'critical':
      return 'danger';
    case 'low':
      return 'warning';
    default:
      return 'success';
  }
};

/**
 * 获取药品状态文本
 * @param drug 药品对象
 * @returns 状态文本
 */
export const getDrugStatusText = (drug: Drug): string => {
  if (isDrugExpired(drug)) return '已过期';

  const stockStatus = getStockStatus(drug);
  switch (stockStatus) {
    case 'critical':
      return '库存严重不足';
    case 'low':
      return '库存不足';
    default:
      return '库存正常';
  }
};

/**
 * 计算药品库存百分比
 * @param drug 药品对象
 * @returns 库存百分比 (0-100)
 */
export const getStockPercentage = (drug: Drug): number => {
  if (drug.limit === 0) return 0;
  return Math.min(Math.round((drug.stock / drug.limit) * 100), 100);
};

/**
 * 检查药品是否需要预警
 * @param drug 药品对象
 * @returns 是否需要预警
 */
export const needsAlert = (drug: Drug): boolean => {
  return isDrugExpired(drug) || isLowStock(drug);
};

/**
 * 获取药品预警级别
 * @param drug 药品对象
 * @returns 预警级别：high | medium | low | none
 */
export const getAlertLevel = (
  drug: Drug
): 'high' | 'medium' | 'low' | 'none' => {
  if (isDrugExpired(drug)) return 'high';

  const stockStatus = getStockStatus(drug);
  switch (stockStatus) {
    case 'critical':
      return 'high';
    case 'low':
      return 'medium';
    default:
      return 'none';
  }
};

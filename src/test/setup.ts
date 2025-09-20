import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock fetch
globalThis.fetch = vi.fn();

// Mock Element Plus components
vi.mock('element-plus', () => ({
  ElMessage: {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    info: vi.fn(),
  },
  ElMessageBox: {
    confirm: vi.fn(),
  },
  ElButton: {
    name: 'ElButton',
    template: '<button><slot /></button>',
    props: ['type', 'loading', 'size'],
  },
  ElInput: {
    name: 'ElInput',
    template:
      '<input v-bind="$attrs" v-model="modelValue" @input="$emit(\'input\', $event.target.value)" />',
    props: ['modelValue', 'placeholder', 'type', 'maxlength'],
    emits: ['input', 'update:modelValue'],
  },
  ElInputNumber: {
    name: 'ElInputNumber',
    template:
      '<input type="number" v-bind="$attrs" v-model="modelValue" @input="$emit(\'input\', $event.target.value)" />',
    props: ['modelValue', 'min'],
    emits: ['input', 'update:modelValue'],
  },
  ElDatePicker: {
    name: 'ElDatePicker',
    template:
      '<input type="date" v-bind="$attrs" v-model="modelValue" @input="$emit(\'input\', $event.target.value)" />',
    props: ['modelValue', 'type', 'valueFormat'],
    emits: ['input', 'update:modelValue'],
  },
  ElTable: {
    name: 'ElTable',
    template: '<div class="el-table"><slot /></div>',
    props: ['data', 'loading'],
  },
  ElTableColumn: {
    name: 'ElTableColumn',
    template: '<div class="el-table-column"><slot /></div>',
    props: ['prop', 'label', 'width'],
  },
  ElTag: {
    name: 'ElTag',
    template: '<span class="el-tag" :class="`el-tag--${type}`"><slot /></span>',
    props: ['type'],
  },
  ElDialog: {
    name: 'ElDialog',
    template: '<div v-if="modelValue" class="el-dialog"><slot /></div>',
    props: ['modelValue', 'title', 'width'],
    emits: ['update:modelValue', 'close'],
  },
  ElForm: {
    name: 'ElForm',
    template: '<form class="el-form"><slot /></form>',
    props: ['model', 'rules', 'ref'],
  },
  ElFormItem: {
    name: 'ElFormItem',
    template: '<div class="el-form-item"><slot /></div>',
    props: ['prop', 'label', 'rules'],
  },
  ElIcon: {
    name: 'ElIcon',
    template: '<span class="el-icon"><slot /></span>',
  },
}));

// Mock console methods to reduce noise in tests
globalThis.console = {
  ...console,
  log: vi.fn(),
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
};

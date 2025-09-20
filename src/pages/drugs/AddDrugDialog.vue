<script setup lang="ts">
import { ref } from 'vue';
import { addDrug } from '../../api/drugs';
import { ElMessage } from 'element-plus';

defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void;
  (e: 'success'): void;
}>();
const form = ref({
  name: '',
  manufacturer: '',
  batch: '',
  expiry: '',
  stock: 0,
  limit: 0,
});
const loading = ref(false);
const rules = {
  name: [{ required: true, message: '必填', trigger: 'blur' }],
  batch: [{ required: true, message: '必填', trigger: 'blur' }],
  expiry: [{ required: true, message: '必填', trigger: 'change' }],
  stock: [
    { type: 'number', required: true, message: '必填', trigger: 'change' },
  ],
  limit: [
    { type: 'number', required: true, message: '必填', trigger: 'change' },
  ],
};
const formRef = ref();

const onSubmit = async () => {
  await formRef.value?.validate();
  loading.value = true;
  try {
    await addDrug({ ...form.value });
    ElMessage.success('新增成功');
    emit('success');
    emit('update:modelValue', false);
  } catch (e: any) {
    ElMessage.error(e?.message || '提交失败');
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <el-dialog
    title="新增药品"
    :model-value="modelValue"
    @close="$emit('update:modelValue', false)"
    width="520px"
  >
    <el-form :model="form" :rules="rules" ref="formRef" label-width="96px">
      <el-form-item label="名称" prop="name"
        ><el-input v-model="form.name" style="width: 80%"
      /></el-form-item>
      <el-form-item label="生产商" prop="manufacturer"
        ><el-input v-model="form.manufacturer" style="width: 80%"
      /></el-form-item>
      <el-form-item label="批次" prop="batch"
        ><el-input v-model="form.batch" style="width: 80%"
      /></el-form-item>
      <el-form-item label="有效期" prop="expiry"
        ><el-date-picker
          v-model="form.expiry"
          type="date"
          value-format="YYYY-MM-DD"
      /></el-form-item>
      <el-form-item label="库存" prop="stock"
        ><el-input-number v-model="form.stock" :min="0"
      /></el-form-item>
      <el-form-item label="药房限额" prop="limit"
        ><el-input-number v-model="form.limit" :min="0"
      /></el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="$emit('update:modelValue', false)">取消</el-button>
      <el-button type="primary" :loading="loading" @click="onSubmit"
        >提交</el-button
      >
    </template>
  </el-dialog>
</template>

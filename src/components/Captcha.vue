<template>
  <div class="captcha-container">
    <div class="captcha-input">
      <el-input
        v-model="inputValue"
        placeholder="请输入验证码"
        :maxlength="4"
        @input="onInput"
        @keyup.enter="onEnter"
      />
    </div>
    <div class="captcha-image" @click="refreshCaptcha">
      <canvas ref="canvasRef" width="120" height="40"></canvas>
      <div class="captcha-refresh">
        <el-icon><Refresh /></el-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { Refresh } from "@element-plus/icons-vue";

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "change", value: string): void;
}>();

const canvasRef = ref<HTMLCanvasElement>();
const inputValue = ref(props.modelValue);
const captchaText = ref("");

// 生成随机验证码
const generateCaptcha = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// 绘制验证码
const drawCaptcha = () => {
  if (!canvasRef.value) return;

  const canvas = canvasRef.value;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // 清空画布
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 设置背景
  ctx.fillStyle = "#f5f5f5";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 添加干扰线
  for (let i = 0; i < 5; i++) {
    ctx.strokeStyle = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.3)`;
    ctx.beginPath();
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.stroke();
  }

  // 添加干扰点
  for (let i = 0; i < 30; i++) {
    ctx.fillStyle = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`;
    ctx.beginPath();
    ctx.arc(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      1,
      0,
      2 * Math.PI,
    );
    ctx.fill();
  }

  // 绘制文字
  ctx.font = "bold 20px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let i = 0; i < captchaText.value.length; i++) {
    const x = (canvas.width / 4) * (i + 0.5);
    const y = canvas.height / 2 + (Math.random() - 0.5) * 10;

    // 随机颜色
    ctx.fillStyle = `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;

    // 随机旋转
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((Math.random() - 0.5) * 0.5);
    ctx.fillText(captchaText.value[i], 0, 0);
    ctx.restore();
  }
};

// 刷新验证码
const refreshCaptcha = () => {
  captchaText.value = generateCaptcha();
  drawCaptcha();
  inputValue.value = "";
  emit("update:modelValue", "");
  emit("change", "");
};

// 输入处理
const onInput = (value: string) => {
  emit("update:modelValue", value);
  emit("change", value);
};

const onEnter = () => {
  emit("change", inputValue.value);
};

// 验证验证码
const verifyCaptcha = (input: string) => {
  return input.toUpperCase() === captchaText.value.toUpperCase();
};

// 暴露验证方法
defineExpose({
  verifyCaptcha,
  refreshCaptcha,
});

onMounted(() => {
  nextTick(() => {
    refreshCaptcha();
  });
});
</script>

<style scoped>
.captcha-container {
  display: flex;
  gap: 10px;
  align-items: center;
}

.captcha-input {
  flex: 1;
}

.captcha-image {
  position: relative;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.captcha-image:hover {
  border-color: #409eff;
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.2);
}

.captcha-refresh {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #666;
}

.captcha-refresh:hover {
  background: rgba(64, 158, 255, 0.1);
  color: #409eff;
}
</style>

<script setup>
const emit = defineEmits(["confirm", "cancel"]);
defineProps({ show: Boolean });

function onConfirm() {
  emit("confirm");
}
function onCancel() {
  emit("cancel");
}
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white p-6 rounded shadow-lg">
      <p>你確定要刪除帳戶嗎？</p>
      <div class="flex justify-end gap-4 mt-4">
        <button @click="onCancel" class="button-alarm">取消</button>
        <button @click="onConfirm" class="button-primary">確定</button>
      </div>
    </div>
  </div>
</template>

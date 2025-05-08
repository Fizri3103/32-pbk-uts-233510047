<script setup>
import { ref } from 'vue';

const emit = defineEmits(['add-todo']);
const newTodo = ref('');
const startTime = ref('');
const endTime = ref('');

const submitTodo = () => {
  if (newTodo.value.trim() && startTime.value && endTime.value) {
    emit('add-todo', {
      text: newTodo.value.trim(),
      startTime: startTime.value,
      endTime: endTime.value
    });
    newTodo.value = '';
    startTime.value = '';
    endTime.value = '';
  }
};
</script>

<template>
  <form @submit.prevent="submitTodo" class="todo-form">
    <div class="input-group">
      <input 
        v-model="newTodo" 
        type="text" 
        placeholder="Tambahkan kegiatan baru..." 
        class="todo-input"
        autocomplete="off"
      />
      <div class="time-inputs">
        <input
          v-model="startTime"
          type="time"
          class="time-input"
          required
        />
        <span class="time-separator">–</span>
        <input
          v-model="endTime"
          type="time"
          class="time-input"
          required
        />
      </div>
    </div>
    <button 
      type="submit" 
      class="add-btn"
      :disabled="!newTodo.trim() || !startTime || !endTime"
    >
      Tambah
    </button>
  </form>
</template>

<style scoped>
.todo-form {
  display: flex;
  margin-bottom: 24px;
  gap: 8px;
}

.input-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.todo-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #E5E7EB;
  border-radius: 8px;
  font-size: 16px;
  color: #1F2937;
  background-color: white;
  transition: all 0.2s ease;
}

.todo-input:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.todo-input::placeholder {
  color: #9CA3AF;
}

.time-inputs {
  display: flex;
  align-items: center;
  gap: 8px;
}

.time-input {
  padding: 8px 12px;
  border: 2px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;
  color: #1F2937;
  background-color: white;
  transition: all 0.2s ease;
}

.time-input:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.time-separator {
  color: #6B7280;
  font-weight: 500;
}

.add-btn {
  padding: 12px 24px;
  background-color: #3B82F6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-end;
}

.add-btn:hover:not(:disabled) {
  background-color: #2563EB;
  transform: translateY(-1px);
}

.add-btn:active:not(:disabled) {
  transform: translateY(1px);
}

.add-btn:disabled {
  background-color: #E5E7EB;
  color: #9CA3AF;
  cursor: not-allowed;
}

@media (max-width: 640px) {
  .todo-form {
    flex-direction: column;
  }
  
  .add-btn {
    width: 100%;
    margin-top: 8px;
  }
}
</style>
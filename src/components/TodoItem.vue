<script setup lang="ts">
import { computed } from 'vue';
import type { Todo } from '../todo';

const props = defineProps<{
  todo: Todo;
}>();

const emit = defineEmits<{
  'toggle': [id: number];
  'delete': [id: number];
}>();

const formattedDate = computed(() => {
  const date = new Date(props.todo.createdAt);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric'
  });
});
</script>

<template>
  <div class="todo-item" :class="{ 'completed': todo.completed }">
    <div class="todo-content">
      <label class="checkbox-container">
        <input 
          type="checkbox" 
          :checked="todo.completed" 
          @change="emit('toggle', todo.id)" 
        />
        <span class="checkmark"></span>
      </label>
      <div class="todo-text">
        <p class="todo-title">{{ todo.text }}</p>
        <div class="todo-details">
          <span class="todo-time">{{ todo.startTime }} – {{ todo.endTime }}</span>
          <span class="todo-date">{{ formattedDate }}</span>
        </div>
      </div>
    </div>
    <button class="delete-btn" @click="emit('delete', todo.id)" aria-label="Delete todo">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  margin-bottom: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.todo-content {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.todo-text {
  flex: 1;
}

.todo-title {
  margin: 0;
  font-size: 16px;
  color: var(--color-gray-800);
  transition: all 0.2s ease;
}

.todo-details {
  display: flex;
  gap: 12px;
  margin-top: 4px;
  font-size: 12px;
  color: var(--color-gray-500);
}

.todo-time {
  font-weight: 500;
}

.completed .todo-title {
  text-decoration: line-through;
  color: var(--color-gray-400);
}

.checkbox-container {
  display: block;
  position: relative;
  padding-left: 30px;
  cursor: pointer;
  user-select: none;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: 20px;
  width: 20px;
  background-color: white;
  border: 2px solid var(--color-gray-300);
  border-radius: 50%;
  transition: all 0.2s ease;
}

.checkbox-container:hover input ~ .checkmark {
  border-color: var(--color-primary);
}

.checkbox-container input:checked ~ .checkmark {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
  left: 6px;
  top: 3px;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.delete-btn {
  background: none;
  border: none;
  padding: 8px;
  color: var(--color-gray-400);
  border-radius: 6px;
  transition: all 0.2s ease;
  line-height: 0;
}

.delete-btn:hover {
  color: var(--color-danger);
  background-color: var(--color-danger-light);
}

@media (max-width: 640px) {
  .todo-item {
    padding: 12px;
  }
  
  .todo-title {
    font-size: 14px;
  }
  
  .todo-details {
    font-size: 11px;
  }
}
</style>
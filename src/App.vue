<script setup>
import { computed } from 'vue';
import TodoItem from './components/TodoItem.vue';
import TodoForm from './components/TodoForm.vue';
import TodoFilter from './components/TodoFilter.vue';
import useTodos from './useTodos.js';

const { 
  filteredTodos, 
  todos,
  filter,
  addTodo, 
  toggleTodo, 
  deleteTodo, 
  setFilter 
} = useTodos();

const todoCount = computed(() => todos.value.length);
const activeCount = computed(() => todos.value.filter(todo => !todo.completed).length);
</script>

<template>
  <div class="app-container">
    <div class="todo-app">
      <header>
        <h1>To Do List</h1>
        <p class="subtitle">Catat aktivitas harian Anda</p>
      </header>
      
      <TodoForm @add-todo="addTodo" />
      
      <TodoFilter 
        :filter="filter" 
        :todo-count="todoCount" 
        :active-count="activeCount"
        @change-filter="setFilter" 
      />
      
      <div v-if="filteredTodos.length" class="todo-list">
        <transition-group name="list">
          <TodoItem 
            v-for="todo in filteredTodos" 
            :key="todo.id" 
            :todo="todo"
            @toggle="toggleTodo"
            @delete="deleteTodo"
          />
        </transition-group>
      </div>
      
      <div v-else class="empty-state">
        <p>{{ filter === 'all' ? 'Belum ada kegiatan baru' : 'No active tasks' }}</p>
        <p class="empty-state-subtext">
          {{ filter === 'all' ? 'Tambahkan kegiatan baru untuk memulai' : 'All tasks have been completed!' }}
        </p>
      </div>
    </div>
  </div>
</template>

<style>
/* Global styles are imported from style.css */
</style>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 32px 16px;
}

.todo-app {
  width: 100%;
  max-width: 600px;
}

header {
  margin-bottom: 32px;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1F2937;
  margin: 0;
}

.subtitle {
  color: #6B7280;
  margin-top: 8px;
}

.todo-list {
  margin-bottom: 32px;
}

.empty-state {
  text-align: center;
  padding: 48px 0;
  color: #9CA3AF;
}

.empty-state p {
  font-size: 18px;
  margin: 0;
}

.empty-state-subtext {
  font-size: 14px;
  margin-top: 8px;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

@media (max-width: 640px) {
  .app-container {
    padding: 16px;
  }
  
  h1 {
    font-size: 2rem;
  }
}
</style>
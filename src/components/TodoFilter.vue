<script setup>
const props = defineProps({
  filter: String,
  todoCount: Number,
  activeCount: Number
});

const emit = defineEmits(['change-filter']);
</script>

<template>
  <div class="filter-container">
    <div class="todo-stats">
      <p>{{ activeCount }} Kegiatan Baru</p>
      <p>{{ todoCount - activeCount }} Kegiatan Selesai</p>
    </div>
    <div class="filter-options">
      <button 
        class="filter-btn" 
        :class="{ active: filter === 'all' }"
        @click="emit('change-filter', 'all')"
      >
        Semua
      </button>
      <button 
        class="filter-btn" 
        :class="{ active: filter === 'active' }"
        @click="emit('change-filter', 'active')"
      >
        Selesai
      </button>
    </div>
  </div>
</template>

<style scoped>
.filter-container {
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.todo-stats {
  display: flex;
  gap: 16px;
}

.todo-stats p {
  margin: 0;
  font-size: 14px;
  color: #6B7280;
}

.filter-options {
  display: flex;
  gap: 8px;
}

.filter-btn {
  background: none;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 6px;
  color: #6B7280;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  background-color: #F3F4F6;
  color: #1F2937;
}

.filter-btn.active {
  background-color: #EBF5FF;
  color: #3B82F6;
  font-weight: 500;
}

@media (max-width: 640px) {
  .filter-container {
    flex-direction: column;
    gap: 16px;
  }
  
  .todo-stats {
    width: 100%;
    justify-content: space-between;
  }
  
  .filter-options {
    width: 100%;
  }
  
  .filter-btn {
    flex: 1;
    text-align: center;
  }
}
</style>
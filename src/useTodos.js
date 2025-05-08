import { ref, computed } from 'vue';

export default function useTodos() {
  // Load todos from localStorage on initialization
  const loadTodos = () => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      const parsed = JSON.parse(savedTodos);
      // Convert string dates back to Date objects
      return parsed.map(todo => ({
        ...todo,
        createdAt: new Date(todo.createdAt)
      }));
    }
    return [];
  };

  const todos = ref(loadTodos());
  const filter = ref('all');

  // Save todos to localStorage whenever they change
  const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos.value));
  };

  // Filtered todos based on current filter
  const filteredTodos = computed(() => {
    if (filter.value === 'active') {
      return todos.value.filter(todo => !todo.completed);
    }
    return todos.value;
  });

  // Add a new todo
  const addTodo = ({ text, startTime, endTime }) => {
    if (text.trim()) {
      const newTodo = {
        id: Date.now(),
        text: text.trim(),
        completed: false,
        startTime,
        endTime,
        createdAt: new Date()
      };
      todos.value.push(newTodo);
      saveTodos();
    }
  };

  // Toggle completion status
  const toggleTodo = (id) => {
    const todo = todos.value.find(todo => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      saveTodos();
    }
  };

  // Delete a todo
  const deleteTodo = (id) => {
    todos.value = todos.value.filter(todo => todo.id !== id);
    saveTodos();
  };

  // Set current filter
  const setFilter = (newFilter) => {
    filter.value = newFilter;
  };

  return {
    todos,
    filteredTodos,
    filter,
    addTodo,
    toggleTodo,
    deleteTodo,
    setFilter
  };
}
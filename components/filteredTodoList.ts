export const filteredTodoList = computed(() => {
if (tab.value === 'active') {
return todoList.value.filter((todo) => !todo.completed);
} else if (tab.value === 'completed') {
return todoList.value.filter((todo) => todo.completed);
}
return todoList.value;
});

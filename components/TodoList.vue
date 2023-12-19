<script setup lang="ts">
import { computed, ref } from 'vue';
import { string } from 'zod';

// 型情報をショートカットした書き方
// const props = defineProps(['tab','todo','todoList'])

// definePropsというヘルパー関数の中に直接情報を書き込む例
// const props = defineProps<{
// 	tab: string;
//   todo: { name: string; id: number; completed: boolean };
//   todoList: { name: string; id: number; completed: boolean }[];
// }>()

// propsとして切り出す例
// type Props = {
//   tab: string;
//   todo: { name: string; id: number; completed: boolean };
//   todoList: { name: string; id: number; completed: boolean }[];
// }
// const props = defineProps<Props>();

// もっともベーシックな例
type Todo = {
	name: string;
	id: number;
	completed: boolean;
}

type Props = {
	tab: string;
	todo: Todo;
	todoList: Todo[];
}

const props = defineProps<Props>(); 


const filteredTodoList = computed(() => {
	if(props.tab === 'active'){
		return props.todoList.filter((todo:Todo) => !todo.completed)
	} else if(props.tab === 'completed'){
		return props.todoList.filter((todo:Todo) => todo.completed)
	}
	return props.todoList
})

const isEditingTodo = ref(false)
const editTodo = ((todo:Todo) => {
	isEditingTodo.value = true
	const editingTodo = ref({
		name: todo.name,
		id: todo.id,
		completed: todo.completed,
	})
})

</script>

<template>
	<ul>
		<li 
		class='block' 
		v-for="todo in filteredTodoList" 
		:key="todo.id"
		>
			<div>
				<input 
				type="checkbox" 
				class="mr-5" 
				v-model="todo.completed" 
				>
				<label
				v-if="!isEditingTodo"
				:style="{'text-decoration': todo.completed ? 'line-through': 'none' }" 
				@dblclick="editTodo(todo)"
				>
					{{ todo.name }}
				</label>
				<input 
				v-if="isEditingTodo"
				type="text" 
				v-model="todo.name"
				>
			</div>
		</li>
	</ul>
	<label>{{ filteredTodoList.length }} items</label>
</template>
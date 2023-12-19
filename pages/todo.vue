<script setup lang="ts">
import { ref } from 'vue';

type Todo = {
	name: string,
	id: number,
	completed: boolean,
}

const todo = ref<Todo>({
	name: '',
	id: 0,
	completed: false,
})

const todoList = ref<Todo[]>([
	{
	name: 'aaa',
	id: 1,
	completed: false,
	},
	{
	name: 'bbb',
	id: 2,
	completed: true,
	},
	{
	name: 'ccc',
	id: 3,
	completed: true,
	}
])

// TodoListコンポーネントとして切り出す
// const filteredTodoList = computed(() => {
// 	if(tab.value === 'active'){
// 		return todoList.value.filter((todo) => !todo.completed)
// 	} else if(tab.value === 'completed'){
// 		return todoList.value.filter((todo) => todo.completed)
// 	}
// 	return todoList.value
// })

const tab = ref('all')

let nextId = 4

const generatedId = () => {
	const newId = nextId
	nextId += 1
	return newId
}

const addTodo = () => {
	const newTodo = {
		name:todo.value.name,
		id: generatedId(),
		completed:todo.value.completed
	}
	todoList.value.push(newTodo)
	todo.value.name = ''
}

const swichTab = (value:string) => {
	tab.value = value 
}

</script>

<template>
	<body class="m-10">
		<header>
			<input 
			v-model="todo.name" 
			type="text" 
			placeholder="write Todo" 
			@keydown.enter.prevent="addTodo"
			>
		</header>
	<TodoList
	:todo="todo"
	:tab="tab"
	:todo-list="todoList"
	/>
<!-- TodoListコンポーネントとして切り出す -->
		<!-- <ul>
			<li 
			class='block' 
			v-for="todo in filteredTodoList" 
			:key="todo.id"
			>
				<input type="checkbox" class="mr-5" v-model="todo.completed" >
				<label :style="{'text-decoration': todo.completed ? 'line-through': 'none' }" >
					{{ todo.name }}
					{{ todo.completed }}
				</label>
			</li>
		</ul> -->
		<footer class="flex" >
			<section class="space-x-4">
				<button @click="swichTab('all')">All</button>
				<button @click="swichTab('active')">Active</button>
				<button @click="swichTab('completed')">Completed</button>
			</section>
		</footer>
	</body>
</template>
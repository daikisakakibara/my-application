<script setup lang="ts">

// 以下は型情報をショートカットした書き方
// const props = defineProps(['tab','todo','todoList'])

// const props = defineProps<{
// 	tab: string,
// 	todo: { name: string; id: number; completed: boolean },
//   todoList: { name: string; id: number; completed: boolean }[];
// }>

// 以下はdefinePropsというヘルパー関数の中に直接情報を書き込む例
// const props = defineProps<{
// 	tab: string;
//   todo: { name: string; id: number; completed: boolean };
//   todoList: { name: string; id: number; completed: boolean }[];
// }>()

// 以下は複数ある型情報をPropsとしてまとめて、その後Propsの受け渡しを定義する例
type Props = {
  tab: string;
  todo: { name: string; id: number; completed: boolean };
  todoList: { name: string; id: number; completed: boolean }[];
}
const props = defineProps<Props>();

const filteredTodoList = computed(() => {
	if(props.tab === 'active'){
		return props.todoList.filter((todo:any) => !todo.completed)
	} else if(props.tab === 'completed'){
		return props.todoList.filter((todo:any) => todo.completed)
	}
	return props.todoList
})

</script>

<template>
	<ul>
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
	</ul>
</template>
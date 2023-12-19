<script setup>
const names = ref([
	"Kei,Goto",
	"Kenji,Furuya",
	"Jesse,McFaddin"
])

const filterWords = ref('')
const selected = ref('')
const first = ref('')
const last = ref('')

watch(selected, (selectedName) => {
	[first.value , last.value] = selectedName.split(',')
	console.log(selected.value)
	console.log(selected)
})


const filteredNames = computed(() => 
	names.value.filter((n) => n.toLowerCase().startsWith(filterWords.value.toLowerCase()))
)

function create(){
	if(first.value && last.value && !names.value.includes(`${first.value},${last.value}`)){
		names.value.push(`${first.value},${last.value}`)
		first.value = ''
		last.value = ''
	}
}

function update(){
	if(selected.value){
		const i = names.value.indexOf(selected.value)
		names.value.splice(i,1,`${first.value},${last.value}`)
		// names.value = `${first.value},${last.value}`
	}
}

function del(){
	if(selected.value){
		const i = names.value.indexOf(selected.value)
		names.value.splice(i,1)
		selected.value = ''
	}
}

</script>

<template>
<div>
	<input v-model="filterWords" type="text" placeholder="Filter prefix"/>
</div>

<select v-model="selected" size="5">
	<option v-for="name in filteredNames" :key="name">{{name}}</option>
</select>

<label for="">Name:<input v-model="first" type="text"></label>
<label for="">Surname:<input v-model="last" type="text"></label>

<div>
	<button @click="create">Create</button>
	<button @click="update">Update</button>
	<button @click="del">Delete</button>
</div>

</template>

<style>
input {
	display:block;
	margin-bottom: 10px;
}
select {
  float: left;
  margin: 0 1em 1em 0;
  width: 14em;
}
button {
	margin-left: 5px;
}
</style>
<script setup>

const flightType = ref('one-way flight')
const departureDate = ref(dateToString(new Date()))
const arrivalDate = ref(departureDate.value)

onMounted(()=>
 console.log(departureDate.value),
 console.log(flightType.value)
 )

function dateToString(date) {
  return (
    date.toISOString().split('T')[0]
  )
}

function stringToDate(str) {
  const [y, m, d] = str.split('-')
  return new Date(+y, m - 1, +d)
}


const isReturn = computed(() => flightType.value === 'return flight') 

const canBook = computed(
  () =>
    !isReturn.value ||
    stringToDate(arrivalDate.value) > stringToDate(departureDate.value)
)

function book(){
	if(isReturn){
		alert(`You have booked a one-way flight leaving on ${departureDate.value} to ${arrivalDate.value}`)
	}else{
		alert(`You have booked a one-way flight leaving on ${departureDate.value}.`)
	}
}

</script>


<template>
	<select v-model="flightType">
		<option value="one-way flight">One-way Flight</option>
		<option value="return flight">Return Flight</option>
	</select>

		<input type="date" v-model="departureDate">
		<input type="date" v-model="arrivalDate" :disabled="!isReturn">

	<button @click="book" :disabled="!canBook">Book</button>
	<p v-if="!canBook">Return date must be after departure date.</p>
</template>

<style>
select,
input,
button {
  display: block;
  margin: 0.5em 0;
  font-size: 15px;
}

input[disabled] {
  color: #999;
}

p {
  color: red;
}
</style>
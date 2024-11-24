<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-lg w-80">
      <div class="mb-4">
        <input
          type="text"
          v-model="display"
          readonly
          class="w-full p-4 text-right text-2xl bg-gray-50 rounded"
        />
      </div>
      <div class="grid grid-cols-4 gap-2">
        <button
          v-for="button in buttons"
          :key="button"
          @click="handleClick(button)"
          :class="[
            'p-4 text-xl rounded transition-colors',
            isOperator(button)
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : button === '='
              ? 'bg-green-500 text-white hover:bg-green-600'
              : button === 'C'
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-gray-200 hover:bg-gray-300'
          ]"
        >
          {{ button }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const display = ref('')
const buttons = ['C', '±', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '⌫', '=']
let firstNumber = ref('')
let operator = ref('')
let newNumber = ref(true)

const isOperator = (button: string) => ['÷', '×', '-', '+'].includes(button)

const handleClick = (button: string) => {
  if (button === 'C') {
    display.value = ''
    firstNumber.value = ''
    operator.value = ''
    newNumber.value = true
  } else if (button === '±') {
    display.value = (parseFloat(display.value) * -1).toString()
  } else if (button === '%') {
    display.value = (parseFloat(display.value) / 100).toString()
  } else if (button === '⌫') {
    display.value = display.value.slice(0, -1)
  } else if (isOperator(button)) {
    operator.value = button
    firstNumber.value = display.value
    newNumber.value = true
  } else if (button === '=') {
    const secondNumber = parseFloat(display.value)
    const first = parseFloat(firstNumber.value)
    let result = 0

    switch (operator.value) {
      case '+':
        result = first + secondNumber
        break
      case '-':
        result = first - secondNumber
        break
      case '×':
        result = first * secondNumber
        break
      case '÷':
        result = first / secondNumber
        break
    }

    display.value = result.toString()
    newNumber.value = true
  } else {
    if (newNumber.value) {
      display.value = button
      newNumber.value = false
    } else {
      display.value += button
    }
  }
}
</script>

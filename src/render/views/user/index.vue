<template>
  <div>home</div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
console.log(useStore().state.template.testData)
interface Props {
  msg?: string
  labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
//
</style>

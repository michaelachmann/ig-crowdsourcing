<template>
  <div id="app" class="min-h-full bg-gray-50 py-6 flex flex-col "> 
    <Annotator class="justify-center relative overflow-hidden sm:py-12" />
  </div>
</template>

<script>
import Annotator from './components/Annotator.vue'

export default {
  name: 'App',
  components: {
    Annotator
  }
}
</script>

<style>
</style>

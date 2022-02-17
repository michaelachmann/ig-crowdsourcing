<template>
  <div class="flex flex-col h-full m-4 mr-0">
    <div class="">
        <h3 class="text-2xl font-bold">3. Transcription</h3>
        <p class="text-base">Sehen Sie sich die links dargestellte Story an und wählen Sie alle passenden Codes aus.</p>
        <hr />
    </div>
      <div class="text-base mt-4 h-full w-full">
        <textarea v-model="transcription" class="p-1 resize-none w-full h-full border rounded"></textarea>
        <textarea v-model="transcription" placeholder="add multiple lines"></textarea>

      </div>
      <div>

      </div>
  </div>


</template>

<script>

export default {
  name: 'TranscriptionForm',
  props: [
    'transcription'
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

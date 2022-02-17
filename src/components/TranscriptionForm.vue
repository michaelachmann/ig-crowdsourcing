<template>
  <div class="flex flex-col h-full m-4 mr-0">
    <div class="">
        <h3 class="text-2xl font-bold">4. Transkription</h3>
        <p class="text-base">Wurden in die Story Texte eingebaut? Tippen Sie die Inhalte im unteren Feld ab! Du kannst dabei pro Texteinheit eine neue Zeile beginnen.</p>
        <hr />
    </div>
      <div class="text-base mt-4 h-full w-full">
        <textarea v-model="transcription" class="p-1 resize-none w-full h-full border rounded"></textarea>
      </div>
      <div>

      </div>
  </div>


</template>

<script>

export default {
  name: 'TranscriptionForm',
  props: {
    'transcription': String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

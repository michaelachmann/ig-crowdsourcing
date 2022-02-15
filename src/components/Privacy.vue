<template>
  <div>
    <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-6xl place-content-center justify-center align-middle">
      <div class="md:flex">
        <div class="p-8">
          <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Instagram Story Annotator</div>
          <p class="mt-2 text-slate-500">Zustimmung Datenschutz!</p>
              <Story v-if="currentStories" class="story" :story="currentStories"/>
              {{ chromeUserId }}
        </div>
      </div>
    </div>
  </div>


</template>

<script>

export default {
  name: 'Privacy',
  props: [
    'chromeUserId'
  ],
  data() {
    return {
      
    }
  },
  mounted() {
  },
  methods: {
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

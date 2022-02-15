<template>
  <div class="">
    <div>

                <h4>Context of Use</h4>
                <div class="form-check">
                <input type="checkbox" v-model="codes.special_event" id="code-special-event">
                <label for="code-special-event">
                    Special Event
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="codes.daily_life" id="code-daily-life">
                <label for="code-daily-life">
                    Daily Life
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="codes.mood" id="code-mood">
                <label for="code-mood">
                    Mood
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="codes.interaction" id="code-interaction">
                <label for="code-interaction">
                    Interaction
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="codes.self_display" id="code-self-display">
                <label for="code-self-display">
                    Self Display
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="codes.aphorism" id="code-aphorism">
                <label for="code-aphorism">
                    Aphorism
                </label>
                </div>

                <div class="form-check">
                <input type="input" v-model="codes.other" id="code-other">
                <label for="code-other">
                    Other
                </label>
                </div>

        </div>

<button class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white 
        hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2" @click="next()"> Next</button>

  </div>


</template>

<script>

export default {
  name: 'ContextOfUseForm',
  props: [
    'story'
  ],
  data() {
    return {
      codes: {
          special_event: false,
          daily_life: false,
          mood: false,
          interaction: false,
          self_display: false,
          aphorism: false,
          other: ''
      }
    }
  },
  mounted() {
  },
  methods: {
      next(){
        this.$emit('next', JSON.stringify(this.codes))
        this.codes.special_event = false,
        this.codes.daily_life = false,
        this.codes.mood = false,
        this.codes.interaction = false,
        this.codes.self_display = false,
        this.codes.aphorism = false,
        this.codes.other = ''
      },
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

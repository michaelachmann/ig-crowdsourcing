<template>
  <div class="flex flex-col m-4">
    <div class="">
        <h3 class="text-2xl font-bold">2. Context-Of-Use</h3>
        <p class="text-base">Sehen Sie sich die links dargestellte Story an und wählen Sie alle passenden contextOfUse aus.</p>
        <hr />
    </div>
      <div class="flex flex-wrap text-base">
    <div class="m-4">

                <div class="form-check">
                <input type="checkbox" v-model="contextOfUse.special_event" id="code-special-event">
                <label for="code-special-event">
                    Special Event
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="contextOfUse.daily_life" id="code-daily-life">
                <label for="code-daily-life">
                    Daily Life
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="contextOfUse.mood" id="code-mood">
                <label for="code-mood">
                    Mood
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="contextOfUse.interaction" id="code-interaction">
                <label for="code-interaction">
                    Interaction
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="contextOfUse.self_display" id="code-self-display">
                <label for="code-self-display">
                    Self Display
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="contextOfUse.aphorism" id="code-aphorism">
                <label for="code-aphorism">
                    Aphorism
                </label>
                </div>

                <div class="form-check">
                <input type="input" v-model="contextOfUse.other" id="code-other" class="border" placeholder="Other: Enter your suggestion">
                </div>

        </div>
      </div>
      <div>
      </div>
  </div>


</template>

<script>

export default {
  name: 'ContextOfUseForm',
  props: [
    'contextOfUse'
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

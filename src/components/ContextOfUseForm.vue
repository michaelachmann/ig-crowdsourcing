<template>
  <div class="flex flex-col m-4">
    <div class="">
        <h3 class="text-2xl font-bold">2. Kontext</h3>
        <p class="text-base">Welche der folgenden Kontexte findest du beschreibt die Story passend?</p>
        <hr />
    </div>
      <div class="flex flex-wrap text-base">
    <div class="m-4">

                <div class="form-check">
                <input type="checkbox" v-model="contextOfUse.special_event" id="code-special-event">
                <label for="code-special-event">
                    Besonderer Anlass
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="contextOfUse.daily_life" id="code-daily-life">
                <label for="code-daily-life">
                    Tägliches Leben
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="contextOfUse.mood" id="code-mood">
                <label for="code-mood">
                    Laune (Mood)
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="contextOfUse.interaction" id="code-interaction">
                <label for="code-interaction">
                    Interaktion
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="contextOfUse.self_display" id="code-self-display">
                <label for="code-self-display">
                    Selbstdarstellung
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="contextOfUse.aphorism" id="code-aphorism">
                <label for="code-aphorism">
                    Aphorismen (Gedanke, Urteil, Lebensweisheit)
                </label>
                </div>

                <div class="form-check">
                <input type="input" v-model="contextOfUse.other" id="code-other" class="border" placeholder="Sonstiges: Gib deinen Vorschlag an!">
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
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

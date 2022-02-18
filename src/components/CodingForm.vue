<template>
  <div class="flex flex-col">
    <div class="">
        <h3 class="text-2xl font-bold">1. Inhaltskodierung</h3>
        <p class="text-base">Sieh dir die Story links an und wählen für alle Dinge, die in der Story dargestellt sind, die passenden Codes aus.</p>
        <hr />
    </div>
      <div class="flex flex-wrap text-base">
    <div class="m-4">

                <h4 class="text-xl font-semibold text-slate-800">Porträt</h4>
                <div class="form-check">
                <input type="checkbox" v-model="codes.portrait.selfie" id="code-selfie">
                <label for="code-selfie">
                    Selfie
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="codes.portrait.friend" id="code-friend">
                <label for="code-friend">
                    Freunde
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="codes.portrait.family" id="code-family">
                <label for="code-family">
                    Familie
                </label>
                </div>

        </div>
    <div class="m-4">
        
                <h4 class="text-xl font-semibold text-slate-800">Collage</h4>
                <div class="form-check">
                <input type="checkbox" v-model="codes.composition.text" id="code-text">
                <label for="code-text">
                    Text
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="codes.composition.images" id="code-images">
                <label for="code-images">
                    Bilder
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="codes.composition.stickers" id="code-sticker">
                <label for="code-sticker">
                    Interactive Sticker
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="codes.composition.memes" id="code-meme">
                <label for="code-meme">
                    Memes
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="codes.composition.drawings" id="code-drawings">
                <label for="code-drawings">
                    Zeichnungen
                </label>
                </div>

        </div>
    <div class="m-4">

            <h4 class="text-xl font-semibold text-slate-800">Materialität</h4>
                
                <div class="form-check">
                <input type="checkbox" v-model="codes.materiality.objects" id="code-objects">
                <label for="code-objects">
                    Objekte
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="codes.materiality.bodies" id="code-bodies">
                <label for="code-bodies">
                    Körper
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="codes.materiality.car" id="code-car">
                <label for="code-car">
                    Autos
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="codes.materiality.books" id="code-books">
                <label for="code-books">
                    B&uuml;cher
                </label>
                </div>
        </div>

    <div class="m-4">

            <h4 class="text-xl font-semibold text-slate-800">Umgebung</h4>
                
                <div class="form-check">
                <input type="checkbox" v-model="codes.setting.city" id="code-city">
                <label for="code-city">
                    Stadt / Urban
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="codes.setting.nature" id="code-nature">
                <label for="code-nature">
                    Natur
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="codes.setting.travel" id="code-travel">
                <label for="code-travel">
                    Reisen
                </label>
                </div>
        </div>

    <div class="m-4">

            <h4 class="text-xl font-semibold text-slate-800">Feiern</h4>
                
                <div class="form-check">
                <input type="checkbox" v-model="codes.celebration.party" id="code-party">
                <label for="code-party">
                    Party
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="codes.celebration.special" id="code-special">
                <label for="code-special">
                    Besondere Anlässe
                </label>
                </div>

        </div>

    <div class="m-4">

            <h4 class="text-xl font-semibold text-slate-800">Essen &amp; Trinken</h4>
                
                <div class="form-check">
                <input type="checkbox" v-model="codes.food.food" id="code-food">
                <label for="code-food">
                    Essen
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="codes.food.drink" id="code-drink">
                <label for="code-drink">
                    Drinken
                </label>
                </div>

        </div>

    <div class="m-4">

            <h4 class="text-xl font-semibold text-slate-800">Sonstiges</h4>
                
                <div class="form-check">
                <input type="checkbox" v-model="codes.other.animals" id="code-animals">
                <label for="code-animals">
                    Tiere
                </label>
                </div>

                <div class="form-check">
                <input type="text" class="border" v-model="codes.other.open" id="code-open" placeholder="Sonstiges, gib deine Vorschläge an!">
                </div>

        </div>
      </div>
      <div>
      </div>

  </div>


</template>

<script>

export default {
  name: 'CodingForm',
  props: [
    'codes'
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

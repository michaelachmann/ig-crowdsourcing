<template>
  <div class="">
    <div>

                <h4>Portrait</h4>
                <div class="form-check">
                <input type="checkbox" v-model="codes.portrait.selfie" id="code-selfie">
                <label for="code-selfie">
                    Selfie
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="codes.portrait.friend" id="code-friend">
                <label for="code-friend">
                    Friend
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="codes.portrait.family" id="code-family">
                <label for="code-family">
                    Family
                </label>
                </div>

        </div>
        <div>
        
                <h4>Composition</h4>
                <div class="form-check">
                <input type="checkbox" v-model="codes.composition.text" id="code-text">
                <label for="code-text">
                    Text
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="codes.composition.images" id="code-images">
                <label for="code-images">
                    Images
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="codes.composition.sticker" id="code-sticker">
                <label for="code-sticker">
                    Interactive Sticker
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="codes.composition.meme" id="code-meme">
                <label for="code-meme">
                    Memes
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="codes.composition.drawings" id="code-drawings">
                <label for="code-drawings">
                    Drawings
                </label>
                </div>

        </div>
        <div>

            <h4>Materiality</h4>
                
                <div class="form-check">
                <input type="checkbox" v-model="codes.materiality.objects" id="code-objects">
                <label for="code-objects">
                    Objects
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="codes.materiality.bodies" id="code-bodies">
                <label for="code-bodies">
                    Bodies
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="codes.materiality.car" id="code-car">
                <label for="code-car">
                    Car
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="codes.materiality.books" id="code-books">
                <label for="code-objects">
                    books
                </label>
                </div>
        </div>

        <div>

            <h4>Setting</h4>
                
                <div class="form-check">
                <input type="checkbox" v-model="codes.setting.city" id="code-city">
                <label for="code-objects">
                    City
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="codes.setting.nature" id="code-nature">
                <label for="code-bodies">
                    Nature
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="codes.setting.travel" id="code-travel">
                <label for="code-travel">
                    Travel
                </label>
                </div>
        </div>

        <div>

            <h4>Celebration</h4>
                
                <div class="form-check">
                <input type="checkbox" v-model="codes.celebration.party" id="code-party">
                <label for="code-party">
                    Party
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="codes.celebration.special" id="code-special">
                <label for="code-special">
                    Special Occasion
                </label>
                </div>

        </div>

        <div>

            <h4>Food &amp; Beverage</h4>
                
                <div class="form-check">
                <input type="checkbox" v-model="codes.food.food" id="code-food">
                <label for="code-food">
                    Food
                </label>
                </div>

                <div class="form-check">
                <input type="checkbox" v-model="codes.food.drink" id="code-drink">
                <label for="code-drink">
                    Drink
                </label>
                </div>

        </div>

        <div>

            <h4>Other</h4>
                
                <div class="form-check">
                <input type="checkbox" v-model="codes.other.animals" id="code-animals">
                <label for="code-animals">
                    Animals
                </label>
                </div>

                <div class="form-check">
                <input type="text" v-model="codes.other.open" id="code-open">
                <label for="code-open">
                    Open
                </label>
                </div>

        </div>

<button class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white 
        hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2" @click="next()"> Next</button>

  </div>


</template>

<script>

export default {
  name: 'CodingForm',
  props: [
    'story'
  ],
  data() {
    return {
      codes: {
          portrait: {
              selfie: false,
              friend: false,
              family: false
          },
          composition: {
              text: false,
              images: false,
              stickers: false,
              memes: false,
              drawings: false
          },
          materiality: {
              objects: false,
              bodies: false,
              car: false,
              books: false
          }, 
          setting: {
              city: false,
              nature: false,
              travel: false
          },
          celebration: {
              party: false,
              special: false
          },
          food: {
              food: false,
              drink: false,
          },
          other: {
              animal: false,
              open: ''
          }
      }
    }
  },
  mounted() {
  },
  methods: {
      next(){
        this.$emit('next', JSON.stringify(this.codes))
      },
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

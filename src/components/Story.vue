<template>
  <div class="flex flex-col">
            <div v-if="story" class="w-full h-full">
                    <CodingForm :codes="codes" />
                    <div class="flex flex-row sm:flex-wrap">
                        <ContextOfUseForm :contextOfUse="contextOfUse" />
                        <TranscriptionForm :transcription="transcription" />
                        {{ transcription }}
                    </div>
            </div>
        <div class="flex mt-2 justify-between flex-row-reverse">
            <div class="">
              <button class="bottom-0 right-0 px-4 py-1 text-2xl text-white bg-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white 
              hover:bg-purple-900 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2" @click="saveData()">Save Data</button>
            </div>
            <div class="">
              <button :disabled="noStoriesLeft" class="bottom-0 right-0 px-4 py-1 text-2xl text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white 
              hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2" @click="$emit('getNextStory')">Skip Story</button>
            </div>
          </div>
      </div>
</template>

<script>
import moment from 'moment';
import CodingForm from './CodingForm.vue'
import ContextOfUseForm from './ContextOfUseForm.vue'
import TranscriptionForm from './TranscriptionForm.vue'

moment.locale('de');

export default {
  name: 'Story',
  components: {
      CodingForm,
      ContextOfUseForm,
      TranscriptionForm,
  },
  data() {
      return {
    transcription: '',
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
      },
    contextOfUse: {
          special_event: false,
          daily_life: false,
          mood: false,
          interaction: false,
          self_display: false,
          aphorism: false,
          other: ''
      },
    }
  },
  props: {
    chromeUserId: String,
    noStoriesLeft: Boolean,
    story: {
        owner: {
            username: "",
        },
        taken_at_timestamp: "",
        expiring_at_timestamp: "",
        tappable_objects: {
        }
    },
  },
  mounted() {
      console.log(this.chromeUserId)
  },
  computed: {
      taken_at: function() {
          return moment.unix(this.story.taken_at_timestamp).format('LLL')
      },
      expires: function() {
          let expires = moment.unix(this.story.expiring_at_timestamp)
          let now = moment()
          return now.to(expires)
      }
  },
  watch: {
      story() {
          this.clearForms()
      },
      transcription() {
          console.log(this.transcription)
      }
  },
  methods: {
      clearForms(){
        this.codes.portrait.selfie = false
        this.codes.portrait.friend = false
        this.codes.portrait.family = false
        this.codes.composition.text = false
        this.codes.composition.images = false
        this.codes.composition.stickers = false
        this.codes.composition.memes = false
        this.codes.composition.drawings = false
        this.codes.materiality.objects = false
        this.codes.materiality.bodies = false
        this.codes.materiality.car = false
        this.codes.materiality.books = false
        this.codes.setting.city = false
        this.codes.setting.nature = false
        this.codes.setting.travel = false
        this.codes.celebration.party = false
        this.codes.celebration.special = false
        this.codes.food.food = false
        this.codes.food.drink = false
        this.codes.other.animal = false
        this.codes.other.open= ''
        this.contextOfUse.special_event = false,
        this.contextOfUse.daily_life = false,
        this.contextOfUse.mood = false,
        this.contextOfUse.interaction = false,
        this.contextOfUse.self_display = false,
        this.contextOfUse.aphorism = false,
        this.contextOfUse.other = ''
        this.transcription = ''
      },
      saveData(){
        // Saving Codes 
        this.sendCodes(this.codes)

        // Saving Context of Use
        this.sendContextOfUse(this.contextOfUse)

        // Saving Transcription
        this.sendTranscription(this.transcription)

        // Saving Metadata
        this.clearForms() 
        this.$emit('finishedAnnotation', this.story['id'])     


      },
      sendCodes(codes) {
        let collection = '620ba684109fcbacee0a'
        let payload = {
					codes: JSON.stringify(codes),
                    pk: this.story['id'],
					taken_at_timestamp:  this.story['taken_at_timestamp'],
					expiring_at_timestamp: this.story['expiring_at_timestamp'],
                    created_at: Date.now(),
                    annotator_id: this.chromeUserId
				  }
        this.$emit('api', collection, payload)
      },
      sendContextOfUse(codes) {
        let collection = '620bb011e069517ba0df'
        let payload = {
					codes: JSON.stringify(codes),
                    pk: this.story['id'],
					taken_at_timestamp:  this.story['taken_at_timestamp'],
					expiring_at_timestamp: this.story['expiring_at_timestamp'],
                    created_at: Date.now(),
                    annotator_id: this.chromeUserId
				  }
        this.$emit('api', collection, payload)        
      },
      sendTranscription(transcription) {
        let collection = '620e434ab099143dce00'
        let payload = {
					transcription: transcription,
                    pk: this.story['id'],
                    created_at: Date.now(),
                    annotator_id: this.chromeUserId
				  }
        this.$emit('api', collection, payload)     
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

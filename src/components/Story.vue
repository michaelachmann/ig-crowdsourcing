<template>
  <div class="flex flex-col">
            <div v-if="story" class="w-full h-full">
                    <CodingForm :codes="codes" />
                    <div class="flex flex-row sm:flex-wrap">
                        <ContextOfUseForm :contextOfUse="contextOfUse" />
                        <UserGroupForm v-model="userGroup" />
                        <TranscriptionForm v-model="transcription" />
                    </div>
            </div>
        <div class="flex mt-2 justify-between flex-row-reverse">
            <div class="">
              <button class="block w-1/2 px-3 py-2 mx-1 rounded text-center text-xl bg-blue-500 font-medium text-white leading-5 hover:bg-blue-600 md:mx-2 md:w-auto" @click="saveData()">Eingaben Speichern</button>
            </div>
            <div class="">
              <button :disabled="noStoriesLeft" class="block w-1/2 px-3 py-2 mx-1 rounded text-center text-xl bg-gray-500 font-medium text-white leading-5 hover:bg-blue-600 md:mx-2 md:w-auto" @click="nextStory()">Story &Uuml;berspringen</button>
            </div>
          </div>
      </div>
</template>

<script>
import moment from 'moment';
import CodingForm from './CodingForm.vue'
import ContextOfUseForm from './ContextOfUseForm.vue'
import TranscriptionForm from './TranscriptionForm.vue'
import UserGroupForm from './UserGroupForm.vue'

moment.locale('de');

export default {
  name: 'Story',
  components: {
      CodingForm,
      ContextOfUseForm,
      UserGroupForm,
      TranscriptionForm
  },
  data() {
      return {
    transcription : '',
    userGroup: 'None',
    lastOwner: '',
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
              animals: false,
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
      }
  },
  methods: {
      clearForms(){
        this.transcription = ""
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
        this.codes.other.animals = false
        this.codes.other.open= ''
        this.contextOfUse.special_event = false
        this.contextOfUse.daily_life = false
        this.contextOfUse.mood = false
        this.contextOfUse.interaction = false
        this.contextOfUse.self_display = false
        this.contextOfUse.aphorism = false
        this.contextOfUse.other = ''

        if(this.lastOwner != this.story.owner.username){
          this.userGroup = "None"
        }

      },
      nextStory(){
        this.lastOwner = this.story.owner.username
        this.clearForms()
        this.$emit('getNextStory')
      },
      saveData(){
        
        this.lastOwner = this.story.owner.username

        // Saving Codes 
        this.sendCodes(this.codes)

        // Saving Context of Use
        this.sendContextOfUse(this.contextOfUse)

        // Saving Transcription
        this.sendTranscription(this.transcription)

        // Saving Transcription
        this.sendUserGroup(this.userGroup)

        // Send Metadata
        this.sendMetadata(this.story)

        // Saving Metadata
        this.clearForms() 
        this.$emit('finishedAnnotation', this.story['id'])     


      },
      sendCodes(codes) {
        let collection = '620ba684109fcbacee0a'
        let payload = {
					codes: JSON.stringify(codes),
                    pk: this.story['id'],
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
      },
      sendUserGroup(userGroup) {
        let collection = '620e6a9c6eaf0b45fd76'
        let payload = {
					user_group: userGroup,
                    pk: this.story['id'],
                    created_at: Date.now(),
                    annotator_id: this.chromeUserId
				  }
        this.$emit('api', collection, payload)     
      },
      sendMetadata(story){
          let collection = '61f91407e6be2fb18ab1'

          let tappable_objects = ""
          if("tappable_objects" in story){
              tappable_objects = JSON.stringify(story['tappable_objects'])
          }

          let media_overlay_info = ""
          if("media_overlay_info" in story){
              media_overlay_info = JSON.stringify(story['media_overlay_info'])
          }

          let payload = {
					owner_id: story['owner']['id'],
                	owner_username: story['owner']['username'],
					tappable_objects: tappable_objects,
                    media_overlay_info: media_overlay_info,
                    typename: story['__typename'],
					taken_at_timestamp:  story['taken_at_timestamp'],
					expiring_at_timestamp: story['expiring_at_timestamp'],
                    fact_check_information: story['fact_check_information'],
                    pk: story['id'],
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

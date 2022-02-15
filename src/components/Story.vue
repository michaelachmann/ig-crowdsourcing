<template>
  <div class="flex flex-col">
      <div v-if="story">
        <div class="flex flex-wrap justify-center space-x-2 y-4">

                <span
        class="px-4 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max active:bg-gray-300 transition duration-300 ease">
        @{{story.owner.username}}
            </span>
                <span
        class="px-4 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max active:bg-gray-300 transition duration-300 ease">
        🕐 &nbsp;{{taken_at}}
            </span>

                <span
        class="px-4 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max active:bg-gray-300 transition duration-300 ease">
        ⌛ &nbsp;{{expires}}
            </span>
    </div>

    <div class="">
        <h3 class="text-2xl font-bold">Inhaltskodierung</h3>
        <p class="text-base">Sehen Sie sich die links dargestellte Story an und wählen Sie alle passenden Codes aus.</p>
    </div>
            <CodingForm :story="story" v-on:next="sendCodes" />
            <ContextOfUseForm :story="story" v-on:next="sendContextOfUse" />
      </div>
  </div>
</template>

<script>
import moment from 'moment';
import CodingForm from './CodingForm.vue'
import ContextOfUseForm from './ContextOfUseForm.vue'

moment.locale('de');

export default {
  name: 'Story',
  components: {
      CodingForm,
      ContextOfUseForm,
  },
  props: {
    chromeUserId: String,
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
  methods: {
      sendCodes(codes) {
        let collection = '620ba684109fcbacee0a'
        let payload = {
					codes,
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
					codes,
                    pk: this.story['id'],
					taken_at_timestamp:  this.story['taken_at_timestamp'],
					expiring_at_timestamp: this.story['expiring_at_timestamp'],
                    created_at: Date.now(),
                    annotator_id: this.chromeUserId
				  }
        this.$emit('api', collection, payload)    
        this.$emit('finishedAnnotation', this.story['id'])      
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

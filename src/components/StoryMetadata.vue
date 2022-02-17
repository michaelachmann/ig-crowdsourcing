<template>
  <div class="flex flex-wrap justify-center ">
                <span v-if="story" class="px-2 py-1 m-1 rounded text-gray-500 bg-gray-200 font-semibold text-xs font-xs flex align-center w-max active:bg-gray-300 transition duration-300 ease">@{{story.owner.username}}</span>
                <span v-if="story" class="px-2 py-1 m-1 rounded text-gray-500 bg-gray-200 font-semibold text-xs font-xs flex align-center w-max active:bg-gray-300 transition duration-300 ease">🕐 &nbsp;{{taken_at}}</span>
                <span v-if="story" class="px-2 py-1 m-1 rounded text-gray-500 bg-gray-200 font-semibold text-xs font-xs flex align-center w-max active:bg-gray-300 transition duration-300 ease">⌛ &nbsp;{{expires}}</span>
  </div>
</template>

<script>
import moment from 'moment';


moment.locale('de');

export default {
  name: 'Story',
  components: {
      
  },
  props: {
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
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

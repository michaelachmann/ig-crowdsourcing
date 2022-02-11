<template>
  <div>
    <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-6xl place-content-center justify-center align-middle">
      <div class="md:flex">
        <div class="shrink-0">
          <img class="w-full object-cover md:h-full md:w-80" :src="currentImage" alt="Man looking at item at a store">
        </div>
        <div class="p-8">
          <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Instagram Story Annotator</div>
          <p class="mt-2 text-slate-500">Was sehen Sie in der Story? Bitte w&auml;hlen Sie die zutreffenden Optionen aus!</p>
              <Story v-if="currentStories" class="story" :story="currentStories"/>

        </div>
      </div>
    </div>
  </div>


</template>

<script>
import Story from './Story.vue'

export default {
  name: 'HelloWorld',
  components: {
    Story
  },
  data() {
    return {
      userIds: [],
      currentStories: null,
      currentUser: 0,
      currentImage: "",
    }
  },
  mounted() {
    this.getUserIds()
    this.getUserStories(1573431041)
  },
  methods: {
    getUserStories(userId) {
      chrome.tabs.query({url: "https://www.instagram.com/*"}, function(results) {
      chrome.tabs.sendMessage(results[0].id, {type: 'userStories', userId: userId}, function(response) {
          this.currentStories = response[0]
          this.getImage(this.currentStories.display_url)
          }.bind(this))
      }.bind(this))
    },
    getImage(url){
      chrome.tabs.query({url: "https://www.instagram.com/*"}, function(results) {
      chrome.tabs.sendMessage(results[0].id, {type: 'image', url: url}, function(response) {
          this.currentImage = response
          console.log(this.currentImage)
          }.bind(this))
      }.bind(this))
    },
    getUserIds() {
      chrome.tabs.query({url: "https://www.instagram.com/*"}, function(results) {
      chrome.tabs.sendMessage(results[0].id, {type: 'userIds'}, function(response) {
          this.userIds = response
          this.currentUser = 0
          }.bind(this))
      }.bind(this))
    }
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.story{
  white-space: pre-wrap;
}
</style>

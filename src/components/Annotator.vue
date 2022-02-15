<template>
  <div>
    <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-6xl place-content-center justify-center align-middle">
      <div class="md:flex">
        <div class="basis-1/3">
          <img class="w-full object-cover md:h-full md:w-80" :src="currentImage" alt="Man looking at item at a store">
        </div>
        <div class="p-4 space-y-4 container basis-2/3">
              <Story v-on:api="postToApi" v-if="!requestRunning" :story="currentStory" v-on:finishedAnnotation="finishedAnnotation" :chromeUserId="chromeUserId"/>

        <button :disabled="noStoriesLeft" class="bottom-0 right-0 px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white 
        hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2" @click="getNextStory()">Get Next Story</button>

        </div>
      </div>
    </div>
  </div>


</template>

<script>
import Story from './Story.vue'
var Vibrant = require('node-vibrant')

export default {
  name: 'Annotator',
  components: {
    Story,
  },
  props: {
    chromeUserId: String,
  },
  data() {
    return {
      requestRunning: true,
      noStoriesLeft: false,
      lastStory: true,
      userIds: [],
      currentStories: [],
      currentStory: {},
      currentUserPointer: 0,
      currentStoryPointer: 0,
      currentImage: "",
      tabOpen: false,
      tab: null,
      annotatedIDs: {}
    }
  },
  mounted() {
    console.log(this.chromeUserId)
    this.getUserIds()

    chrome.storage.sync.get('annotatedIDs', function(result) {
        this.annotatedIDs = result.annotatedIDs
        console.log('Value currently is ' + JSON.stringify(result.annotatedIDs));
      }.bind(this));

    //Vibrant.from('https://placekitten.com/200/287').getPalette()
    //  .then((palette) => console.log(palette))

  },
  methods: {
    finishedAnnotation(id){      
      let l = Object.keys(this.annotatedIDs).length
      this.annotatedIDs[l] = id
      chrome.storage.sync.set({annotatedIDs: this.annotatedIDs});
      console.log(this.annotatedIDs)
      this.getNextStory()
    },
    // Increases the pointeres in order to get the next story.
    getNextStory(){
      this.requestRunning = true
      if(this.currentStories.length > this.currentStoryPointer + 1){
        this.currentStoryPointer++
        this.currentStory = this.currentStories[this.currentStoryPointer]

        // No we're checking whether this Story has already been annoted (check is only local)
        if(Object.values(this.annotatedIDs).includes(this.currentStory.id)){
          // Has already been annotated, start over again
          this.getNextStory()
        } else {
          this.getImage(this.currentStory.display_url)
          this.requestRunning = false
        }

      } else {
        if(this.userIds.length > this.currentUserPointer + 1){
          this.currentUserPointer++
          this.getUserStories(this.userIds[this.currentUserPointer])
        } else {
          this.noStoriesLeft = true
        }
      }

      if(this.userIds.length == this.currentUserPointer && this.currentStories.length == this.currentStoryPointer){
        this.lastStory = true
      }
    },
    getTab(callback) {
      return chrome.tabs.query({url: "https://www.instagram.com/*"}, function(results) {
      
        if(results.length == 0){
          chrome.tabs.create({url: 'https://www.instagram.com/', active: false}, tab => {
            this.tab = tab
            this.tabOpen = true
            callback()
          });
        }
        this.tab = results[0]
        this.tabOpen = true
        callback()

        }.bind(this))
    },
    getUserStories(userId) {
      this.getTab(() => {
        console.log(userId)
        chrome.tabs.sendMessage(this.tab.id, {type: 'userStories', userId: userId}, function(response) {
                    this.currentStories = response
                    this.currentStoryPointer = 0
                    this.currentStory = this.currentStories[this.currentStoryPointer]

                    // Now we're checking whether this Story has already been annoted (check is only local)
                    if(Object.values(this.annotatedIDs).includes(this.currentStory.id)){
                      // Has already been annotated, get next story
                      this.getNextStory()
                      } else {
                      this.getImage(this.currentStory.display_url)
                      this.requestRunning = false
                    }
                    }.bind(this)) 
      })

    },
    getImage(url){
      this.getTab(() => {
        chrome.tabs.sendMessage(this.tab.id, {type: 'image', url: url}, function(response) {
            console.log(url)
            this.currentImage = response
            console.log(this.currentImage)
            }.bind(this))
        })
    },
    getUserIds() {
      this.getTab(() => {
        chrome.tabs.sendMessage(this.tab.id, {type: 'userIds'}, function(response) {
            this.userIds = response
            this.currentUserPointer = 0
            this.getUserStories(this.userIds[this.currentUserPointer])
            }.bind(this))
          })
    },
    postToApi(collection, payload){
      this.getTab(() => {
        chrome.tabs.sendMessage(this.tab.id, {type: 'appwrite.createDocument', payload, collection}, function(response) {}.bind(this)) 
      })
    }
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

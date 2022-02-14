<template>
  <div>
    <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-6xl place-content-center justify-center align-middle">
      <div class="md:flex">
        <div class="shrink-0">
          <img class="w-full object-cover md:h-full md:w-80" src="https://placekitten.com/200/287" alt="Man looking at item at a store">
        </div>
        <div class="p-8">
          <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Instagram Story Annotator</div>
          <p class="mt-2 text-slate-500">Was sehen Sie in der Story? Bitte w&auml;hlen Sie die zutreffenden Optionen aus!</p>
              <Story v-if="currentStories" class="story" :story="currentStories"/>
              {{ tabOpen }}
              {{ tab }}
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
    Story
  },
  data() {
    return {
      userIds: [],
      currentStories: null,
      currentUser: 0,
      currentImage: "",
      tabOpen: false,
      tab: null,
    }
  },
  mounted() {
    this.getUserIds()
    this.getUserStories(1573431041)

    Vibrant.from('https://placekitten.com/200/287').getPalette()
      .then((palette) => console.log(palette))

  },
  methods: {
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

    getUserStories() {
      this.getTab(() => {
        let userId = this.userIds[0]
        chrome.tabs.sendMessage(this.tab.id, {type: 'userStories', userId: userId}, function(response) {
                    this.currentStories = response[0]
                    //this.getImage(this.currentStories.display_url)
                    this.postToApi()
                    }.bind(this)) 
      })
      


    },
    getImage(url){
      this.getTab(() => {
        chrome.tabs.sendMessage(this.tab.id, {type: 'image', url: url}, function(response) {
            this.currentImage = response
            console.log(this.currentImage)
            }.bind(this))
        })
    },
    getUserIds() {
      this.getTab(() => {
        chrome.tabs.sendMessage(this.tab.id, {type: 'userIds'}, function(response) {
            this.userIds = response
            this.currentUser = 0
            }.bind(this))
          })
    },
    postToApi(){
      this.getTab(() => {
         let payload = {
					typename: this.currentStories['__typename'],
					taken_at_timestamp:  this.currentStories['taken_at_timestamp'],
					expiring_at_timestamp: this.currentStories['expiring_at_timestamp'],
          created_at: Date.now()
				  }
        chrome.tabs.sendMessage(this.tab.id, {type: 'appwrite.createDocument', payload:payload}, function(response) {}.bind(this)) 
      })
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

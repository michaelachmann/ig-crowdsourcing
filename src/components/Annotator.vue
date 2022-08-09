<template>
  <div>
    <div class="h-8 flex items-center text-black p-2 justify-between bg-gray-300">
      <div class="flex h-5 items-center gap-1">
        <span class="font-bold select-none">Kodieren &amp; Transkribieren</span>
      </div>
    </div>

    <div v-show="requestRunning" class="w-full h-5/6 flex flex-col bg-white items-center">
      <span class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status"></span>
      <br />
      <p>Stories laden nicht? &Uuml;berpr&uuml;fe ob du bei Instagram eingeloggt bist!</p>
    </div>
    <div v-if="noStoriesLeft" class="w-full h-5/6 flex flex-col bg-white items-center">
      <div class="text-2xl"> 
        Du hast bereits alle Stories kodiert, komme bald zurück und lade die Seite neu!
      </div>
    </div>
    <div v-if="!requestRunning" v-show="!noStoriesLeft" class="h-5/6 p-1 w-full flex bg-white">

        <div class="w-1/3 h-auto flex flex-col items-center">
          <div class="py-1">
            <StoryMetadata v-if="!requestRunning" :story="currentStory" />
          </div>

          <div class="flex">
            <div class="py-2">
                  <img class="w-auto h-auto rounded" :src="currentImage" id="annotation_image" alt="Current Story for annotation">
            </div>
          </div>

        </div>

        
        <div class="w-5/6 h-auto flex flex-col px-4 py-2">
        
          <Story v-on:api="postToApi" v-if="!requestRunning" :story="currentStory" :noStoriesLeft="noStoriesLeft" v-on:finishedAnnotation="finishedAnnotation" v-on:getNextStory="getNextStory" :chromeUserId="chromeUserId"/>
      
              <Button color="default">Default</Button>


        </div>
    </div>
  </div>


</template>

<script>
import Story from './Story.vue'
import StoryMetadata from './StoryMetadata.vue'
import { Button } from 'flowbite-vue'

var Vibrant = require('node-vibrant')

import { Annotorious } from '@recogito/annotorious';
import '@recogito/annotorious/dist/annotorious.min.css';

export default {
  name: 'Annotator',
  components: {
    Story,
    StoryMetadata,
    Button,
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
      annotatedIDs: {},
      anno: null,
      imageAnnotations: [],
    }
  },
  mounted() {
    this.getUserIds()

    chrome.storage.sync.get('annotatedIDs', function(result) {
        if(result.annotatedIDs){
          this.annotatedIDs = result.annotatedIDs
        } else {
          this.annotatedIDs = {}
        }
      }.bind(this));

    //Vibrant.from('https://placekitten.com/200/287').getPalette()
    //  .then((palette) => console.log(palette))

  },
  methods: {
    // Triggered once the user completes & confirms the coding
    // of a story. The id will be saved to an object, which will
    // be stored in chrome storage. TODO: This method might be 
    // problematic once a user coded a large amount of stories.
    finishedAnnotation(id){      
      let l = Object.keys(this.annotatedIDs).length
      this.annotatedIDs[l] = id
      chrome.storage.sync.set({annotatedIDs: this.annotatedIDs}, function() {
        this.getNextStory()
      }.bind(this));
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
          this.requestRunning = false
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
            this.currentImage = response
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
    },
    craeteOrUpdateAnnotation(annotation){
            console.log(annotation)

      //this.postToApi('annotations', annotation)
      this.imageAnnotations.push(annotation)
    },
    deleteAnnotation(annotation){
      //this.postToApi('annotations', annotation)
    }
  },
  watch: {
    currentImage: function (val, oldVal) {
      console.log(this.imageAnnotations)
      if(this.anno){
        this.anno.destroy()
      }
    
      this.anno = new Annotorious({
        image: document.getElementById("annotation_image"),
      });

      this.anno.on('createAnnotation', this.craeteOrUpdateAnnotation);
      this.anno.on('updateAnnotation', this.craeteOrUpdateAnnotation);
      this.anno.on('deleteAnnotation', this.deleteAnnotation); 
    }   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

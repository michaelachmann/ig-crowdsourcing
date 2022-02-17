<template>
  <div id="app" class="h-screen "> 

    <div class="flex justify-center py-10 items-center bg-gray-200">
    <Annotator :chromeUserId="chromeUserId" class="w-5/6 rounded-xl shadow-lg overflow-hidden text-xs" />
    </div>
  </div>
</template>

<script>
import Annotator from './components/Annotator.vue'
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'App',
  components: {
    Annotator
  },
  data() { 
    return {
        chromeUserId: ""
      }
    },
  mounted() {
    chrome.storage.local.get(['userId'], function(result) {
      if(result.userId){
        this.chromeUserId = result.userId
        console.log('User ID: ' + this.chromeUserId)
      } else {
        this.userId = uuidv4()
        chrome.storage.local.set({userId: this.chromeUserId}, function() {
              console.log('Value is set to ' + this.chromeUserId);
            }.bind(this));
      }
    }.bind(this));
  },
}
</script>

<style>
</style>

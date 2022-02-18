<template>
  <div id="app" class="h-screen">
    <header class="bg-gray-100 shadow">
      <nav class="container mx-auto px-6 py-1">
        <div class="flex flex-col md:flex-row md:justify-between md:items-center">
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <a class="text-gray-800 text-xl font-bold md:text-2xl hover:text-gray-700" href="#">IG-Story Crowdsourcing Plattform</a>
            </div>
          </div>

            <div class="flex items-center py-2 -mx-1 md:mx-0">
              <a class="my-1 text-sm text-gray-700 leading-5 hover:text-blue-600 hover:underline md:mx-4 md:my-0" @click="goto('annotator')" href="#">Stories Kodieren</a>
              <a class="my-1 text-sm text-gray-700 leading-5 hover:text-blue-600 hover:underline md:mx-4 md:my-0" @click="goto('settings')" href="#">Einstellungen &amp; Datenschutz</a>
            </div>
          </div>
      </nav>
    </header>

    <div class="flex justify-center py-5 items-center bg-gray-200">
      <Annotator v-if="currentPage === 'annotator'" :chromeUserId="chromeUserId" class="w-5/6 rounded-xl shadow-lg overflow-hidden" />
      <Settings v-if="currentPage === 'settings'" :chromeUserId="chromeUserId" :consent="consent" v-on:goto="goto" class="w-5/6 rounded-xl shadow-lg overflow-hidden" />
    </div>
  </div>
</template>

<script>
import Settings from './components/Settings.vue'
import Annotator from './components/Annotator.vue'
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'App',
  components: {
    Annotator,
    Settings
  },
  data() { 
    return {
        chromeUserId: "",
        consent: false,
        currentPage: '',
      }
    },
  mounted() {
    chrome.storage.local.get(['consent'], function(result) {
      if(result.consent){
        this.consent = result.consent
      } else {
        this.consent = false
      }

      this.currentPage = this.consent ? 'annotator' : 'settings'
    }.bind(this));

    chrome.storage.local.get(['userId'], function(result) {
      if(result.userId){
        this.chromeUserId = result.userId
      } else {
        this.userId = uuidv4()
        chrome.storage.local.set({userId: this.chromeUserId}, function() {
            }.bind(this));
      }
    }.bind(this));
  },
  methods: {
    goto(page) {
      this.currentPage = page
    }
  },
}
</script>

<style>
</style>

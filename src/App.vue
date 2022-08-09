<template>
  <div id="app" class="h-screen">
    <header class="bg-gray-100 shadow">
    <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div class="container flex flex-wrap justify-between items-center mx-auto">
        <a href="#" class="flex items-center">
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">IG-Story Crowdsourcing Plattform</span>
        </a>
        <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
        </button>
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a href="#" class="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page" @click="goto('annotator')">Stories Kodieren</a>
            </li>
            <li>
              <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" @click="goto('settings')">Einstellungen &amp; Datenschutz</a>
            </li>
            <li>
              <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" @click="goto('ex')">ExperimentalUI</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </header>



    <section class="bg-slate-400 max-w-screen dark:bg-gray-900">
      <div class="py-8 px-16 mx-auto max-w-screen-2xl lg:py-16 lg:px-32">
        <div class="max-w-screen-xl text-gray-500 sm:text-lg dark:text-gray-400">
          <Annotator v-if="currentPage === 'annotator'" :chromeUserId="chromeUserId" class="bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700" />
          <Settings v-if="currentPage === 'settings'" :chromeUserId="chromeUserId" :consent="consent" v-on:goto="goto" class="bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700" />
          <ExperimentalUI v-if="currentPage === 'ex'" :chromeUserId="chromeUserId" class="bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Settings from './components/Settings.vue'
import Annotator from './components/Annotator.vue'
import ExperimentalUI from './components/ExperimentalUI.vue';
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'App',
  components: {
    Annotator,
    Settings,
    ExperimentalUI,
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
      if(result.userId || result.userId === ""){
        this.chromeUserId = result.userId
      } else {
        let userId = uuidv4()
        chrome.storage.local.set({userId: userId}, function() {
          this.chromeUserId = userId
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

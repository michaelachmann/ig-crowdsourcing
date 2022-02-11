<template>
  <div>
    {{ userIds }}
    <p>Test: {{ currentStories.audience }}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      userIds: [],
      currentStories: [],
      currentUser: 0,
    }
  },
  mounted() {
    this.getUserIds()
    this.getUserStories(1573431041)
  },
  methods: {
    getUserStories(userId) {
      chrome.tabs.query({url: "https://www.instagram.com/*"}, results => {
      chrome.tabs.sendMessage(results[0].id, {type: 'userStories', userId: userId}, function(response) {
          this.currentStories = response[0]
          console.log(this.currentStories.audience)
          })
      })
    },
    getUserIds() {
      chrome.tabs.query({url: "https://www.instagram.com/*"}, results => {
      chrome.tabs.sendMessage(results[0].id, {type: 'userIds'}, function(response) {
          this.userIds = response
          this.currentUser = 0
          })
      })
    }
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

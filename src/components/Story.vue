<template>
  <div>
      <div v-if="story">
      <p>{{story.owner.username}}</p>
      <p>{{story.taken_at_timestamp}}</p>
      <p>{{story.expiring_at_timestamp}}</p>

      <p>{{story.tappable_objects}}</p>
      </div>
  </div>
</template>

<script>
import { Appwrite } from "appwrite";


export default {
  name: 'Story',
  props: {
    story: {
        owner: {
            username: "",
        },
        taken_at_timestamp: "",
        expiring_at_timestamp: "",
        tappable_objects: {
        }
    }
  },
  data() {
    return {
    }
  },
  mounted(){
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

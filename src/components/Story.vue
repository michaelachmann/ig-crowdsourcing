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
    const appwrite = new Appwrite();

    appwrite
	    .setEndpoint('http://api.digitalhumanities.io/v1') // Your Appwrite Endpoint
	    .setProject('61f913c8612abf254673') // Your project ID

    appwrite.account.get()
				.catch(e => {
					console.error(e)
					appwrite.account.createAnonymousSession()
				})
				.then(() => {
					appwrite.database.createDocument('61f91407e6be2fb18ab1', 'unique()', {
					typename: this.story['__typename'],
					taken_at_timestamp:  this.story['taken_at_timestamp'],
					expiring_at_timestamp: this.story['expiring_at_timestamp']
				    });
                })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

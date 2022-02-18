<template>
  <div class="flex flex-col m-4">
    <div class="">
        <h3 class="text-2xl font-bold">3. Nutzergruppe</h3>
        <p class="text-base">Welcher Nutzergruppe würdest du die Autor*in der Story zuordnen?</p>
        <hr />
    </div>
      <div class="flex flex-wrap text-base">
    <div class="m-4">

                <div class="form-check">
                <input type="radio" id="influencer" value="Influencer" v-model="modelValue" @input="$emit('update:modelValue', $event.target.value)">
                <label class="pl-1" for="influencer">Influencer*in</label>
                </div>

                <div class="form-check">
                <input type="radio" id="politician" value="Politician" v-model="modelValue"  @input="$emit('update:modelValue', $event.target.value)">
                <label class="pl-1" for="politician">Politiker*in (oder Partei)</label>
                </div>

                <div class="form-check">
                <input type="radio" id="private" value="Private" v-model="modelValue"  @input="$emit('update:modelValue', $event.target.value)">
                <label class="pl-1" for="private">Privatperson</label>
                </div>

                <div class="form-check">
                <input type="radio" id="org" value="Org"
                    v-model="modelValue"
                    @input="$emit('update:modelValue', $event.target.value)">
                <label class="pl-1" for="org">Firma / Institution</label>
                </div>

                <div class="form-check invisible">
                <input type="radio" id="none" value="None" v-model="modelValue"  @input="$emit('update:modelValue', $event.target.value)"> 
                <label class="pl-1" for="none">Keine</label>
                </div>

        </div>
      </div>
      <div>
      </div>
  </div>


</template>

<script>

export default {
  name: 'UserGroupForm',
  props: ['modelValue'],
  emits: ['update:modelValue']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

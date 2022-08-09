<template>   

<div class="w-full bg-white">
    <div class="w-full flex flex-row">
        <div class="grow"><textarea id="message" rows="4" v-model="uiJSON" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 
        focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        placeholder="Your message..."></textarea>
        </div>
        <div class="basis-1/2">
            <div class="form-group" v-for="(element,k) in formElements" :key="k">
                <div v-if="element.type == 'input'">
                    <input type="text" v-model="vals[element.name].value" class="form-control" :placeholder="element.placeholder" :id="element.id" :name="element.name">
                </div>
                <div v-if="element.type == 'textarea'">
                    <textarea v-model="vals[element.name].value" class="form-control" :placeholder="element.placeholder" :id="element.id" :name="element.name"></textarea>
                </div>
                <div v-if="element.type == 'checkbox' || element.type == 'radio'">
                    <fieldset>
                        <legend>{{ element.legend }}</legend>
                        <span v-for="(value, j) in element.values" :key="j">
                            <input :id="value.id" :name="element.name" :value="value.value" :type="element.type" v-model="vals[value.id].value">
                            <label :for="value.id">{{ value.label }}</label>
                        </span>
                    </fieldset>
                </div>
            </div>
        </div>

        <div class="basis-1/2">
            {{ vals }}
        </div>
    </div>
</div>



</template>

<script>

export default {
  name: 'ExperimentalUI',
  props: [
    'contextOfUse'
  ],
  data() {
    return {
        uiJSON: "",
        formElements: [],
        vals: {}
    }
  },
  methods: {
    renderUI(ui){
        for(let element of ui['formElements']){
            this.formElements.push(element)

            // Creating empty values for each form element
            if(element.type == 'input' || element.type == 'textarea'){
                this.vals[element.name] = {value: ""}
            } else if(element.type == 'checkbox' || element.type == 'radio'){
                for(let value of element.values){
                    this.vals[value.id] = {value: false}
                }
            } 
        }
    }
  },
  watch: {
    uiJSON(newVal){
        try {
            let j = JSON.parse(newVal.replace(/^\s+|\s+$/g, ""))
            this.renderUI(j)
        } catch (e) {
            console.log(newVal.replace(/^\s+|\s+$/g, ""))
            console.log(e)
            return false;
        }
    },
    formElements(newVal){
        console.log(newVal)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

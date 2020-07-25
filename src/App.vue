<template>
  <div id="app"
       class=" bg-dark">

    <div class="vh-100 mx-3">
      <div>
        <div class="h1 text-info text-center py-5">
          CSV DATA TO THE TEMPLATE THAT YOU WANT
        </div>
      </div>
      <b-container fluid>
        <b-row>
          <b-col>
            <b-form-textarea v-model="columnNameText"
                             rows="1"
                             placeholder="Column names of CSV"
                             autofocus>
            </b-form-textarea>
          </b-col>
          <b-col>
          </b-col>
          <b-col>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-textarea v-model="text"
                             rows="24"
                             placeholder="Data of CSV">
            </b-form-textarea>
          </b-col>
          <b-col>
            <b-form-textarea v-model="template"
                             rows="24"
                             :placeholder="templateExample"
                             autofocus>
            </b-form-textarea>
          </b-col>
          <b-col>
            <div class="text-white">
              <dynamic :template="template"
                       :data="data"></dynamic>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import dynamic from '@/components/dynamic.js'
export default {
  components: {
    dynamic
  },
  data() {
    return {
      columnNameText: '',
      text: '',
      template: `<div>
	<b-form-textarea :value="items"
	                 rows="24">
	</b-form-textarea>
</div>`,
      templateExample: `example: 
<div>
	<b-form-textarea :value="items"
	                 rows="24">
	</b-form-textarea>
</div>`
    }
  },
  computed: {
    columnNames() {
      return this.columnNameText.split('\t')
    },
    data() {
      return {
        items: this.text.split('\n').map(x => {
          let arr = x.split('\t')
          if (this.columnNameText.length === 0) return arr

          let obj = {}
          for (let i = 0; i < this.columnNames.length; i++) {
            obj[this.columnNames[i]] = arr[i]
          }

          return obj
        })
      }
    }
  },
  methods: {},
  mounted() {
    window.vm = this
  }
}
</script>

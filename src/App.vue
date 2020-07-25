<template>
  <div id="app"
       class=" bg-dark">

    <div class="vh-100 mx-3">

      <div class="h1 text-info text-center py-5">
        The Data Copied from Google Excel to generate the template code.
      </div>
      <b-container fluid>
        <b-row class="text-warning text-center h4">
          <b-col>
            <span>Google Excel Header with Data</span>
          </b-col>
          <b-col>
            <span>Html with Vue Syntax</span>
            <b-button type="button"
                      class="ml-3"
                      @click="createExampleByheaders">Create Example by headers</b-button>
          </b-col>
          <b-col>
            <span>The Output Code (click for copy)</span>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-form-textarea v-model="columnNameText"
                             rows="1"
                             placeholder="Column names of CSV"
                             autofocus>
            </b-form-textarea>
            <b-form-textarea v-model="text"
                             rows="22"
                             placeholder="Data of CSV">
            </b-form-textarea>
          </b-col>
          <b-col>
            <b-form-textarea v-model="template"
                             rows="25"
                             placeholder="html with vue syntax"
                             autofocus>
            </b-form-textarea>
          </b-col>
          <b-col>
            <div id="output"
                 class="bg-white"
                 style="overflow: scroll; max-height: 38rem;"
                 @click="copyOuputText"
                 v-b-popover.top="'Copied to clipboard.'">
              <dynamic :template="template"
                       :data="data"></dynamic>
            </div>
          </b-col>
        </b-row>
      </b-container>

      <div class="h1 secondary text-center py-5">
        power by Walter
      </div>
    </div>
  </div>
</template>

<script>
import dynamic from '@/components/dynamic.js'
import { columnNamesExample, textExample, createExampleByColumns } from './txt'
export default {
  components: {
    dynamic
  },
  data() {
    return {
      columnNameText: columnNamesExample,
      text: textExample,
      template: '<div></div>'
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
  methods: {
    createExampleByheaders() {
      this.template = createExampleByColumns(this.columnNames)
    },
    copyOuputText() {
      const copyText = document.getElementById('output').textContent
      const textArea = document.createElement('textarea')
      textArea.textContent = copyText
      document.body.append(textArea)
      textArea.select()
      document.execCommand('copy')
      textArea.remove()
      setTimeout(() => {
        this.$root.$emit('bv::hide::popover')
      }, 5000)
    }
  },
  created() {
    this.createExampleByheaders()
  },
  mounted() {
    window.vm = this
  }
}
</script>

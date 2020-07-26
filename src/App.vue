<template>
  <div id="app">

    <div class="vh-100 mx-3">

      <div class="h2 text-info text-center py-5">
        The Data Copied from Google Excel or CSV to generate the template code.
      </div>
      <b-container fluid>

        <b-row class="text-warning h4">
          <b-col md="4"
                 cols="12"
                 class="my-1">
            <span class="mb-1">CSV Header with Data</span>
            <b-form-textarea v-model="columnNameText"
                             @change="columnNameTextChange"
                             rows="1"
                             placeholder="Column names of CSV"
                             autofocus>
            </b-form-textarea>
            <b-form-textarea v-model="text"
                             @change="textChange"
                             rows="22"
                             placeholder="Data of CSV">
            </b-form-textarea>
            <div class="d-flex justify-content-center my-3 ">
              <b-button type="button"
                        class="ml-3"
                        @click="resetColumnNameText">Reset Headers</b-button>
              <b-button type="button"
                        class="ml-3"
                        @click="resetText">Reset Data</b-button>
            </div>
          </b-col>

          <b-col md="4"
                 cols="12"
                 class="my-1">
            <span class="mb-1">Html with Vue Syntax Template</span>
            <b-form-textarea v-model="template"
                             @change="templateChange"
                             rows="25"
                             placeholder="html with vue syntax"
                             autofocus>
            </b-form-textarea>
            <div class="d-flex justify-content-center my-3">
              <b-select :options="examples"
                        v-model="selectedExampleValue"
                        @change="examplesChange"
                        style="width:12rem">
                        </b-select>
              <b-button type="button"
                        class="ml-3"
                        @click="createExampleByheaders">Create Example by headers</b-button>
            </div>

          </b-col>
          <b-col md="4"
                 cols="12"
                 class="my-1">
            <span class="mb-1">The Output Code (click for copy)</span>
            <div id="output"
                 class="bg-white"
                 style="overflow: scroll; max-height: 38rem; text-left"
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
import {
  columnNamesExample,
  textExample,
  createExampleByColumns,
  createClassExample
} from './txt'
export default {
  components: {
    dynamic
  },
  data() {
    return {
      columnNameText: columnNamesExample,
      text: textExample,
      template: '<div></div>',
      examples: [
        {
          text: 'new Class',
          value: 1
        },
        {
          text: 'Class definition',
          value: 2
        }
      ],
      selectedExampleValue: 1
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
      if (this.selectedExampleValue === 1) {
        this.template = createExampleByColumns(this.columnNames)
      } else {
        this.template = createClassExample()
      }
      this.templateChange(this.template)
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
    },
    columnNameTextChange(value) {
      localStorage.setItem('columnNameText', value)
    },
    textChange(value) {
      localStorage.setItem('text', value)
    },
    templateChange(value) {
      localStorage.setItem('template', value)
    },
    resetColumnNameText() {
      this.columnNameText = columnNamesExample
      this.columnNameTextChange(this.columnNameText)
    },
    resetText() {
      this.text = textExample
      this.textChange(this.text)
    }
  },
  created() {
    const columnNameText = localStorage.getItem('columnNameText')
    const text = localStorage.getItem('text')
    const template = localStorage.getItem('template')

    if (columnNameText) {
      this.columnNameText = columnNameText
    }

    if (text) {
      this.text = text
    }

    if (template) {
      this.template = template
    } else {
      this.createExampleByheaders()
    }
  },
  mounted() {
    window.vm = this
  }
}
</script>

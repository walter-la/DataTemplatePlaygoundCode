<template>
  <div id="app">

    <div class="vh-100 mx-3">

      <div class="h2 text-info text-center py-5">
        The Excel or CSV Data to any data structure that you want.
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

      <a class="d-flex justify-content-center align-items-center h1 secondary py-5 text-dark"
         href="https://github.com/walter-la/DataTemplatePlaygoundCode"
         target="_blank"
         rel="noopener noreferrer">
        <span class="mx-3">power by</span>
        <svg class="octicon octicon-mark-github v-align-middle"
             height="32"
             viewBox="0 0 16 16"
             version="1.1"
             width="32"
             aria-hidden="true">
          <path fill-rule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
        </svg>
        <span class="mx-3">walter-la</span>

      </a>
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

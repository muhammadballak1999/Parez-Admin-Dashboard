<template>
<div>
     <global-header module="report" title="Report" :items="breadcrumps" />
     <v-row justify="center">
        <div>
        <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Date Picker"
            prepend-inner-icon="mdi-calendar"
            readonly
            outlined
            dense
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          range
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
         </div>
      <v-btn @click="getExcelReport" height="40" color="success" class="ml-3 text-capitalize" :disabled="data.length === 0">
           <v-icon dark>
                mdi-download
            </v-icon>
          Download Excel Report
          </v-btn>
     </v-row>
    <v-data-table
      :headers="headers"
      :items="data"
      class="elevation-4 mt-2"
    >
    <template v-slot:item.createdAt="{ item }">
     {{item.createdAt | dateFormat}}
    </template>
    </v-data-table>
    <iframe id="my_iframe" style="display:none;"></iframe>
</div>
</template>
<script>
import { REQUEST } from '../Request';
import { GET } from '../Request/requestMethods'
export default{
    data() {
        return {
        breadcrumps: [
        {
          text: 'Home',
          disabled: false,
          href: '/',
        },
        {
          text: 'Report',
          disabled: true,
          href: 'report',
        },
      ],
      headers: [
          {
            text: 'victim',
            align: 'start',
            sortable: false,
            value: 'victim.name',
          },
          { text: 'police_station', value: 'police_station.name', sortable: false},
          { text: 'status', value: 'status.status', sortable: false},
          { text: 'occured at', value: 'createdAt', sortable: false},
        ],
      date: null,
      menu: false,
      data: []
    }
    },
    watch: {
        date: {
            deep: true,
            async handler(val) {
                if(val.length > 1) {
                    this.getReport()
                } else {
                    this.data = []
                }
            }
        }
    },
    filters: {
     dateFormat(val) {
      let date = new Date(val);
      return `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}`
     }
    },
    methods: {
       async getReport() {
           let response = await REQUEST(`/violence-cases/report/${this.date[0]}/${this.date[1]}`, GET)
           if(response.success) {
               this.data = response.data
           }
        },
        async getExcelReport() {
          document.getElementById('my_iframe').src = `${process.env.VUE_APP_API_URL}/violence-cases/csv/${this.date[0]}/${this.date[1]}`;
          this.data = []
        }
    }
}
</script>


<template>
<v-col class="pa-0">
  <global-header module="statistics" :title="$t('label.statistics')" :items="breadcrumps" />
    <v-col class="statistics-container pa-5 accent">
        <v-card>
       <GChart
        type="LineChart"
        :data="chartData"
        style="height: 300px !important"
        /> 
        </v-card>
        <v-row class="mt-3">
            <v-col v-for="cardData in data" :key="cardData.id" cols="4">
                <statistics-card :data="cardData" />
            </v-col>
        </v-row>   
      </v-col>
</v-col>
</template>
<script>
import { GChart } from "vue-google-charts";
import StatisticsCard from '../components/StatisticsCard.vue';
export default{
  components: {
    GChart,
    StatisticsCard
  },
    data() {
        return {
        breadcrumps: [
        {
          text: this.$t('label.home'),
          disabled: false,
          href: '/',
        },
        {
          text: this.$t('label.statistics'),
          disabled: true,
          href: 'statistics',
        },
      ],
      chartData: [
        ["Year", "Cases"],
        ["2019", 80],
        ["2020", 68],
        ["2021", 90],
        ["2022", 62],
      ],
      data: [
          {
            id: 0,
            title: this.$t('label.cases'),
            icon: 'receipt',
            value: '200',
            progress: 75
          },
          {
            id: 1,
            title: this.$t('label.users'),
            icon: 'account-outline',
            value: '30',
            progress: 30
          },
          {
            id: 2,
            title: this.$t('label.policeStation'),
            icon:'police-badge-outline',
            value: '10',
            progress: 40
          },
      ]
        }
    }
}
</script>


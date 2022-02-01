<template>
  <global-header module="statistics" @click_event="test" title="Statistics" :items="breadcrumps" />
</template>
<script>
export default{
    methods: {
        test() {
            console.log("Hello")
        }
    },
    data() {
        return {
        breadcrumps: [
        {
          text: 'Home',
          disabled: false,
          href: '/',
        },
        {
          text: 'Statistics',
          disabled: true,
          href: 'statistics',
        },
      ],
        }
    }
}
</script>


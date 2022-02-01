<template>
  <global-header module="notification" @click_event="test" title="Notifications" :items="breadcrumps" />
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
          text: 'Notifications',
          disabled: true,
          href: 'notifications',
        },
      ],
        }
    }
}
</script>


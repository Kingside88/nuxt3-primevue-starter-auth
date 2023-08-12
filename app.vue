<script lang="ts" setup>

const config = useRuntimeConfig()

useHead({
  title: config.public.APP_NAME
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang='scss'>
@import 'App.scss';
</style>

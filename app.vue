<script lang="ts" setup>
import Keycloak, { KeycloakConfig } from 'keycloak-js'
import { useKeycloak } from '@/stores/keycloak'

const config = useRuntimeConfig()
const store = useKeycloak()

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

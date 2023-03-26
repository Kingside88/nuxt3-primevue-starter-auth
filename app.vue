<script setup>
import Keycloak from 'keycloak-js'
import { useKeycloak } from '@/stores/keycloak'

useHead({
    title: 'Nuxt 3 PrimeVue Starter',
    link: [
        // {
        //   id: 'theme-link', rel: 'stylesheet', href: 'https://unpkg.com/primevue/resources/themes/md-dark-indigo/theme.css',
        // },
    ],
})
const config = useRuntimeConfig()
const store = useKeycloak()

const state = reactive({
    loggedIn: false
})

if (config.keycloakDisabled) {
    state.loggedIn = true
} else {
    const initOptions = {
        url: config.public.KEYCLOAK_URL,
        realm: config.public.KEYCLOAK_REALM,
        clientId: config.public.KEYCLOAK_CLIENT_ID,
        clientSecret: config.public.KEYCLOAK_CLIENT_SECRET,
        onLoad: 'login-required'
    }

    const keycloak = new Keycloak(initOptions)

    keycloak
        .init({ onLoad: initOptions.onLoad })
        .then((auth) => {
            if (!auth) {
                window.location.reload()
            } else {
                keycloak.updateToken(5)
                    .then(function (refreshed) {
                        if (refreshed) {
                            console.log('Token was successfully refreshed');
                        } else {
                            console.log('Token is still valid');
                        }
                    }).catch(function () {
                        console.log('Failed to refresh the token, or the session has expired');
                    });

                store.setup(keycloak)
                state.loggedIn = true
            }
        })
}
</script>

<template>
    <div>
        <!-- <div v-if="state.loggedIn"> -->
            <NuxtLayout>
                <NuxtPage />
            </NuxtLayout>
        <!-- </div> -->
    </div>
</template>

<style lang='scss'>
@import 'App.scss';
</style>
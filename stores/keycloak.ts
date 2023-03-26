import { defineStore } from 'pinia'

interface UserProfile {
    IsEmailVerified: boolean,
    Name: string,
    UserName: string,
    FirstName: string,
    LastName: string,
    Email: string,
}

export const useKeycloak = defineStore('keycloak', () => {
    const keycloak = ref(null)
    let userProfile = ref<UserProfile>();
    let roles = ref<string[]>([]);

    function hasRole(role: string) {
        return roles.value.includes(role)
    }

    function setup(kc: any) {
        keycloak.value = kc

        userProfile.value = {
            IsEmailVerified: kc.idTokenParsed?.email_verified,
            Name: kc.idTokenParsed?.name,
            UserName: kc.idTokenParsed?.preferred_username,
            FirstName: kc.idTokenParsed?.given_name,
            LastName: kc.idTokenParsed?.family_name,
            Email: kc.idTokenParsed?.email,
        }

        if (kc.realmAccess?.roles) {
            roles.value = roles.value.concat(kc.realmAccess.roles);
        }

        if (kc.resourceAccess?.account?.roles) {
            roles.value = roles.value.concat(kc.resourceAccess?.account?.roles);
        }
    }

    function isSet() {
        return keycloak.value != null
    }

    return { keycloak, setup, isSet, userProfile, roles, hasRole }
})

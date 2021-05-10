//export const oidcSettings = JSON.parse(process.env.VUE_APP_OIDC_CONFIG)

export const oidcSettings = {
    "authority":"https://localhost:44302",
    "clientId":"js",
    "redirectUri":"http://localhost:5002/oidc-callback",
    "popupRedirectUri":"http://localhost:5002/oidc-popup-callback",
    "responseType":"code",
    "scope":"openid profile offline_access",
    "automaticSilentRenew":true,
    "automaticSilentSignin":false,
    "silentRedirectUri":"http://localhost:5002/silent-renew-oidc.html"
}

export const oidcPasswordSettings = {
    "authority":"https://localhost:44302",
    "clientId":"jsp",
    "clientSecret":"secret",
    "redirectUri":"http://localhost:5002/oidc-callback",
    "popupRedirectUri":"http://localhost:5002/oidc-popup-callback",
    "responseType":"password",
    "username":"admin",
    "password":"123qwe",
    "scope":"openid profile offline_access",
    "automaticSilentRenew":true,
    "automaticSilentSignin":false,
    "silentRedirectUri":"http://localhost:5002/silent-renew-oidc.html"
}
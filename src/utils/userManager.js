import { createUserManager } from "redux-oidc";

// Creates a UserManager from the oidc-client lib.
// The UserManager manages the authorization state, providing
// methods for signing in/out and managing user sessions.
function userManagerConfig(conf) {
  let auth = conf.oidc.authorizationEndpoint;
  return {
    client_id: conf.oidc.clientId,  // The app ID for the app registered at the OIDC provider
                                    // Each app should use its own ID, and we can check that the access token in the spring boot app was issued for this app
    redirect_uri: `${window.location.protocol}//${window.location.hostname}${
      window.location.port ? `:${window.location.port}` : ""
    }/callback`,  // The callback route (redirected to this when signedin)
    response_type: "token", // Return tokens directly (implicit token flow)
    scope: "openid roles",  // What OIDC/OAuth2 scopes the app wants access to
                            // we probably want to get roles/groups and workerID (to log who did what) 
    authority: auth.substr(0, auth.indexOf("/oauth")), // URL of the OIDC provider
    automaticSilentRenew: false,
    filterProtocolClaims: true,
    loadUserInfo: false
  };
}

const userManager = conf => createUserManager(userManagerConfig(conf));

export default userManager;

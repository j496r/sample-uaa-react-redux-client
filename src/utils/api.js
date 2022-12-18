import store from "../store";

export function requestDataFromApi(url) {
  return apiRequest(url);
}

// Request credentials for OAuth2 client service instance from the NodeJS backend
export function requestOAuthClientConfigFromBackend() {
  const url = "/conf.json"; // Static file in backend that contains OAuth2 client credentials
  return apiRequest(url, "GET", false);
}

/**
 * @short Function sending http request, adding access_token to request when
 *        authenticated (finding the value in the redux state)
 * @return Http response
 **/
function apiRequest(url, method = "GET", authenticated = true) {
  const headers = new Headers();
  headers.append("Accept", "application/json");
  if (authenticated) {
    const token = store.getState().oidc.user.access_token;
    headers.append("Authorization", `Bearer ${token}`);
  }
  const options = {
    method,
    headers
  };

  return fetch(url, options)
    .then(res => res.json())
    .then(data => ({ data }))
    .catch(error => ({ error }));
}

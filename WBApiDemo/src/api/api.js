import axios from 'axios'
import { HOST_CONFIG, KEY_CONFIG, API_ROUTER_CONFIG } from '@/config/Config'

export const oauthPost = (code, okCallback, errorCallback) => {
  var oauthData = {
    client_id: KEY_CONFIG.app_key,
    client_secret: KEY_CONFIG.app_secret,
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: KEY_CONFIG.redirect_uri
  }

  var config = {
    method: 'post',
    url: API_ROUTER_CONFIG.oauth_post,
    baseURL: HOST_CONFIG.host,
    data: oauthData,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  axios(config)
    .then(function (response) {
      console.log("oauthPost-ok", 'oauthPost response succeed')
      okCallback(response)
    })
    .catch(function (error) {
      console.log(error);
      errorCallback(error)
    })
}
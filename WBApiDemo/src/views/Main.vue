<template>
  <button @click="handleButtonClick">认证</button>
</template>
<style lang="less" scoped>

</style>
<script>
import {HOST_CONFIG, KEY_CONFIG} from '@/config/Config'
import {oauthPost} from '@/api/api'
export default {
  data() {
    return {
      code: window.location.href
    }
  },
  methods: {
    handleButtonClick() {
      var client_id = KEY_CONFIG.app_key
      var redirect_uri = KEY_CONFIG.redirect_uri
      var oauthUrl  = HOST_CONFIG.oauth
      window.open(oauthUrl + "?client_id=" + client_id + '&redirect_uri=' + redirect_uri, '_self','',true)
    }
  },
  mounted() {
    if (this.code.search('code') != -1) {
      const oauthCode = this.code.substring(this.code.indexOf('=') + 1, this.code.indexOf('#'))
      oauthPost(oauthCode, res => {
        console.log(res)
        if (res.status == 200) {
          const data = res.data 
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('remind_in', data.remind_in)
          localStorage.setItem('expires_in', data.expires_in)
          localStorage.setItem('uid', data.uid)
          this.$router.push({
            path: '/home'})
        }
      }, error => {

      })
    }
    console.log(this.code.substring(this.code.indexOf('=') + 1, this.code.indexOf('#')))
  }
}
</script>

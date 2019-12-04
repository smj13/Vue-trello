<template>
  <div class="container">
    <p v-show='messageData' class='message'>{{messageInfo}}</p>
    <h1 class="titleCss">登录到Trello</h1>
    <a href="/register" class="loginCss">或者创建账户</a>
    <div class="inputCss">
      <label for="forName">账号</label>
      <input id="forName" v-model='users.username' placeholder="你的账户" type="inputType" />
    </div>
    <div class="inputCss">
      <label for="forPwd">密码</label>
      <input id="forPwd" v-model='users.pwd' placeholder="你的密码" type="password" />
    </div>
    <input class="button button-green" @click='sub' type="button" value="登录" />
  </div>
</template>

<script>
export default {
  data(){
    return {
      messageData: false,
      messageInfo: '',
      users: {
        username: '',
        pwd: ''
      }
    }
  },
  methods: {
    sub() {
      this.$http.post('http://localhost:5566/checkUsers',this.users).then(res=>{
        window.console.log(res);
        if(res.data.status === 0){
          alert('登录成功~!');
          window.console.log('跳转到主页');
          // 缓存token
          localStorage.setItem('mytoken',res.data.token);
          this.$router.push('/trello');
        }else {
          this.messageData = true;
          this.messageInfo = res.data.info;
        }
      })
    }
  }
}
</script>

<style scoped>
.container {
  font-size: 16px;
  font-weight: 300;
  width: 540px;
  margin: 0 auto;
  margin-top: 30px;
}
.loginCss {
  color: #298fca;
  font-size: 18px;
}
.titleCss {
  font-size: 38px;
  line-height: 48px;
  margin-top: 0px;
  margin-bottom: 0px;
}
.button {
  border-radius: 3px;
  max-width: 440px;
  width: 100%;
  background: #e2e4e6;
  box-shadow: none;
  color: hsl(0, 0%, 55%);
  cursor: default;
  padding: 0.6em 1.3em;
  font-weight: bold;
  display: inline-block;
  text-decoration: none;
  border: 0px;
  height: 40px;
  font-size: 16px;
  margin-top: 20px;
}

/* 符合条件后的按钮 */
.button-green {
  background: #61bd4f;
  color: white;
}
.button-green:hover {
  background: #5aac44;
}
.message {
  background: #eb5a46;
  color: #fbedeb;
  font-size: 14px;
  font-family: "Helvetica Neue", Arial, sans-serif;
  border-radius: 4px;
  padding: 10px;
  width: 440px;
}
label {
  display: block;
}
.inputCss {
  margin-top: 30px;
}
.inputCss label {
  margin-bottom: 10px;
}
.inputCss input {
  background: #edeff0;
  border-radius: 4px;
  border: 1px solid #cdd2d4;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0.5em;
  max-width: 440px;
  width: 100%;
  display: block;
  margin: 0 0 1.2em;
  height: 40px;
}
</style>
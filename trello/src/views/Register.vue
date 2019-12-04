<template>
  <div class="container">
    <p v-show="!checkInfo.usernameIsPass || !checkInfo.emailIsPass || !checkInfo.pwdIsPass" class="message">{{checkInfo.info}}</p>
    <h1 class="titleCss">创建 Trello 账号</h1>
    <a class="loginCss" href="/login">或者登录你的账户</a>
    <div class="inputCss">
      <label for="forMail">邮箱</label>
      <input id="forMail" @blur="checkEmail" v-model="users.email" placeholder="请输入邮箱" type="text" />
    </div>
    <div class="inputCss">
      <label for="forName">用户名</label>
      <input id="forName" @blur='checkUsers' v-model="users.username" placeholder="请输入用户名" type="text" />
    </div>
    <div class="inputCss">
      <label for="forPwd">密码</label>
      <input id="forPwd" @blur='checkPwd' v-model="users.pwd" placeholder="请输入密码" type="password" />
    </div>
    <input :disabled='!canSub' class="button button-green" type="button" @click="sub" value="创建新的账号" />
    <p class="quiet">
      通过创建账号，你同意我们的服务条款
      和隐私策略。
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkInfo:{
        usernameIsPass: false,
        emailIsPass: false,
        pwdIsPass: false,
        info: '用户名不能为空'
      },
      users: {
        username: "",
        email: "",
        pwd: ""
      }
    };
  },
  components: {

  },
  methods: {
    sub() {
      window.console.log(this.users);
      this.$http.post('http://localhost:5566/user',this.users).then(res=>{
        window.console.log(res);
        if(res.data.status===0){
          alert('创建成功~!');
          this.$router.push('/login');
        } else {
          this.checkInfo.usernameIsPass = true;
          this.checkInfo.info = res.data;
        }
      }).catch(err=>{
        return window.console.log(err);
      });
    },
    checkEmail() {
      if(this.users.email === ''){
        this.checkInfo.info = '邮箱不能为空';
        this.checkInfo.emailIsPass = false;
      }else if(!/^\w+@[a-z0-9]+(.[a-z]+){1,3}/.test(this.users.email)){
        this.checkInfo.info = '邮箱格式不符合';
        this.checkInfo.emailIsPass = false;
      }else {
        this.checkInfo.emailIsPass = true;
      }
    },
    checkUsers() {
      if(this.users.username === ''){
        this.checkInfo.info = '用户名不能为空';
        this.checkInfo.usernameIsPass = false;
      }else if(this.users.username.length < 2 || this.users.username.length > 12){
        this.checkInfo.info = '用户名长度为2-12位';
        this.checkInfo.usernameIsPass = false;
      }else {
        this.checkInfo.usernameIsPass = true;
      }
    },
    checkPwd() {
      if(this.users.pwd === ''){
        this.checkInfo.info = '密码不能为空';
        this.checkInfo.pwdIsPass = false;
      }else {
        this.checkInfo.pwdIsPass = true;
      }
    }
  },
  computed: {
    canSub() {
      if(this.checkInfo.usernameIsPass && this.checkInfo.emailIsPass && this.checkInfo.pwdIsPass) {
        return true;
      }else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
.container {
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
}
.button[disabled] {
  background: #666666;
  color: white;
}
.button[disabled]:hover {
  background: #666666;
}
.quiet {
  color: hsl(0, 0%, 60%);
  font-size: 14px;
  margin-top: 30px;
  display: inline-block;
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
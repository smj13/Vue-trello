<template>
  <header id="header">
    <div class="header-left-btn">
      <a class="header-btn-home" href="javascript:;">
        <i class="icon-home"></i>
      </a>
      <a class="header-btn-board" href="javascript:;">
        <i class="icon-menu"></i>
        <span>&nbsp;看板</span>
      </a>
      <div class="header-search">
        <i class="icon-search"></i>
      </div>
    </div>
    <h1 class="logo">Trello</h1>
    <div class="header-right-btn">
      <a href="javascript:;" class="header-btn-create">
        <i class="icon-add-outline"></i>
      </a>
      <a href="javascript:;" class="header-btn-message">
        <i class="icon-information-outline"></i>
      </a>
      <a href="javascript:;" class="header-btn-inform">
        <i class="icon-notifications"></i>
      </a>
      <a href="javascript:;" class="header-btn-userinfo">
        <i class="icon-user"></i>
      </a>
      <div class="create-card card">
        <p>创建看板</p>
        <a href="javascript:;" class="close-btn">✖️</a>
        <ul>
          <li>
            <a href="javascript:;">
              <strong>新建面板</strong>
              <span>看板由卡片组成，并按列表进行分类。使用看板可以管理项目、追踪信息、或者管理任何东西。</span>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <strong>新建团队</strong>
              <span>团队就是一组看板和人员。使用它可组织你的公司、副业、家庭或好友。</span>
            </a>
          </li>
          <li>
            <a href="javascript:;">
              <strong>新建企业团队</strong>
              <span>通过企业服务，你的团队将获得更好的安全性、更得的管理权限及不受限制的Power-Ups</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="message-card card">
        <p>通知</p>
        <a href="javascript:;" class="close-btn">✖️</a>
        <ul class="message-list" style="display:none;">
          <li>
            <i class="iconfont icon-liuyan"></i>
            <span>假装是一条通知</span>
          </li>
        </ul>
        <div class="nomsg">
          <span>没有通知</span>
        </div>
      </div>
      <div class="user-card card">
        <p>用户名</p>
        <a href="javascript:;" class="close-btn">✖️</a>
        <ul>
          <li>
            <a href="javascript:;">个人资料</a>
            <a href="javascript:;">卡</a>
            <a href="javascript:;">设置</a>
          </li>
          <li>
            <a href="javascript:;">帮助</a>
            <a href="javascript:;">快捷键</a>
            <a href="javascript:;">更改语言</a>
          </li>
          <li>
            <a href="javascript:;">登出</a>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style scoped>
#header {
  width: 100%;
  height: 32px;
  line-height: 32px;
  background: rgba(0, 0, 0, 0.15);
  padding: 4px;
  color: #fff;
  display: flex;
  justify-content: space-between;
}

#header .logo {
  width: 80px;
  height: 30px;
  background: url(~@/assets/img/header-logo.png);
  background-size: 80px 30px;
  text-indent: -9999px;
}

#header .header-left-btn {
  width: 290px;
  display: flex;
  justify-content: space-between;
}

#header .header-left-btn a {
  display: block;
  background-color: hsla(0, 0%, 100%, 0.3);
  border-radius: 3px;
  text-align: center;
}

.header-btn-home {
  width: 32px;
  height: 32px;
}

.header-btn-board {
  width: 70px;
  height: 32px;
  font-size: 15px;
}

.header-search {
  width: 180px;
  height: 32px;
  outline: none;
  border: none;
  background-color: hsla(0, 0%, 100%, 0.3);
  position: relative;
  border-radius: 3px;
  cursor: text;
}

.header-search i {
  position: absolute;
  right: 8px;
  top: 8px;
}

.header-right-btn {
  width: 140px;
  height: 32px;
  display: flex;
  position: relative;
}

.header-right-btn a {
  display: block;
  width: 32px;
  height: 32px;
}
.card {
  position: fixed;
  right: 5px;
  top: 40px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
}
.create-card {
  display: none;
  width: 280px;
}
.card p {
  text-align: center;
  color: #333;
  border-bottom: 1px solid #ebecf0;
}
.card li {
  padding: 10px 12px;
  color: #6b778c;
}
.create-card li:hover {
  background: rgba(0, 0, 0, 0.15);
}
.create-card li a {
  display: block;
  width: 100%;
  height: auto;
  color: #6b778c;
  line-height: 20px;
}
.create-card li strong {
  display: block;
}
.create-card li span {
  font-size: 12px;
}
.card .close-btn {
  position: absolute;
  right: 0;
  top: 0;
  margin: 0;
}
.message-card {
  width: 420px;
  display: none;
}
.message-card li {
  font-size: 16px;
}
.nomsg {
  height: 30px;
  text-align: center;
  padding-top: 160px;
  color: #6b778c;
}
.user-card {
  width: 304px;
  display: none;
}
.user-card li {
  border-bottom: 1px solid #ebecf0;
}
.user-card li a {
  width: 100%;
  color: #6b778c;
}
</style>
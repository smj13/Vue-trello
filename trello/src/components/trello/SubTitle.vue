<template>
  <div class="subtitle">
    <div class="subtitle-left">
      <!-- <div class="plan-title"> -->
      <div class="name-show" contenteditable="true">plan</div>
      <!-- <input class="name-edit" type="text" value="plan"></input> -->
      <!-- </div> -->
      <a href="javascript:;" class="star">
        <i class="icon-star-empty"></i>
      </a>
    </div>
    <div class="subtitle-right">
      <a href="javascript:;">
        <i class="icon-navigation-more"></i>
        <span>显示菜单</span>
      </a>
      <div class="menu-ctrl card">
        <p>菜单</p>
        <a href="javascript:;" class="close-btn">✖️</a>
        <ul>
          <li>
            <a href="javascript:;">
              <i class="iconfont icon-bangongzhongxin"></i>
              <span>关于此面板</span>
            </a>
            <a href="javascript:;">
              <i class="color"></i>
              <span>更改背景</span>
            </a>
            <a href="javascript:;">
              <i class="iconfont icon-jihua"></i>
              <span>更多</span>
            </a>
          </li>
          <li>
            <dl>
              <dt>
                <i class="iconfont icon-woderizhi">活动</i>
              </dt>
              <dd>
                <p>
                  <strong>用户</strong>
                  将卡片
                  <a href="javascript:;">某卡片</a>
                  添加到
                  <span>某列表</span>
                </p>
                <p>某天某时分</p>
              </dd>
              <dd>
                <p>
                  <strong>用户</strong>
                  将卡片
                  <a href="javascript:;">某卡片</a>
                  添加到
                  <span>某列表</span>
                </p>
                <p>某天某时分</p>
              </dd>
              <dd>
                <p>
                  <strong>用户</strong>
                  将卡片
                  <a href="javascript:;">某卡片</a>
                  添加到
                  <span>某列表</span>
                </p>
                <p>某天某时分</p>
              </dd>
            </dl>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.subtitle {
  display: flex;
  justify-content: space-between;
  padding: 8px 4px 8px 8px;
}
.subtitle .name-show {
  font-size: 18px;
  font-weight: 700;
  line-height: 32px;
  padding-left: 4px;
  padding-right: 2px;
  max-width: calc(100% - 12px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #fff;
  margin-left: 5px;
  margin-top: 5px;
}
.subtitle-left {
  display: flex;
}
.subtitle .star {
  display: block;
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  margin-top: 5px;
}
.subtitle-right {
  font-size: 14px;
  height: 32px;
  line-height: 32px;
  margin-right: 5px;
}
.subtitle-right span {
  margin-left: 5px;
  text-decoration: underline;
}
.menu-ctrl {
  width: 420px;
  background-color: #fff;
  position: fixed;
  right: 5px;
  top: 40px;
  border-radius: 10px;
  display: none;
}
.menu-ctrl li {
  border-bottom: 1px solid #ebecf0;
}
.menu-ctrl a {
  display: flex;
  color: #192d50;
  align-items: center;
  margin: 15px 0;
}
.menu-ctrl span {
  text-decoration: none;
}
.menu-ctrl i {
  font-size: 32px;
}
.menu-ctrl .color {
  display: inline-block;
  width: 32px;
  height: 32px;
  border-radius: 5px;
  background-color: #4bbf6c;
}
.menu-ctrl dl i {
  font-size: 16px;
}
.menu-ctrl dd {
  border-bottom: 1px solid #ebecf0;
}
.menu-ctrl dd:last-child {
  border: none;
}
.menu-ctrl dd p {
  text-align: left;
  border-bottom: none;
}
.menu-ctrl dd a {
  display: inline-block;
  text-decoration: underline;
  margin: 10px 0;
}
</style>
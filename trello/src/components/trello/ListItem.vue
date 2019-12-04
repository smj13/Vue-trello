<template>
  <li class="list-wrap">
    <dl class="sublist">
      <div v-show="false">
        <input class="listid" :value="item.id"/><input class="listsortid" :value="item.sortid" />
      </div>
      <dt class="list-title" @mousedown="listDown">
        <div>{{item.listtitle}}</div>
        <a href="javascript:;" class="more-btn">
          <i class="iconfont icon-navigation-more"></i>
        </a>
        <div class="list-ctrl">
          <p>列表动态</p>
          <a href="javascript:;" class="close-btn">✖️</a>
          <ul>
            <li>
              <a href="javascript:;">添加卡</a>
              <a href="javascript:;">复制列表</a>
              <a href="javascript:;">移动列表</a>
            </li>
            <li>
              <a href="javascript:;">排序依据</a>
            </li>
            <li>
              <a href="javascript:;">移动此列表中所有卡片</a>
              <a href="javascript:;">归档这个列表中所有卡片</a>
            </li>
            <li>
              <a href="javascript:;">将此列表进行归档</a>
            </li>
          </ul>
        </div>
      </dt>
      <dd class="item" @mousedown="taskDown" v-for="(v,k) in item.task" :key='k'>
        <a href="javascript:;">{{v.tasktitle}}</a>
      </dd>
      <dd class="add">
        <a href="javascript:;">
          <i class="iconfont icon-tianjiarenwu"></i>
          <span>添加事项</span>
        </a>
        <div class="add-card">
          <textarea name id></textarea>
          <div class="btns">
            <button>添加卡片</button>
            <button>✖️</button>
          </div>
        </div>
      </dd>
    </dl>
  </li>
</template>

<script>
export default {
  props: ['item'],
  data() {
    return {};
  },
  components: {},
  methods: {
    listDown(e) {
      let subList = e.currentTarget.parentElement;
      let listWrap = e.currentTarget.parentElement.parentElement;
      let cloneSubList = subList.cloneNode(true);
      cloneSubList.style.position = 'absolute';
      cloneSubList.style.transform = 'rotate(5deg)';
      cloneSubList.style.left = subList.getBoundingClientRect().left + 'px';
      cloneSubList.style.top = subList.getBoundingClientRect().top + 'px';
      listWrap.appendChild(cloneSubList);
      let x = e.clientX - cloneSubList.offsetLeft;
      let y = e.clientY - cloneSubList.offsetTop;
      cloneSubList.onmousemove=e=>{
        let xx = e.clientX;
        let yy = e.clientY;
        cloneSubList.style.left = xx - x + 'px';
        cloneSubList.style.top = yy - y + 'px'
        this.$emit('checkCrash',cloneSubList,listWrap);
        return false;
      }
      cloneSubList.onmouseup=()=>{
        this.bgSwitch(subList,false);
        listWrap.removeChild(cloneSubList);
      }
      this.bgSwitch(subList);
    },
    bgSwitch(ele,bgShow = true){
      if(bgShow) {
        ele.childNodes.forEach(node => {
          node.style.visibility = 'hidden';
        });
        ele.style.background = 'rgba(0,0,0,.15)';
      }else {
        ele.childNodes.forEach(node => {
          node.style.visibility = 'visible';
        });
        ele.style.background = '';
      }
    },
    taskDown(e) {
      let dd = e.currentTarget;
      let subList = e.currentTarget.parentElement.parentElement;
      let listWrap = subList.parentElement;
      let clonedd = dd.cloneNode(true);
      clonedd.style.position = 'absolute';
      clonedd.style.transform = 'rotate(5deg)';
      clonedd.style.left = dd.getBoundingClientRect().left + 'px';
      clonedd.style.top = dd.getBoundingClientRect().top + 'px';
      subList.appendChild(clonedd);
      let x = e.clientX - clonedd.offsetLeft;
      let y = e.clientY - clonedd.offsetTop;
      document.onmousemove=e=>{
        let xx = e.clientX;
        let yy = e.clientY;
        clonedd.style.left = xx - x + 'px';
        clonedd.style.top = yy - y + 'px'
        // this.$emit('checkCrash',clonedd,dd);
        this.$emit('checkTaskCrash',clonedd,listWrap,dd);
        return false;
      }
      clonedd.onmouseup=()=>{
        this.bgSwitch(dd,false);
        subList.removeChild(clonedd);
      }
      this.bgSwitch(dd);
    }
  }
};
</script>

<style scoped>
.list-wrap {
  min-width: 272px;
  margin: 0 4px;
  height: 100%;
}
.sublist {
  width: 272px;
  background-color: #e0e1e5;
  color: #192d50;
  border-radius: 5px;
}
.list-title {
  height: 40px;
  line-height: 40px;
  font-weight: 700;
  text-indent: 10px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}
.list-title .more-btn {
  display: block;
  width: 32px;
  height: 32px;
  line-height: 32px;
  color: #192d50;
  border-radius: 5px;
  margin: 5px;
}
.list-title .more-btn:hover {
  background: rgba(0, 0, 0, 0.15);
}
.item {
  width: 240px;
  line-height: 32px;
  padding: 6px 8px 2px;
  background-color: #fff;
  margin: 0 auto;
  border-radius: 5px;
  margin-top: 5px;
}
.item a {
  display: block;
  color: #192d50;
}
.add {
  line-height: 32px;
  padding-left: 15px;
  margin-top: 5px;
}
.add:hover {
  background: rgba(0, 0, 0, 0.15);
}
.add:hover span {
  text-decoration: underline;
}
.add a {
  display: block;
  color: #6b778c;
}
.add-list {
  display: block;
  width: 264px;
  height: 32px;
  line-height: 32px;
  padding: 4px;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  text-indent: 10px;
}
.add-card {
  display: none;
}
.add-card textarea {
  width: 240px;
  min-height: 66px;
  border-radius: 10px;
  border: none;
}
.add-card button {
  height: 32px;
  border-radius: 5px;
  border: none;
  margin-bottom: 10px;
  cursor: pointer;
}
.list-ctrl {
  position: absolute;
  width: 280px;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #ebecf0;
  padding: 0 12px;
  display: none;
}
</style>
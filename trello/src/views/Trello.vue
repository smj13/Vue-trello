<template>
  <div class="container">
    <MyHead></MyHead>
    <SubTitle></SubTitle>
    <ul class="plan-list">
      <ListItem
        v-for="(item,key) in list"
        :key="key"
        :item="item"
        @checkCrash="checkCrash"
        @checkTaskCrash="checkTaskCrash"
        ref="listWrap"
      ></ListItem>
      <li class="list-wrap">
        <a href="javascript:;" class="add-list">
          <i class="iconfont icon-kuaijietongdao"></i>
          <span>添加列表</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import MyHead from "@/components/trello/MyHead.vue";
import SubTitle from "@/components/trello/SubTitle.vue";
import ListItem from "@/components/trello/ListItem.vue";
import {mapState} from 'vuex';
export default {
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("getData");
  },
  components: {
    MyHead,
    SubTitle,
    ListItem
  },
  methods: {
    checkCrash(target,listWrapOriginal) {
      // window.console.log(this.$refs['listWrap'])
      let listWraps = this.$refs['listWrap'];
      for(let i=0; i<listWraps.length; i++){
        if(listWraps[i].$el !== listWrapOriginal) {
          // 不是自身再检测碰撞
          let res = this.isButt(listWraps[i].$el,target);
          if(res&&res.isHalf) {
            // 过半交换位置
            this.exchange(listWraps[i].$el,listWrapOriginal);
            // 更新数据
            let id1 = listWrapOriginal.querySelector('.listid').value;
            let sortid1 = listWrapOriginal.querySelector('.listsortid').value;
            let id2 = listWraps[i].$el.querySelector('.listid').value;
            let sortid2 = listWraps[i].$el.querySelector('.listid').value;
            let obj = {
              id1,
              id2,
              sortid1,
              sortid2
            }
            this.$store.dispatch('updateSort',obj);
          }
        }
      }
    },
    checkTaskCrash(target,listWrapOriginal,dd){
      let listWraps = this.$refs['listWrap'];
      for(let i=0; i < listWraps.length; i++){
        if(listWraps[i].$el !== listWrapOriginal){
          // 不是自身再检测碰撞
          let res = this.isButt(listWraps[i].$el,target);
          if(res&&res.isHalf) {
            // 获取listWrap下的任务
            let subList = listWraps[i].$el.getElementsByClassName('sublist')[0];
            let taskEles = subList.getElementsByClassName('item');
            if(taskEles.length>0){
              // 有任务
              for(let i=0; i<taskEles.length; i++){
                if(taskEles[i]!==target){
                  let result = this.isButt(taskEles[i],target);
                  if(result&& result.isHalf){
                    if(result.direction ==='up'){
                      subList.insertBefore(dd,taskEles[i])
                    }else {
                      subList.insertBefore(dd,taskEles[i].nextSibling)
                      window.console.log(taskEles[i].nextSibling)
                    }
                    break;
                  }else{
                    subList.insertBefore(dd,subList.getElementsByClassName('add')[0])
                  }
                }
              }
            }else{
              // 没有任务
              subList.insertBefore(dd,subList.getElementsByClassName('add')[0]);
            }
            break;
          }
        }
      }
    },
    exchange(ele1,ele2){
      let ep1 = ele1.parentNode;
      let ep2 = ele2.parentNode;
      let index1 = [...ep1.children].indexOf(ele1);
      let index2 = [...ep2.children].indexOf(ele2);
      ep2.insertBefore(ele1,ep2.children[index2]);
      ep1.insertBefore(ele2,ep1.children[index1]);
    },
    // 碰撞检测
    isButt(aObj,bObj) {
      let {left:aLeft,top:aTop} = aObj.getBoundingClientRect();
      let {left:bLeft,top:bTop} = bObj.getBoundingClientRect();

      let axmin = aLeft;
      let axmax = aLeft + aObj.offsetWidth;
      let aymin = aTop;
      let aymax = aTop + aObj.offsetHeight;

      let bxmin = bLeft;
      let bxmax = bLeft + bObj.offsetWidth;
      let bymin = bTop;
      let bymax = bTop + bObj.offsetHeight;

      if(axmax > bxmin && axmin < bxmax && aymax > bymin && aymin < bymax){
        let isHalf;
        let direction;
        // 过半换位置
        if(bxmax>axmax) {
          isHalf = (axmax-bxmin > aObj.offsetWidth/2)?true:false;
        }else {
          isHalf = (bxmax-axmin > aObj.offsetWidth/2)?true:false;
        }

        let centerAY = aObj.offsetHeight/2 + aymin;
        let centerBY = bObj.offsetHeight/2 + bymin;
        if(centerAY<centerBY){
          direction = 'down';
        }else {
          direction = 'up';
        }
        return {
          isHalf,
          direction
        }
      }
    }
  },
  computed: {
    ...mapState(['list'])
  }
};
</script>

<style scoped>
.container {
  background: #4bbf6c;
  height: 100vh;
  overflow-y: hidden;
}
.plan-list {
  overflow-x: scroll;
  overflow-y: hidden;
  display: flex;
  height: 100%;
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
</style>
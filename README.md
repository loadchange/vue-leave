# vue-leave

> 这是一个移动端拖放手势组件库，可以快速实现在移动端的元素拖放的事件监听，数据传递

## 使用方法

与其他Vue插件一样，在项目目录安装插件

> npm install vue-leave

并在Vue入口文件 对插件进行注册 

> Vue.use(VueLeave)

之后可以在组件中使用该插件

###### 组件

1. drag
    该组件用于包裹被拖拽的元素，它可以传送数据，设置层级，是否制作副本，以及是否持续监听。
    
    1. packet 绑定携带数据，当组件到达目标组件时，目标组件触发到达事件时可以获取到该数据
    2. zIndex 拖动元素层级
    3. duplicate 是否创建副本，默认为false，当为true时，在拖动时移动副本
    4. constantly 是否持续检查已经到达目标元素，默认false，仅在拖动结束时检查；当为true时，移动过程中持续检查。
    5. dragend @事件，当拖动结束时触发，调用回掉函数携带三个参数
        1. touchend event
        2. 当前drag 组件
        3. 如已到达目标组件则返回目标组件，如果未到达返回null
    6. target 可选参数，绑定精确目标元素，只寻找 drop组件 name与 drag组件target相匹配的

2. drop
    
    1. name  该属性用于精准拖放，与drag组件target配合使用
    
    该组件为对应drag组件的目标组件，可监听两个事件
    
      1. arrive @事件，有对象已到达该组件，回掉参数携带两个对象
          1. packet 拖动过来的对象所携带的数据
          2. 当前目标组件本身
          
      2. away @事件 有对象到达该组件，又离开了....，回掉参数携带当前对象本身
      

### DEMO

<p align="center"><img src="https://raw.githubusercontent.com/loadchange/vue-leave/master/example.gif" width="414"></p>

### EXAMPLE

```html

<template>
  <div id="app">
    <div class="example">
      <h1 class="title">vue-leave</h1>

      <div class="exhibit">
        <ul class="list">
          <li class="item" v-for="i in 4" :key="i">
            <drop class="item-drop" @arrive="arrive" @away="away">
              <div class="item-img"></div>
            </drop>
          </li>
        </ul>
      </div>

      <div class="photo-album">
        <ul class="list">
          <li class="item" v-for="(img,index) in photoAlbum" :key="index">
            <drag duplicate constantly @dragend="dragEnd" :packet="{img:img}">
              <div v-if="img" class="item-img" :style="{backgroundImage:'url('+img+')'}"></div>
            </drag>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        photoAlbum: [
          'https://wx4.sinaimg.cn/mw1024/9e5389bbly1fpziv9g0vhj21kw11yu0x.jpg',
          'https://wx3.sinaimg.cn/mw1024/9e5389bbly1fpziuy6wyqj21kw0zkwju.jpg',
          'https://wx4.sinaimg.cn/mw1024/9e5389bbly1fpziv3e1yrj21kw11ydy1.jpg',
          'https://wx1.sinaimg.cn/mw1024/9e5389bbly1fpziv55ontj21kw11x1gd.jpg',
          'https://wx1.sinaimg.cn/mw1024/9e5389bbly1fpziv0g3crj21kw11yk1u.jpg',
          'https://wx2.sinaimg.cn/mw1024/9e5389bbly1fpziv7bcvpj21kw11z7wh.jpg',
          'https://wx3.sinaimg.cn/mw1024/9e5389bbly1fpziv5ps4zj21kw11yty0.jpg',
          'https://wx4.sinaimg.cn/mw1024/9e5389bbly1fptyb87a3mj20n00gt1kx.jpg',
          'https://wx2.sinaimg.cn/mw1024/9e5389bbly1fpty37m88cj20my0gk4qp.jpg',
          'https://wx4.sinaimg.cn/mw1024/9e5389bbgy1fpswh5oa0gj20dw09cdjd.jpg'
        ]
      }
    },
    methods: {
      /**
       * 离开
       * @param dropComponent
       */
      away(dropComponent) {
        dropComponent.$el.style.opacity = '1'
        dropComponent.$el.style.backgroundColor = ''
      },
      /**
       * 进入
       * @param packet
       * @param dropComponent
       */
      arrive(packet, dropComponent) {
        dropComponent.$el.style.backgroundColor = '#a9b7c6'
        dropComponent.$el.style.opacity = '.6'
      },
      /**
       * 拖动结束
       * @param e
       * @param self
       * @param dropComponent
       */
      dragEnd(e, self, dropComponent) {
        if (!dropComponent) { // 没有落在drop组件中,dropComponent为null
          return
        }
        let itemImg = dropComponent.$el.getElementsByClassName('item-img')[0]
        itemImg.style.backgroundImage = `url('${self.packet.img}')`
        itemImg.style.border = '2px solid #c7254e'
        dropComponent.$el.style.opacity = '1'
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/sass">
  * {
    padding: 0;
    margin: 0;
    border: 0;
    font-size: 0;
    box-sizing: border-box;
  }

  body {
    background: #2b2b2b;
  }

  #app {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .example {
    width: 100%;
    max-width: 414px;
    height: 100%;
    padding-top: 16px;
    margin: 0 auto;
    background: #3c3f41;
    .title {
      font-size: 36px;
      color: #c7254e;
      text-align: center;
    }
    .list {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
    }
    .item {
      flex: 0 0 20%;
      padding: 1%;
    }
    .item-img {
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      border: 2px solid #e8bf6a;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .exhibit {
      display: flex;
      padding: 0 32px;
      margin-bottom: 32px;
      overflow: hidden;
      .item {
        position: relative;
        flex: 0 0 48%;
        height: 0;
        padding-bottom: 48%;
        margin: 4% 4% 0 0;
        border: 1px dashed #6897bb;
        &:nth-child(even) {
          margin-right: 0;
        }
      }
      .item-drop {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }
      .item-img {
        background-repeat: no-repeat;
        background-size: cover;
        border: none;
      }
    }
  }

  .photo-album {
    padding: 0 16px;
    .item {
      flex: 0 0 20%;
      padding: 1%;
    }
  }
</style>

```

<template>
  <div id="app">
    <div class="example">
      <h1 class="title">Vue-Leave</h1>
      <span class="subtitle">请使用手机📱访问，或手机调试模式</span>
      <div class="exhibit">
        <ul class="list">
          <li class="item" v-for="i in 4" :key="i">
            <drop class="item-drop" name="accurate" @arrive="arrive" @away="away">
              <div class="item-img"></div>
            </drop>
          </li>
        </ul>
      </div>

      <div class="photo-album">
        <ul class="list">
          <li class="item" v-for="(img,index) in photoAlbum" :key="index">
            <drag duplicate @dragend="dragEnd" :packet="{img:img}" target="accurate">
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
    .subtitle {
      display: block;
      font-size: 12px;
      color: #fff;
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

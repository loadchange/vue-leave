<template>
  <div class="drag" :id="dragId">
    <div class="real" ref="real" :style="realStyle" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>
    <div class="duplicate" ref="duplicate" :style="duplicateStyle" v-html="duplicateHTML"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {overlap, getGUID} from './util'

  export default {
    name: 'drag',
    props: {
      target: {type: String, default: null},
      packet: {type: Object, default: {}},
      zIndex: {type: Number, default: 100},
      duplicate: {type: Boolean, default: false},
      constantly: {type: Boolean, default: false}
    },
    data() {
      return {
        dragId: getGUID(),
        realStyle: {zIndex: this.zIndex},
        duplicateStyle: {zIndex: this.zIndex},
        duplicateHTML: ''
      }
    },
    methods: {
      _setStyle(style = {}) {
        style = Object.assign({}, {zIndex: this.zIndex}, style)
        if (this.duplicate) {
          this._createDuplicate()
          this.duplicateStyle = style
        } else {
          this.realStyle = style
        }
      },
      _createDuplicate() {
        this.duplicateHTML = this.$refs.real.innerHTML
      },
      _getDropComponents() {
        let dropList = []
        let filter = (components) => {
          if (!components.length) {
            return
          }
          for (let i = 0; i < components.length; i++) {
            let child = components[i]
            let options = child.$options
            if (options._componentTag === 'drop') {
              if (!this.target) {

              } else {
                if (options.propsData && options.propsData.name === this.target) {
                  dropList.push(child)
                }
              }
            }
            if (child.$children.length) {
              filter(child.$children)
            }
          }
        }
        filter(this.$root.$children)
        return dropList
      },
      _detectObjective() {
        let dropList = []
        let dom1 = this.duplicate ? this.$refs.duplicate : this.$refs.real
        let dropComponents = this._getDropComponents()
        dropComponents.forEach(item => {
          if (overlap(dom1, item.$el)) {
            dropList.push(item)
          }
          item.away()
        })
        let drop = dropList.length ? dropList[0] : null
        if (drop) {
          drop.arrive(this)
        }
        return drop
      },
      touchMove(event) {
        event.preventDefault()
        if (event.targetTouches.length === 1) {
          let touch = event.targetTouches[0]
          let target = event.target
          if (this.duplicate) {
            this._createDuplicate()
          }
          this._setStyle({
            position: 'fixed',
            display: 'block',
            opacity: '.6',
            top: `${touch.pageY - target.offsetHeight / 2}px`,
            left: `${touch.pageX - target.offsetWidth / 2}px`,
            width: `${target.offsetWidth}px`,
            height: `${target.offsetHeight}px`,
          })
          if (this.constantly) {
            this._detectObjective()
          }
        }
      },
      touchEnd(event) {
        if (this.duplicate) {
          this.duplicateHTML = ''
        }
        this._setStyle()
        this.$emit('dragend', event, this, this._detectObjective())
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/sass">
  .drag {
    .duplicate {
      display: none;
    }
  }
</style>

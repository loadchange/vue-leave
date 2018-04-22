<template>
  <div class="drop" :name="name">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import GUID from '../common/guid'

  export default {
    name: 'drop',
    props: {
      name: {type: String, default: new GUID().toString()}
    },
    methods: {
      arrive(element) {
        this.$emit('arrive', element.packet, this)
      },
      away() {
        this.$emit('away', this)
      }
    }
  }
</script>

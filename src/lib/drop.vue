<template>
  <div class="drop">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'drop',
    data() {
      return {}
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

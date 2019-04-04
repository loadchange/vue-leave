<template>
  <div class="drop" :name="name">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
import { getGUID } from "./util";

export default {
  name: "drop",
  props: {
    name: { type: String, default: getGUID() }
  },
  methods: {
    arrive(element) {
      this.$emit("arrive", element.packet, this);
    },

    away() {
      this.$emit("away", this);
    }
  }
};
</script>

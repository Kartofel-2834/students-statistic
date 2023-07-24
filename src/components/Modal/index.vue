<template>
  <div
    class="modal-backdrop"
    :class="{ 'modal-backdrop_hidden': !showed, hidden }"
    @mousedown="$emit('close')"
  >
    <div class="modal" @mousedown.stop>
      <slot />
    </div>
  </div>
</template>

<style src="@/assets/styles/components/modal.css" />

<script>
// Utils
import sleep from "@/utils/sleep";

export default {
  name: "ModalComponent",

  emits: ["close", "open"],

  props: {
    opened: { type: Boolean, default: false },
  },

  data() {
    return { hidden: true, showed: false };
  },

  watch: {
    opened(newOpened) {
      if (newOpened) {
        this.open();
      } else {
        this.close();
      }
    },
  },

  methods: {
    async open() {
      this.hidden = false;
      await sleep(100);
      this.showed = true;
      this.$emit("open");
    },

    async close() {
      this.showed = false;
      await sleep(300);
      this.hidden = true;
      this.$emit("close");
    },
  },
};
</script>

<template>
  <Modal :opened="opened" @open="$emit('open')" @close="$emit('close')">
    <h2>{{ title }}</h2>
    <slot name="content"></slot>

    <div class="buttons-inner">
      <slot name="cancel">
        <Button type="danger" @click="cancel">{{ cancelText }}</Button>
      </slot>

      <slot name="confirm">
        <Button @click="confirm">{{ confirmText }}</Button>
      </slot>
    </div>
  </Modal>
</template>

<script>
// Components
import Modal from "./index.vue";
import Button from "../Button";

export default {
  name: "ConfirmationModalComponent",

  emits: ["open", "close", "confirm", "cancel"],

  props: {
    opened: { type: Boolean, default: false },
    title: { type: String, default: "Вы уверены?" },
    confirmText: { type: String, default: "Да" },
    cancelText: { type: String, default: "Нет" },
  },

  components: { Modal, Button },

  methods: {
    confirm() {
      this.$emit("confirm");
    },

    cancel() {
      this.$emit("close");
      this.$emit("cancel");
    },
  },
};
</script>

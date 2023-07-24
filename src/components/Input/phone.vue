<template>
  <input
    :placeholder="placeholder"
    :value="parsedValue"
    ref="phoneInput"
    type="tel"
    class="input"
    @input="inputListener"
    @keydown="keydownListener"
  />
</template>

<script>
// Utils
import formatPhone from "@/utils/formatPhone.js";

export default {
  name: "PhoneInputComponent",

  emits: ["change"],

  props: {
    value: { type: String, default: "" },
    placeholder: { type: String, default: "" },
  },

  data() {
    return {
      parsedValue: "",
      allowedButtons: new Set(["Backspace", "ArrowLeft", "ArrowRight"]),
      allowedCombos: new Set(["x", "v", "z", "a", "c"]),
    };
  },

  watch: {
    value(newValue) {
      const digistOnly = newValue.replace(/\D/g, "");

      if (newValue !== digistOnly) {
        this.$emit("change", digistOnly);
      }

      const phone = formatPhone(digistOnly);
      this.parsedValue = phone;
    },
  },

  methods: {
    inputListener(event) {
      const { value } = event.target;
      this.$emit("change", value.replace(/\D/g, ""));
    },

    keydownListener(event) {
      const { key, ctrlKey: ctrlPressed } = event;

      if (
        this.allowedButtons.has(key) ||
        (ctrlPressed && this.allowedCombos.has(key))
      ) {
        return;
      }

      if (this.value.length <= 11 && /[0-9]/.test(key)) return;

      event.preventDefault();
    },
  },
};
</script>

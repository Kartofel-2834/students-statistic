<template>
  <div class="input-inner input-inner_number">
    <Button
      :disabled="checkMin()"
      class="input-inner__increment-button"
      @click="down"
    >
      -
    </Button>

    <input
      :value="value"
      :placeholder="placeholder"
      type="text"
      class="input"
      @input="inputListener"
      @keydown="keydownListener"
      @keyup="keyupListener"
    />

    <Button
      :disabled="checkMax()"
      class="input-inner__increment-button"
      @click="up"
    >
      +
    </Button>
  </div>
</template>

<script>
// Components
import Button from "../Button";

export default {
  name: "NumberInputComponent",

  emits: ["change"],

  props: {
    value: { type: String, required: true },
    placeholder: { type: String, default: "" },
    fraction: { type: Boolean, default: false },
    min: { type: Number, required: false },
    max: { type: Number, required: false },
  },

  components: { Button },

  data() {
    return {
      numberValue: 0,
      allowedButtons: new Set(["Backspace", "ArrowLeft", "ArrowRight"]),
      allowedCombos: new Set(["x", "v", "z", "a", "c"]),
      pressedButtons: new Set(),
    };
  },

  mounted() {
    if (this.fraction) this.allowedButtons.add(".");
  },

  watch: {
    value(newValue) {
      const newNumberValue = Number(newValue);

      if (
        isNaN(newNumberValue) ||
        this.checkMin(newNumberValue) ||
        this.checkMax(newNumberValue)
      ) {
        this.$emit("change", `${this.min}`);
      } else {
        this.numberValue = newNumberValue;
      }
    },
  },

  methods: {
    checkMin(value) {
      const checkValue = typeof value === "number" ? value : this.numberValue;
      return typeof this.min === "number" && checkValue <= this.min;
    },

    checkMax(value) {
      const checkValue = typeof value === "number" ? value : this.numberValue;
      return typeof this.max === "number" && checkValue >= this.max;
    },

    inputListener(event) {
      const { value } = event.target;
      this.$emit("change", `${Number(value)}`);
    },

    keydownListener(event) {
      const { key, ctrlKey: ctrlPressed } = event;
      this.pressedButtons.add(key);

      if (
        this.allowedButtons.has(key) ||
        /[0-9]/.test(key) ||
        (ctrlPressed && this.allowedCombos.has(key))
      ) {
        return;
      }

      switch (key) {
        case "-":
          this.numberValue *= -1;
          this.update(this.numberValue);
          break;
        case "ArrowUp":
          this.up();
          break;
        case "ArrowDown":
          this.down();
          break;
      }

      event.preventDefault();
    },

    keyupListener(event) {
      const { key } = event;
      this.pressedButtons.delete(key);
    },

    up() {
      if (this.checkMax()) return;
      this.update(++this.numberValue);
    },

    down() {
      if (this.checkMin()) return;
      this.update(--this.numberValue);
    },

    update(newValue) {
      this.$emit("change", `${newValue}`);
    },
  },
};
</script>

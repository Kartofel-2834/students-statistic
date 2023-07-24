<template>
  <input
    :placeholder="placeholder"
    type="text"
    class="input"
    @input="(event) => $emit('change', event.target.value)"
  />
</template>

<script>
export default {
  name: "TextInputComponent",

  emits: ["change"],

  props: {
    value: { type: String, default: "" },
    placeholder: { type: String, default: "" },
  },
};
</script>

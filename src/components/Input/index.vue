<template>
  <TextInput
    v-if="type === 'text'"
    :value="value"
    @change="(v) => $emit('change', v)"
  />

  <NumberInput
    v-else-if="type === 'number'"
    :value="value"
    :min="min"
    :max="max"
    @change="(v) => $emit('change', v)"
  />

  <PhoneInput
    v-else-if="type === 'phone'"
    :value="value"
    @change="(v) => $emit('change', v)"
  />
</template>

<style src="@/assets/styles/components/input.css" />

<script>
// Components
import TextInput from "./text.vue";
import PhoneInput from "./phone.vue";
import NumberInput from "./number.vue";

export default {
  name: "InputComponent",

  emits: ["change"],

  props: {
    value: { type: String, required: true },
    type: { type: String, default: "text" },
    min: { type: Number, required: false },
    max: { type: Number, required: false },
  },

  components: { TextInput, PhoneInput, NumberInput },
};
</script>

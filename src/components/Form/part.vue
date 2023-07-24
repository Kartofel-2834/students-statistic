<template>
  <div class="form__part">
    <div v-if="label.length" class="form__part__label">{{ label }}</div>
    <slot>
      <Input
        :value="value"
        :type="type"
        :placeholder="placeholder"
        @change="(v) => $emit('change', v)"
      />
    </slot>
  </div>
</template>

<script>
// Components
import Input from "../Input";

export default {
  name: "FormPartComponent",

  emits: ["change"],

  props: {
    value: { type: String, default: "" },
    type: { type: String, default: "text" },
    placeholder: { type: String, default: "" },
    label: { type: String, default: "" },
  },

  components: { Input },
};
</script>

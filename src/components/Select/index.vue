<template>
  <div class="select" :class="{ select_opened: opened }">
    <div class="select__header" @click="toggle">
      <span>{{ value && label in value ? value[label] : placeholder }}</span>

      <Icon icon="material-symbols:keyboard-arrow-up-rounded" />
    </div>

    <div class="select__options-list" :class="{ hidden: optionsHidden }">
      <div
        v-for="option in options"
        :key="option[field]"
        class="select__options-list__option"
        :class="{
          'select__options-list__option_current': checkIsCurrentOption(option),
        }"
        @click="() => onSelect(option)"
      >
        {{ label in option ? option[label] : String(option) }}
      </div>
    </div>
  </div>
</template>

<style src="@/assets/styles/components/select.css" />

<script>
// Utils
import sleep from "@/utils/sleep";

// Components
import { Icon } from "@iconify/vue";

export default {
  name: "SelectComponent",

  emits: ["change"],

  props: {
    value: { required: true },
    options: { type: Array },
    placeholder: { type: String, default: "Выбрать" },
    label: { type: String, default: "label" },
    field: { type: String, default: "id" },
  },

  components: { Icon },

  data() {
    return { optionsHidden: true, opened: false };
  },

  methods: {
    async open() {
      this.optionsHidden = false;
      await sleep(100);
      this.opened = true;
    },

    async close() {
      this.opened = false;
      await sleep(300);
      this.optionsHidden = true;
    },

    async toggle() {
      if (this.opened) {
        await this.close();
      } else {
        await this.open();
      }
    },

    onSelect(option) {
      if (this.checkIsCurrentOption(option)) return;

      this.$emit("change", option);
      this.opened = false;
    },

    checkIsCurrentOption(option) {
      if (this.value === null) return false;

      return this.value[this.field] === option[this.field];
    },
  },
};
</script>

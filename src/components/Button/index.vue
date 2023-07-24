<template>
  <button class="button" :class="`button_${type}`"><slot /></button>
</template>

<style src="@/assets/styles/components/button.css" />

<script>
export default {
  name: "ButtonComponent",

  props: { type: { type: String, default: "primary" } },
};
</script>

<template>
  <router-link
    :to="href"
    class="page-link"
    :class="{ 'page-link_active': isActive }"
  >
    <Icon v-if="icon" :icon="icon" />

    <span class="page-link__text"><slot></slot></span>
  </router-link>
</template>

<style src="@/assets/styles/components/page-link.css" />

<script>
import { Icon } from "@iconify/vue";

export default {
  name: "PageLink",

  props: {
    href: { type: String, default: "/" },
    group: { type: String, default: "home" },
    icon: { type: String, required: false },
  },

  components: {
    Icon,
  },

  computed: {
    isActive() {
      return this.$route.fullPath.includes(this.group);
    },
  },
};
</script>

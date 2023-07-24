<template>
  <!-- Navigation -->
  <nav class="navigation with-shadow">
    <h3>Навигация</h3>

    <PageLink href="/" group="pupils" icon="mdi:user-group"> Ученики </PageLink>

    <PageLink href="/homeworks" group="homeworks" icon="ic:round-home-work">
      Домашние работы
    </PageLink>

    <PageLink href="/visits" group="visits" icon="ph:check-circle-fill">
      Посещаемость
    </PageLink>
  </nav>

  <!-- Page Content -->
  <div class="wrapper">
    <router-view />
  </div>
</template>

<style src="@/assets/styles/style.css" />

<script>
import PageLink from "@/components/PageLink";

export default {
  components: { PageLink },
};
</script>

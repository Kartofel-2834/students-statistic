<template>
  <PageWrapper class="homeworks-wrapper">
    <Card class="page-wrapper__header">
      <h1>Домашние работы</h1>

      <router-link to="/homeworks/add">
        <Button>Создать</Button>
      </router-link>
    </Card>

    <Table :data="homeworks" :fields="tableFields">
      <template #id="{ value: id }">
        <Cell>
          <router-link :to="`/homeworks/${id}`">{{ id }}</router-link>
        </Cell>
      </template>
    </Table>
  </PageWrapper>
</template>

<style src="@/assets/styles/pages/homeworks.css" />

<script>
// Utils
import apiClient from "@/utils/apiClient";

// Components
import PageWrapper from "@/components/PageWrapper";
import Card from "@/components/Card";
import Table from "@/components/Table/index.vue";
import Cell from "@/components/Table/cell.vue";
import Button from "@/components/Button";

export default {
  name: "HomeworksPage",

  components: { PageWrapper, Card, Table, Cell, Button },

  data() {
    return {
      homeworks: [],
      page: 1,

      tableFields: {
        id: { label: "ID", width: "min-content" },

        group_id: { label: "ID Группы", width: "min-content" },

        group: { label: "Группа" },

        composition: {
          label: "Содержание",

          width: "minmax(5em, 30%)",

          formatter: (v) => {
            let composition = v.split("\n");
            composition = composition.filter((ex) => ex.length);

            return composition.join(", ");
          },
        },

        variants_count: { label: "Кол-во вариантов", width: "min-content" },

        middle_mark: { label: "Средний балл", width: "min-content" },

        created_at: {
          label: "Дата создания",
          formatter: (v) => new Date(v).toLocaleString(),
        },
      },
    };
  },

  async mounted() {
    const { data } = await apiClient.getHomeworks({
      page: this.page,
    });

    this.homeworks = Array.isArray(data?.response) ? data.response : [];
    console.log(this.homeworks);
  },
};
</script>

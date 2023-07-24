<template>
  <PageWrapper class="homework">
    <Card class="page-wrapper__header">
      <h1>Домашняя работа №{{ id }}</h1>
    </Card>

    <Card v-if="!!homework?.composition">
      <h2>Содержание:</h2>

      <div class="howework__info">
        <span
          v-for="([exercise, count], index) in homework.composition"
          :key="index"
          class="homework__info__exercise"
        >
          <b>Задание №{{ exercise }}</b> - {{ count }} шт.
        </span>
      </div>
    </Card>

    <Table :data="variants" :fields="tableFields">
      <template #actions="{ item: variant }">
        <Cell class="buttons-inner">
          <Button
            v-if="variant.total === variant.not_done"
            @click="() => (answerModal = variant.id)"
          >
            Ответить
          </Button>
          <a
            v-else
            :href="`${apiUrl}/variants/${variant.id}/report`"
            target="_blank"
          >
            <Button type="info">Результат</Button>
          </a>

          <a
            :href="variant.document"
            target="_blank"
            :download="`Домашняя работа ${id}-${variant.pupil_id}.pdf`"
          >
            <Button type="info">Скачать</Button>
          </a>
        </Cell>
      </template>
    </Table>
  </PageWrapper>

  <Modal
    class="homework__answers-modal"
    :opened="!!answerModal"
    @close="
      () => {
        answerModal = null;
        answers = '';
      }
    "
  >
    <h2>Ответы на вариант</h2>
    <textarea v-model="answers" placeholder="Введите ответ:"></textarea>
    <Button type="info" :disabled="!answers.length" @click="checkVariant">
      Проверить
    </Button>
  </Modal>
</template>

<style src="@/assets/styles/pages/homework-id.css" />

<script>
// Utils
import apiClient, { BASE_API_URL } from "@/utils/apiClient";

// Components
import PageWrapper from "@/components/PageWrapper";
import Modal from "@/components/Modal";
import Card from "@/components/Card";
import Table from "@/components/Table";
import Cell from "@/components/Table/cell.vue";
import Button from "@/components/Button";

export default {
  name: "HomeworkIdPage",

  components: { PageWrapper, Modal, Card, Table, Cell, Button },

  data() {
    return {
      apiUrl: BASE_API_URL,

      id: null,
      homework: null,
      variants: [],
      page: 1,

      answerModal: null,
      answers: "",

      tableFields: {
        id: { label: "ID", width: "min-content" },

        group_id: { label: "ID Группы", width: "min-content" },

        pupil: { label: "Ученик" },

        mark: { label: "Балл", width: "min-content" },

        right_count: { label: "Правильно", width: "min-content" },

        wrong_count: { label: "Не правильно", width: "min-content" },

        not_done: { label: "Не завершено заданий", width: "min-content" },

        actions: { label: "Действия" },
      },
    };
  },

  mounted() {
    this.id = this.$route.params.id;

    if (!this.id) return;

    this.getHomework();
    this.getVariants();
  },

  methods: {
    async getHomework() {
      this.homework = await apiClient.getHomeworkById(this.id);

      if (!this.homework?.composition) return;

      this.homework.composition = this.homework.composition.split("\n");

      this.homework.composition = this.homework.composition.filter(
        (ex) => !!ex.length
      );

      this.homework.composition = this.homework.composition.map((ex) =>
        ex.split("-")
      );
    },

    async getVariants() {
      const { data } = await apiClient.getVariants({
        page: this.page,
        homeworkId: this.id,
      });

      this.variants = data.response;
      console.log(this.variants);
    },

    async checkVariant() {
      if (!this.answerModal || !this.answers.length) return;

      await apiClient.checkVariant(this.answerModal, this.answers);
      await this.getVariants();
      this.answerModal = null;
    },
  },
};
</script>

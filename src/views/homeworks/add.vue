<template>
  <PageWrapper class="homework-form">
    <Card class="page-wrapper__header">
      <h1>Создание домашней работы</h1>
      <Button @click="submit">Создать</Button>
    </Card>

    <Card>
      <Form>
        <FormPart label="Выберите группу">
          <Select
            :value="selectedGroup"
            :options="groups"
            label="group_name"
            field="id"
            @change="(option) => (selectedGroup = option)"
          />
        </FormPart>

        <FormPart label="Выберите задания">
          <div class="exercises-counter">
            <div
              v-for="exerciseNumber in 27"
              :key="exerciseNumber"
              class="exercises-counter__exercise"
            >
              <div class="exercises-counter__exercise__label">
                Задание {{ exerciseNumber }}
              </div>

              <Input
                :value="exercises[exerciseNumber]"
                :min="0"
                type="number"
                @change="(v) => (exercises[exerciseNumber] = v)"
              />
            </div>
          </div>
        </FormPart>

        <Button @click="submit">Создать</Button>
      </Form>
    </Card>
  </PageWrapper>
</template>

<style src="@/assets/styles/pages/homework-form.css" />

<script>
// Utils
import apiClient from "@/utils/apiClient";

// Components
import PageWrapper from "@/components/PageWrapper";
import Form from "@/components/Form/index.vue";
import FormPart from "@/components/Form/part.vue";
import Card from "@/components/Card";
import Select from "@/components/Select";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default {
  name: "AddHomeworkPage",

  components: { PageWrapper, Form, FormPart, Card, Select, Input, Button },

  data() {
    return {
      selectedGroup: null,
      groups: [],

      exercises: {
        1: "0",
        2: "0",
        3: "0",
        4: "0",
        5: "0",
        6: "0",
        7: "0",
        8: "0",
        9: "0",
        10: "0",
        11: "0",
        12: "0",
        13: "0",
        14: "0",
        15: "0",
        16: "0",
        17: "0",
        18: "0",
        19: "0",
        20: "0",
        21: "0",
        22: "0",
        23: "0",
        24: "0",
        25: "0",
        26: "0",
        27: "0",
      },
    };
  },

  async mounted() {
    const { data } = await apiClient.getGroups({
      page: this.page,
    });

    this.groups = Array.isArray(data?.response) ? data.response : [];
  },

  methods: {
    async submit() {
      if (!this.selectedGroup || !this.selectedGroup?.id) return;

      await apiClient.createHomework(this.selectedGroup?.id, this.exercises);
    },
  },
};
</script>

<template>
  <PageWrapper class="pupils-wrapper">
    <Card class="page-wrapper__header">
      <h1>Ученики</h1>
      <Button @click="() => (pupilFormModal = true)">Добавить</Button>
    </Card>

    <Table :data="pupils" :fields="tableFields">
      <template #actions="{ item: pupil }">
        <Cell>
          <Button type="danger" @click="() => (deletePupilId = pupil.id)">
            Удалить
          </Button>
        </Cell>
      </template>
    </Table>
  </PageWrapper>

  <ConfirmationModal
    :opened="!!deletePupilId"
    @close="() => (deletePupilId = null)"
    @confirm="
      () => {
        deletePupil(deletePupilId);
        deletePupilId = null;
      }
    "
  />

  <Modal
    class="pupils-form-modal"
    :opened="pupilFormModal"
    @close="() => (pupilFormModal = false)"
  >
    <h2>Добавление ученика</h2>

    <Form>
      <FormPart label="Группа">
        <Select
          :value="pupilForm.group"
          :options="groups"
          label="group_name"
          field="id"
          @change="(option) => (pupilForm.group = option)"
        />
      </FormPart>

      <FormPart
        :value="pupilForm.fullName"
        label="Полное имя"
        @change="(v) => (pupilForm.fullName = v)"
      />

      <FormPart
        :value="pupilForm.phone"
        label="Номер телефона"
        type="phone"
        @change="(v) => (pupilForm.phone = v)"
      />

      <Button :disabled="!pupilFormValidation()" @click="addPupil">
        Добавить
      </Button>
    </Form>
  </Modal>
</template>

<style src="@/assets/styles/pages/pupils.css" />

<script>
// Utils
import apiClient from "@/utils/apiClient";
import formatPhone from "@/utils/formatPhone";

// Components
import PageWrapper from "@/components/PageWrapper";
import Modal from "@/components/Modal/index.vue";
import ConfirmationModal from "@/components/Modal/confirmation.vue";
import Form from "@/components/Form/index.vue";
import FormPart from "@/components/Form/part.vue";
import Card from "@/components/Card";
import Table from "@/components/Table/index.vue";
import Cell from "@/components/Table/cell.vue";
import Button from "@/components/Button";
import Select from "@/components/Select";

export default {
  name: "HomePage",

  components: {
    PageWrapper,
    Modal,
    ConfirmationModal,
    Form,
    FormPart,
    Card,
    Table,
    Cell,
    Button,
    Select,
  },

  data() {
    return {
      pupils: [],
      groups: [],

      deletePupilId: null,
      pupilFormModal: false,
      pupilForm: {
        group: null,
        phone: "",
        fullName: "",
      },

      tableFields: {
        id: { label: "ID", width: "min-content" },
        full_name: { label: "Имя" },
        group: { label: "Группа" },
        phone: { label: "Телефон", formatter: (v) => formatPhone(v) },
        actions: { label: "Действие", width: "min-content" },
      },
    };
  },

  async mounted() {
    await this.getPupils();
    await this.getGroups();
  },

  methods: {
    async getPupils() {
      const { data } = await apiClient.getPupils();

      this.pupils = Array.isArray(data.response) ? data.response : [];
    },

    async getGroups() {
      const { data } = await apiClient.getGroups();

      this.groups = Array.isArray(data?.response) ? data.response : [];
    },

    async addPupil() {
      if (!this.pupilFormValidation()) return;

      await apiClient.addPupil({
        ...this.pupilForm,
        group: this.pupilForm.group.id,
      });

      await this.getPupils();

      this.pupilFormModal = false;
    },

    async deletePupil(id) {
      if (!id) return;

      await apiClient.deletePupil(id);
      await this.getPupils();
    },

    pupilFormValidation() {
      return (
        this.pupilForm.group && this.pupilForm.fullName && this.pupilForm.phone
      );
    },
  },
};
</script>

<template>
  <div
    class="table"
    :style="{ 'grid-template-columns': columns, 'with-shadow': withShadow }"
  >
    <!-- Labels -->
    <slot
      v-for="field in fieldsList"
      :name="`${field}-column`"
      :field="field"
      :label="fields[field]?.label"
    >
      <div :key="field" class="table__cell table__cell_label">
        {{ fields[field]?.label || "" }}
      </div>
    </slot>

    <!-- Items -->
    <template v-for="(item, index) in data">
      <slot
        v-for="field in fieldsList"
        :name="field"
        :value="item[field]"
        :item="item"
        :index="index"
      >
        <Cell :key="`${item[field]}-${index}`">
          {{
            typeof fields[field]?.formatter === "function"
              ? fields[field].formatter(item[field], item, index)
              : item[field]
          }}
        </Cell>
      </slot>
    </template>

    <!-- No Data -->
    <div
      v-if="data.length === 0"
      class="table__cell"
      :style="{ 'grid-column': `1 / ${fieldsList.length + 1}` }"
    >
      Нет данных
    </div>
  </div>
</template>

<style src="@/assets/styles/components/table.css" />

<script>
// Components
import Cell from "./cell.vue";

export default {
  name: "TableComponent",

  props: {
    data: { type: Array, default: () => [] },
    fields: { type: Object, required: true },
    withShadow: { type: Boolean, default: true },
  },

  components: { Cell },

  computed: {
    fieldsList() {
      return Object.keys(this.fields);
    },

    columns() {
      return Object.keys(this.fields)
        .map((field) => this.fields[field]?.width || "auto")
        .join(" ");
    },
  },
};
</script>

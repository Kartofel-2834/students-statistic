<template>
  <PageWrapper class="visits">
    <Card class="page-wrapper__header">
      <h1>Посещаемость</h1>
    </Card>

    <Card>
      <Calendar :pointers="visits" @day-click="dayClick"></Calendar>
    </Card>
  </PageWrapper>
</template>

<script>
// Components
import PageWrapper from "@/components/PageWrapper";
import Card from "@/components/Card";
import Calendar from "@/components/Calendar";

export default {
  name: "VisitsPage",

  components: { PageWrapper, Card, Calendar },

  data() {
    return {
      visits: [
        { year: 2023, month: 4, day: 20 },
        { year: 2023, month: 4, day: 15 },
        { year: 2023, month: 4, day: 10 },
      ],
    };
  },

  methods: {
    dayClick(date) {
      this.visits = this.visits.concat([date]);
      console.log(date);
    },
  },
};
</script>

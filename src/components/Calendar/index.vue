<template>
  <div class="calendar">
    <div class="calendar__controls">
      <Button
        icon="material-symbols:keyboard-double-arrow-left-rounded"
        @click="() => updateMonth(month - 1)"
      />
      <h3>{{ monthsInfo[month].name }} {{ year }}</h3>
      <Button
        icon="material-symbols:keyboard-double-arrow-right-rounded"
        @click="() => updateMonth(month + 1)"
      />
    </div>

    <div class="calendar__data">
      <div
        v-for="weekDay in weekDays"
        :key="weekDay"
        class="calendar__data__weekday"
      >
        {{ weekDay }}
      </div>

      <div
        v-for="({ day, status, withPointer }, index) in data"
        :key="index"
        class="calendar__data__day"
        :class="{
          'calendar__data__day_not-current': status !== 'current',
          calendar__data__day_selected: selectedDay === day,
          calendar__data__day_point: withPointer,
        }"
        @click="() => dayClickListener(day, status)"
      >
        {{ day }}
      </div>
    </div>
  </div>
</template>

<style src="@/assets/styles/components/calendar.css" />

<script>
// Utils
import binarySearch from "@/utils/binarySearch";
import checkLeapYear from "@/utils/checkLeapYear";

// Components
import Button from "@/components/Button";

const now = new Date();

export default {
  name: "CalendarComponent",

  emits: ["dayClick"],

  props: {
    pointers: { type: Array, default: () => [] },
  },

  components: { Button },

  data() {
    return {
      data: [],
      prevDays: [],
      currentDays: [],
      nextDays: [],

      selectedDay: null,

      monthFirstDay: 1,
      month: now.getMonth(),
      year: now.getFullYear(),

      weekDays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
      monthsInfo: [
        { name: "Январь", days: 31 },
        {
          name: "Февраль",
          days: 28 + Number(checkLeapYear(now.getFullYear())),
        },
        { name: "Март", days: 31 },
        { name: "Апрель", days: 30 },
        { name: "Май", days: 31 },
        { name: "Июнь", days: 30 },
        { name: "Июль", days: 31 },
        { name: "Август", days: 31 },
        { name: "Сентябрь", days: 30 },
        { name: "Октябрь", days: 31 },
        { name: "Ноябрь", days: 30 },
        { name: "Декабрь", days: 31 },
      ],
    };
  },

  mounted() {
    this.updateMonth(this.month);
  },

  watch: {
    year(newYear) {
      this.monthsInfo[1].days = 28 + Number(checkLeapYear(newYear));
    },

    pointers(newPointers) {
      this.setPointers(newPointers);
    },
  },

  methods: {
    dayClickListener(day, status) {
      switch (status) {
        case "prev":
          this.updateMonth(this.month - 1);
          break;
        case "next":
          this.updateMonth(this.month + 1);
          break;
        case "current":
          this.selectedDay = day;
          this.$emit("dayClick", {
            day,
            year: this.year,
            month: this.month + 1,
          });
          break;
      }
    },

    updateMonth(newMonth) {
      if (newMonth > 11) {
        this.month = 0;
        this.year++;
      } else if (newMonth < 0) {
        this.month = 11;
        this.year--;
      } else {
        this.month = newMonth;
      }

      const firstDay = new Date(this.year, this.month).getDay();
      this.monthFirstDay = firstDay === 0 ? 7 : firstDay;
      this.selectedDay = null;

      this.setMonthDaysArray();
    },

    setMonthDaysArray() {
      this.data = [];

      this.prevDays = this.getPrevMonthDays();
      this.currentDays = this.getCurrentMonthDays();
      this.nextDays = this.getNextMonthDays(
        this.prevDays.length + this.currentDays.length
      );

      this.setPointers(this.pointers);

      this.data = this.prevDays.concat(this.currentDays).concat(this.nextDays);
    },

    setPointers(pointers) {
      for (const pointer of pointers) {
        if (pointer.month !== this.month + 1 || pointer.year !== this.year) {
          continue;
        }
        const index = binarySearch(
          pointer,
          this.currentDays,
          (a, b) => a.day - b.day
        );

        if (index === null) continue;

        this.currentDays[index].withPointer = true;
      }
    },

    getNextMonthDays(limit = 31) {
      const result = [];

      for (let day = 1; day <= 42 - limit; day++) {
        result.push({ day, status: "next", withPointer: false });
      }

      return result;
    },

    getCurrentMonthDays() {
      const result = [];
      const { days: monthDays } = this.monthsInfo.at(this.month);

      for (let day = 1; day <= monthDays; day++) {
        result.push({ day, status: "current", withPointer: false });
      }

      return result;
    },

    getPrevMonthDays() {
      const result = [];
      const { days: prevMonthDaysCount } = this.monthsInfo.at(this.month - 1);

      for (
        let day = prevMonthDaysCount - this.monthFirstDay + 2;
        day <= prevMonthDaysCount;
        day++
      ) {
        result.push({ day, status: "prev", withPointer: false });
      }

      return result;
    },
  },
};
</script>

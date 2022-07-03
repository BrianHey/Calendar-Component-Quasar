<template>
  <div>
    <div
      v-for="({ month, dates, startDayIndex }, monthIndex) in items"
      :key="monthIndex"
    >
      <h6>{{ month }}</h6>

      <div class="calendar">
        <div class="day" v-for="(day, dayIndex) in days" :key="dayIndex">
          {{ day }}
        </div>

        <div
          class="date disabled"
          v-for="(deadDay, i) in [...Array(startDayIndex).keys()].slice(1)"
          :key="i"
        >
          -
        </div>

        <div
          @click="openModal(monthIndex, dateIndex, dates)"
          class="date"
          v-for="(date, dateIndex) in dates"
          :key="dateIndex"
        >
          <span>{{ dateIndex + 1 }} </span>
          <q-icon
            v-if="!dates[dateIndex].length"
            name="add"
            class="plus-icon"
            size="xs"
          />
          <q-icon v-else name="visibility" class="plus-icon" size="xs" />
          <span class="reminders" :class="{ visible: dates[dateIndex].length }">
            <q-icon name="push_pin" class="pin" />
            {{ dates[dateIndex].length }}
          </span>
        </div>
      </div>
    </div>

    <NewReminderModal />
    <RemindersModal />
    <EditReminderModal />
  </div>
</template>

<script>
import "./calendar.css";

import NewReminderModal from "./NewReminderModal.vue";
import RemindersModal from "./RemindersModal.vue";
import EditReminderModal from "./EditReminderModal.vue";

import { useReminderStore } from "stores/reminder";
import { useRemindersStore } from "stores/reminders";
import { useUtilsStore } from "src/stores/utils";

export default {
  setup() {
    const { reminder } = useReminderStore();
    const remindersStore = useRemindersStore();
    const utils = useUtilsStore();
    let { items, days } = utils;

    const openModal = (month, date, dates) => {
      const existReminders = !!dates[date].length;
      reminder.month = month;
      reminder.date = date;
      if (existReminders) {
        utils.modalShowReminders = true;
        remindersStore.reminders = dates[date];
      } else {
        utils.modalShowReminder = false;
        utils.modalShowReminder = true;
      }
    };

    return {
      items,
      days,
      reminder,
      openModal,
      remindersStore,
      utils
    };
  },
  components: {
    NewReminderModal,
    RemindersModal,
    EditReminderModal
  }
};
</script>

import calendar from "components/Calendar/calendar.js";
import { defineStore } from 'pinia';

export const useUtilsStore = defineStore('utils', {
  state: () => ({
    items: calendar.items,
    days: calendar.days,
    months: calendar.months,
    modalShowReminder: false,
    modalShowReminderEdit: false,
    modalShowReminders: false
  })
});

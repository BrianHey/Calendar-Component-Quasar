import { defineStore } from 'pinia';

export const useRemindersStore = defineStore('reminders', {
  state: () => ({
    reminders: null,
  })
});

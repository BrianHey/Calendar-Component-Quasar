import { defineStore } from 'pinia';

export const useReminderStore = defineStore('reminder', {
  state: () => ({
    reminder: { color: "#1d6c853d" },
  })
});

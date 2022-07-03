<template>
  <q-dialog v-model="utils.modalShowReminderEdit">
    <q-card>
      <q-card-section>
        <span class="mb-lg"
          >Reminder Details 2022/{{ reminder.month + 1 }}/{{
            reminder.date + 1
          }}
        </span>
        <hr />
        <q-input
          v-model="reminder.description"
          label="Description"
          :maxlength="30"
        />
        <div class="my-md">
          <q-input
            :style="{ backgroundColor: reminder.color }"
            v-model="reminder.color"
            class="my-input q-px-sm"
            flat
            no-footer
          >
            <template v-slot:append>
              <q-icon name="colorize" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-color v-model="reminder.color" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <InputTime property="timeStart" />
        <InputTime property="timeEnd" />

        <q-btn @click="editReminder">Update</q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { useReminderStore } from "stores/reminder";
import { useRemindersStore } from "stores/reminders";
import { useUtilsStore } from "src/stores/utils";

import InputTime from "./InputTime.vue";
import { useQuasar } from "quasar";

export default {
  setup() {
    const $q = useQuasar();
    const { reminder } = useReminderStore();
    const utils = useUtilsStore();
    let { items } = utils;

    const editReminder = () => {
      const { month, date } = reminder;
      items[month].dates[date] = { ...reminder };
      utils.modalShowReminderEdit = false;
      $q.notify({
        message: "Success!",
        color: "#1d6c85"
      });
    };

    return { reminder, editReminder, utils };
  },
  components: {
    InputTime
  }
};
</script>

<template>
  <q-dialog v-model="utils.modalShowReminder">
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
        <q-select v-model="reminder.city" label="City" :options="cities" />
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

        <q-btn @click="addReminder">Ok</q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { useReminderStore } from "stores/reminder";
import { useUtilsStore } from "src/stores/utils";

import InputTime from "./InputTime.vue";
import { useQuasar } from "quasar";

import { ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const $q = useQuasar();
    const { reminder } = useReminderStore();
    const utils = useUtilsStore();
    let { items } = utils;

    const cities = ref([]);

    const getWeathers = async () => {
      const endpoint = "https://api.gael.cloud/general/public/clima";
      const { data: weathers } = await axios.get(endpoint);
      cities.value = weathers.map(w => w.Estacion);
    };
    getWeathers()

    const addReminder = () => {
      const { month, date } = reminder;
      items[month].dates[date].push({ ...reminder });
      utils.modalShowReminder = false;
      $q.notify({
        message: "Success!",
        color: "#1d6c85"
      });
    };

    return { reminder, addReminder, utils, cities };
  },
  components: {
    InputTime
  }
};
</script>

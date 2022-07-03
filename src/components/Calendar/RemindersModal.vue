<template>
  <q-dialog v-model="utils.modalShowReminders">
    <q-card>
      <q-card-section class="q-pa-lg">
        <q-btn @click="utils.modalShowReminder = true">New Reminder</q-btn>

        <div
          :style="{ backgroundColor: color }"
          :class="{ 'text-light': colorDark(color) }"
          v-for="({ description, color, timeStart, timeEnd, city },
          reminderIndex) in remindersStore.reminders"
          :key="reminderIndex"
          class="reminder q-pa-md rounded-borders q-mt-md cursor-pointer"
        >
          <div>
            <p>
              [{{ timeStart }} - {{ timeEnd }}] - {{ getWeatherByCity(city) }}
            </p>
          </div>

          <span>
            {{ description }}
          </span>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { useRemindersStore } from "stores/reminders";
import { useUtilsStore } from "src/stores/utils";
import { colorDark } from "./helpers";

import { ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const remindersStore = useRemindersStore();
    const utils = useUtilsStore();

    const weathers = ref([]);

    const getWeathers = async () => {
      const endpoint = "https://api.gael.cloud/general/public/clima";
      const { data } = await axios.get(endpoint);
      weathers.value = data;
    };
    getWeathers();

    const getWeatherByCity = city => {
      const weather = weathers.value.find(w => w.Estacion == city);
      return weather.Estado;
    };

    const openEditReminder = () => {
      utils.modalShowReminderEdit = true;
    };

    return {
      remindersStore,
      openEditReminder,
      utils,
      colorDark,
      getWeatherByCity
    };
  }
};
</script>

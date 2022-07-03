<template>
  <q-input filled v-model="reminder[property]" mask="time" :rules="['time']">
    <template v-slot:append>
      <q-icon name="access_time" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-time v-model="reminder[property]">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-time>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
import { useReminderStore } from "stores/reminder";

export default {
  props: ["property"],
  setup() {
    const { reminder } = useReminderStore();
    return { reminder };
  }
};
</script>

<style></style>

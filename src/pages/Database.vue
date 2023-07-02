<script setup lang="ts">
import { useLocalStorage } from "@vueuse/core";
import Avatar from "../components/Avatar.vue";
import { Avatar as IAvatar } from "../types";

const avatars = useLocalStorage<IAvatar[]>("avatars", []);
</script>

<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
    <Avatar v-for="avatar in avatars" :key="avatar.id" v-bind="avatar" />
  </div>
</template>

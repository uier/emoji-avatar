<script setup lang="ts">
defineProps<{
  emoji: string;
  color: string;
  backgroundColor: string;
  fontSize: number;
  fontWeight: number;
  rotate: number;
}>();
</script>

<template>
  <div :class="[backgroundColor, 'w-36 h-36 rounded-full flex justify-center items-center']">
    <span :class="[color, 'transform emoji']" :style="{ fontSize: `${fontSize}px`, fontWeight }">{{
      emoji
    }}</span>
  </div>
</template>

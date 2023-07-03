<script setup lang="ts">
import { ref } from "vue";
import type { Avatar } from "../types";

const props = defineProps<Avatar>();

const avatar = ref<HTMLDataElement | null>(null);
function download() {
  if (!avatar.value) {
    alert("Cannot download avatar.");
    return;
  }
  const avatarStyles = getComputedStyle(avatar.value);
  const canvas = document.createElement("canvas");
  const ratio = 2;
  const width = avatar.value.offsetWidth * ratio;
  const height = avatar.value.offsetHeight * ratio;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    alert("Cannot download avatar.");
    return;
  }
  // background
  ctx.beginPath();
  ctx.arc(width / 2, height / 2, width / 2, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.clip();
  ctx.fillStyle = avatarStyles.backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // emoji
  ctx.font = `${props.fontWeight} ${props.fontSize * ratio}px Noto Emoji`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = avatarStyles.color;
  ctx.fillText(props.emoji, width / 2, height / 2);
  // download
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "avatar.png";
  link.click();
}
</script>

<template>
  <div
    :class="[
      backgroundColor,
      color,
      'w-36 h-36 rounded-full flex justify-center items-center cursor-pointer tooltip',
    ]"
    ref="avatar"
    data-tip="download"
    @click="download"
  >
    <span :class="['transform emoji']" :style="{ fontSize: `${fontSize}px`, fontWeight }">{{
      emoji
    }}</span>
  </div>
</template>

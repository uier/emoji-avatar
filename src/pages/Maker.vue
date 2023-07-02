<script setup lang="ts">
import { ref } from "vue";
import Avatar from "../components/Avatar.vue";
import { Avatar as IAvatar } from "../types";
import emoji from "../emoji.json";
import EmojiPicker from "vue3-emoji-picker";
import { useLocalStorage } from "@vueuse/core";

const bgs = [
  "bg-slate-300",
  "bg-stone-300",
  "bg-amber-300",
  "bg-lime-300",
  "bg-emerald-300",
  "bg-teal-300",
  "bg-cyan-300",
  "bg-violet-300",
  "bg-pink-300",
  "bg-rose-300",
];

const colors = [
  { label: "bg-slate-800", value: "text-slate-800" },
  { label: "bg-stone-800", value: "text-stone-800" },
  { label: "bg-amber-800", value: "text-amber-800" },
  { label: "bg-lime-800", value: "text-lime-800" },
  { label: "bg-emerald-800", value: "text-emerald-800" },
  { label: "bg-teal-800", value: "text-teal-800" },
  { label: "bg-cyan-800", value: "text-cyan-800" },
  { label: "bg-violet-800", value: "text-violet-800" },
  { label: "bg-pink-800", value: "text-pink-800" },
  { label: "bg-rose-800", value: "text-rose-800" },
];

const weights = [300, 500, 700];

const minSize = 36;
const maxSize = 80;
const sizeStep = 4;
const avatar = ref({
  emoji: "👨‍💻",
  fontSize: 60,
  color: colors[5].value,
  backgroundColor: bgs[4],
  fontWeight: weights[1],
  rotate: 0,
});

function random() {
  avatar.value.emoji = emoji[Math.floor(Math.random() * emoji.length)];
  avatar.value.fontSize =
    Math.floor(Math.random() * Math.round((maxSize - minSize) / sizeStep) + 1) * sizeStep + 40;
  avatar.value.color = colors[Math.floor(Math.random() * colors.length)].value;
  avatar.value.backgroundColor = bgs[Math.floor(Math.random() * bgs.length)];
  avatar.value.fontWeight = weights[Math.floor(Math.random() * weights.length)];
}

const showPicker = ref(false);

function onSelectEmoji(d: { i: string }) {
  avatar.value.emoji = d.i;
  showPicker.value = false;
}

const saveBtn = ref("save");
const avatars = useLocalStorage<IAvatar[]>("avatars", []);
function save() {
  avatars.value.push({ ...avatar.value, id: Number(new Date()) });
  saveBtn.value = "Successfully saved!";
  setTimeout(() => {
    saveBtn.value = "save";
  }, 1000);
}
</script>

<template>
  <div class="w-1/3 min-w-[350px] mx-auto flex flex-col gap-4 items-center">
    <Avatar v-bind="avatar" />

    <div class="flex flex-col w-full">
      <button class="btn btn-info btn-sm btn-block" @click="random">
        <span class="emoji">🎲</span> Suprise Me
      </button>
    </div>

    <div class="flex flex-col w-full">
      <h2 class="font-medium mb-2">Emoji</h2>
      <button class="btn btn-outline text-xl emoji btn-block" @click="showPicker = true">
        {{ avatar.emoji }}
      </button>
      <div class="relative h-0">
        <EmojiPicker v-if="showPicker" class="absolute z-[99]" @select="onSelectEmoji" />
      </div>
    </div>

    <div class="flex flex-col gap-y-4 w-full">
      <div class="flex flex-col gap-y-2 w-full">
        <h2 class="font-medium">Background</h2>
        <div class="flex justify-around items-center gap-x-2">
          <div
            v-for="bg in bgs"
            :key="bg"
            :class="[
              bg,
              avatar.backgroundColor === bg ? 'border-2 w-6 h-6' : 'border-none w-5 h-5',
              'border-red-500 rounded cursor-pointer',
            ]"
            @click="avatar.backgroundColor = bg"
          />
        </div>
      </div>

      <div class="flex flex-col gap-y-2 w-full">
        <h2 class="font-medium">Color</h2>
        <div class="flex justify-around items-center gap-x-2">
          <div
            v-for="{ label, value } in colors"
            :key="value"
            :class="[
              label,
              avatar.color === value ? 'border-2 w-6 h-6' : 'border-none w-5 h-5',
              'border-red-500 rounded cursor-pointer',
            ]"
            @click="avatar.color = value"
          />
        </div>
      </div>

      <div class="flex flex-col gap-y-2 w-full">
        <h2 class="font-medium">Size</h2>
        <div>
          <input
            v-model="avatar.fontSize"
            class="range range-sm range-primary"
            type="range"
            :min="minSize"
            :max="maxSize"
            :step="sizeStep"
          />
          <div class="w-full flex justify-between text-xs px-2">
            <span v-for="n in 12" :key="n">|</span>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-y-2 w-full">
        <h2 class="font-medium">Width</h2>
        <div>
          <input
            v-model.number="avatar.fontWeight"
            class="range range-sm range-primary"
            type="range"
            :min="300"
            :max="700"
            :step="200"
          />
          <div class="w-full flex justify-between text-xs px-2">
            <span v-for="n in 3" :key="n">|</span>
          </div>
        </div>
      </div>

      <button class="btn btn-primary btn-block" @click="save">{{ saveBtn }}</button>

      <pre>{{ JSON.stringify(avatar, null, 2) }}</pre>
    </div>
  </div>
</template>

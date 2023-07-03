<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-10 pt-4">
    <div class="flex justify-between">
      <h1 class="text-3xl font-bold">Emoji Avatar</h1>
      <div class="flex gap-x-4 items-center">
        <router-link to="/">Maker</router-link>
        <div class="border-l-2 border-slate-500 h-4" />
        <router-link to="/db">My Avatar</router-link>
      </div>
    </div>

    <div class="my-10" />

    <router-view />
  </div>
</template>

<template>
  <n-layout id="landing">
    <n-layout-content>
      <n-space vertical align="center" justify="center" :size="24">
        <n-card class="auth-card">
          <router-view></router-view>
        </n-card>
      </n-space>
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import { NLayout, NLayoutContent, NSpace, NCard } from 'naive-ui'
</script>

<style scoped>
#landing {
  height: 100vh;
  width: 100vw;
}
</style>

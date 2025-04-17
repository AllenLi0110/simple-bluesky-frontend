<template>
  <n-layout>
    <n-layout-header bordered>
      <n-space justify="space-between" align="center" :size="16">
        <n-button text>
          <router-link to="/" class="logo-link">Simple Bluesky</router-link>
        </n-button>
        <n-space>
          <n-button type="error" ghost @click="handleSignOut" data-test="sign-out-btn"
            >Sign Out</n-button
          >
        </n-space>
      </n-space>
    </n-layout-header>
    <n-layout-content content-style="padding: 24px;">
      <n-space vertical :size="24">
        <router-view></router-view>
      </n-space>
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auths'
import { NLayout, NLayoutHeader, NLayoutContent, NSpace, NButton } from 'naive-ui'

const router = useRouter()
const authStore = useAuthStore()

async function handleSignOut() {
  await authStore.signOut()
  router.push({ name: 'Auth.SignIn' })
}
</script>

<style scoped>
.logo-link {
  font-size: 20px;
  font-weight: bold;
  color: var(--primary-color);
  text-decoration: none;
}
</style>
../stores/auths

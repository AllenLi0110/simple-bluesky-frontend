<template>
  <n-card title="Sign In" class="signin-card">
    <n-form ref="formRef" :model="formValue" @submit.prevent="handleSubmit">
      <n-form-item path="identifier" label="Identifier">
        <n-input v-model:value="formValue.identifier" placeholder="Enter your identifier" />
      </n-form-item>
      <n-form-item path="password" label="Password">
        <n-input
          v-model:value="formValue.password"
          type="password"
          placeholder="Enter your password"
        />
      </n-form-item>
      <n-button type="primary" block :loading="isLoading" @click="handleSubmit">
        {{ isLoading ? 'Signing in...' : 'Sign In' }}
      </n-button>
      <n-alert v-if="error" type="error" :title="error" class="mt-4" />
    </n-form>
  </n-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../../stores/auths'
import { NCard, NForm, NFormItem, NInput, NButton, NAlert } from 'naive-ui'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const formValue = ref({
  identifier: '',
  password: '',
})
const isLoading = ref(false)
const error = ref('')

const redirectPath = computed(() => {
  return (route.query.redirect as string) || '/'
})

async function handleSubmit() {
  if (isLoading.value) return

  isLoading.value = true
  error.value = ''

  try {
    const result = await authStore.signIn({
      identifier: formValue.value.identifier,
      password: formValue.value.password,
    })

    if (result.success) {
      router.push(redirectPath.value)
    } else {
      error.value = 'Invalid identifier or password'
    }
  } catch (err) {
    error.value = 'An error occurred during sign in'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.signin-card {
  max-width: 400px;
  margin: 40px auto;
}
</style>
../../stores/auths

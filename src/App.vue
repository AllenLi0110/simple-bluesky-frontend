<template>
  <n-config-provider :theme-overrides="themeOverrides" :hljs="hljs">
    <n-message-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-loading-bar-provider>
            <router-view></router-view>
          </n-loading-bar-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>
<script setup lang="ts">
import { themeOverrides } from "./helpers/naive.config";
import { onBeforeMount } from "vue";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";

onBeforeMount(async () => {
  hljs.registerLanguage("javascript", typescript);
});
</script>

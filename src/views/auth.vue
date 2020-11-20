<template>
  <div class="auth-container">
    <AuthAside />
    <router-view />
  </div>
</template>

<script>
import AuthAside from "@/components/AuthAside";

export default {
  name: 'Auth',
  components: {AuthAside}
}
</script>

<style lang="scss">
@import "~@/styles/index.scss";

.auth-container {
  display: flex;
  flex-direction: row;
  -webkit-box-flex: 1;
  -ms-flex: 1 0 auto;
  flex: 1 0 auto;
  width: 100%;
  height: 100%;
  justify-content: space-between;
}
</style>
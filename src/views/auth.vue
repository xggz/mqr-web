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
  margin: 6rem;
  display: flex;
  flex-direction: row;
  -webkit-box-flex: 1;
  border-radius: 5px;
  overflow: hidden;
  -ms-flex: 1 0 auto;
  flex: 1 0 auto;
  box-shadow: 0 0 13px 0 #eaeaea;
  height: 75%;
  justify-content: space-between;
}
</style>
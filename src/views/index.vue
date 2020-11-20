<template>
  <div class="index-content">
    <HeaderBar />
    <router-view />
    <FooterBox />
  </div>
</template>

<script>
import HeaderBar from "@/components/HeaderBar";
import FooterBox from "@/components/FooterBox";

export default {
  name: 'Index',
  components: {
    FooterBox,
    HeaderBar
  }
}
</script>

<style lang="scss">
@import "~@/styles/index.scss";
</style>
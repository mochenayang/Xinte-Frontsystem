<template>
  <iframe :src="$store.state.activeSrc" frameborder="0" class="frame"></iframe>
  <!-- <iframe src="http://localhost:8080/HomePage/SecurityDetection"></iframe> -->
</template>
<script setup>

</script>

<style lang="scss" scoped>
.frame{
  width: 100%;
  height: 99.5%;
}
</style>

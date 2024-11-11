<template>
  <div class="el-logo">
    <img src="@/assets/jituan1.svg" alt="" />
    <span class="title" :class="{ 'is-hide': isHideTitle }">前台应用系统</span>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'Logo',
  setup() {
    const store = useStore()
    const isHideTitle = computed(() => {
      return store.state.isCollapse
    })

    return {
      isHideTitle
    }
  }
}
</script>

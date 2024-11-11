<template>
  <el-submenu :index="item.menuId" v-if="item.children.length > 0">
    <template #title>
      <i class="el-icon-location"></i>
      <span>{{ item.menuName }}</span>
    </template>
    <sidebar-item v-for="inner in item.children" :key="inner.menuId" :item="inner"></sidebar-item>
  </el-submenu>
  <el-menu-item :index="item.menuId" v-else @click="handleMenu(item)">
    <i class="el-icon-setting"></i>
    <span v-if="collapse">{{ item.menuName }}</span>
    <template #title>{{ item.menuName }}</template>
  </el-menu-item>
</template>

<script>
import { setTabs, getTabs } from 'utils/storage.js'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  props: {
    item: Object,
    collapse: Boolean
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    // 点击菜单回调
    const handleMenu = (obj) => {
      console.log(obj);
      const { menuId, menuName,path } = obj
      if(obj.out_type=='新窗口打开'&&obj.link_type=='外链'){
        // console.log(obj.path);
        window.open(obj.path)
      }else if(obj.link_type=='内嵌'){
        console.log('22');
        // router.push(path)
        let tabs = getTabs()
        let flag = true
        tabs.forEach((item) => {
          if (item.id === menuId) {
            flag = false
          }
        })
        if (flag) {
          tabs.push({
            id: menuId,
            name: menuName,
            active: true,
            topath:path,
          })
        }
        store.commit('getActiveMenu', menuId)
        store.commit('getActiveSrc', path)
        setTabs(tabs, menuId)
      }else if(obj.out_type=='内嵌页打开'&&obj.link_type=='外链'){
        console.log('----------');
        let tabs = getTabs()
        let flag = true
        tabs.forEach((item) => {
          if (item.id === menuId) {
            flag = false
          }
        })
        if (flag) {
          tabs.push({
            id: menuId,
            name: menuName,
            active: true,
            topath:path,
          })
        }
        store.commit('getActiveMenu', menuId)
        store.commit('getActiveSrc', path)
        // store.commit('getActiveSrc', '/test/')
        console.log(path);
        setTabs(tabs, menuId)
      }
    }

    return {
      handleMenu
    }
  }
}
</script>

<style></style>

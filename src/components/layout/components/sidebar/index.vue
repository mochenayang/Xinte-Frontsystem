<template>
  <el-menu
    :default-active="activeMenu"
    :unique-opened="true"
    :mode="mode"
    :collapse="isCollapse && mode !== 'horizontal'"
    :class="{ 'no-transition': isCollapse }"
  >
    <logo v-if="isShowLogo"></logo>
    <sidebar-item
      v-for="item in menuList"
      :key="item.menuId"
      :item="item"
      :collapse="collapse"
    ></sidebar-item>
  </el-menu>
</template>

<script>
import { reactive, toRefs, computed, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import Logo from '../Logo.vue'
import SidebarItem from './SidebarItem.vue'
import { getTabs } from 'utils/storage'
import { setBreadcrumb } from 'utils/storage'
import { getMenuList } from '@/request/axios/menuManage.js'
import { ElMessage } from 'element-plus'


export default {
  components: { Logo, SidebarItem },
  props: {
    mode: String,
    showLogo: Boolean,
    collapse: Boolean
  },
  setup(props) {
    const store = useStore()
    const collapse = props.collapse
    const data = reactive({
      activeMenu: '',
      menuList: [
      {
        "menuId":"1",
        "menuName":"质量域",
        "icon":"",
        "menu_type":"目录",
        "path":"",
        "file_path":"",
        "roles":"",
        "link_type":"",
        "out_type":"",
        "create_time":"2023-07-24 11:18:46",
        "last_time":"2023-07-24 11:18:46",
        "children":[
            {
                "menuId":"2",
                "menuName":"LIMS",
                "icon":"",
                "menu_type":"目录",
                "path":"",
                "file_path":"",
                "roles":"",
                "link_type":"",
                "out_type":"",
                "create_time":"2023-07-24 11:18:46",
                "last_time":"2023-07-24 11:18:46",
                "children":[
                    {
                        "menuId":"3",
                        "menuName":"杂质组分趋势图",
                        "icon":"",
                        "menu_type":"菜单",
                        "path":"",
                        "file_path":"",
                        "roles":"",
                        "link_type":"",
                        "out_type":"",
                        "create_time":"2023-07-24 11:18:46",
                        "last_time":"2023-07-24 11:18:46",
                        "children":[

                        ]
                    }
                ]
            }
        ]
    },
    {
        "menuId":"4",
        "menuName":"生产域",
        "icon":"",
        "menu_type":"目录",
        "path":"",
        "file_path":"",
        "roles":"",
        "link_type":"",
        "out_type":"",
        "create_time":"2023-07-24 11:18:46",
        "last_time":"2023-07-24 11:18:46",
        "children":[
            {
                "menuId":"5",
                "menuName":"报警管理",
                "icon":"",
                "menu_type":"目录",
                "path":"",
                "file_path":"",
                "roles":"",
                "link_type":"",
                "out_type":"",
                "create_time":"2023-07-24 11:18:46",
                "last_time":"2023-07-24 11:18:46",
                "children":[
                    {
                        "menuId":"6",
                        "menuName":"报警数据",
                        "icon":"",
                        "menu_type":"菜单",
                        "path":"",
                        "file_path":"",
                        "roles":"",
                        "link_type":"",
                        "out_type":"",
                        "create_time":"2023-07-24 11:18:46",
                        "last_time":"2023-07-24 11:18:46",
                        "children":[

                        ]
                    }
                ]
            },
            {
                "menuId":"7",
                "menuName":"罐区管理",
                "icon":"",
                "menu_type":"菜单",
                "path":"",
                "file_path":"",
                "roles":"",
                "link_type":"",
                "out_type":"",
                "create_time":"2023-07-24 11:18:46",
                "last_time":"2023-07-24 11:18:46",
                "children":[

                ]
            }
        ]
    },
    {
        "menuId":"8",
        "menuName":"设备域",
        "icon":"",
        "menu_type":"目录",
        "path":"",
        "file_path":"",
        "roles":"",
        "link_type":"",
        "out_type":"",
        "create_time":"2023-07-24 11:18:46",
        "last_time":"2023-07-24 11:18:46",
        "children":[
            {
                "menuId":"9",
                "menuName":"设备基础资料",
                "icon":"",
                "menu_type":"目录",
                "path":"",
                "file_path":"",
                "roles":"",
                "link_type":"",
                "out_type":"",
                "create_time":"2023-07-24 11:18:46",
                "last_time":"2023-07-24 11:18:46",
                "children":[
                    {
                        "menuId":"10",
                        "menuName":"设备台账",
                        "icon":"",
                        "menu_type":"菜单",
                        "path":"",
                        "file_path":"",
                        "roles":"",
                        "link_type":"",
                        "out_type":"",
                        "create_time":"2023-07-24 11:18:46",
                        "last_time":"2023-07-24 11:18:46",
                        "children":[

                        ]
                    }
                ]
            }
        ]
    },
    {
        "menuId":"11",
        "menuName":"安防域",
        "icon":"",
        "menu_type":"目录",
        "path":"",
        "file_path":"",
        "roles":"",
        "link_type":"",
        "out_type":"",
        "create_time":"2023-07-24 11:18:46",
        "last_time":"2023-07-24 11:18:46",
        "children":[

        ]
    },
    {
        "menuId":"12",
        "menuName":"驾驶舱",
        "icon":"",
        "menu_type":"目录",
        "path":"",
        "file_path":"",
        "roles":"",
        "link_type":"",
        "out_type":"",
        "create_time":"2023-07-24 11:18:46",
        "last_time":"2023-07-24 11:18:46",
        "children":[
        {
                "menuId":"13",
                "menuName":"驾驶舱-安全管理",
                "icon":"",
                "menu_type":"菜单",
                // "path":"http://localhost:8080/#/HomePage/SecurityDetection",
                "path":"http://192.168.1.100:8080/#/HomePage/SecurityDetection",
                "file_path":"",
                "roles":"",
                "link_type":"外链",
                "out_type":"内嵌页打开",
                "create_time":"2023-07-24 11:18:46",
                "last_time":"2023-07-24 11:18:46",
                "children":[

                ]
            },
            {
                "menuId":"14",
                "menuName":"驾驶舱主页",
                "icon":"",
                "menu_type":"菜单",
                // "path":"http://localhost:8080/#/HomePage/Overview",
                "path":"http://192.168.1.100:8080/",
                "file_path":"",
                "roles":"",
                "link_type":"外链",
                "out_type":"新窗口打开",
                "create_time":"2023-07-24 11:18:46",
                "last_time":"2023-07-24 11:18:46",
                "children":[

                ]
            }
        ]
    },
    {
      "menuId":"18",
      "menuName":"模型Test",
      "icon":"",
      "menu_type":"菜单",
      "path":"/modeltest",
      "file_path":"",
      "roles":"",
      "link_type":"内嵌",
      "out_type":"",
      "create_time":"2023-07-24 11:18:46",
      "last_time":"2023-07-24 11:18:46",
      "children":[]
    }
    ]
    })

    // 是否显示Logo
    const isShowLogo = computed(() => {
      return props.showLogo
    })

    // 是否折叠菜单
    const isCollapse = computed(() => {
      if (props.collapse) {
        return collapse
      } else {
        return store.state.isCollapse
      }
    })

    const _tabs = getTabs()
    _tabs.forEach((item) => {
      if (item.active) data.activeMenu = item.id
    })

    const _getParentMenu = (list, id) => {
      for (let i in list) {
        if (list[i].menuId == id) {
          return [list[i]]
        }
        if (list[i].children) {
          let node = _getParentMenu(list[i].children, id)
          if (node !== undefined) {
            return node.concat(list[i])
          }
        }
      }
    }
    setBreadcrumb(_getParentMenu(data.menuList, data.activeMenu))

    watch(
      () => store.state.activeMenu,
      (value, old) => {
        data.activeMenu = value
        setBreadcrumb(_getParentMenu(data.menuList, value))
      }
    )

    const getData = () => {
      getMenuList().then(res => {
        if(res.status !== 200) return ElMessage.error('获取菜单列表失败')
        data.menuList = res.data
      })
    }

    onMounted(()=>{
      getData()
    })

    const params = toRefs(data)
    return {
      ...params,
      isShowLogo,
      isCollapse
    }
  }
}
</script>

<style></style>

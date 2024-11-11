import { createRouter, createWebHistory } from 'vue-router'
import Layout from 'components/layout/index.vue'
import { defineAsyncComponent } from 'vue'
import {get,post} from '@/axios/index.js'
import { ElMessage } from 'element-plus'

const publicRoutes = [
  {
    path: '/',
    name:'Layout',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home.vue')
      }
    ]
  }
]

// get('/menulist').then((res)=>{
//   if(res.status !== 200) return ElMessage.error("获取列表失败")
//    menuList = res.data
// })

const router = createRouter({
  history: createWebHistory(),
  routes: publicRoutes
})

let asyncRoutestMark = false

let menuList =  [{
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
  },{
    "menuId":"18",
    "menuName":"模型Test",
    "icon":"",
    "menu_type":"菜单",
    "path":"/modeltest",
    "file_path":"views/Test.vue",
    "roles":"",
    "link_type":"内嵌",
    "out_type":"",
    "create_time":"2023-07-24 11:18:46",
    "last_time":"2023-07-24 11:18:46",
    "children":[]
  }
  ]
}]

// export const loadView = (view) => {
//   return () => import.meta.glob(`@/${view}`);
// };


const modules = import.meta.glob('@/views/*.vue')

// const _import = (path) => defineAsyncComponent(() => import(/* @vite-ignore */`/src/${path}.vue`));

const add = (item) => {
  if(item.link_type=='内嵌'){
    router.addRoute('Layout',{
      name:item.menuName,
      path:item.path,
      // component:() => import(`../${item.file_path}`)
      component: modules[`../${item.file_path}`]
      // component: _import(item.file_path)
    })
    console.log(item.file_path.split('/'));
  }else if(item.link_type=='外链'&&item.out_type=='新窗口打开'){
    // router.addRoute({
    //   name:item.menuName,
    //   path:item.path,
    //   // 暂替
    //   component:() => import('@/views/test/test.vue')
    // })
    console.log(item);
  }else if(item.link_type=='外链'&&item.out_type=='内嵌页打开'){
    console.log(item);
    if(item.path!==''){
      var url = item.path

    // 暂替
    router.addRoute('Layout',{
      name:item.menuName,
      // path:item.path.replace(/https?:\/\//, ''),
      path:url.match(/(.*?)\/#\//)[1].replace(/https?:\/\//, ''),
      component:() =>import('@/views/Iframe.vue')
    })
    }
  }
}
router.beforeEach(async(to,from,next)=>{
  if(!asyncRoutestMark){
    // router.addRoute('Layout',{
    //   path:'first/first_1',
    //   component:() => import('@/views/test/test.vue')
    // })
    await get('/menus').then((res)=>{
      if(res.status !== 200) return ElMessage.error("获取列表失败")
        menuList = res.data
    })
    let findmenu = (it)=>{
        if(it.menu_type=='菜单'){
          console.log(it);
          add(it)
        }else if(it.children.length !==0){
          it.children.forEach(item2 => {
            if(item2.menu_type=='菜单'){
              // console.log(item2);
              add(item2)
            }else{
              findmenu(item2)
            }
          })
        }
      }
    // let findmenu = (item)=>{
    //   // console.log(item.menuId);
    //   if(item.menu_type=="菜单"){
    //     console.log(item);
    //     add(item)
    //   }else if(item.children.length!==0){
    //     console.log(item);
    //     item.children.forEach(item2 => {
    //       if(item2.menu_type=="菜单"){
    //         console.log(item2);
    //         add(item2)
    //       }
    //     })
    //   }
    // }
    menuList.forEach((item,index)=>{
      // console.log(item,index);
      findmenu(item)

    })
    console.log(router.getRoutes());
    asyncRoutestMark=true
    next({...to,replace:true})
  }else{
    next()
  }
})

export default router

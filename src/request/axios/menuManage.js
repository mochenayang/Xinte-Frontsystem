import {get,post,put} from '@/axios/index.js'

export function getMenuList() {
  return get('/menus')
}
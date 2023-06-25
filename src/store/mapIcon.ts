import { ref } from 'vue'
import { defineStore } from 'pinia'
import { MAP_ICONS } from "@/constant/mapIcon"

declare let AMap:any

interface Icons {
  [propName:string]: string
}

export const mapIconStore = defineStore('mapIcon', () => {
  const icons = ref({})

  const setIcons = () => {
    const mapIcons:Icons = {}
    Object.keys(MAP_ICONS).forEach(key => {
      const iconName = MAP_ICONS[key as keyof typeof MAP_ICONS]
    
      const icon = new AMap.Icon({
        // 图标尺寸
        size: new AMap.Size(25, 32),
        // 图标地址
        image: `/icons/${iconName}.png`,
        // 图标大小
        imageSize: new AMap.Size(25, 32)
      })
    
      mapIcons[iconName as keyof typeof mapIcons] = icon
    })
    icons.value = mapIcons
  }

  return {
    icons,
    setIcons
  }
})
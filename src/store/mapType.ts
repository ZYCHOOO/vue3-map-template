import { ref } from 'vue'
import { defineStore } from 'pinia'

export const mapTypeStore = defineStore('mapType', () => {
  const currentMapType = ref('standard')

  const toggleMapType = (mapType: string) => {
    currentMapType.value = mapType
  }

  return {
    currentMapType,
    toggleMapType
  }
})
import { ref } from 'vue'
import { defineStore } from 'pinia'

interface MapItem {
  longitude: number | string,
  latitude: number | string,
  icon?: string
}

export const mapMarkerStore = defineStore('mapMarker', () => {

  const markers = ref([] as MapItem[])

  const setMarkers = (markersData: MapItem[]) => {
    markers.value = markersData
  }

  return {
    markers,
    setMarkers
  }
})
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { markerClickEffect } from '@/hooks/mapClickEffect'
declare let AMap: any

interface MarkerItem {
  longitude: number | string,
  latitude: number | string,
  name: string,
  origin: string,
  type: string
  icon?: string
}

export const mapMarkerStore = defineStore('mapMarker', () => {

  const markers = ref([] as any[])

  const setMarkers = (originMarkers: MarkerItem[]) => {
    let markersData = [] as any[]
    originMarkers.forEach((item: MarkerItem) => {
      const marker = new AMap.Marker({
        ...item,
        clickable: true,
        position: new AMap.LngLat(item.longitude, item.latitude)
      })
      marker.on('click', (event: any) => {
        markerClickEffect(event)
      })
      markersData.push(marker)
    })
    markers.value = [...markers.value, ...markersData]
  }

  const clearMarkers = (origin?: string) => {
    markers.value = origin
      ? markers.value.filter(item => item._opts.origin !== origin)
      : []
  }

  return {
    markers,
    setMarkers,
    clearMarkers
  }
})
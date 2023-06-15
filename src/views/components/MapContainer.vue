<template>
  <div id="map-container" class="map" />
</template>

<script lang="ts">
import { mapTypeStore } from '@/store/mapType'
import { defineComponent, onMounted, ref, watch } from 'vue'
import { GD_MAP_KEY, GD_MAP_SECURITY_CODE } from '@/constant/enums'
import * as AMapLoader from '@amap/amap-jsapi-loader'
import { mapMarkerEffect } from '@/hooks/mapMarkerEffect'
import { mapClickEffect } from '@/hooks/mapClickEffect'

export default defineComponent({
  name: 'MapContainer',
  props: {
    // 地图风格，默认为极夜蓝
    mapStyle: { type: String, default: 'amap://styles/darkblue' },
    // 区域名
    areaName: { type: String, default: '广州市' },
    // 显示下级行政区级数,行政区级别包括：国家、省/直辖市、市、区/县4个级别
    subdistrict: { type: Number, default: 0 },
    // 是否返回行政区边界坐标点 all / base
    extensions: { type: String, default: 'all' },
    // 搜索范围[对应文档https://lbs.amap.com/api/javascript-api/reference/search#m_AMap.DistrictSearch]
    level: { type: String, default: 'city' },
    polylineConfig: {
      type: Object,
      default: () => ({
        // 是否显示边界线
        show: true,
        // 是否显示边界以外的区域
        showOuter: false,
        // 边界线条颜色
        strokeColor: "#99ffff",
        // 边界线条粗细
        strokeWeight: 4,
      })
    }
  },
  setup(props) {
    const mapType = mapTypeStore()
    const mapInstance = ref(null)
    
    const renderPolyLine = (AMap: any, bounds = []) => {
      const { polylineConfig } = props;
    
      if (polylineConfig.show) {
        for (let i = 0; i < bounds.length; i++) {
          new AMap.Polyline({
            path: bounds[i],
            strokeColor: polylineConfig.strokeColor,
            strokeWeight: polylineConfig.strokeWeight,
            map: mapInstance.value,
          })
        }
      }
    }

    const initMapInstance = (AMap: any) => {
      const option:{[key:string]:any} = {
        viewMode: '3D',
        mapStyle: props.mapStyle,
        layers: []
      }

      // 是否显示卫星地图
      option.layers = mapType.currentMapType === 'satellite'
        ? [new AMap.TileLayer.Satellite(), new AMap.TileLayer.RoadNet()] : []
    
      // 初始化 district 对象
      const district = new AMap.DistrictSearch({
        level: props.level,
        extensions: props.extensions,
        subdistrict: props.subdistrict
      })
    
      console.log('区域对象为：', district)
    
      // 搜索区域
      district.search(props.areaName, (status: any, result: any) => {
        console.log('搜索结果为：', status, result)
    
        const bounds = result.districtList[0]["boundaries"]
        
        // 获取区域各坐标
        const mask = []
        for (let i = 0; i < bounds.length; i += 1) {
          mask.push([bounds[i]])
        }
        
        // options 中设置mask，超出mask的区域就不显示
        if (!props.polylineConfig.showOuter) {
          option.mask = mask
        }
        mapInstance.value = new AMap.Map('map-container', option)
    
        renderPolyLine(AMap, bounds)

        mapMarkerEffect(mapInstance)
        mapClickEffect(mapInstance)
      })
    }
    
    const loadMap = (key: string, securityJsCode: string) => {
      window._AMapSecurityConfig = { 
        securityJsCode
      }
      AMapLoader.load({
        key,
        version: "2.0",
        plugins: ['AMap.DistrictSearch', 'AMap.Marker', 'AMap.Polyline'],// 你所使用到的插件
      }).then((AMap) => {
        console.log('shit', AMap)
        initMapInstance(AMap)
      })
    }

    watch(
      () => mapType.currentMapType,
      (_val) => {
        loadMap(GD_MAP_KEY, GD_MAP_SECURITY_CODE)
      }
    )
    
    onMounted(() => {
      loadMap(GD_MAP_KEY, GD_MAP_SECURITY_CODE)
    })
  }
})



</script>

<style lang="scss" scoped>
  .map {
    width: 100%;
    height: 100%;
  }
  .amap-container{
    background-image: unset;
  }
</style>

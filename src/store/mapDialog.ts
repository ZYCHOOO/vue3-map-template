import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

interface DialogInfo {
  longitude?: number,
  latitude?: number,
  title: string,
  componentName: string,
  style: {
    className?: string,
    titleWidth: number,
    dialogWidth: number,
    dialogHeight: number
  }
}

export const mapDialogStore = defineStore('mapDialog', () => {
  const dialogVisible = ref(false)
  const dialogInfo = reactive({
    longitude: 0,
    latitude: 0,
    title: '',
    componentName: '',
    style: {
      titleWidth: 250,
      dialogWidth: 300,
      dialogHeight: 300
    }
  })

  const setDialogInfo = (info: DialogInfo) => {
    Object.assign(dialogInfo, info)

    dialogVisible.value = true
  }

  const toggleDialogVisible = () => {
    dialogVisible.value = !dialogVisible.value
  }

  return {
    dialogInfo,
    dialogVisible,
    toggleDialogVisible,
    setDialogInfo
  }
})
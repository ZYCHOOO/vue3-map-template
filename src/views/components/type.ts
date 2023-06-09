export interface NavItem {
  id?: number,
  label?: string,
  path?: string
}

export interface Tree {
  id: number,
  label: string,
  icon: string,
  type: string,
  url: string
}

export interface MarkerItem {
  longitude: number,
  latitude: number,
  name: string,
  origin: string
}
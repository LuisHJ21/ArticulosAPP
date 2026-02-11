export interface ArticuloSearch {
  data: ArticuloDB[]
}

export interface ArticuloDB {
  COD_ART: string
  DESC_ART: string
  PESO_UND?: string
  COD_SUB_CAT: string
  DESC_SUB_CAT: string
  CAT_ART: string
  DESC_CATEGORIA: string
  SLDO_TOTAL:string
}
export enum CodeResponse {
  SUCCESS = 'SUCCESS',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  SESSION_EXPIRED = 'SESSION_EXPIRED',
}

export type ApiResponse<DataT> = {
  code: CodeResponse
  message: string
  data: DataT
}

export type ApiResponseList<DataT> = ApiResponse<PaginationResponse<DataT>>

export type PaginationResponse<T> = {
  found: number
  hits: Hit<T>[]
  out_of: number
  page: number
}

interface Hit<T> {
  document: T
}

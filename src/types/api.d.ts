export type ApiResponse<DataT> = {
  code: CodeResponse
  message: string
  data: DataT
}

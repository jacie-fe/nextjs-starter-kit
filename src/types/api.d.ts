export type ApiResponse<DataT> = {
  code: CodeResponse
  message: string
  data: DataT
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any
}

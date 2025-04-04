import { z } from 'zod'

const getFormSchema = () => {
  return z.object({
    application_name: z.string().min(1, {
      message: 'Application name is required.',
    }),
    ip: z.string().min(1, {
      message: 'IP is required.',
    }),
    domain: z.string().min(1, {
      message: 'Domain is required.',
    }),
    callback_url: z
      .string()
      .min(1, {
        message: 'Callback URL is required.',
      })
      .url({
        message: 'Invalid URL format.',
      }),
    description: z.string(),
    is_active: z.string().min(1, {
      message: 'Active status is required.',
    }),
  })
}

export default getFormSchema

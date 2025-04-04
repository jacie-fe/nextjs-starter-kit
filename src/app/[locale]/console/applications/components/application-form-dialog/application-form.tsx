'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import getFormSchema from './form-schema'
import { Button } from '@/components/custom/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { useErrorHandler } from '@/hooks/use-error-handler'
import { randomApiKey } from '@/lib/utils'
import { Application } from '@/types/application'
import { CircleHelp } from 'lucide-react'
import {
  useAddApplication,
  useUpdateApplication,
} from '@/hooks/use-application'
import { toast } from 'sonner'

interface ApplicationFormProps {
  application: Application | null
  onCloseClick?: () => void
  onSuccess?: () => void
}

const ApplicationForm = ({
  application,
  onCloseClick,
  onSuccess,
}: ApplicationFormProps) => {
  const { mutateAsync: createApplication, isPending: isAdding } =
    useAddApplication()
  const { mutateAsync: updateApplication, isPending: isEditing } =
    useUpdateApplication()

  const formSchema = getFormSchema()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      application_name: application?.application_name || '',
      ip: application?.ip || '',
      domain: application?.domain || '',
      callback_url: application?.callback_url || '',
      description: application?.description || '',
      is_active: application?.client_id
        ? application?.is_active
          ? '1'
          : '0'
        : '1',
    },
  })
  const { handleFormError } = useErrorHandler()

  const onSubmit = async (_data: z.infer<ReturnType<typeof getFormSchema>>) => {
    try {
      const data = {
        ..._data,
        is_active: _data.is_active === '1',
      }
      if (application?.client_id) {
        await updateApplication({
          client_id: application.client_id,
          api_key: application.api_key,
          ...data,
        })
      } else {
        const payload = {
          ...data,
          api_key: randomApiKey(),
        }
        await createApplication(payload)
      }
      toast.success('Application saved successfully')
      onSuccess?.()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      handleFormError(err)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='min-w-0'>
        <div className='flex flex-col gap-4'>
          <FormField
            control={form.control}
            name='application_name'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Application Name</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={255} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='ip'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel className='relative flex items-center gap-1'>
                  IP
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='h-4 w-4 p-0'
                      >
                        <CircleHelp width={16} height={16} />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className='w-80 border-black bg-black/85 p-2 text-sm text-white'
                      side='top'
                    >
                      Please ensure that you enter the correct IP address for
                      your server. This is required to pass the whitelist check
                      from our system and ensure secure communication with our
                      API.
                      <PopoverArrow className='PopoverArrow' />
                    </PopoverContent>
                  </Popover>
                </FormLabel>
                <FormControl>
                  <Input {...field} maxLength={255} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='domain'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel className='relative flex items-center gap-1'>
                  Domain
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='h-4 w-4 p-0'
                      >
                        <CircleHelp width={16} height={16} />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className='w-80 border-black bg-black/85 p-2 text-sm text-white'
                      side='top'
                    >
                      The ’Display URL’ field is used solely for display
                      purposes within the eAuthenticator app. It does not serve
                      any functional role beyond visual representation.
                      <PopoverArrow className='PopoverArrow' />
                    </PopoverContent>
                  </Popover>
                </FormLabel>
                <FormControl>
                  <Input {...field} maxLength={255} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='callback_url'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel className='relative flex items-center gap-1'>
                  Callback URL
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='h-4 w-4 p-0'
                      >
                        <CircleHelp width={16} height={16} />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className='w-80 border-black bg-black/85 p-2 text-sm text-white'
                      side='top'
                    >
                      The ’Callback URL’ is a predefined server endpoint that
                      receives the result of the 2FA verification process.
                      <PopoverArrow className='PopoverArrow' />
                    </PopoverContent>
                  </Popover>
                </FormLabel>
                <FormControl>
                  <Input {...field} maxLength={255} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} maxLength={255} rows={4} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='is_active'
            render={({ field }) => (
              <FormItem className='mt-3 flex items-center'>
                <FormControl>
                  <Switch
                    {...field}
                    className='mb-0'
                    checked={form.getValues('is_active') === '1'}
                    onCheckedChange={(checked) => {
                      field.onChange(checked ? '1' : '0')
                    }}
                  />
                </FormControl>
                <FormLabel className='ml-2'>Active</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='mt-6 flex justify-end gap-2'>
          <Button
            type='submit'
            loading={isAdding || isEditing}
            className='w-1/2 sm:w-[100px]'
          >
            Save
          </Button>
          <Button
            variant='outline'
            onClick={() => onCloseClick?.()}
            className='w-1/2 sm:w-[100px]'
          >
            Close
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ApplicationForm

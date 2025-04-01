// import { HTMLAttributes, useState } from 'react'

// import { zodResolver } from '@hookform/resolvers/zod'
// import { IconLockQuestion } from '@tabler/icons-react'
// import { useForm } from 'react-hook-form'
// import { Link } from 'react-router-dom'
// import { z } from 'zod'

// import { Button } from '@/components/custom/button'
// import {
//   Card,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card'
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
// import { routePaths } from '@/constants/routePaths'
// import { cn, sleep } from '@/lib/utils'
// import { authService } from '@/services'
// import { ForgotPasswordData } from '@/types/auth'

// interface ProvideEmailFormProps extends HTMLAttributes<HTMLDivElement> {
//   data: Partial<ForgotPasswordData>
//   onNext: (data: unknown) => void
// }

// const formSchema = z.object({
//   email: z
//     .string()
//     .min(1, { message: 'Please enter your email' })
//     .email('Invalid email'),
// })

// export function ProvideEmailForm({ data, onNext }: ProvideEmailFormProps) {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: data?.email || '',
//     },
//   })
//   const [isLoading, setLoading] = useState(false)
//   const [commonError, setCommonError] = useState<string | null>(null)

//   const onSubmit = async (data: z.infer<typeof formSchema>) => {
//     try {
//       setLoading(true)
//       await sleep()
//       await authService.forgotPassword(data)
//       onNext(data)
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (error: any) {
//       setCommonError(error?.response?.data?.message || error?.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <Card className='p-6'>
//       <CardHeader className='px-0'>
//         <CardTitle className='text-center text-2xl font-semibold tracking-tight'>
//           Forgot Password
//         </CardTitle>
//         <CardDescription className='text-center'>
//           Provide your account's email for which you want to reset the password
//         </CardDescription>
//         {/* @ts-ignore */}
//         <IconLockQuestion
//           width='80'
//           height='80'
//           className='m-auto mt-4 text-gray-600'
//         />
//       </CardHeader>

//       <div className={cn('mt-6 grid gap-6')}>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)}>
//             <div className='grid gap-4'>
//               <FormField
//                 control={form.control}
//                 name='email'
//                 render={({ field }) => (
//                   <FormItem className='space-y-1'>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <Input
//                         {...field}
//                         onChange={(e) => {
//                           field.onChange(e)
//                         }}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//             {commonError && (
//               <p className='text-destructive mt-2 text-[0.8rem] font-medium'>
//                 {commonError}
//               </p>
//             )}
//             <div className='mt-2 w-full'>
//               <Button type='submit' className='mt-2 w-full' loading={isLoading}>
//                 Next
//               </Button>
//             </div>
//             <div className='mt-4 text-sm'>
//               Already have an account?
//               <Button asChild variant='link' className='pl-1'>
//                 <Link to={routePaths.guest.signin}>Login</Link>
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </div>
//     </Card>
//   )
// }

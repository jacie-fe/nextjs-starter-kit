"use client";
import { FC } from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/custom/breadcrumb'
import { cn } from '@/lib/utils'

type BreadcrumbSource = {
  to?: string
  name: string
}

interface DocsBreadcrumbProps {
  sources: BreadcrumbSource[]
}

const DocsBreadcrumb: FC<DocsBreadcrumbProps> = ({ sources }) => {
  return (
    <Breadcrumb className='mb-4'>
      <BreadcrumbList>
        {sources.map((item, idx) => {
          return (
            <div className='flex items-center' key={idx}>
              <BreadcrumbItem
                className={cn({
                  'font-bold': idx === sources.length - 1,
                })}
              >
                {item.name}
              </BreadcrumbItem>
              {idx === sources.length - 1 ? null : (
                <BreadcrumbSeparator className='ml-1' />
              )}
            </div>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default DocsBreadcrumb

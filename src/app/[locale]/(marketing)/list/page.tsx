'use client'

// import { getList } from '@/data/services/auth-service'
// import { useEffect, useState } from 'react'

export default function List() {
  // const [list, setList] = useState([])
  // useEffect(() => {
  //   async function fetchData() {
  //     const data = await getList()
  //     setList(data.data)
  //   }
  //   fetchData()
  // }, [])
  return (
    <div>
      <h1>Game List</h1>
      <div className='p-6'>
        {/* {list?.map((item) => (
          <div key={item.id}>
            <h1>{item.game_name}</h1>
            <p>{item.game_code}</p>
          </div>
        ))} */}
        <h2 className='mt-5 text-2xl font-bold'>
          Boilerplate Code for Your Next.js Project with Tailwind CSS
        </h2>
        <p className='text-base'>
          Next.js Boilerplate is a developer-friendly starter code for Next.js
          projects, built with Tailwind CSS and TypeScript.{' '}
          <span role='img' aria-label='zap'>
            ⚡️
          </span>{' '}
          Designed with developer experience in mind, it includes:
        </p>
      </div>
    </div>
  )
}

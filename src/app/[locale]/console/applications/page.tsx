'use client'

// import { getList } from '@/data/services/auth-service'
// import { useState } from 'react'

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
      <h1>Application List</h1>
      <div className='p-6'>
        {/* {list?.map((item) => (
          <div key={item.id}>
            <h1>{item.game_name}</h1>
            <p>{item.game_code}</p>
          </div>
        ))} */}
      </div>
    </div>
  )
}

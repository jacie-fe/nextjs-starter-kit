// app/components/MyButton.tsx
'use client'

import { getTokenAction, removeAccessToken, removeRefreshToken } from "@/app/actions/auth"
import createApiClient from "@/services/api/apiClient"
import { Button } from "@/components/custom/button"
import { useEffect } from "react"

export default function MyButton() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://authen.ekyc.com/console-api/api/v1'
    const api = createApiClient(baseUrl)
    // useEffect(() => {
    //     api
    //       .get('/user-info')
    //       .then((res) => {
    //         console.log("User profile", res.data)
    //       })
    //       .catch(console.error)
    //   }, [])
      
  const handleClick = async () => {
    await removeAccessToken()
    await removeRefreshToken()
    const { access_token, refresh_token } = await getTokenAction()
    console.log("Access token removed", access_token);
    
  }

  return <Button onClick={handleClick}>Click me</Button>
}

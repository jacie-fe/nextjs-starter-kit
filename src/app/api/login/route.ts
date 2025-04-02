export const runtime = "edge"; // Run on Edge for lower latency

import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: '/',
  domain: process.env.HOST ?? 'localhost',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
}

const baseUrl = `${process.env.VITE_API_URL}`
const url = new URL('/console-api/api/v1/signin', baseUrl)

export async function POST(req: Request) {
  const body = await req.json()
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...body }),
      cache: 'no-cache',
    })

    const responseData = await response.json()
    const { data } = responseData
    
    const responseCookies = await cookies()
    if (data?.token?.access_token) {
      responseCookies.set('access_token', data.token.access_token, config)
    }
    if (data?.token?.refresh_token) {
      responseCookies.set('refresh_token', data.token.refresh_token, config)
    }

    return NextResponse.json(responseData)
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || 'Login failed' },
      { status: 500 }
    )
  }
}

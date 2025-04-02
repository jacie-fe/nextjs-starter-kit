export const runtime = "edge"; // Run on Edge for lower latency

import { NextResponse } from 'next/server'

const baseUrl = `${process.env.VITE_API_URL}`
const url = new URL('/console-api/api/v1/register', baseUrl)

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
    return NextResponse.json(responseData)
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || 'Signup failed' },
      { status: 500 }
    )
  }
}

import SectionCode from '@/components/static-layout/section-code'
import SectionLevel from '@/components/static-layout/sectionLevel'
import { routePaths } from '@/lib/routePaths'
import Link from 'next/link'

export default function ApiReference() {
  const getSessionToken = {
    request: `curl --location 'https://authen.ekyc.com/authen-api/api/v1/session-token' \
--header 'X-API-Key: abcd' \
--header 'Content-Type: application/json' \
--data '{
    "email": "breezy@yopmail.com",
    "client_id": "84c2ad6c-62eb-4217-8f46-a66852e6fe92"
}'`,
    response: `{
    "code": "SUCCESS",
    "message": "Success",
    "data": {
        "session_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6IjEyMzQiLCJjbGllbnRfaWQiOiI4NGMyYWQ2Yy02MmViLTQyMTctOGY0Ni1hNjY4NTJlNmZlOTIiLCJleHAiOjE3MzY4Mzg0NjIsImlhdCI6MTczNjgzODM0Mn0.1nJtIEalRVxhLoxQLIepHxcK6dsPDwfUsyM1YtAqq58"
    }
}`,
    inactiveClient: `{
  "code": "INACTIVE",
  "message": "client not active",
  "data": null
}`,
    errorResponse: `{
    "code": "INVALID_REQUEST",
    "message": "get session token failed",
    "data": ""
}`,
  }

  const receiveResponse = `{CALLBACK_URL}?result=true&session_token={SESSION_TOKEN}`

  return (
    <>
      <ol className='list-decimal space-y-4 pl-6 marker:text-xl marker:font-medium'>
        <li className='space-y-3'>
          <SectionLevel
            level={2}
            id='get-session-token'
            title='Get session token'
          >
            <div className='space-y-3'>
              <SectionCode title='Request'>
                {getSessionToken.request}
              </SectionCode>
              <SectionCode title='Success Response'>
                {getSessionToken.response}
              </SectionCode>
              <SectionCode title='Case of inactive client – This indicates that your application has been marked as inactive in the Domain Console'>
                {getSessionToken.inactiveClient}
              </SectionCode>
              <SectionCode title='Error Response'>
                {getSessionToken.errorResponse}
              </SectionCode>
            </div>
          </SectionLevel>
        </li>
        <li className='space-y-3'>
          <SectionLevel
            level={2}
            id='receive-response-api'
            title='API receive verification response'
          >
            <p>
              The verification response will be sent to the{' '}
              <code>callback_url</code> specified in the{' '}
              <Link
                className='text-blue-600'
                target='_blank'
                href={routePaths.private.applications}
              >
                Console
              </Link>
              , with the params request format outlined below. It is your
              responsibility to process this response and grant user access
              accordingly.
            </p>
            <SectionCode>{receiveResponse}</SectionCode>

            <div className='space-y-2'>
              <p className='font-[600]'>Parameters: </p>
              <ul className='list-disc space-y-3 pl-6 marker:text-xl marker:font-medium'>
                <li>
                  <code className='font-[600]'>result</code>: A boolean value
                  indicating the verification status.{' '}
                  <code className='rounded-sm bg-gray-200 px-1 text-[15px] font-medium'>
                    true
                  </code>{' '}
                  means the verification was successful, while{' '}
                  <code className='rounded-sm bg-gray-200 px-1 text-[15px] font-medium'>
                    false
                  </code>{' '}
                  indicates failure.
                </li>
                <li>
                  <code className='font-[600]'>session_token</code>: A unique
                  identifier for the authentication session. Your backend needs
                  this parameter to identify the session in progress. It should
                  compare the stored session token with the received one and
                  proceed accordingly.
                </li>
              </ul>
              <div>
                For more details:{' '}
                <a href='#receive-response' className='text-blue-600'>
                  Notifying your Backend of the Verification result{' '}
                </a>
              </div>
            </div>
          </SectionLevel>
        </li>
      </ol>
    </>
  )
}

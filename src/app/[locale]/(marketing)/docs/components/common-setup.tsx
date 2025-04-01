import PushNotiSetup from './push-noti-setup'
import TOTPSetup from './totp-setup'
import Box from '@/components/static-layout/box'
import SectionCode from '@/components/static-layout/section-code'
import SectionLevel from '@/components/static-layout/sectionLevel'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { routePaths } from '@/lib/routePaths'
import { Info } from 'lucide-react'
import Link from 'next/link'

export default function CommonSetup() {
  const codeEnableDisable2fa = {
    code: `curl --location 'https://authen.ekyc.com/authen-api/api/v1/mfa/toggle' \
--header 'X-API-Key: ybz4gkzlgzla4u4txhn6ju' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "user@example.com",
    "client_id": "CLIENT_ID",
    "secret": "SECRET_KEY",
    "action": "ENABLE"
}'`,
    successResponse: `{
    "code": "SUCCESS",
    "message": "Success",
    "data": ""
}`,
    errorResponse: `{
    "code": "INVALID_REQUEST",
    "message": "toggle failed",
    "data": ""
}`,
  }
  return (
    <SectionLevel id='quick-guide' title='Quick guide'>
      <p>
        The integration process involves initiating the 2FA workflow, handling
        the authentication request, and processing the user’s verification
        through a webview interface.
      </p>

      <SectionLevel id='setup' title='Prerequisites'>
        <div>
          To integrate our 2FA solution, you need to set up an account,
          configure your application, and obtain the necessary credentials for
          API access.
        </div>
        <SectionLevel
          level={2}
          title='Step 1. Create authorization credentials'
          className='gap-1'
        >
          <div>Register an Account and Sign in to the Domain Console</div>
          <ol className='list-decimal space-y-4 pl-6 marker:font-medium'>
            <li>
              <strong>Create an account</strong> on our platform by visiting the
              <Link
                className='text-blue-600'
                target='_blank'
                href={routePaths.guest.signup}
              >
                {' '}
                registration page
              </Link>
              .
            </li>
            <li>
              <strong>Sign in</strong> to the <strong>Domain Console</strong>{' '}
              with your newly created account credentials. The Domain Console is
              where you will manage your application settings and configure 2FA
              for your platform.
            </li>

            <li>
              <strong>Create a new application</strong>: Click on the “Create
              Application” button to start setting up your application.
            </li>
            <li>
              <strong>Enter Required Information</strong>: Fill in the necessary
              details such as the application name, ip, and any other required
              fields.
            </li>
            <li>
              <strong>Obtain API Key</strong>: After completing the setup, you
              will receive an API Key. This key will be used in subsequent steps
              to communicate with our API and enable 2FA functionality in your
              application.
            </li>
          </ol>

          <Badge className='mt-1 bg-gray-100 text-gray-600 whitespace-pre-line'>
            <div>
              <Info className='mt-[-1px] mr-1 inline' width={18} />
              <span>Note: </span>
              Please ensure that you enter the correct IP address for your
              server when prompted. This is required to pass the whitelist check
              from our system and ensure secure communication with our API.
            </div>
          </Badge>
        </SectionLevel>
        <SectionLevel
          level={2}
          title='Step 2. Update your application'
          className='gap-1'
        >
          <ol className='list-decimal space-y-4 pl-6 marker:font-bold'>
            <li>
              <div className='mb-3 font-bold'>
                Add 2FA Settings in Your Application
              </div>
              <ul className='list-disc space-y-3 pl-6'>
                <li>Navigate to the Security page of your application.</li>
                <li>
                  Build a screen that allows users to enable or disable 2FA.
                </li>
              </ul>
            </li>
            <li>
              <div className='font-bold'>Generate a QR Code</div>
              <p className='mb-3'>
                Generate a QR code containing the TOTP provisioning URI and
                display it. This allows the user to scan the QR code with an
                eAuthenticator app to add their account.
              </p>
              <h4 className='font-bold'>QR Code Format</h4>
              <p>The QR code should encode the following URL format:</p>
              <SectionCode>
                {`otpauth://totp/{issuer}:{user_email}?secret={secret_key}&issuer={issuer}&algorithm=SHA1&digits=6&client_id={client_id}&email={user_email}`}
              </SectionCode>
              <ul className='mt-3 list-disc space-y-3 pl-6'>
                <li>
                  Replace <code className='code'>{`{issuer}`}</code> with your
                  application name.
                </li>
                <li>
                  Replace <code className='code'>{`{user_email}`}</code> with
                  the user’s email address.
                </li>
                <li>
                  Replace <code className='code'>{`{client_id}`}</code> with
                  your application’s client ID.
                </li>
                <li>
                  Replace <code className='code'>{`{secret_key}`}</code> with
                  the TOTP secret assigned to the user.
                </li>
              </ul>
            </li>
            <li>
              <div className='font-bold'>
                Display the QR Code and Guide users to scan the QR Code using
                eAuthenticator App
              </div>
              <ul className='list space-y-3'>
                <li>
                  Instruct users to download and install the eAuthenticator app
                  from the Google Play Store or Apple App Store.
                </li>
                <li>
                  Guide users to:
                  <ul className='list-disc space-y-2 pl-6'>
                    <li>
                      Open the eAuthenticator app and tap the ’+’ icon to add a
                      new account.
                    </li>
                    <li>Scan the QR code displayed on your application.</li>
                    <li>
                      Enter the OTP generated by the eAuthenticator app into the
                      input field on your application.
                    </li>
                  </ul>
                </li>
                <li>
                  Alongside the QR code, display an input field where users can
                  enter the TOTP code generated by the eAuthenticator app.
                </li>
              </ul>
            </li>
            <li>
              <div className='font-bold'>Verify the OTP</div>
              <p>
                After scanning the QR code, users must enter the OTP generated
                by aAuthenticator app. Your backend must verify this OTP to
                enable 2FA for the user.
              </p>
            </li>
            <li>
              <div className='font-bold'>
                Notify the Server After Enabling/Disabling 2FA
              </div>
              <p className='mb-3'>
                Once the user enables or disables 2FA, your application must
                send a request to the authentication server to synchronize the
                updated 2FA status. This ensures that the server is aware of the
                user’s current 2FA configuration and can enforce it during
                authentication attempts.
              </p>
              <p>
                *It is crucial to handle these requests securely by using the
                API key provided during the setup process. Ensure that all
                sensitive data is transmitted over HTTPS to prevent unauthorized
                access or interception.
              </p>

              <Box title='API definition' className='mt-7 ml-[-10px]'>
                <div>
                  <p>
                    This API endpoint is responsible for toggling the 2FA status
                    for a given user. Your backend must call this API whenever a
                    user enables or disables 2FA in your application.
                  </p>
                </div>
                <div className='mt-3 space-y-3'>
                  <p className='font-bold'>Request Headers</p>
                  <ul className='list-disc space-y-1 pl-6'>
                    <li>
                      <code className='code'>X-API-Key</code>: API key from the
                      Authenticator console of the application. This key is
                      required for authentication.
                    </li>
                  </ul>
                  <p className='font-bold'>Request Body Parameters</p>
                  <ul className='list-disc space-y-2 pl-6'>
                    <li>
                      <code className='code'>client_id</code>: Your
                      application’s client ID.
                    </li>
                    <li>
                      <code className='code'>email</code>: The email address of
                      the user for whom 2FA is being enabled or disabled.
                    </li>
                    <li>
                      <code className='code'>secret</code> (optional for
                      DISABLE): The last known TOTP secret associated with the
                      user’s email. This is only required when disabling 2FA to
                      verify ownership.
                    </li>
                    <li>
                      <code className='code'>action</code>: Specify ENABLE to
                      activate 2FA or DISABLE to turn it off.
                    </li>
                  </ul>
                  <p className='font-bold'>Example Request</p>
                  <SectionCode>{codeEnableDisable2fa.code}</SectionCode>
                  <p>Success Response</p>
                  <SectionCode>
                    {codeEnableDisable2fa.successResponse}
                  </SectionCode>
                  <p>Error Response</p>
                  <SectionCode>
                    {codeEnableDisable2fa.errorResponse}
                  </SectionCode>
                </div>
              </Box>
            </li>
          </ol>
        </SectionLevel>

        <p>
          Once you have completed the above setup, you just need to follow a few
          final steps to finish your integration. After that, users will have
          two methods for 2FA authentication:
        </p>
        {/* --------------- */}
        <SectionLevel
          level={2}
          title='Authentication Methods'
          className='gap-1'
        >
          <ul className='list-disc space-y-4 pl-6'>
            <li>
              <div className='font-medium'>
                Push Notification Authentication
              </div>
              <p>
                This method sends a push notification to the user’s registered
                device, prompting them to approve or deny the authentication
                request.
              </p>
              <p>
                For more details, see{' '}
                <a className='text-blue-600' href='#push-notification'>
                  Push Notification Authentication
                </a>
                .
              </p>
            </li>
            <li>
              <div className='font-medium'>
                Time-Based One-Time Password (TOTP) Authentication
              </div>
              <p>
                TOTP generates a time-sensitive, one-time password that users
                must enter to authenticate.
              </p>
              <p>
                Unlike push notification authentication, TOTP authentication
                requires additional steps.
              </p>
              <p>
                For more details, see{' '}
                <a className='text-blue-600' href='#totp'>
                  TOTP Authentication
                </a>
                .
              </p>
            </li>
          </ul>
        </SectionLevel>
      </SectionLevel>
      <Separator className='my-4' />
      <PushNotiSetup />
      <Separator className='my-4' />
      <TOTPSetup />
    </SectionLevel>
  )
}

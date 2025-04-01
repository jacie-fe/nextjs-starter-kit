import SectionCode from '@/components/static-layout/section-code'
import SectionLevel from '@/components/static-layout/sectionLevel'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Info } from 'lucide-react'
import Link from 'next/link'

export default function PushNotiSetup() {
  const authenIdentifierUrl = process.env.VITE_AUTHEN_IDENTIFIER_URL
  const codeSigninUrl = {
    redirect: `${authenIdentifierUrl}/start-authentication?signin_method=redirect&session_token={sessionToken}&redirect_uri={redirectUri}`,
    popup: `${authenIdentifierUrl}/start-authentication?signin_method=popup&session_token={sessionToken}&redirect_uri={redirectUri}&state={state}`,
  }
  const codeExampleSigninPopup = `const state = generateAuthState();
sessionStorage.setItem("oauth_state", state);

const authUrl = 'https://identifier.ekyc.com/start-authentication?signin_method=popup&session_token={sessionToken}&redirect_uri={redirectUri}&state={state}';
// Open authentication in a new popup window
const popup = window.open(authUrl, "_blank", "width=500,height=600");

// Ensure the popup is opened successfully (handling potential pop-up blockers)
if (!popup) {
  console.error("Popup blocked. Please allow pop-ups and try again.");
}
`

  const codeDataResponsePopup = `{
  session_token: string | null;
  state?: string;
  error?: string | "REJECT" | "TIMEOUT" | "INTERNAL_SERVER_ERROR";
}
`
  const codeExampleHandleResponsePopup = `window.addEventListener("message", (event) => {
  if (event.origin !== "https://identifier.ekyc.com") return; // Validate the origin

  const { state, session_token } = event.data;
  if (state !== sessionStorage.getItem("oauth_state")) {
    console.error("Invalid state: Possible CSRF attack!");
    return;
  }
  if (session_token) {
    // Call API to retrieve the authentication token
  }
}, false);
`

  const codeExampleHandleErrorPopup = `window.addEventListener("message", (event) => {
  if (event.origin !== "https://identifier.ekyc.com") return; // Validate the origin

  const data = event.data;
  if (data.error) {
    // Show failure UI, and provide option to sign in again
    alert("Authentication failed. Please try again.");
    window.location.href = "/sign-in"; // Redirect to sign-in page
  }
}, false);
`
  return (
    <SectionLevel id='push-notification' title='Push Notification Setup'>
      <SectionLevel
        level={2}
        title='Step 1. Update Your Application to Support Session Creation'
        className='gap-1'
      >
        <p>
          After your application is configured to use 2FA, you need to make sure
          that it can handle user sessions properly.
        </p>
        <p>
          Upon successful login, your server must call API to{' '}
          <a className='text-blue-600' href='#get-session-token'>
            create a session
          </a>{' '}
          for the user using their email. <br /> This API call will return a
          <code className='ml-1'>session_token</code>, which will be used in
          subsequent requests.
        </p>

        <div>
          <span className='font-bold'>
            Securely store the session_token for Authentication Validation
          </span>
          <p className='mt-1'>
            After obtaining the <strong>session_token</strong>, your portal
            server should store it{' '}
            <strong>securely for at least 2 minutes</strong>. This token will be
            compared with the authentication results received from the{' '}
            <strong>eAuthenticator service</strong> once the user completes the
            2FA authentication. By matching the session token with the 2FA
            response, your system can ensure that the authentication was
            completed successfully and verify the user’s identity.
          </p>
        </div>
        <div>
          <span className='font-bold'>Key Steps:</span>
          <ol className='mt-2 list-decimal space-y-1 pl-6'>
            <li>
              <strong>Create User Session:</strong> Upon successful login, call
              the API to generate a <code>session_token</code>.
            </li>
            <li>
              <strong>Store the session_token</strong>: Securely store the{' '}
              <code>session_token</code> for at least <strong>2 minutes</strong>{' '}
              to allow time for 2FA completion.
            </li>
            <li>
              <strong>Compare session_token with eAuthenticator results</strong>
              : Once the user completes 2FA, retrieve the stored session_token
              and compare it with the authentication response from the
              eAuthenticator service.
            </li>
          </ol>
        </div>
        <p>
          By implementing this mechanism, your system ensures that
          authentication is verified correctly while preventing unauthorized
          access.
        </p>
      </SectionLevel>
      <SectionLevel
        level={2}
        title='Step 2. Redirect to eAuthenticator server'
        className='gap-1'
      >
        <p>
          Your portal will then trigger the authentication process by opening a
          webview that points to a specific URL. This will load the 2FA
          interface, where the user will be prompted to complete the
          authentication process.
        </p>
        <div>
          <p>
            Generate a URL to request access from eAuthenticator endpoint at{' '}
            <code className='code'>{`${authenIdentifierUrl}/start-authentication`}</code>
            . This endpoint is accessible over HTTPS; plain HTTP connections are
            refused.
          </p>
          <p>The eAuthenticator server supports two sign-in methods:</p>
          <p className='mt-3 font-[600]'>
            Option 1: Signing in with a redirect:{' '}
          </p>
          <SectionCode codeClassName='my-1'>
            {codeSigninUrl.redirect}
          </SectionCode>
        </div>
        <Table className='border border-gray-300'>
          <TableHeader>
            <TableRow>
              <TableHead colSpan={2}>Parameters</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className='bg-gray-200 align-top font-medium'>
                <code>signin_method</code>
              </TableCell>
              <TableCell className='whitespace-normal'>
                <p>
                  <strong>Required</strong>
                </p>
                The sign-in method to use. The value must be{' '}
                <code>redirect</code> in this case.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='bg-gray-200 align-top font-medium'>
                <code>session_token</code>
              </TableCell>
              <TableCell className='whitespace-normal'>
                <p>
                  <strong>Required</strong>
                </p>
                A unique token generated during the session creation process.
                This token must be included when the webview calls back to the
                portal.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='bg-gray-200 align-top font-medium'>
                <code>redirect_uri</code>
              </TableCell>
              <TableCell className='whitespace-normal'>
                <p>
                  <strong>Required</strong>
                </p>
                The URL where the portal will receive the callback once the 2FA
                process is completed. This URL will include the session_token
                and indicate the outcome of the authentication.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div>
          <p className='mt-3 font-[600]'>Option 2: Signing in with a popup: </p>
          <p>
            To authenticate using a popup, your application should open the
            eAuthenticator Webview in a new tab. The authentication server will
            then handle user login and return a response via postMessage.
          </p>
          <p className='mt-2 font-[600]'>Opening the Authentication Popup</p>
          <p>
            To initiate the authentication process, construct the authentication
            URL with the necessary query parameters:
          </p>
          <SectionCode codeClassName='my-1'>{codeSigninUrl.popup}</SectionCode>

          <Table className='my-4 border border-gray-300'>
            <TableHeader>
              <TableRow>
                <TableHead colSpan={2}>Parameters</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className='bg-gray-200 align-top font-medium'>
                  <code>signin_method</code>
                </TableCell>
                <TableCell className='whitespace-normal'>
                  <p>
                    <strong>Required</strong>
                  </p>
                  The sign-in method to use. The value must be{' '}
                  <code>popup</code> in this case.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='bg-gray-200 align-top font-medium'>
                  <code>session_token</code>
                </TableCell>
                <TableCell className='whitespace-normal'>
                  <p>
                    <strong>Required</strong>
                  </p>
                  A unique token generated during the session creation process.
                  This token must be included when the webview calls back to the
                  portal.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='bg-gray-200 align-top font-medium'>
                  <code>redirect_uri</code>
                </TableCell>
                <TableCell className='whitespace-normal'>
                  <p>
                    <strong>Recommended</strong>
                  </p>
                  The origin URL of the portal. This URL will be used to strict
                  targetOrigin
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='bg-gray-200 align-top font-medium'>
                  <code>state</code>
                </TableCell>
                <TableCell className='whitespace-normal'>
                  <p>
                    <strong>Recommended</strong>
                  </p>
                  Specifies any string value that your application uses to
                  maintain state between your authorization request and the
                  authorization server’s response. If you generate a random
                  string or encode the hash of a cookie or another value that
                  captures the client’s state, you can validate the response to
                  additionally ensure that the request and response originated
                  in the same browser, providing protection against attacks such
                  as cross-site request forgery (CSRF).
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <SectionCode title='Example Implementation:'>
            {codeExampleSigninPopup}
          </SectionCode>

          <Badge className='mt-4 bg-gray-100 whitespace-pre-line text-gray-600'>
            <div>
              <Info className='mt-[-1px] mr-1 inline' width={18} />
              <span>Note: </span>
              The sign-in with popup method may not work on mobile devices, as
              popups are often blocked or behave differently in mobile browsers.
            </div>
          </Badge>
        </div>
      </SectionLevel>
      <SectionLevel
        level={2}
        title='Step 3. Handle the eAuthenticator server response'
        className='gap-1'
      >
        <p>
          Once the user has completed the two-factor authentication (2FA)
          process, the verification result must be handled appropriately to
          ensure secure access to the portal.
        </p>

        <div className='space-y-2'>
          <div className='text-lg font-medium' id='receive-response'>
            1. Notifying your Backend of the Verification result
          </div>
          <p>
            Before the portal client retrieves the access token, your backend
            must be notified of the{' '}
            <a href='#receive-response-api' className='text-blue-600'>
              2FA verification result
            </a>
            . This ensures that the backend can validate the outcome of the
            authentication process and take the necessary actions.
          </p>
          <ul className='list-disc space-y-1 pl-6'>
            <li>
              The backend will receive the callback that has been pre-defined in
              the{' '}
              <Link
                className='text-blue-600'
                href='https://authen.ekyc.com/console'
                target='_blank'
              >
                Domain console
              </Link>{' '}
              and check the result of the 2FA authentication (e.g., whether the
              verification was successful or failed).
            </li>
            <li>
              If the verification is successful, the backend will proceed with
              generating an access token for the user and initiate the necessary
              steps to grant access.
            </li>
            <li>
              If the verification fails, the backend will reject the request,
              and the user will be notified of the failure, preventing access to
              your app.
            </li>
          </ul>
        </div>
        {/* -------- */}
        <h3 className='text-lg font-medium'>
          2. How to handle response in your client side?
        </h3>
        <div className='rounded-md border border-gray-300 p-4'>
          <p className='mb-1 font-[600]'>
            <span className='underline'>Option 1</span>: Signing in with a
            redirect:{' '}
          </p>
          <div className='pl-2'>
            <p className='font-[600]'>Successful verification: </p>
            <p>
              If the 2FA verification is successful, the eAuthenticator will
              automatically redirect to the{' '}
              <code className='code'>redirect_uri</code> provided earlier in the
              integration process. This redirect serves as a signal to your
              portal that the authentication process has been completed
              successfully.
            </p>
            <SectionCode>
              {`https://your-application.example.com/callback?session_token=1234567890`}
            </SectionCode>
            <p className='mt-2 font-[600]'>Redirection process:</p>
            <ul className='list-disc space-y-1 pl-6'>
              <li>
                The eAuthenticator will make a request to the specified{' '}
                <code>redirect_uri</code>, passing along the{' '}
                <code>session_token</code> and indicating the success of the
                authentication.
              </li>
              <li>
                Upon receiving the callback, the portal’s frontend must call the
                designated API to retrieve the authentication token from the
                your backend server.
              </li>
            </ul>

            <div className='mt-2 space-y-2'>
              <div className='font-[600]'>Failure Verification:</div>
              <p>
                If 2FA verification fails, the eAuthenticator displays a UI
                notifying the user that they do not have access. In this case,
                the UI will also show a <strong>’Sign In’</strong> button. When
                the user clicks this button, they will be redirected to the{' '}
                <code className='rounded-sm bg-gray-200 px-1 text-[15px] font-medium'>
                  redirect_uri
                </code>{' '}
                <strong className='text-[15px]'>
                  without a <code>session_token</code>
                </strong>{' '}
                to indicate that authentication has failed.
              </p>
              <SectionCode>
                {`https://your-application.example.com/callback?error=REJECT|TIMEOUT|INTERNAL_SERVER_ERROR`}
              </SectionCode>
              <p>
                Your app should handle this scenario by detecting the absence of
                a session token and{' '}
                <strong className='text-[15px]'>
                  automatically redirecting the user to the{' '}
                  <code className='rounded-sm bg-gray-200 px-1 font-medium'>
                    /sign-in
                  </code>{' '}
                  page{' '}
                </strong>
                for re-authentication or further instructions.
              </p>
            </div>
          </div>
        </div>

        {/* Option2 */}
        <div className='rounded-md border border-gray-300 p-4'>
          <p className='mb-1 font-[600]'>
            <span className='underline'>Option 2</span>: Signing in with a
            popup:
          </p>
          <div className=''>
            <p>
              The authentication response will be posted via postMessage to the
              parent window, passing along the session token and success status.
            </p>
            <p className='mt-2 font-bold'>Handling postMessage:</p>
            <p>
              To securely process the authentication response, your app’s
              frontend must:
            </p>
            <ol className='my-2 list-decimal space-y-1 pl-6'>
              <li>
                <strong>Listen for the postMessage event</strong> – This allows
                your application to receive authentication data from the popup
                window.
              </li>
              <li>
                <strong>Validate the message origin</strong> – Ensure the
                response comes from the trusted authentication server to prevent
                unauthorized messages.
              </li>
              <li>
                <strong>Verify the state parameter</strong> – Compare the state
                received in the authentication response with the previously
                stored state value that was sent during the initial
                authentication request. This prevents CSRF (Cross-Site Request
                Forgery) attacks.
              </li>
            </ol>
            <SectionCode title='Data response:'>
              {codeDataResponsePopup}
            </SectionCode>
            <p className='mt-3 font-medium'>Example:</p>
            <SectionCode>{codeExampleHandleResponsePopup}</SectionCode>
            <p className='mt-4'>
              In the event of failure, your app should listen for the
              postMessage event, and if the response indicates failure, you can
              redirect the user to the /sign-in page or provide further
              instructions.
            </p>

            <SectionCode>{codeExampleHandleErrorPopup}</SectionCode>
          </div>
        </div>
      </SectionLevel>
    </SectionLevel>
  )
}

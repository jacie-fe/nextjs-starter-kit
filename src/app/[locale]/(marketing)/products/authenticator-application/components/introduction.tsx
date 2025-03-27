import SectionLevel from '@/components/static-layout/sectionLevel'

export default function Introduction() {
  return (
    <div className='space-y-4' id='introduction'>
      <SectionLevel title='Secure Your Account, Protect Your Digital Life'>
        <div>Welcome to the Authenticator Application!</div>
        <div>
          The Authenticator Application generates time-sensitive codes that,
          combined with your password, provide enhanced security against
          unauthorized access. With just your smartphone and a few simple steps,
          you can protect your account from being compromised by attackers.
        </div>
      </SectionLevel>
    </div>
  )
}

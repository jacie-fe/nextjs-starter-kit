import SectionLevel from '@/components/static-layout/sectionLevel'

export default function Summary() {
  return (
    <SectionLevel level={2} title='Summary'>
      <div>
        By integrating the predefined callback URL configured in the Domain
        console, the backend is notified of the verification result before
        generating the access token. This ensures that access is only granted
        when the 2FA process has been successfully completed. Handling this
        process securely prevents unauthorized access and ensures a smooth user
        experience.
      </div>
      <div>
        For further details on error handling or additional configurations,
        please refer to the extended sections of this guide.
      </div>
    </SectionLevel>
  )
}

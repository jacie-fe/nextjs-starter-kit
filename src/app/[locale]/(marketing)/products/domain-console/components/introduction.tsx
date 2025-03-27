import SectionLevel from '@/components/static-layout/sectionLevel'

export default function Introduction() {
  return (
    <div className='space-y-4' id='introduction'>
      <SectionLevel title='Effortlessly manage domains, authentication settings, and security policies from a unified platform.'>
        <div>
          The Domain Console is a centralized control panel designed for IT
          administrators to manage domain-based authentication, enforce security
          policies, and monitor user activities within an organization. It
          enables seamless identity management, ensures compliance, and
          simplifies access control across all connected applications.
        </div>
      </SectionLevel>
    </div>
  )
}

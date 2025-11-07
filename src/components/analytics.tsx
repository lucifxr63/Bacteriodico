'use client'

import Script from 'next/script'

export function Analytics() {
  const provider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER

  if (provider === 'plausible') {
    const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN

    return (
      <Script
        defer
        data-domain={domain}
        src="https://plausible.io/js/script.js"
      />
    )
  }

  if (provider === 'umami') {
    const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
    const src = process.env.NEXT_PUBLIC_UMAMI_SRC || 'https://analytics.umami.is/script.js'

    return (
      <Script
        defer
        src={src}
        data-website-id={websiteId}
      />
    )
  }

  return null
}

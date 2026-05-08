#!/usr/bin/env python3
"""Add FAQ and Article schema to existing content pages."""
import json, os

BASE = '/root/nexa-paraguay'

# FAQ Schema for the FAQ page
faq_schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How long does Paraguay residency take?",
            "acceptedAnswer": {"@type": "Answer", "text": "The full process takes 8-12 weeks from document preparation to receiving your cédula (ID card)."}
        },
        {
            "@type": "Question",
            "name": "How much does Paraguay residency cost?",
            "acceptedAnswer": {"@type": "Answer", "text": "Nexa's Paraguay Base program starts at USD 2,900. The Paraguay Business program is USD 4,400+, and the Investor Program is USD 6,900+."}
        },
        {
            "@type": "Question",
            "name": "Does Paraguay tax foreign income?",
            "acceptedAnswer": {"@type": "Answer", "text": "No. Paraguay has a territorial tax system. Foreign-source income is taxed at 0%. Only Paraguay-source income is taxed at 10%."}
        },
        {
            "@type": "Question",
            "name": "Do I need to live in Paraguay full-time?",
            "acceptedAnswer": {"@type": "Answer", "text": "No. For permanent residency, you only need to visit Paraguay once every 3 years. There is no minimum number of days required per visit."}
        },
        {
            "@type": "Question",
            "name": "How long to get Paraguayan citizenship?",
            "acceptedAnswer": {"@type": "Answer", "text": "Citizenship is available after 3 years of residency. This is one of the fastest citizenship paths in the western hemisphere."}
        },
        {
            "@type": "Question",
            "name": "Do I need to invest money to get Paraguay residency?",
            "acceptedAnswer": {"@type": "Answer", "text": "No. The standard residency route has no minimum investment or income requirement. The Investor Pass ($150K-$200K) is optional."}
        },
        {
            "@type": "Question",
            "name": "Is Paraguay safe for expats?",
            "acceptedAnswer": {"@type": "Answer", "text": "Paraguay is ranked the safest country in South America by the Global Peace Index. Asunción has modern areas with low crime rates."}
        },
        {
            "@type": "Question",
            "name": "Does Paraguay have a digital nomad visa?",
            "acceptedAnswer": {"@type": "Answer", "text": "No, but that's actually better. Paraguay offers permanent residency with 0% foreign income tax, no income threshold, and citizenship in 3 years — far superior to any temporary digital nomad visa."}
        },
        {
            "@type": "Question",
            "name": "Can I work in Paraguay as a foreigner?",
            "acceptedAnswer": {"@type": "Answer", "text": "Yes. With a RUC (tax registration) you can work legally in Paraguay. Remote work for foreign clients is taxed at 0%."}
        },
        {
            "@type": "Question",
            "name": "Does Paraguay have CRS reporting?",
            "acceptedAnswer": {"@type": "Answer", "text": "No. Paraguay does not participate in the Common Reporting Standard, meaning your financial information is not automatically exchanged with other countries."}
        },
        {
            "@type": "Question",
            "name": "Is there a wealth tax in Paraguay?",
            "acceptedAnswer": {"@type": "Answer", "text": "No. Paraguay has no wealth tax, no inheritance tax, and no capital gains tax on foreign assets."}
        },
        {
            "@type": "Question",
            "name": "How is Paraguay different from Uruguay for tax residency?",
            "acceptedAnswer": {"@type": "Answer", "text": "Uruguay's 2026 tax reform now taxes foreign income at 12%. Their tax holiday requires $2M in real estate. Paraguay offers 0% permanently with no investment."}
        }
    ]
}

# Organization schema
org_schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Nexa Paraguay",
    "url": "https://nexa.paragu-ai.com",
    "logo": "https://nexa.paragu-ai.com/images/brand/logo.webp",
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+595-982-515-138",
        "contactType": "customer service",
        "email": "hola@nexaparaguay.com",
        "availableLanguage": ["English", "Spanish", "Dutch", "German"]
    },
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Asunción",
        "addressCountry": "PY"
    },
    "sameAs": [
        "https://www.linkedin.com/company/nexa-paraguay",
        "https://instagram.com/nexaparaguay"
    ]
}

# Write schema files
os.makedirs(f'{BASE}/public/schema', exist_ok=True)

with open(f'{BASE}/public/schema/faq.json', 'w') as f:
    json.dump(faq_schema, f, indent=2)

with open(f'{BASE}/public/schema/organization.json', 'w') as f:
    json.dump(org_schema, f, indent=2)

print("Schema files written to public/schema/")

# Now update _document.tsx to inject schema
doc_path = f'{BASE}/src/pages/_document.tsx'
if os.path.exists(doc_path):
    with open(doc_path) as f:
        content = f.read()
    
    # Check if schema import already exists
    schema_injection = """
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                  { "@type": "Organization",
                    "name": "Nexa Paraguay",
                    "url": "https://nexa.paragu-ai.com",
                    "logo": "https://nexa.paragu-ai.com/images/brand/logo.webp",
                    "contactPoint": { "@type": "ContactPoint", "telephone": "+595-982-515-138", "contactType": "customer service", "email": "hola@nexaparaguay.com", "availableLanguage": ["English","Spanish","Dutch","German"] },
                    "sameAs": ["https://www.linkedin.com/company/nexa-paraguay","https://instagram.com/nexaparaguay"]
                  }
                ]
              })
            }}
          />"""
    
    if 'application/ld+json' not in content:
        # Insert before </Head>
        modified = content.replace('</Head>', f'{schema_injection}\n          </Head>')
        with open(doc_path, 'w') as f:
            f.write(modified)
        print("Schema injection added to _document.tsx")
    else:
        print("Schema already in _document.tsx")
else:
    print("No _document.tsx found, creating one")
    # Create the document component if it doesn't exist

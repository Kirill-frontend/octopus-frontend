# Payload CMS Admin Plan

## Goal

Prepare the current Astro site for a future admin panel on Payload CMS so that:

- global settings can manage favicon, title template, apple touch icon, default SEO and similar site-wide settings
- header and footer are editable from admin
- non-service singleton pages can be edited from admin as globals
- service pages are stored as a collection
- service pages are built from reusable blocks in admin, matching the blocks already created in the frontend
- existing static content can be prefilled as initial seed data instead of being entered manually

## Recommended content model

### Globals

Use globals for singleton entities:

1. `siteSettings`
2. `header`
3. `footer`
4. `homePage`
5. `aboutPage`
6. `servicesPage`
7. `contactPage`
8. `faqPage`

### Collections

Use collections for repeatable entities:

1. `media`
2. `servicePages`
3. `formsSubmissions` (optional, if contact/request forms should be stored)

## Important assumption

The current `/service` page looks like a single long assembled page with blocks from multiple service categories.

For Payload CMS I recommend this:

- keep **one reusable library of service blocks**
- allow every service page to use **any subset** of those blocks
- seed the current `/service` page as the first record in `servicePages`

That gives you the flexibility to:

- clone a service page
- remove unnecessary blocks
- reorder blocks
- create new service pages without touching code

## Open questions to confirm before implementation

These are not blockers for the plan, but should be confirmed before coding Payload:

1. Should every service page have its own route like `/services/:slug`, or do you want to keep a single `/service` route for now?
2. Should homepage service links always use **fixed visual positions** (top, left-upper, right-upper, left-lower, center-lower, right-lower), or should they become a simple sortable list on mobile and a positioned map only on desktop?
3. Do you want non-service pages like About / Contact / FAQ to also become page-builder style blocks later, or is simple structured editing enough for them?

My recommendation:

- use `/services/:slug`
- keep homepage positions as fixed selectable slots
- keep non-service pages structured for now, not block-builder

## SEO structure

## `siteSettings` global

This should contain site-wide SEO defaults and assets:

```ts
siteSettings: {
  siteName: string
  siteUrl: string
  defaultTitle: string
  titleTemplate: string
  defaultDescription: textarea
  defaultRobots: string
  themeColor: string
  locale: string
  faviconSvg: upload(media)
  faviconIco: upload(media)
  appleTouchIcon: upload(media)
  defaultOgImage: upload(media)
}
```

## Reusable SEO field group

Add the same SEO group to:

- `homePage`
- `aboutPage`
- `servicesPage`
- `contactPage`
- `faqPage`
- each `servicePages` document

Recommended fields:

```ts
seo: {
  metaTitle?: string
  metaDescription?: textarea
  canonicalUrl?: string
  robots?: string
  ogTitle?: string
  ogDescription?: textarea
  ogImage?: upload(media)
  faviconSvgOverride?: upload(media)
  faviconIcoOverride?: upload(media)
  appleTouchIconOverride?: upload(media)
}
```

Notes:

- If per-page favicon/apple icon is not set, fallback to `siteSettings`
- If page SEO fields are empty, fallback to `siteSettings`
- This is already close to how the Astro project is now wired in `src/lib/seo.ts`

## Header global

Recommended schema:

```ts
header: {
  logo: upload(media)
  mobileLogo?: upload(media)
  ctaLabel: string
  ctaUrl: string
  navItems: [
    {
      label: string
      type: 'custom' | 'servicePage' | 'pageRef'
      url?: string
      servicePage?: relationship(servicePages)
      pageRef?: select('home' | 'about' | 'services' | 'contact' | 'faq')
    }
  ]
}
```

## Footer global

Recommended schema:

```ts
footer: {
  logo: upload(media)
  newsletterTitle: string
  newsletterText: textarea
  newsletterFormEnabled: boolean
  mainLinks: [linkItem]
  utilityLinks: [linkItem]
  copyrightText: string
}
```

Where `linkItem` is:

```ts
{
  label: string
  type: 'custom' | 'servicePage' | 'pageRef'
  url?: string
  servicePage?: relationship(servicePages)
  pageRef?: select('home' | 'about' | 'services' | 'contact' | 'faq')
}
```

## Home page global

The homepage needs special handling because of the service links around the globe.

### Recommended approach

Use a `featuredServices` array on `homePage` global:

```ts
homePage: {
  hero: {
    backgroundImage: upload(media)
  }
  featuredServices: [
    {
      service: relationship(servicePages)
      position: select(
        'top',
        'left-upper',
        'right-upper',
        'left-lower',
        'center-lower',
        'right-lower'
      )
      customLabel?: string
      isVisible: boolean
    }
  ]
}
```

### Why this is the best fit

- it matches the current homepage structure exactly
- you can add more services later in `servicePages`
- only selected ones appear on homepage
- you can choose the exact visual position in admin

### Validation

In Payload, validate that:

- each `position` is unique
- max 6 featured items for the desktop globe layout

If later you want more than 6 homepage services:

- keep the same 6 fixed desktop positions
- allow overflow services to render below as a normal mobile/secondary list

## `servicePages` collection

Recommended top-level fields:

```ts
servicePages: {
  title: string
  slug: string
  status: 'draft' | 'published'
  shortLabel?: string
  excerpt?: textarea
  cardLabel?: string
  heroImage?: upload(media)
  listingImage?: upload(media)
  showInHomepagePicker: boolean
  showInServicesPage: boolean
  sortOrder?: number
  seo: SeoGroup
  blocks: BlocksField
}
```

## Service page blocks

Each block below should exist in Payload as a real block, because the frontend already uses these sections and the user explicitly wants the service page assembled block-by-block.

Recommended block slugs:

1. `serviceHero`
2. `overviewSplit`
3. `confidenceSection`
4. `equationStrip`
5. `reasonsGrid`
6. `processSteps`
7. `regionsGrid`
8. `supplyCards`
9. `containerEquipment`
10. `workflowAlternating`
11. `structuresCards`
12. `productionComposite`
13. `consultationGrid`
14. `approachComposite`
15. `richTextIntro`
16. `supportSplit`
17. `ctaBanner`

## Block field definitions

### 1. `serviceHero`

```ts
{
  blockType: 'serviceHero'
  title: string
  subtitle: richText or textarea
  image: upload(media)
  formTitle?: string
  formFields?: array
  buttonLabel?: string
}
```

Seed from current page:

- title: `Engineering Solutions`
- subtitle: `Precision, accountability and safety — coordinated through One Entry Point`
- image: current hero image URL
- buttonLabel: `Receive a call` (fix typo from current `Recuve a call`)

### 2. `overviewSplit`

```ts
{
  blockType: 'overviewSplit'
  introText: richText
  introImage: upload(media)
  sectionTitle: string
  deliverables: array of text lines
  outroText?: richText
  detailImage: upload(media)
}
```

Seed:

- intro paragraphs from current `ServiceDetailOverview`
- section title: `What we deliver`
- deliverables:
  - `Method Statements according to IMO, DNV/GL, EN standards`
  - `Lifting & Rigging Plans for cranes and lifting tools`
  - `Stowage and Securing Design aligned with vessel capabilities`
  - `Load Spreading Layouts and deck strength verification`
  - `Structural support elements for sea fastening`
  - `Technical project support from tender through execution`
- outro paragraph:
  - `All documents reflect real operational constraints: port capability, vessel geometry, weather windows, timeline, equipment availability.`

### 3. `confidenceSection`

```ts
{
  blockType: 'confidenceSection'
  title: string
  body: textarea
  factsLabel: string
  facts: array of text
}
```

Seed:

- title: `Professional Accountability`
- body: `All engineering prepared by Octopus Group is protected with: Professional Liability Insurance — up to 1,000,000 USD`
- factsLabel: `This means:`
- facts:
  - `If an engineering error leads to loss → client is protected`
  - `Our responsibility is backed by real financial security`
  - `Decisions are supported by insurance, not assumptions`

### 4. `equationStrip`

```ts
{
  blockType: 'equationStrip'
  leftText: string
  centerText: string
  rightText: string
  leftSymbol: string
  rightSymbol: string
}
```

Seed:

- `Expertise`
- `Insurance`
- `True engineering confidence`
- `+`
- `=`

### 5. `reasonsGrid`

```ts
{
  blockType: 'reasonsGrid'
  title: string
  topItems: array of card text
  bottomItems: array of card text
}
```

Seed:

- title: `Why Octopus Group`
- top items:
  - `One Entry Point — unified coordination with clear responsibility`
  - `Trusted global engineering partners`
  - `Work designed for real operations, not theoretical success`
- bottom items:
  - `Strong technical communication throughout project lifecycle`
  - `Risk and downtime reduction through proper planning`

### 6. `processSteps`

```ts
{
  blockType: 'processSteps'
  title: string
  steps: [
    {
      number: string
      title: string
      text: textarea
    }
  ]
}
```

Seed:

- title: `How we work`
- steps:
  1. `Free Consultation` / `High-level evaluation of feasibility and operational risks`
  2. `Engineering Scope Definition` / `Clear deliverables, pricing and alignment with project plan`
  3. `Execution & Delivery` / `Certified documentation ready for approval and operations`

### 7. `regionsGrid`

```ts
{
  blockType: 'regionsGrid'
  intro: textarea
  regions: array of label
}
```

Seed:

- intro: `Octopus Group supplies certified lashing equipment from our EU warehouse in Bulgaria, providing fast and cost-efficient delivery across:`
- regions:
  - `Black Sea`
  - `Marmara`
  - `Mediterranean`
  - `Central & Eastern Europe`
  - `Southern Europe`

### 8. `supplyCards`

```ts
{
  blockType: 'supplyCards'
  title: string
  cards: [
    {
      title: string
      lines: array of text
    }
  ]
}
```

Seed:

- title: `What we supply`
- card 1 title: `EU Stock — ready for urgent deployment`
- lines:
  - `Lashing chains & binders`
  - `Turnbuckles / tensioners`
  - `D-rings, stoppers, lash plates`
  - `Webbing straps & securing accessories`
- card 2 title: `Custom Manufacturing — Asia & UAE`
- lines:
  - `Shackles, lifting points, chain systems`
  - `Wire rope slings & grommets`
  - `Spreader beams & special tools`

### 9. `containerEquipment`

```ts
{
  blockType: 'containerEquipment'
  title: string
  lines: array of text
  features: array of text
}
```

Seed:

- title: `Container Vessel Equipment`
- lines:
  - `We also supply a full range of container securing systems, including:`
  - `Twistlocks (manual, semi-auto, fully automatic)`
  - `Lashing rods & turnbuckles`
  - `Foundation sockets & pedestal fittings`
  - `Locking devices for deck stacks`
  - `Accessories for safe container stowage & securing`
- features:
  - `Compliant with ISO, EN, DNV/GL`
  - `Full traceability & certificates`
  - `Suitable for both feeder and deep-sea container vessels`

### 10. `workflowAlternating`

```ts
{
  blockType: 'workflowAlternating'
  title: string
  steps: [
    {
      number: string
      title: string
      reverse: boolean
      image?: upload(media)
    }
  ]
}
```

Seed:

- title: `How we work`
- steps:
  1. `Requirements review`
  2. `Best hub selection (EU / UAE / Asia)`
  3. `Certificates & compliance check`
  4. `Fast dispatch`
  5. `Optional: support on-site during operations`

### 11. `structuresCards`

```ts
{
  blockType: 'structuresCards'
  introTop: textarea
  introBottom: textarea
  cards: [
    {
      title: string
      note: string
    }
  ]
  outro: textarea
}
```

Seed:

- intro top: `Octopus Group cooperates with trusted fabrication partners in Turkey and China to provide high-quality metal structures for project, yacht and offshore cargo handling.`
- intro bottom: `We manufacture based on Octopus Group engineering or client-provided drawings, supplying both:`
- cards:
  - `Prefabricated units` / `— ready for immediate installation`
  - `Modular/knock-down constructions` / `— for assembly onboard or at terminal`
- outro:
  - `All structures are produced and certified according to the required technical standards.`

### 12. `productionComposite`

```ts
{
  blockType: 'productionComposite'
  title: string
  cards: array of text
  complianceItems: array of text
}
```

Seed:

- title: `What we produce`
- cards:
  - `Large sea fastening stoppers`
  - `Yacht transport cradles (modular and fixed)`
  - `Stanchions and bedding constructions`
  - `Spreader beams, lifting frames and A-frames`
  - `Stools and support foundations`
  - `Custom steel structures for project cargo securing`
- compliance items:
  - `Compliant with ISO, EN, DNV/GL`
  - `Full traceability & certificates`
  - `Suitable for both feeder and deep-sea container vessels`

### 13. `consultationGrid`

```ts
{
  blockType: 'consultationGrid'
  introTop: textarea
  introBottom: textarea
  rows: [
    {
      cards: [
        {
          text: string
          tone: 'light' | 'dark' | 'ghost'
        }
      ]
    }
  ]
  outro: textarea
}
```

Seed:

- intro top:
  - `Octopus Group provides Marine Consultancy services focused on safe and efficient planning of heavy lift, project and offshore cargo operations. We help you understand your operational needs before investing in engineering or execution.`
- intro bottom:
  - `Our Free Marine Logistics Consultation covers:`
- rows:
  - row 1:
    - `Feasibility of loading & discharge operations` / `ghost`
    - `Feasibility of loading & discharge operations` / `dark`
    - `Cargo handling limitations and safety requirements` / `light`
    - `Stowage, lifting & lashing concept review (high-level)` / `dark`
  - row 2:
    - `Risk awareness and operational recommendations` / `dark`
    - `Survey and supervision needs` / `light`
    - `Port restrictions and compliance overview` / `dark`
    - `Feasibility of loading & discharge operations` / `ghost`
- outro:
  - `This gives you clarity to make the right decisions — without any initial cost.`

### 14. `approachComposite`

```ts
{
  blockType: 'approachComposite'
  topTitle: string
  topText: textarea
  reviewLabel: string
  reviewItems: array of text
  includedTitle: string
  includedSubtitle: string
  includedItems: array of text
  excludedTitle: string
  excludedSubtitle: string
  excludedItems: array of text
  bottomLabel: string
  bottomItems: array of text
  bottomTitle: string
  bottomText: textarea
}
```

Seed:

- topTitle: `Our Approach`
- topText: `Our focus is to identify risks early and ensure operational efficiency`
- reviewLabel: `We review:`
- reviewItems:
  - `Cargo information and drawings`
  - `Vessel and lifting equipment compatibility`
  - `Terminal capabilities and local restrictions`
  - `Environmental and navigational factors`
  - `Applicable standards: IMO, ISO, DNV, OCIMF`
- includedTitle: `What is Included`
- includedSubtitle: `Free`
- includedItems:
  - `High-level operational recommendations`
  - `Feasibility overview and risk awareness`
  - `Clear next steps for safe execution`
  - `Transparent cost expectations for further services`
- excludedTitle: `What is Not Included`
- excludedSubtitle: `Paid Services`
- excludedItems:
  - `Engineering design and calculations`
  - `Detailed stowage plans`
  - `Lifting & rigging plans`
  - `Lashing calculations`
  - `Full site supervision & reporting`
- bottomLabel: `Once aligned on the operational concept, Octopus Group can deliver:`
- bottomItems:
  - `Port Captain attendance`
  - `Survey services`
  - `Engineering and technical planning`
  - `Lifting & lashing equipment supply`
  - `Agency services and local coordination`
- bottomTitle: `One Entry Point — Full Support When You’re Ready`
- bottomText: `You decide how far to proceed — we remain the single coordination hub.`

### 15. `richTextIntro`

Use this for text-only sections like the Port Captain intro.

```ts
{
  blockType: 'richTextIntro'
  paragraphs: array of richText
}
```

Seed:

- paragraph 1:
  - `Octopus Group provides comprehensive Port Captain services, ensuring full supervision and coordination of loading, securing, and discharge operations for heavy lift, project, offshore, and wind cargoes.`
- paragraph 2:
  - `We develop custom stowage solutions using advanced engineering software such as AutoCAD and Load Planner CAD. Our network includes both in-house Port Captains and trusted partners located worldwide. Octopus Group is the One Entry Point for customers who demand safety, predictability, and full cargo control throughout the voyage.`

### 16. `supportSplit`

This is the simpler blue/light two-column variant.

```ts
{
  blockType: 'supportSplit'
  leftLabel: string
  leftItems: array of text
  rightTitle: string
  rightText: textarea
}
```

Seed:

- leftLabel: `Once aligned on the operational concept, Octopus Group can deliver:`
- leftItems:
  - `Port Captain attendance`
  - `Survey services`
  - `Engineering and technical planning`
  - `Lifting & lashing equipment supply`
  - `Agency services and local coordination`
- rightTitle: `One Entry Point — Full Support When You’re Ready`
- rightText: `You decide how far to proceed — we remain the single coordination hub.`

### 17. `ctaBanner`

```ts
{
  blockType: 'ctaBanner'
  title: string
  description: textarea
  buttonLabel: string
  buttonUrl: string
  image?: upload(media)
  darkMode?: boolean
}
```

Seed from current service page:

- title: `Octopus Group — One Entry Point`
- description: `for engineering you can rely on — technically and contractually`
- buttonLabel: `Get a quote`
- buttonUrl: `/contact`

## Recommended Payload admin tabs

For `servicePages`, use tabs:

1. `Content`
2. `Blocks`
3. `SEO`
4. `Publishing`

### `Content` tab

- title
- slug
- excerpt
- card label
- hero image
- listing image
- homepage/service listing toggles

### `Blocks` tab

- `blocks` field only

### `SEO` tab

- SEO group from above

### `Publishing` tab

- status
- sortOrder

## Homepage service links: best implementation

You asked how to manage homepage links to service pages and possibly choose positions.

Yes, this is realistic and should be done from admin.

### Recommended final solution

On `homePage` global:

```ts
featuredServices: [
  {
    service: relationship('servicePages')
    position: select(
      'top',
      'left-upper',
      'right-upper',
      'left-lower',
      'center-lower',
      'right-lower'
    )
    customLabel?: string
    isVisible: boolean
  }
]
```

### Rules

- one service per position
- positions must be unique
- max 6 items
- if `customLabel` is empty, use `service.cardLabel || service.title`

This is the cleanest match with the current homepage implementation in `HomeBlock.astro`.

## Suggested seed content strategy

Yes, it is possible to avoid entering everything manually.

Recommended approach:

1. create Payload schemas
2. create a seed script
3. insert:
   - global defaults
   - header links
   - footer links
   - one initial `servicePages` record populated with the current `/service` content
   - homepage featured services with fixed positions

## Seed candidates already known from current code

### Header

Current nav:

- Home
- About
- Services
- FAQ
- Contact

CTA:

- `Get a quote`

### Footer main links

- Home
- About
- Services
- Blog
- Contact

### Footer utility links

- Style Guide
- Start Here
- Licenses
- Changelog

### Home featured service positions

Current static positions in `HomeBlock.astro`:

- `top` → `Engineering Solutions`
- `left-upper` → `Lifting & Lashing Equipment`
- `right-upper` → `Manufacture of Steel Structures`
- `left-lower` → `Marine Consultancy`
- `center-lower` → `Port Captain Service`
- `right-lower` → `Survey Services`

This should be migrated directly into the `homePage.featuredServices` global.

## Recommendation for implementation order

1. Add Payload `media` collection
2. Add `siteSettings` global
3. Add `header` and `footer` globals
4. Add singleton globals for `homePage`, `aboutPage`, `servicesPage`, `contactPage`, `faqPage`
5. Add `servicePages` collection
6. Add service page block schemas
7. Add seed script with current content
8. Update Astro frontend to consume Payload API instead of hardcoded block files

## Notes from current frontend that should be normalized during CMS migration

- Some current strings have broken encoding in source files like `â€”`; these should be normalized to real `—`
- Hero button text has a typo: `Recuve a call`; recommended corrected value: `Receive a call`
- `siteUrl` in current SEO config is still a placeholder and must be replaced with the real domain

## Final recommendation

The best long-term structure is:

- **globals** for site-wide and singleton pages
- **collection** for `servicePages`
- **block builder** only for service pages first
- **homepage featured service relationship + position select**
- **shared SEO group** everywhere
- **seed current content automatically**

This gives you:

- flexible service page creation
- admin control over homepage service links
- reusable block architecture
- future-friendly SEO editing
- minimum manual content re-entry

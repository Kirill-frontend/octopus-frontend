# Service Pages Seed Content

This document is the content source for seeding the remaining `servicePages` records in Payload CMS.

Use only block types that already exist in `octopus-backend/src/blocks/servicePageBlocks.ts` and are already rendered by the frontend service page builder.

Notes:
- `image`, `heroImage`, and `listingImage` can stay `null` during the first seed pass unless matching media IDs are already available.
- Keep block order exactly as listed for each service page.
- Rich text fields are written here as plain paragraphs; the backend seed agent can convert them with the existing `createRichText(...)` helper.

## Lifting and Lashing Equipment

### Top-level fields

- `title`: `Lifting and Lashing Equipment`
- `slug`: `lifting-and-lashing-equipment`
- `shortLabel`: `Equipment`
- `excerpt`: `Certified lifting and lashing equipment with fast regional deployment.`
- `cardLabel`: `Lifting and Lashing Equipment`
- `showInHomepagePicker`: `true`
- `showInServicesPage`: `true`
- `sortOrder`: `20`
- `seo.metaTitle`: `Lifting and Lashing Equipment`
- `seo.metaDescription`: `Certified lifting and lashing equipment, container securing systems, and fast regional supply coordinated through one entry point.`

### Block 1: `serviceHero`

- `title`: `Lifting and Lashing Equipment`
- `subtitle`: `Certified equipment supply for marine, project, and container cargo operations — delivered through one accountable coordination point.`
- `formTitle`: `Request equipment support`
- `buttonLabel`: `Get a quote`

### Block 2: `regionsGrid`

- `intro`: `Octopus Group supplies certified lifting and lashing equipment from our EU warehouse in Bulgaria, providing fast and cost-efficient delivery across:`
- `regions`:
  - `Black Sea`
  - `Marmara`
  - `Mediterranean`
  - `Central and Eastern Europe`
  - `Southern Europe`

### Block 3: `supplyCards`

- `title`: `What we supply`
- `cards`:
  - `title`: `EU Stock - ready for urgent deployment`
    - `lines`:
      - `Lashing chains and binders`
      - `Turnbuckles / tensioners`
      - `D-rings, stoppers, lash plates`
      - `Webbing straps and securing accessories`
  - `title`: `Custom Manufacturing - Asia and UAE`
    - `lines`:
      - `Shackles, lifting points, chain systems`
      - `Wire rope slings and grommets`
      - `Spreader beams and special tools`

### Block 4: `containerEquipment`

- `title`: `Container Vessel Equipment`
- `lines`:
  - `We also supply a full range of container securing systems, including:`
  - `Twistlocks (manual, semi-auto, fully automatic)`
  - `Lashing rods and turnbuckles`
  - `Foundation sockets and pedestal fittings`
  - `Locking devices for deck stacks`
  - `Accessories for safe container stowage and securing`
- `features`:
  - `Compliant with ISO, EN, and DNV/GL`
  - `Full traceability and certificates`
  - `Suitable for both feeder and deep-sea container vessels`

### Block 5: `workflowAlternating`

- `title`: `How we work`
- `steps`:
  - `number`: `1`
    - `title`: `Requirements review`
    - `reverse`: `false`
  - `number`: `2`
    - `title`: `Best hub selection (EU / UAE / Asia)`
    - `reverse`: `true`
  - `number`: `3`
    - `title`: `Certificates and compliance check`
    - `reverse`: `false`
  - `number`: `4`
    - `title`: `Fast dispatch`
    - `reverse`: `true`
  - `number`: `5`
    - `title`: `Optional: support on-site during operations`
    - `reverse`: `false`

### Block 6: `ctaBanner`

- `title`: `Octopus Group - One Entry Point`
- `description`: `For lifting and lashing equipment you can rely on — technically and logistically.`
- `buttonLabel`: `Get a quote`
- `buttonUrl`: `/contact`
- `darkMode`: `false`

## Manufacture of Steel Structures

### Top-level fields

- `title`: `Manufacture of Steel Structures`
- `slug`: `manufacture-of-steel-structures`
- `shortLabel`: `Steel Structures`
- `excerpt`: `Fabrication support for marine, project cargo, yacht, and offshore operations.`
- `cardLabel`: `Manufacture of Steel Structures`
- `showInHomepagePicker`: `true`
- `showInServicesPage`: `true`
- `sortOrder`: `30`
- `seo.metaTitle`: `Manufacture of Steel Structures`
- `seo.metaDescription`: `Certified fabrication of sea fastening structures, transport cradles, and custom steel supports for marine and project cargo operations.`

### Block 1: `serviceHero`

- `title`: `Manufacture of Steel Structures`
- `subtitle`: `Certified fabrication support for project cargo, yacht transport, offshore operations, and marine engineering execution.`
- `formTitle`: `Request fabrication support`
- `buttonLabel`: `Get a quote`

### Block 2: `structuresCards`

- `introTop`: `Octopus Group cooperates with trusted fabrication partners in Turkey and China to provide high-quality metal structures for project, yacht, and offshore cargo handling.`
- `introBottom`: `We manufacture based on Octopus Group engineering or client-provided drawings, supplying both:`
- `cards`:
  - `title`: `Prefabricated units`
    - `note`: `Ready for immediate installation`
  - `title`: `Modular / knock-down constructions`
    - `note`: `For assembly onboard or at terminal`
- `outro`: `All structures are produced and certified according to the required technical standards.`

### Block 3: `productionComposite`

- `title`: `What we produce`
- `cards`:
  - `Large sea fastening stoppers`
  - `Yacht transport cradles (modular and fixed)`
  - `Stanchions and bedding constructions`
  - `Spreader beams, lifting frames, and A-frames`
  - `Stools and support foundations`
  - `Custom steel structures for project cargo securing`
- `complianceItems`:
  - `Compliant with ISO, EN, and DNV/GL`
  - `Full traceability and certificates`
  - `Produced according to project-specific operational requirements`

### Block 4: `ctaBanner`

- `title`: `Octopus Group - One Entry Point`
- `description`: `From engineering to fabrication follow-up, we keep steel structure delivery coordinated through one accountable hub.`
- `buttonLabel`: `Get a quote`
- `buttonUrl`: `/contact`
- `darkMode`: `false`

## Marine Consultancy

### Top-level fields

- `title`: `Marine Consultancy`
- `slug`: `marine-consultancy`
- `shortLabel`: `Consultancy`
- `excerpt`: `Operational feasibility, compliance, and planning guidance before execution.`
- `cardLabel`: `Marine Consultancy`
- `showInHomepagePicker`: `true`
- `showInServicesPage`: `true`
- `sortOrder`: `40`
- `seo.metaTitle`: `Marine Consultancy`
- `seo.metaDescription`: `Marine logistics consultation focused on feasibility, operational risk, compliance, and practical planning before execution.`

### Block 1: `serviceHero`

- `title`: `Marine Consultancy`
- `subtitle`: `Early-stage operational guidance that helps clients understand feasibility, constraints, and risk before committing to execution.`
- `formTitle`: `Book consultation`
- `buttonLabel`: `Book consultation`

### Block 2: `consultationGrid`

- `introTop`: `Octopus Group provides Marine Consultancy services focused on safe and efficient planning of heavy lift, project, and offshore cargo operations.`
- `introBottom`: `Our Free Marine Logistics Consultation covers:`
- `rows`:
  - row 1:
    - `Feasibility of loading and discharge operations` / `ghost`
    - `Commercial and operational scenario framing` / `dark`
    - `Cargo handling limitations and safety requirements` / `light`
    - `Stowage, lifting, and lashing concept review (high-level)` / `dark`
  - row 2:
    - `Risk awareness and operational recommendations` / `dark`
    - `Survey and supervision needs` / `light`
    - `Port restrictions and compliance overview` / `dark`
    - `Stakeholder alignment before execution` / `ghost`
- `outro`: `This gives you clarity to make the right decisions without any initial cost.`

### Block 3: `approachComposite`

- `topTitle`: `Our Approach`
- `topText`: `Our focus is to identify risks early and ensure operational efficiency.`
- `reviewLabel`: `We review:`
- `reviewItems`:
  - `Cargo information and drawings`
  - `Vessel and lifting equipment compatibility`
  - `Terminal capabilities and local restrictions`
  - `Environmental and navigational factors`
  - `Applicable standards: IMO, ISO, DNV, OCIMF`
- `includedTitle`: `What is Included`
- `includedSubtitle`: `Free`
- `includedItems`:
  - `High-level operational recommendations`
  - `Feasibility overview and risk awareness`
  - `Clear next steps for safe execution`
  - `Transparent cost expectations for further services`
- `excludedTitle`: `What is Not Included`
- `excludedSubtitle`: `Paid Services`
- `excludedItems`:
  - `Engineering design and calculations`
  - `Detailed stowage plans`
  - `Lifting and rigging plans`
  - `Lashing calculations`
  - `Full site supervision and reporting`
- `bottomLabel`: `Once aligned on the operational concept, Octopus Group can deliver:`
- `bottomItems`:
  - `Port Captain attendance`
  - `Survey services`
  - `Engineering and technical planning`
  - `Lifting and lashing equipment supply`
  - `Agency services and local coordination`
- `bottomTitle`: `One Entry Point - Full Support When You're Ready`
- `bottomText`: `You decide how far to proceed - we remain the single coordination hub.`

### Block 4: `ctaBanner`

- `title`: `Octopus Group - One Entry Point`
- `description`: `Clarity first, execution second — we help you understand the operation before you commit resources.`
- `buttonLabel`: `Book consultation`
- `buttonUrl`: `/contact`
- `darkMode`: `false`

## Port Captain Service

### Top-level fields

- `title`: `Port Captain Service`
- `slug`: `port-captain-service`
- `shortLabel`: `Port Captain`
- `excerpt`: `Supervision, coordination, and cargo control throughout port operations.`
- `cardLabel`: `Port Captain Service`
- `showInHomepagePicker`: `true`
- `showInServicesPage`: `true`
- `sortOrder`: `50`
- `seo.metaTitle`: `Port Captain Service`
- `seo.metaDescription`: `Worldwide port captain support for supervision, cargo coordination, loading control, and operational accountability.`

### Block 1: `serviceHero`

- `title`: `Port Captain Service`
- `subtitle`: `On-site operational supervision and cargo coordination for heavy lift, project, offshore, and wind cargo movements.`
- `formTitle`: `Request support`
- `buttonLabel`: `Request support`

### Block 2: `richTextIntro`

- `paragraphs`:
  - `Octopus Group provides comprehensive Port Captain services, ensuring full supervision and coordination of loading, securing, and discharge operations for heavy lift, project, offshore, and wind cargoes.`
  - `We develop custom stowage solutions using advanced engineering software such as AutoCAD and Load Planner CAD. Our network includes both in-house Port Captains and trusted partners located worldwide.`

### Block 3: `supportSplit`

- `leftLabel`: `Once aligned on the operational concept, Octopus Group can deliver:`
- `leftItems`:
  - `Port Captain attendance`
  - `Survey services`
  - `Engineering and technical planning`
  - `Lifting and lashing equipment supply`
  - `Agency services and local coordination`
- `rightTitle`: `One Entry Point - Full Support When You're Ready`
- `rightText`: `You decide how far to proceed - we remain the single coordination hub.`

### Block 4: `ctaBanner`

- `title`: `Octopus Group - One Entry Point`
- `description`: `When operational control matters on the quay, onboard, or during discharge, we stay accountable from start to finish.`
- `buttonLabel`: `Request support`
- `buttonUrl`: `/contact`
- `darkMode`: `false`

## Survey Services

### Top-level fields

- `title`: `Survey Services`
- `slug`: `survey-services`
- `shortLabel`: `Survey`
- `excerpt`: `Survey and supervision support for cargo safety, documentation, and execution.`
- `cardLabel`: `Survey Services`
- `showInHomepagePicker`: `true`
- `showInServicesPage`: `true`
- `sortOrder`: `60`
- `seo.metaTitle`: `Survey Services`
- `seo.metaDescription`: `Independent survey attendance, cargo condition checks, supervision, and reporting for marine and project cargo operations.`

### Block 1: `serviceHero`

- `title`: `Survey Services`
- `subtitle`: `Independent survey support for cargo condition, loading supervision, lashing checks, and operational reporting.`
- `formTitle`: `Request survey`
- `buttonLabel`: `Request survey`

### Block 2: `overviewSplit`

- `introText` paragraphs:
  - `Octopus Group arranges survey support for marine, project, and heavy lift cargo operations where independent reporting and on-site observation are critical.`
  - `We help clients, operators, and cargo interests document the real condition of the operation before, during, and after handling activities.`
- `sectionTitle`: `What we cover`
- `deliverables`:
  - `Pre-loading and post-discharge cargo condition survey`
  - `Loading and discharge supervision attendance`
  - `Lashing and securing condition checks`
  - `Photo documentation and damage reporting`
  - `Statement of facts and attendance records`
  - `Operational observations shared with the relevant stakeholders`
- `outroText` paragraph:
  - `Our survey input helps reduce disputes, improves transparency, and gives every party a clearer operational record.`

### Block 3: `reasonsGrid`

- `title`: `Why Octopus Group Survey Support`
- `topItems`:
  - `Independent reporting focused on practical cargo operations`
  - `Clear communication between cargo interests, terminals, and vessel teams`
  - `Attendance that supports both prevention and documentation`
- `bottomItems`:
  - `Fast coordination through one entry point`
  - `Operational observations aligned with real handling conditions`

### Block 4: `processSteps`

- `title`: `How we work`
- `steps`:
  - `number`: `1`
    - `title`: `Request and scope alignment`
    - `text`: `We confirm cargo type, location, timing, reporting expectations, and stakeholder needs.`
  - `number`: `2`
    - `title`: `Attendance planning`
    - `text`: `We arrange the appropriate surveyor support and align attendance with the operational schedule.`
  - `number`: `3`
    - `title`: `On-site reporting`
    - `text`: `Observations, condition notes, and supporting records are documented and shared after attendance.`

### Block 5: `supportSplit`

- `leftLabel`: `Survey support can be coordinated together with:`
- `leftItems`:
  - `Port Captain attendance`
  - `Engineering and technical planning`
  - `Lifting and lashing equipment supply`
  - `Agency services and local coordination`
  - `Marine consultancy before execution`
- `rightTitle`: `Independent reporting when accountability matters`
- `rightText`: `Octopus Group can combine survey attendance with broader operational support while keeping communication centralized through one coordination point.`

### Block 6: `ctaBanner`

- `title`: `Octopus Group - One Entry Point`
- `description`: `For independent survey support, supervision, and operational reporting you can rely on during critical cargo movements.`
- `buttonLabel`: `Request survey`
- `buttonUrl`: `/contact`
- `darkMode`: `false`

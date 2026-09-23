============================================================
MASTER PROMPT
SHREE SHYAM PVC INTERIOR
PREMIUM MOBILE-FIRST WEBSITE + BOOKING SYSTEM + ADMIN PANEL
============================================================

Build a complete production-ready website and business management
system for:

BUSINESS NAME:
Shree Shyam PVC Interior

BUSINESS TYPE:
PVC Interior / PVC Profile / Interior Solutions

BRAND INFORMATION FROM PROVIDED BUSINESS CARD:

Brand:
Shree Shyam PVC Interior

PVC Profile Branding:
KAKA PVC PROFILE

Address:
Yogeshwar Residency,
Opp. Ashutosh Tenament,
Moti Canal Road,
Vastral, Ahmedabad.

Phone numbers visible on supplied card:
+91 8209836370
+91 9828448936

IMPORTANT:
The supplied business card is the source of truth for business
information.

Do not invent factual business information.

Do not invent:
- prices
- customer numbers
- project numbers
- years of experience
- awards
- certifications
- fake reviews
- fake email
- fake social media accounts
- fake guarantees
- fake business claims

Anything not provided must either:
1. be editable from Admin Panel
OR
2. be omitted until the admin adds it.

============================================================
1. PROJECT GOAL
============================================================

Do NOT build this as a simple static interior website.

Build it as:

PREMIUM PVC INTERIOR WEBSITE
+
CUSTOMER BOOKING SYSTEM
+
LOCATION / VISIT REQUEST SYSTEM
+
GALLERY
+
SERVICE MANAGEMENT
+
CUSTOMER ENQUIRY MANAGEMENT
+
ADMIN DASHBOARD

The main business goal is:

Customer visits website
→ explores services
→ views work
→ selects service
→ requests free consultation / site visit
→ selects preferred date/time
→ provides location
→ submits booking
→ receives booking confirmation
→ admin receives enquiry
→ admin manages booking
→ customer can track booking status.

============================================================
2. DESIGN PRIORITY
============================================================

PRIORITY ORDER:

1. MOBILE
2. TABLET
3. LAPTOP
4. DESKTOP

The mobile experience is the most important.

Primary design target:

390 × 844 px

Also support:

320px
360px
375px
390px
414px
768px
1024px
1280px
1440px
1920px

IMPORTANT:

Mobile must NOT look like a compressed desktop website.

Create layouts specifically for mobile.

Desktop and laptop should use the same visual identity,
but rearrange content intelligently.

============================================================
3. VISUAL STYLE
============================================================

Use the supplied UI reference image as the primary design reference.

Design direction:

Premium
Modern
Clean
Minimal
Elegant
Interior-design focused
Professional
Warm
Luxury but affordable-looking
Trustworthy
Highly usable

Avoid generic SaaS UI.

Avoid generic template layouts.

Avoid excessive effects.

Avoid:
- neon
- excessive gradients
- excessive glassmorphism
- giant shadows
- excessive rounded containers
- clutter
- too many colors
- unnecessary animations
- huge text blocks

============================================================
4. COLOR SYSTEM
============================================================

Primary background:

Warm White
#F8F6F1

Secondary:

Cream
#F1ECE3

Primary text:

Deep Charcoal
#1D1D1B

Secondary text:

#66615B

Brand accent:

Deep Warm Brown

Secondary accent:

Muted Terracotta / Brown

Original business branding contains red.

Use the original red carefully for:
- important CTA
- active navigation
- small brand highlights
- phone icon
- selected states

Do NOT make the entire website red.

The overall visual should remain premium neutral.

============================================================
5. TYPOGRAPHY
============================================================

Use:

Inter
or
Manrope
or
Plus Jakarta Sans

Headings:
700 / 600

Body:
400 / 500

Buttons:
600

Use strong hierarchy.

Large headlines on hero.

Short paragraphs.

Avoid huge text paragraphs.

Mobile typography must remain readable.

============================================================
6. BRAND LOGO
============================================================

Use the provided Shree Shyam PVC Interior branding.

Create a clean brand lockup:

Shree Shyam
PVC INTERIOR

Use the KAKA PVC PROFILE identity only where appropriate.

Do not distort the original branding.

Header logo should be compact.

Desktop:
logo + navigation.

Mobile:
hamburger + centered logo + call button.

============================================================
7. IMAGE CONSISTENCY
============================================================

THIS IS EXTREMELY IMPORTANT.

Every image must remain EXACTLY THE SAME
across all pages and renders.

Create a centralized image registry.

Example:

src/data/images.js

export const images = {

hero:
"/assets/interior/hero.webp",

kitchen:
"/assets/interior/kitchen.webp",

wardrobe:
"/assets/interior/wardrobe.webp",

doors:
"/assets/interior/doors.webp",

wallPanels:
"/assets/interior/wall-panels.webp",

tvUnit:
"/assets/interior/tv-unit.webp",

office:
"/assets/interior/office.webp"

};

All components must use this registry.

NEVER:
- randomly select images
- shuffle images
- use random Unsplash images
- change image on refresh
- generate random image URLs
- use different image for the same service
- replace images based on viewport
- use random placeholders

Example:

PVC Kitchen card
→ kitchen.webp

PVC Kitchen detail page
→ same kitchen.webp

PVC Kitchen gallery
→ same kitchen.webp

PVC Kitchen booking preview
→ same kitchen.webp

The exact same asset must remain consistent.

============================================================
8. IMAGE MANAGEMENT
============================================================

Admin must be able to:

Upload image
Delete image
Replace image
Set cover image
Set gallery image
Assign image to service
Reorder gallery

Images should have:

id
title
category
serviceId
url
altText
sortOrder
createdAt

Use optimized formats:

WebP / AVIF where supported.

Lazy load gallery images.

Use responsive image sizes.

============================================================
9. RESPONSIVE HEADER
============================================================

MOBILE:

Left:
hamburger menu

Center:
Shree Shyam
PVC INTERIOR

Right:
call icon

Header should be sticky.

When scrolling:

header becomes slightly compact.

Desktop:

Left:
brand logo

Center:
Home
Services
Gallery
About
Contact

Right:
Book Free Visit
Call Now

============================================================
10. MOBILE BOTTOM NAVIGATION
============================================================

Create fixed bottom navigation.

Items:

Home
Services
Gallery
Book
More

Use minimal outline icons.

Active page:
brand accent.

Touch-friendly.

Never hide important content behind the navigation.

Add safe-area bottom spacing.

============================================================
11. HOME PAGE
============================================================

URL:

/

Sections:

1. Header
2. Hero
3. Trust / feature strip
4. Services
5. Why PVC Interior
6. Featured Work
7. How It Works
8. Consultation CTA
9. About preview
10. Testimonials if admin has added them
11. FAQ preview
12. Location
13. Contact CTA
14. Footer

------------------------------------------------------------
HERO
------------------------------------------------------------

Use premium interior image.

Headline:

"Elegant Spaces
For A Better Tomorrow"

Supporting text:

"Premium PVC Interior Solutions
For Home & Office"

Primary CTA:

"Book Free Visit"

Secondary CTA:

"View Our Work"

Add subtle image zoom / parallax only if performance remains good.

Do not overanimate.

------------------------------------------------------------
FEATURE STRIP
------------------------------------------------------------

Show:

Modern Design
Water Resistant
Termite Resistant
Long Life

These are product/service characteristics only if the business
actually confirms them.

Otherwise make them editable from admin.

------------------------------------------------------------
SERVICES
------------------------------------------------------------

Title:

"Transform Your Space"

Cards:

PVC Modular Kitchen
PVC Wardrobe
PVC Doors
PVC Wall Panels
TV Unit & Panels
Office Interior

Every card:

Image
Service name
Short description
View Details

CTA:

"Explore Services"

------------------------------------------------------------
FEATURED WORK
------------------------------------------------------------

Show selected projects.

Grid on desktop.

Horizontal swipe cards on mobile.

Mobile should feel native.

CTA:

"View Full Gallery"

------------------------------------------------------------
HOW IT WORKS
------------------------------------------------------------

Step 1:
Choose Service

Step 2:
Book Free Visit

Step 3:
We Contact You

Step 4:
Discuss Design & Work

Keep this editable.

============================================================
12. SERVICES PAGE
============================================================

URL:

/services

Create premium service listing.

Filters:

All
Kitchen
Wardrobe
Doors
Wall Panels
TV Unit
Office

Mobile:
horizontal scrolling filter chips.

Each service card:

Image
Category
Title
Short description
CTA

Desktop:
2–3 column grid depending on viewport.

Mobile:
one card per row.

============================================================
13. SERVICE DETAIL PAGE
============================================================

URL:

/services/:slug

Example:

/services/pvc-modular-kitchen

Structure:

Large image

Service title

Category

Short description

Features

Available designs / variants

Gallery

Why choose this service

FAQ

CTA:

"Book This Service"

IMPORTANT:

Do not invent technical specifications.

Everything technical must be editable from admin.

============================================================
14. BOOKING SYSTEM
============================================================

URL:

/book

Create a premium multi-step booking flow.

MOBILE FIRST.

Progress indicator:

01 Service
02 Details
03 Location
04 Confirm

------------------------------------------------------------
STEP 1
------------------------------------------------------------

Select service.

Show service cards.

------------------------------------------------------------
STEP 2
------------------------------------------------------------

Customer details:

Full Name
Mobile Number
Preferred Date
Preferred Time
Message / Requirement

Validation:

Name required
Valid Indian mobile number
Date required
Time required

------------------------------------------------------------
STEP 3
------------------------------------------------------------

Location.

Options:

Use Current Location

OR

Search Location

OR

Enter Address Manually

Fields:

City
Area
Address
Landmark
Pincode

Map preview.

IMPORTANT:

Never force permission.

If geolocation is denied,
manual address must still work.

------------------------------------------------------------
STEP 4
------------------------------------------------------------

Show complete summary:

Customer
Service
Date
Time
Address
Requirement

Button:

"Confirm Booking"

------------------------------------------------------------
15. BOOKING CONFIRMATION
------------------------------------------------------------

After successful booking:

Show:

✓ Booking Request Submitted

Booking ID:

SSPI-XXXXXX

Show:

Service
Date
Preferred time
Location

Buttons:

Track Booking
Back To Home
Call Us
WhatsApp

Booking status initially:

Pending

============================================================
16. BOOKING STATUS
============================================================

Customer should be able to track:

Pending
Confirmed
Site Visit Scheduled
In Discussion
Work Started
Completed
Cancelled

Admin controls the status.

Create:

/booking/:id

Mobile-first tracking UI.

Use a vertical timeline.

============================================================
17. LOCATION PAGE
============================================================

URL:

/location

Show:

Business address

Yogeshwar Residency,
Opp. Ashutosh Tenament,
Moti Canal Road,
Vastral, Ahmedabad.

Buttons:

Get Directions
Call
WhatsApp

Map section.

Use a real map provider integration if configured.

If no map API is configured,
show a clean map placeholder and directions CTA.

============================================================
18. GALLERY
============================================================

URL:

/gallery

Categories:

All
Kitchen
Wardrobe
Doors
Wall Panels
TV Units
Office

Mobile:

2-column premium image grid.

Desktop:

3–4 column responsive masonry/grid.

Image click:

Open fullscreen gallery.

Features:

Swipe
Next
Previous
Close
Zoom where appropriate

Use EXACT same assets from centralized image registry.

============================================================
19. ABOUT PAGE
============================================================

URL:

/about

Sections:

About Shree Shyam PVC Interior

Business introduction

PVC Interior specialization

Work approach

Quality

Design

Customer service

Show business-card image / brand identity where appropriate.

Do NOT invent:
experience numbers
customer numbers
project numbers.

Admin can add these later.

============================================================
20. CONTACT PAGE
============================================================

URL:

/contact

Show:

Phone:

+91 8209836370
+91 9828448936

Address:

Yogeshwar Residency,
Opp. Ashutosh Tenament,
Moti Canal Road,
Vastral, Ahmedabad.

Actions:

Call
WhatsApp
Get Directions

Contact form:

Name
Phone
Service
Message

Submit:

"Send Enquiry"

Save enquiry to database.

============================================================
21. FAQ
============================================================

URL:

/faq

Accordion UI.

Categories:

Services
Booking
Site Visit
PVC Interior
Payments
Work Process

Admin can:

Add FAQ
Edit FAQ
Delete FAQ
Reorder FAQ
Enable/Disable FAQ

Do not invent business-specific answers that have not been confirmed.

============================================================
22. REVIEWS
============================================================

URL:

/reviews

Reviews should be ADMIN CONTROLLED.

Admin can:

Add
Edit
Delete
Approve
Reject
Hide

Do not create fake reviews.

Only approved reviews appear publicly.

Fields:

Customer name
Rating
Review
Date
Optional image

============================================================
23. CUSTOMER ACCOUNT
============================================================

Optional login system.

Customer can:

Create account
Login
Logout
View bookings
View booking details
Track status
Update profile
Save address

Do not make account mandatory for basic enquiry.

Guest booking should remain possible.

============================================================
24. MORE MENU
============================================================

Mobile slide-out menu.

Items:

Home
Services
Gallery
Book Visit
About
Reviews
FAQ
Contact
Location
My Bookings
Privacy Policy
Terms & Conditions
Cancellation Policy
Help

Use premium dark/neutral drawer design similar to reference.

============================================================
25. LEGAL PAGES
============================================================

Create:

/privacy-policy

/terms-and-conditions

/cancellation-refund

These must contain editable business-specific text.

Do not invent payment policies.

If online payment is not enabled,
do not display fake refund/payment claims.

============================================================
26. 404 PAGE
============================================================

Create:

/404

Premium branded design.

Message:

"Looks like this page doesn't exist."

Buttons:

Go Home
View Services

============================================================
27. SEO
============================================================

Implement technical SEO.

Every page must have:

Unique title
Meta description
Canonical URL
Open Graph metadata
Twitter metadata
Proper H1
Proper heading hierarchy
Image alt text
Semantic HTML

Local SEO:

Shree Shyam PVC Interior
Vastral
Ahmedabad
PVC Interior
PVC Profile
PVC Kitchen
PVC Wardrobe
PVC Doors
PVC Interior Services

Do not keyword stuff.

Create:

sitemap.xml

robots.txt

Add LocalBusiness structured data
ONLY using verified business information.

Add:
name
address
telephone

Do not invent:
rating
price range
opening hours
email

unless provided by admin.

============================================================
28. PERFORMANCE
============================================================

Target:

Lighthouse Performance:
90+

Optimize:

WebP/AVIF
Lazy loading
Code splitting
Route-based loading
Compressed images
Minimal JS
No unnecessary libraries

Avoid large animation libraries unless necessary.

============================================================
29. ACCESSIBILITY
============================================================

Implement:

Keyboard navigation
Visible focus
ARIA labels
Proper contrast
Alt text
Accessible forms
Large touch targets
Semantic buttons
Screen-reader friendly labels

============================================================
30. ANIMATIONS
============================================================

Use subtle premium animations.

Examples:

Hero image:
slow scale

Cards:
small translateY on hover

Buttons:
soft hover

Page transitions:
subtle fade/slide

Gallery:
smooth open

Mobile:
smooth bottom-sheet transitions

Avoid:
heavy animations
constant floating elements
excessive parallax
slow page loading

Animations must respect:

prefers-reduced-motion.

============================================================
31. WHATSAPP INTEGRATION
============================================================

Create WhatsApp CTA.

The number must be configurable from Admin.

Do not hard-code an unverified WhatsApp number if not confirmed.

Message can automatically include:

Hello Shree Shyam PVC Interior,
I am interested in [SERVICE].
I would like to request a consultation/site visit.

============================================================
32. ADMIN PANEL
============================================================

Create separate secure admin dashboard.

URL:

/admin

Admin login.

Never expose admin credentials in frontend.

Use secure authentication.

============================================================
33. ADMIN DASHBOARD
============================================================

Dashboard cards:

Total Bookings
Pending
Confirmed
Today's Visits
Completed
New Enquiries

Charts:

Bookings over time
Service enquiries
Booking status distribution

Recent bookings.

Recent enquiries.

============================================================
34. ADMIN BOOKINGS
============================================================

/admin/bookings

Features:

Search
Filter
Sort
Pagination

Filters:

Status
Service
Date
Location

Booking detail:

Customer
Phone
Service
Date
Time
Address
Location
Message
Created time

Admin actions:

Confirm
Reschedule
Mark site visit
Change status
Cancel
Add internal note

============================================================
35. ADMIN SERVICES
============================================================

/admin/services

Admin can:

Create service
Edit service
Delete service
Enable/disable service
Upload image
Change image
Set description
Add features
Set category
Reorder services

IMPORTANT:

No fake service prices.

If business wants pricing later,
make price fields optional and admin-controlled.

============================================================
36. ADMIN GALLERY
============================================================

/admin/gallery

Features:

Upload
Delete
Edit
Category
Service assignment
Set featured
Reorder
Bulk upload

Use stable image IDs.

============================================================
37. ADMIN ENQUIRIES
============================================================

/admin/enquiries

Show:

Name
Phone
Service
Message
Date
Status

Statuses:

New
Contacted
Follow-up
Converted
Closed

Admin can add notes.

============================================================
38. ADMIN REVIEWS
============================================================

/admin/reviews

Moderation:

Pending
Approved
Rejected

Only approved reviews appear on public website.

============================================================
39. ADMIN FAQ
============================================================

CRUD system.

Create
Edit
Delete
Reorder
Enable/disable

============================================================
40. ADMIN CONTENT MANAGEMENT
============================================================

Admin should be able to edit:

Hero heading
Hero description
CTA text
About content
Services
Gallery
FAQ
Contact information
Address
Phone numbers
WhatsApp number
Social links
Footer content

This prevents developer changes for normal business updates.

============================================================
41. ADMIN SETTINGS
============================================================

Settings:

Business name
Logo
Phone
WhatsApp
Address
Map coordinates
Email if available
Social links
Working hours if verified
SEO title
SEO description
Google Analytics ID
Search Console verification

Only show fields that are actually configured.

============================================================
42. DATABASE
============================================================

Use a proper database.

Recommended:

MongoDB

Collections:

users
admins
services
serviceCategories
bookings
customers
enquiries
gallery
reviews
faqs
settings
notifications
contactMessages

============================================================
43. BOOKING DATA MODEL
============================================================

Booking:

_id
bookingId
customerId
name
phone
serviceId
serviceName
preferredDate
preferredTime
location
address
city
area
pincode
landmark
latitude
longitude
message
status
adminNotes
createdAt
updatedAt

============================================================
44. API
============================================================

Create REST API.

Example:

POST /api/bookings

GET /api/bookings/:id

GET /api/services

GET /api/services/:slug

GET /api/gallery

POST /api/enquiries

GET /api/faqs

GET /api/reviews

Admin:

POST /api/admin/login

GET /api/admin/dashboard

GET /api/admin/bookings

PATCH /api/admin/bookings/:id

POST /api/admin/services

PATCH /api/admin/services/:id

DELETE /api/admin/services/:id

POST /api/admin/gallery

DELETE /api/admin/gallery/:id

etc.

============================================================
45. SECURITY
============================================================

Implement:

Password hashing
JWT/session authentication
Protected admin routes
Input validation
Rate limiting
CORS configuration
Environment variables
Secure cookies where applicable
Server-side validation

Never put:

MongoDB URI
JWT secret
Admin password
API keys

inside frontend code.

============================================================
46. FRONTEND STACK
============================================================

Recommended:

React
Vite
React Router
Tailwind CSS

Use reusable components.

Structure:

src/
  components/
  pages/
  layouts/
  data/
  hooks/
  services/
  context/
  assets/
  utils/

============================================================
47. BACKEND STACK
============================================================

Recommended:

Node.js
Express.js
MongoDB
Mongoose

Structure:

backend/
  controllers/
  models/
  routes/
  middleware/
  services/
  utils/
  config/

============================================================
48. REUSABLE COMPONENTS
============================================================

Create reusable:

Header
MobileHeader
DesktopHeader
BottomNav
SideDrawer
Hero
ServiceCard
ServiceGrid
GalleryGrid
GalleryModal
BookingStepper
BookingForm
LocationPicker
MapPreview
ReviewCard
FAQAccordion
ContactCard
CTASection
Footer
LoadingState
EmptyState
ErrorState
Toast
Modal
Button
Input
Select
DatePicker

Admin:

AdminSidebar
AdminHeader
DashboardCard
BookingTable
BookingDetails
ServiceManager
GalleryManager
ReviewManager
FAQManager
SettingsManager

============================================================
49. MOBILE UX
============================================================

Mobile must feel like a premium native app.

Use:

Horizontal swipe cards
Bottom navigation
Sticky CTAs
Large touch targets
Bottom sheets
Mobile-friendly date picker
Full-screen gallery
Clean forms
Minimal header

Do NOT put too much information above the fold.

Primary actions should always be obvious.

============================================================
50. DESKTOP / LAPTOP UX
============================================================

Desktop must NOT simply stretch mobile.

For laptop/desktop:

Hero:
two-column or cinematic wide layout

Services:
3-column grid

Gallery:
3–4 column grid

About:
split layout

Booking:
two-column form + summary

Contact:
two-column layout

Admin:
full dashboard sidebar

Maximum content width:

1200–1400px.

Keep generous whitespace.

============================================================
51. DESKTOP RESPONSIVE BREAKPOINTS
============================================================

Use sensible breakpoints around:

640px
768px
1024px
1280px
1536px

But do not design only around breakpoints.

Use fluid sizing where appropriate.

============================================================
52. ERROR / EMPTY / LOADING STATES
============================================================

Every dynamic page needs:

Loading state
Empty state
Error state
Retry button

Examples:

No bookings
No gallery images
No reviews
Service unavailable
Booking submission failed

============================================================
53. FORM VALIDATION
============================================================

All forms need:

Required field validation
Phone validation
Date validation
Past-date prevention
Server-side validation
Clear error messages
Success state

Never silently fail.

============================================================
54. BOOKING LOGIC
============================================================

When user submits booking:

1. Validate frontend
2. Validate backend
3. Create booking
4. Generate booking ID
5. Save to database
6. Show confirmation
7. Notify admin
8. Show booking status

Initial status:

Pending

Admin can change status.

============================================================
55. NOTIFICATIONS
============================================================

Admin notification when:

New booking
New enquiry
New contact message

Customer notification architecture should support:

Booking received
Booking confirmed
Booking rescheduled
Booking cancelled
Site visit scheduled

Use WhatsApp/SMS/email integration only when credentials/service are configured.

Do not pretend notifications were sent if integration is not configured.

============================================================
56. FOOTER
============================================================

Footer:

Logo

Short business description

Quick links

Services

Contact

Address

Phone

WhatsApp

Privacy Policy

Terms

Cancellation Policy

FAQ

Copyright

============================================================
57. FINAL PAGE LIST
============================================================

PUBLIC:

/
 /services
 /services/:slug
 /book
 /booking/:id
 /gallery
 /about
 /contact
 /location
 /reviews
 /faq
 /privacy-policy
 /terms-and-conditions
 /cancellation-refund
 /404

CUSTOMER:

/login
/register
/profile
/my-bookings

ADMIN:

/admin/login
/admin
/admin/bookings
/admin/bookings/:id
/admin/customers
/admin/enquiries
/admin/services
/admin/services/new
/admin/services/:id/edit
/admin/gallery
/admin/reviews
/admin/faq
/admin/content
/admin/settings
/admin/notifications

============================================================
58. FINAL UI REQUIREMENT
============================================================

The supplied reference UI is the visual direction.

Maintain:

same overall visual language
same premium feeling
same warm neutral palette
same clean card structure
same mobile-first hierarchy
same professional interior aesthetic

But improve:

spacing
typography
navigation
booking UX
accessibility
responsive behavior
image consistency
loading states
error handling
admin management
conversion flow

============================================================
59. DO NOT DO
============================================================

DO NOT:

create a generic template.

DO NOT:

invent business information.

DO NOT:

invent reviews.

DO NOT:

invent prices.

DO NOT:

randomize images.

DO NOT:

change the same service image across pages.

DO NOT:

make desktop the primary design.

DO NOT:

make mobile look cramped.

DO NOT:

use fake map data as real location data.

DO NOT:

expose API keys.

DO NOT:

store secrets in frontend.

DO NOT:

make booking UI complicated.

DO NOT:

add unnecessary animations.

============================================================
60. FINAL QUALITY CHECK
============================================================

Before completing the project verify:

[ ] Mobile UI polished
[ ] Laptop UI polished
[ ] Desktop responsive
[ ] No horizontal overflow
[ ] All routes work
[ ] All buttons work
[ ] Booking works
[ ] Booking validation works
[ ] Booking ID generated
[ ] Location flow works
[ ] Manual address works
[ ] Gallery works
[ ] Same images remain consistent
[ ] Services work
[ ] Admin login works
[ ] Admin dashboard works
[ ] Admin booking management works
[ ] Admin service CRUD works
[ ] Admin gallery CRUD works
[ ] Admin FAQ CRUD works
[ ] Admin review moderation works
[ ] Enquiries work
[ ] Contact form works
[ ] Error states exist
[ ] Loading states exist
[ ] SEO metadata exists
[ ] sitemap exists
[ ] robots.txt exists
[ ] accessibility checked
[ ] performance optimized
[ ] environment variables configured
[ ] database connection secured
[ ] production build succeeds

============================================================
FINAL INSTRUCTION
============================================================

Build this as a REAL production-ready business system,
not a demo.

The website must feel like a premium professional interior
brand on mobile first, while providing a polished laptop and
desktop experience.

The most important conversion action is:

BOOK FREE VISIT / REQUEST CONSULTATION.

Make that action easy to find without making the website
look like an aggressive sales page.

Keep the design clean, premium, trustworthy and modern.
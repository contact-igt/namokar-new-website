# Client review: Namokar Eye & Oculoplasty Centre website

Prepared 18 Oct 2026 for **Dr. Poonam Jain and the Namokar team**.

**Nothing in this package is approved, and nothing has been published.** The website exists only on the developer's computer. It has not been deployed, it is hidden from search engines, and every photograph and video that has not yet been approved is switched off for the public. This package asks you to review, correct and approve (or reject) what is shown so the site can be finished safely.

## What is in this package

| File | What it is | Who reviews it |
|---|---|---|
| **CLIENT_REVIEW.md** (this file) | Overview, screenshots, and the decisions we need | Everyone |
| [CONTENT_APPROVAL_MATRIX.md](CONTENT_APPROVAL_MATRIX.md) | The exact wording on the site: facts, doctor's qualifications, services, medical explanations, contact details; what is confirmed, unverified, or waiting for a medical reviewer; conflicts between sources; separate medical and legal approvals; contact and booking decisions | Dr. Poonam Jain, a medical reviewer, the legal adviser |
| [MEDIA_APPROVAL_CATALOGUE.md](MEDIA_APPROVAL_CATALOGUE.md) | Every photograph, video and AI image, with a thumbnail, source, where it is used, who is visible, and what approval or consent it needs. Grouped so one decision covers similar items | Dr. Poonam Jain, the clinic, staff who appear in photographs |
| [LAUNCH_READINESS_CHECKLIST.md](LAUNCH_READINESS_CHECKLIST.md) | Everything still to be done before a launch, including testing that has not yet been done | The clinic and the developer |
| `screenshots/` | Pictures of every requested page on a phone (390 px) and a desktop (1440 px) | Everyone |

## How to review the website

1. **Screenshots (recommended).** The tables below link to every page. Each page has a "fold" picture (what a visitor sees first) and a "full page" picture.
2. **Live on the developer's computer.** The developer can run the review version (`npm run dev:preview`, then open http://localhost:3100) and share the screen. This version shows the unapproved photographs and videos, each with an orange label "**Preview only: not approved**". The label is deliberately left on every screenshot. It works only on that computer, and is never available on the internet.
3. **What the public would see today.** If the site were published as it stands, none of the unapproved photographs or videos would appear: pages would show text and panels instead. That is the safe default.

> **Privacy note:** the screenshots and thumbnails in this package show unapproved photographs, including a member of staff. Please share this package only with the people who need to approve it, and do not post it publicly.

## Screenshots

Every page below was captured from the local review version, with the "Preview only: not approved" labels left in.

| Page | Route | Phone (390 px) | Desktop (1440 px) |
|---|---|---|---|
| Homepage | `/` | [fold](screenshots/pages/home/390-fold.png) · [full page](screenshots/pages/home/390-full.png) | [fold](screenshots/pages/home/1440-fold.png) · [full page](screenshots/pages/home/1440-full.png) |
| About Us | `/about-us` | [fold](screenshots/pages/about-us/390-fold.png) · [full page](screenshots/pages/about-us/390-full.png) | [fold](screenshots/pages/about-us/1440-fold.png) · [full page](screenshots/pages/about-us/1440-full.png) |
| Dr. Poonam Jain | `/dr-poonam-jain` | [fold](screenshots/pages/dr-poonam-jain/390-fold.png) · [full page](screenshots/pages/dr-poonam-jain/390-full.png) | [fold](screenshots/pages/dr-poonam-jain/1440-fold.png) · [full page](screenshots/pages/dr-poonam-jain/1440-full.png) |
| Services overview | `/our-services` | [fold](screenshots/pages/our-services/390-fold.png) · [full page](screenshots/pages/our-services/390-full.png) | [fold](screenshots/pages/our-services/1440-fold.png) · [full page](screenshots/pages/our-services/1440-full.png) |
| Cataract Surgery | `/stitchless-cataract-surgery` | [fold](screenshots/pages/stitchless-cataract-surgery/390-fold.png) · [full page](screenshots/pages/stitchless-cataract-surgery/390-full.png) | [fold](screenshots/pages/stitchless-cataract-surgery/1440-fold.png) · [full page](screenshots/pages/stitchless-cataract-surgery/1440-full.png) |
| Glaucoma Management | `/glaucoma-management` | [fold](screenshots/pages/glaucoma-management/390-fold.png) · [full page](screenshots/pages/glaucoma-management/390-full.png) | [fold](screenshots/pages/glaucoma-management/1440-fold.png) · [full page](screenshots/pages/glaucoma-management/1440-full.png) |
| Comprehensive Eye Examinations | `/comprehensive-eye-examinations` | [fold](screenshots/pages/comprehensive-eye-examinations/390-fold.png) · [full page](screenshots/pages/comprehensive-eye-examinations/390-full.png) | [fold](screenshots/pages/comprehensive-eye-examinations/1440-fold.png) · [full page](screenshots/pages/comprehensive-eye-examinations/1440-full.png) |
| Eyelid Surgery (Blepharoplasty) | `/eyelid-surgery-blepharoplasty` | [fold](screenshots/pages/eyelid-surgery-blepharoplasty/390-fold.png) · [full page](screenshots/pages/eyelid-surgery-blepharoplasty/390-full.png) | [fold](screenshots/pages/eyelid-surgery-blepharoplasty/1440-fold.png) · [full page](screenshots/pages/eyelid-surgery-blepharoplasty/1440-full.png) |
| Aesthetic Oculoplasty | `/aesthetic-oculofacial` | [fold](screenshots/pages/aesthetic-oculofacial/390-fold.png) · [full page](screenshots/pages/aesthetic-oculofacial/390-full.png) | [fold](screenshots/pages/aesthetic-oculofacial/1440-fold.png) · [full page](screenshots/pages/aesthetic-oculofacial/1440-full.png) |
| Reconstructive Oculoplasty | `/eye-plastic-reconstructive-surgery` | [fold](screenshots/pages/eye-plastic-reconstructive-surgery/390-fold.png) · [full page](screenshots/pages/eye-plastic-reconstructive-surgery/390-full.png) | [fold](screenshots/pages/eye-plastic-reconstructive-surgery/1440-fold.png) · [full page](screenshots/pages/eye-plastic-reconstructive-surgery/1440-full.png) |
| International Patients | `/international-patients` | [fold](screenshots/pages/international-patients/390-fold.png) · [full page](screenshots/pages/international-patients/390-full.png) | [fold](screenshots/pages/international-patients/1440-fold.png) · [full page](screenshots/pages/international-patients/1440-full.png) |
| Contact Us | `/contact-us` | [fold](screenshots/pages/contact-us/390-fold.png) · [full page](screenshots/pages/contact-us/390-full.png) | [fold](screenshots/pages/contact-us/1440-fold.png) · [full page](screenshots/pages/contact-us/1440-full.png) |
| Video library (hidden on the real site until 3+ videos are approved) | `/videos` | [fold](screenshots/pages/videos/390-fold.png) · [full page](screenshots/pages/videos/390-full.png) | [fold](screenshots/pages/videos/1440-fold.png) · [full page](screenshots/pages/videos/1440-full.png) |

**Video sections.** Close-ups of each page's video area, taken from the same review version.

| Page | Phone (390 px) | Desktop (1440 px) |
|---|---|---|
| Homepage | [390](screenshots/video-sections/home-390-01.png) | [1440](screenshots/video-sections/home-1440-01.png) |
| About Us | [390](screenshots/video-sections/about-us-390-01.png) | [1440](screenshots/video-sections/about-us-1440-01.png) |
| Dr. Poonam Jain | [390](screenshots/video-sections/dr-poonam-jain-390-01.png) | [1440](screenshots/video-sections/dr-poonam-jain-1440-01.png) |
| Cataract Surgery | [390](screenshots/video-sections/stitchless-cataract-surgery-390-01.png) | [1440](screenshots/video-sections/stitchless-cataract-surgery-1440-01.png) |
| Glaucoma Management | [390](screenshots/video-sections/glaucoma-management-390-01.png) | [1440](screenshots/video-sections/glaucoma-management-1440-01.png) |
| Comprehensive Eye Examinations | [390](screenshots/video-sections/comprehensive-eye-examinations-390-01.png) | [1440](screenshots/video-sections/comprehensive-eye-examinations-1440-01.png) |
| Eyelid Surgery (Blepharoplasty) | [390](screenshots/video-sections/eyelid-surgery-blepharoplasty-390-01.png) | [1440](screenshots/video-sections/eyelid-surgery-blepharoplasty-1440-01.png) |
| Reconstructive Oculoplasty | [390](screenshots/video-sections/eye-plastic-reconstructive-surgery-390-01.png) | [1440](screenshots/video-sections/eye-plastic-reconstructive-surgery-1440-01.png) |

Extra video states: [a local video playing on a phone](screenshots/video-sections/375-cataract-video-playing.png) · [the video before pressing play](screenshots/video-sections/375-cataract-video-poster.png) · [a YouTube video before and after pressing play](screenshots/video-sections/1440-glaucoma-youtube-poster.png) ([after](screenshots/video-sections/1440-glaucoma-youtube-loaded.png)) · [what a visitor sees if a video fails to load](screenshots/video-sections/375-error-state.png).

The Privacy Policy, Terms and Conditions, Patient Reviews and Health Articles pages exist but are draft or empty (they say so on the page). They are included in the wording in CONTENT_APPROVAL_MATRIX.md rather than as screenshots.

## Decisions we need from you

### A. Facts only you can confirm (the site cannot go live until these are answered)

1. **Which telephone number should patients call?** +91 98104 19720 (older website and signboard) or 7827455040 (also on the signboard and in two YouTube videos)? Is there a common IVR or second number?
2. **Fellowship title:** "Oculoplasty" or "Aesthetic Oculoplasty" at the Barraquer Institute, Barcelona? Please give the exact wording from your certificate.
3. **Observership:** "Wilmer Eye Institute" or "Johns Hopkins Hospital" (the older website), and do you want it shown?
4. **MBBS and MS institutions:** shown on the Home page only today. Show everywhere, or nowhere?
5. **Years of experience:** the older website gives 25+, 28+, 38 and 26. None is shown. Give the right figure if you want one shown.
6. **Opening hours** (and whether to show them), **Google Business Profile link**, **WhatsApp**, **email**, **social media**: all deliberately not shown today.
7. **Other doctors** on the older website: do they work at the centre? None is shown.
8. **Accreditation (NABH):** none is claimed and the old logo's NABH mark was cropped. Provide the certificate if it should appear.
9. **Production website address:** is namokareyecare.com correct?
10. **Services:** confirm which of the six are offered; say whether squint, LASIK/ICL, paediatric care, myopia control, cornea, retina, injectables are also offered and should get pages.

### B. Phone only, or an online appointment form?

The site books by phone only today. If you want a form, we need: where submissions go, who can read them, how long they are kept, an approved privacy notice and consent wording. **We will not switch the form on until all of that exists.** (Details: CONTENT_APPROVAL_MATRIX.md §5, D7–D11.)

### C. Medical approval

A **named, qualified medical reviewer** must read the six treatment pages, the FAQ answers and the doctor's biography, and approve or mark changes (CONTENT_APPROVAL_MATRIX.md §3). No clinician has reviewed them yet; every page is hidden from search engines for that reason. Please also say **what patients should do in an emergency** (the pages say only "needs urgent medical attention").

### D. Photography and video

- **20** photographs and AI images, **4** local videos, **14** YouTube videos, all pending (MEDIA_APPROVAL_CATALOGUE.md).
- **Consent needed:** the receptionist (reception photograph); Dr. Poonam Jain for her portraits and consultation-room pictures; anyone visible in the YouTube thumbnails (one shows patients being examined).
- **Questions:** may the street sign line "A unit of Kalos Health Care Pvt. Ltd." appear? Are both operation theatres current? Do you own the YouTube channel? Are you happy with two AI-generated concept images (one labelled "Conceptual image"), or should they be replaced?
- **Held back, not on the site:** two clips of live eye surgery and all photographs showing staff groups or patients.

### E. Legal

The Privacy Policy and Terms pages are drafts that contain **no legal wording**. Your **legal adviser** must supply the approved text before any form is switched on and before those pages are linked. We have not written legal text to stand in for it.

### F. Testimonials

There are none. The older website's reviews and the "4.9 from 299" rating cannot be used. To add reviews: written patient consent, how they wish to be named, a date and a source for each.

### G. Authorisation to publish

Nothing will be published, deployed or opened to search engines until you say so in writing. The steps are in LAUNCH_READINESS_CHECKLIST.md §9 and §15.

## What has been checked, and what has not

**Checked:** every page loads; no broken links; no horizontal scrolling on phones; text contrast meets accessibility guidance; the menu and video controls work with a keyboard; unapproved media cannot be reached by guessing a web address; the online form cannot be turned on by accident; fast page loading in a simulated mobile connection.

**Not yet done (and so not claimed):** a Lighthouse audit; testing on real phones and tablets; testing with a screen reader; captions for the one local video that has speech; any medical or legal review; sending a real form submission; making a real call from the buttons.

## Status

| | |
|---|---|
| Anything approved by the client | **No** (only the logo, which the project owner described as approved) |
| Published or deployed | **No** |
| Visible to search engines | **No** (robots.txt blocks everything; every page is noindex) |
| Committed to a code repository from this task | **No** |
| Image-generation credits spent in this task | **None** |

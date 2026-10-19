# YouTube discovery (17 Oct 2026)

## Channel
- The handle in the social-media audit, `@dr.poonamjain-namokareyeoc5696`, **does not exist** (HTTP 404 in a real browser). The audit had itself marked it UNVERIFIED.
- Found by YouTube search: **Dr. Poonam Jain - Namokar Eye & Oculoplasty Centre**, `https://www.youtube.com/@dr.poonamjain-NamokarEyeCentre`, channel ID `UCVg1GXUqcasF6jAJk93IAEQ`, 81 subscribers when seen. Description: "Namokar Eye & Oculoplasty Centre is a specialized eye care and oculoplasty centre in New Delhi focused on eyelid, orbit, lacrimal, cosmetic eye procedures…".
- **Ownership is inferred** from the name, description, content and the doctor appearing in the thumbnails. The client must confirm they own it.
- Two other results (a "Namokar Eye Care Centre" upload, "FNI News", "Doctors Appointment") are other publishers and were not used.

## Verification method
Video list read from the channel page in a real browser. Each ID was then checked with YouTube's oEmbed service (public videos only): all 16 returned HTTP 200 with the author above. The embed itself was tested: one video was loaded in the privacy-enhanced player in a browser and played (the player showed the correct title and a running timecode). **Titles, IDs and embeddability are verified. The content of the videos has NOT been watched or clinically reviewed by me;** I saw thumbnails only (one frame visible during the playback test).

## Videos (all `approved: false` in `src/content/videos.ts`)
| Video ID | Exact title | Length | Placed on | Review notes |
|---|---|---|---|---|
| 0xW4m-m_M8E | A closer look inside Namokar Eye & Oculoplasty Centre, Delhi. 👁️✨ | 0:54 | About | Thumbnail shows patients being examined: consent |
| mPDSc3AxoAk | Why I Became an Eye Surgeon? \| By Dr Poonam Jain \| Director Namokar Eye & Oculoplasty Centre \| | 2:54 | Doctor | Check credentials spoken |
| kX04UgyjkWo | Dr. Poonam Jain - A Leading Eye Surgeon of Ashok Vihar Talks About Cataract Surgery | 1:41 | /videos only | Lower third shows 7827455040 |
| D5uIbXIihuc | Get your cataract surgery done at the right time and regain your vision | 2:06 | /videos only | "regain your vision" wording |
| Bt8DUnLJdZA | Debunking Cataract Surgery Myths: Safe, Painless, and Effective | 2:22 | /videos only | Absolute claims in the title |
| kmaEBmU1ty4 | Cataract Surgery \| जानिए मोतियाबिंद से कैसे बचे और यह किन कारणों से हो सकता है?By Dr Poonam Jain | 4:06 | /videos only | Hindi; shows 7827455040 |
| SqmpI_G8o5I | ग्लोकोमा से जुड़ी यह चार ग़लतफ़ैमियो की जानकारी महत्त्वपूर्ण है \| | 0:58 | Glaucoma | Hindi title; the video shows English on-screen text including "Glaucoma can cause blindness. Take your medication regularly": clinician to review |
| 82siQa3LgUY | Do your eyes feel tired after long screen time? | 1:06 | Eye examinations | General advice |
| 41E5Dhpyll8 | Wondering if blue blocking glasses really make a difference? | 1:20 | /videos only | Evidence claims |
| ZfZpmkXPa4k | Blepharoplasty is Eyelid lift Surgery to restore your youthful looks | 4:36 | Eyelid | Outcome wording; any procedure imagery |
| NznjjjSRJ1s | Entropion Surgery | 1:23 | Reconstructive | Procedure imagery, consent |
| ztQ5mbvSNVs | Most Common Eye Problems in Children \| By Dr Poonam Jain \| | 4:37 | /videos only | Paediatric care is outside the six agreed services |
| VbAoKQIq87o | बच्चों के लिए चश्मा: मायोपिया को कैसे रोकें? | 3:07 | /videos only | Hindi; outside agreed services |
| mrx8xKLUCQE | Is your child suffering from a Lazy Eye Are You are unaware? Amblyopia treatment What is Amblyopia? | 2:53 | /videos only | Outside agreed services |

Not placed: aesthetic oculofacial (no suitable video found, a "Dark circles" short exists but was not verified), international patients, contact. No third-party (non-Namokar) educational videos were added: none was needed and none was verified.
The two thumbnails showing 7827455040 are **further evidence that the clinic's own materials use that number**: still unresolved against +91 98104 19720.

## Embedding behaviour
Click-to-load. Before play there is a local, branded poster and **no request to YouTube** (tested: 0 requests). After play the player loads from `youtube-nocookie.com`, with a "Watch on YouTube" link always shown. Nothing is downloaded or rehosted, and no YouTube thumbnail is copied.

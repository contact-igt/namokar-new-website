# Video verification matrix (19 Oct 2026)

**Result: all 16 supplied entries are verified as existing, public, embeddable videos on the clinic's YouTube channel (13 from the supplied links, 3 whose links were missing and were resolved from the channel itself). None is approved for the website. No video's content has been watched or reviewed by a clinician.**

## What "verified" means here

Each video's own YouTube watch page was loaded in the built-in browser on 19 Oct 2026 and its player data read: playable (`OK`), embeddable, public (not unlisted), publisher and channel, length, upload date and picture size. The page's channel ID is `UCVg1GXUqcasF6jAJk93IAEQ` for every video, and the publisher name is "Dr. Poonam Jain - Namokar Eye & Oculoplasty Centre". The data is stored in `src/content/videoFacts.ts` and copied into each registry entry's `evidence`.

- **Format:** "short" only if the video is listed on the channel's Shorts tab (57 Shorts read on 19 Oct); the picture size decides the 9:16 or 16:9 presentation. Length alone never makes a Short.
- **Channel handle:** the handle in the brief, `@dr.poonamjain-namokareyeoc5696`, still returns HTTP 404. The channel that exists and publishes these videos is `@dr.poonamjain-NamokarEyeCentre`. That the clinic owns it is inferred from its name, description and content and needs the client's confirmation.
- **Playback:** two videos were actually played in the page's player in a real browser (an IOL Short, and the cataract video, which showed a running timecode 0:03 / 1:41). The others were not played. YouTube's own timer can differ from `lengthSeconds` by a second.
- **Still unchecked for all:** what the videos say and show (claims, patients, procedure imagery, telephone numbers on screen), captions or transcripts, and consent.

## The 16 supplied entries

| # | Supplied title (and length) | Supplied link | Resolved video ID | Verified title on YouTube | Actual length | Format and shape | Uploaded | Status |
|---|---|---|---|---|---|---|---|---|
| 1 | Hospital walkthrough, "A closer look inside Namokar Eye & Oculoplasty Centre, Delhi" (0:54) | **missing** | `0xW4m-m_M8E` (found on the channel by exact title) | A closer look inside Namokar Eye & Oculoplasty Centre, Delhi. 👁️✨ | 0:53 | standard, 16:9 | 2026-09-07 | verified; pending consent (patients shown) and review |
| 2 | Glaucoma misconceptions (Hindi) (0:58) | `SqmpI_G8o5I` | `SqmpI_G8o5I` | ग्लोकोमा से जुड़ी यह चार ग़लतफ़ैमियो की जानकारी महत्त्वपूर्ण है \| | 0:58 | **standard 16:9, not a Short** (not on the Shorts tab; landscape) | 2024-04-19 | verified; pending Hindi clinical review |
| 3 | Debunking Cataract Surgery Myths: Safe, Painless, and Effective (2:22) | `Bt8DUnLJdZA` | `Bt8DUnLJdZA` | same | 2:22 | standard, 16:9 | 2024-07-09 | verified; **not placed** (title makes absolute claims) |
| 4 | Get your cataract surgery done at the right time and regain your vision (2:06) | `D5uIbXIihuc` | `D5uIbXIihuc` | same | 2:05 | standard, 16:9 | 2024-02-22 | verified; pending medical review ("regain your vision") |
| 5 | Dr. Poonam Jain - A Leading Eye Surgeon of Ashok Vihar Talks About Cataract Surgery (1:41) | `kX04UgyjkWo` | `kX04UgyjkWo` | same | 1:40 | standard, 16:9 | 2023-04-13 | verified; played; pending review (an unconfirmed phone number shows in a lower third) |
| 6 | Hindi cataract explainer (4:06) | `kmaEBmU1ty4` | `kmaEBmU1ty4` | Cataract Surgery \| जानिए मोतियाबिंद से कैसे बचे और यह किन कारणों से हो सकता है?By Dr Poonam Jain | 4:05 | standard, 16:9 | 2022-04-21 | verified; **not placed** (Hindi review; "how to avoid cataracts" wording; phone number on screen) |
| 7 | Lazy Eye / Amblyopia (2:53) | **missing** | `mrx8xKLUCQE` (found on the channel by exact title) | Is your child suffering from a Lazy Eye Are You are unaware? Amblyopia treatment What is Amblyopia? | 2:53 | standard, 16:9 | 2024-04-29 | verified; **not placed** (paediatric, outside the six services) |
| 8 | Children's glasses and myopia (Hindi) (3:07) | `VbAoKQIq87o` | `VbAoKQIq87o` | बच्चों के लिए चश्मा: मायोपिया को कैसे रोकें? | 3:07 | standard, 16:9 | 2024-04-17 | verified; **not placed** (paediatric, Hindi) |
| 9 | Why some children become nearsighted and others do not (1:35) | `sR6B4Kjr5JE` | `sR6B4Kjr5JE` | "The exact reason why some children become nearsighted and others do not is not fully understood." | 1:35 | standard (not on the Shorts tab), **vertical 9:16** | 2023-01-27 | verified; **not placed** (paediatric/myopia scope); registered newly |
| 10 | Most Common Eye Problems in Children (4:37) | **missing** | `ztQ5mbvSNVs` (found on the channel by exact title) | Most Common Eye Problems in Children \| By Dr Poonam Jain \| | 4:37 | standard, 16:9 | 2022-06-11 | verified; **not placed** (paediatric) |
| 11 | Blepharoplasty is Eyelid lift Surgery to restore your youthful looks (4:36) | `ZfZpmkXPa4k` | `ZfZpmkXPa4k` | same | 4:36 | standard, 16:9 | 2024-02-20 | verified; pending review (outcome wording; may show a procedure) |
| 12 | Entropion Surgery (1:23) | `NznjjjSRJ1s` | `NznjjjSRJ1s` | same | 1:22 | standard, 16:9 | 2024-01-01 | verified; pending consent and review (may show a procedure; note shown before Play) |
| 13 | Do your eyes feel tired after long screen time? (1:06) | `82siQa3LgUY` | `82siQa3LgUY` | same | 1:06 | standard, 16:9 | 2026-01-23 | verified; pending review |
| 14 | Wondering if blue blocking glasses really make a difference? (1:20) | `41E5Dhpyll8` | `41E5Dhpyll8` | same | 1:20 | standard, 16:9 | 2024-03-17 | verified; **not placed** (evidence claims) |
| 15 | Contact lens care (Hindi) (2:37) | `B6JggoiqX9I` | `B6JggoiqX9I` | क्या आप कॉन्टेक्ट लेंस पहनते हैं तो ध्यान रखें | 2:37 | standard, 16:9 | 2024-03-17 | verified; **not placed** (scope and Hindi review); registered newly |
| 16 | Why I Became an Eye Surgeon? (2:54) | `mPDSc3AxoAk` | `mPDSc3AxoAk` | Why I Became an Eye Surgeon? \| By Dr Poonam Jain \| Director Namokar Eye & Oculoplasty Centre \| | 2:54 | standard, 16:9 | 2022-06-11 | verified; pending review (credentials spoken, title card) |

Counts: **16 supplied entries; 13 had links; 3 links were missing and resolved with evidence; 16 verified; 0 blocked; 0 approved; 0 with completed medical review.** Supplied lengths matched the real ones to within a second.

## Further videos verified on the same channel (from the earlier Shorts selection, 11)

All on the Shorts tab, vertical 9:16, public, embeddable, same channel: `C9AzcSy416o` (0:16), `u3psA5Fu79U` (1:17), `_hkRLpO3JVE` (1:29), `0YHUAEUcM2g` (0:57), `wtk1RA5bJvk` (0:37), `_eoMAt_0dYw` (0:42), `hUw7A6a0rgo` (1:13), `_urlz_Hk7bM` (1:00), `Kc4AGn2i-Uk` (0:09), `PwZ7FS7ad_U` (0:15), `JcXB5aIS0vM` (0:32). In total **27 videos** are in the registry and verified in this sense; the site shows 13 of them in the preview.

## Titles on the site

The site shows neutral titles, not the marketing wording: "Cataract surgery: when to consider it" (not "...regain your vision"), "Common myths about cataract surgery" (not "Safe, Painless, and Effective"), "Blepharoplasty: eyelid lift surgery" (not "restore your youthful looks"). The exact YouTube title is kept in `officialTitle` and the viewer can reach the real page through "Watch on YouTube".

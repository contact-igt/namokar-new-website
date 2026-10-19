# Content proofread and medical-claims register

18 Oct 2026. Every page of the site was read for consistency, then the medical statements on the six service pages were extracted so a clinician can approve them one by one. **No statement here is approved.** This extends CONTENT_APPROVAL_MATRIX.md (docs/client-approval) and does not replace it.

## 1. Proofreading changes made in this phase

| # | Problem found | Fix | Where |
|---|---|---|---|
| 1 | The place was written three ways: "Ashok Vihar, North Delhi", "Ashok Vihar, New Delhi" and "Ashok Vihar, Delhi"; one component rewrote "North Delhi" to "New Delhi" at display time | Prose now says **"Ashok Vihar, New Delhi"** everywhere (the client brief's own wording); titles use the short form "Ashok Vihar, Delhi"; the address stays "Delhi 110052". The rewrite hack was removed | `config/site.ts`, Home, `content/why.ts`, `VisitPanel`, three page descriptions |
| 2 | "tear ducts" (Home) vs "tear passages" (everywhere else) | **"tear passages"** | Home doctor section, "Why Namokar" |
| 3 | "the area around the eye" vs "around the eyes" | **"the area around the eyes"** (anatomical singular "orbit around the eye" kept where it describes one eye) | Home, About, Reconstructive lead |
| 4 | Dr. Poonam Jain described as "a Senior Ophthalmologist" on one page and "the Medical Director & Senior Ophthalmologist" elsewhere (implies there are several) | "the Medical Director and Senior Ophthalmologist" | Doctor page |
| 5 | "Inside Our Hospital" (About) while the whole site says "centre" (avoids implying registration as a hospital) | "Inside Our Centre" | About |
| 6 | "Call the Hospital" on the secondary button (shown only when online booking is on) | "Call the Centre" | `BookButton` |
| 7 | "Aesthetic oculofacial care" and "Aesthetic oculofacial" in a meta description vs the service name "Aesthetic Oculoplasty" | "Aesthetic oculoplasty" (the web address keeps the old slug for redirects) | Aesthetic page |
| 8 | Reconstructive page title "Eye Plastic and Reconstructive Surgery" (73 characters) vs the service name "Reconstructive Oculoplasty" | Title "Reconstructive Oculoplasty" | Reconstructive page |
| 9 | Eight meta descriptions longer than about 165 characters (truncated in results) | Rewritten to 140 to 160 characters | About, Doctor, Services, International, Eyelid, Glaucoma, Exams, Aesthetic |
| 10 | Doctor page title was 93 characters | "Dr. Poonam Jain | Senior Ophthalmologist in Ashok Vihar, Delhi" (62) | Doctor page |
| 11 | Five pages lacked `og:url`; every inner page lacked `og:image`; no Twitter card | Every page now declares one canonical, Open Graph (including the logo card) and a Twitter summary card through one builder (`lib/seo.ts`) | All pages |
| 12 | The first banner slide linked to a Home section ("#centre") that does not exist when no photograph is approved | Banner link points to the About page | Home banner |
| 13 | Phone link in the closing call-to-action was 28 px tall (under the 44 px tap rule) | 44 px target | `CtaBand` |

Checked and left as is: spelling is British/Indian (centre, paediatric, specialised, colour); no em or en dashes; no double spaces; no "check up" variants ("check-up" throughout); capitalisation of "Oculoplasty" only in names and headings.

## 2. Style rules for future copy

- "Centre", never "hospital" or "clinic" for the place. "the doctor" for the clinician; "Dr. Poonam Jain" on first mention.
- Place: **Ashok Vihar, New Delhi** in sentences; **Ashok Vihar, Delhi** in titles; the postal address exactly as in `site.ts`.
- Anatomy words: eyelids, tear passages, "the area around the eyes", orbit (the bony socket).
- Service names exactly as in `SERVICES`: Cataract Surgery, Glaucoma Management, Comprehensive Eye Examinations, Eyelid Surgery (Blepharoplasty), Aesthetic Oculoplasty, Reconstructive Oculoplasty.
- Headline pattern: statement headings in Title Case ending in a full stop ("Care That Begins With Understanding."); section headings in sentence case without one.
- Never: painless, guaranteed, 100%, best, safe (as a promise), cure, "restore your youthful looks", outcomes, years, accreditation, ratings, prices.
- Say what a clinician decides ("the doctor explains…", "depends on the examination").
- Numbers: phone always from `SITE.phone`, never typed.

## 3. Open copy questions for the client

1. "Specialist" (Home headline, "Specialist Eye Care…") and "Specialist Care for Your Eyelids": comfortable with "specialist" for the centre and for oculoplasty?
2. "Doctor-led" and "personal, doctor-led consultations": true in practice?
3. "Stitchless" (cataract page): the clinic's own service name; the page explains it cautiously ("may not need stitches"). Confirm the surgeon wants that wording.
4. International page: what help is actually offered (the page promises none).
5. Which of squint, LASIK/ICL, paediatric care, myopia control, cornea, retina and injectables are offered, if any (they have no page and are not claimed).

## 4. Medical-claims register (for the clinical reviewer)

Every statement of medical fact or advice on the six service pages. For each: tick **A** (approve as written), **C** (approve with the change you mark), or **R** (reject). Sign once per page in CONTENT_APPROVAL_MATRIX.md section 3. The reviewer's name, registration number and date must be recorded before a page's `reviewed` flag is changed.

Evidence note for the reviewer: statements are general and in lay language; none gives a number, a duration, a success rate or a drug name. Please check in particular: definitions (cataract, IOL, ptosis, entropion, ectropion, epiphora), risk wording, who is at risk of glaucoma, what an examination may include, the dilating-drops note, the urgent-symptom note (and add whom to call), and any sentence that might read as a promise.

| ID | Page | Where | Exact statement | Reviewer |
|---|---|---|---|---|
| M001 | Cataract Surgery | Introduction 1 | A cataract is a clouding of the eye's natural lens. It usually develops slowly, and it is one of the common reasons that vision becomes blurred or dim as people get older. | ☐ |
| M002 | Cataract Surgery | Introduction 2 | Cataract surgery removes the clouded lens and, in most cases, replaces it with a clear artificial lens, called an intraocular lens (IOL). Not everyone with a cataract needs surgery straight away. The decision depends on how much your vision affects your daily life and on what the examination shows. | ☐ |
| M003 | Cataract Surgery | When to have your eyes checked | Vision that looks cloudy, blurred or dim | ☐ |
| M004 | Cataract Surgery | When to have your eyes checked | Glare from bright light or oncoming headlights, especially at night | ☐ |
| M005 | Cataract Surgery | When to have your eyes checked | Colours that look faded or yellowed | ☐ |
| M006 | Cataract Surgery | When to have your eyes checked | Spectacles that need changing again and again | ☐ |
| M007 | Cataract Surgery | When to have your eyes checked | Reading, driving or recognising faces becoming harder | ☐ |
| M008 | Cataract Surgery | Urgent-symptom note | Sudden loss of vision, a new eye injury, or severe eye pain needs urgent medical attention. Do not wait for a routine appointment. | ☐ |
| M009 | Cataract Surgery | Section "About replacement lenses" | Artificial lenses come in different designs. Some are made mainly for distance vision, some also help with near vision, and some are designed to correct astigmatism. | ☐ |
| M010 | Cataract Surgery | Section "About replacement lenses" | Which design, if any, suits you depends on your eyes, your daily activities and your expectations. The doctor explains the choices and what each can and cannot do. No lens can promise that you will never need spectacles. | ☐ |
| M011 | Cataract Surgery | Assessment steps | Examination: Your vision and the health of your eyes are checked, including the lens. | ☐ |
| M012 | Cataract Surgery | Assessment steps | Discussion: The doctor explains whether surgery is likely to help, what the options are and what the risks are. | ☐ |
| M013 | Cataract Surgery | Assessment steps | Planning: If you decide to go ahead, measurements of the eye are used to help choose the replacement lens. | ☐ |
| M014 | Cataract Surgery | Assessment steps | Surgery, if you choose it: The centre explains how the operation is arranged and what to do before and afterwards. | ☐ |
| M015 | Cataract Surgery | Assessment steps | Follow-up: The doctor advises on eye drops and check-ups after the operation. | ☐ |
| M016 | Cataract Surgery | FAQ: Do cataracts need surgery straight away? | Not always. If a cataract is not troubling you, the doctor may suggest checking it from time to time. Surgery is considered when it affects what you need to do in daily life. | ☐ |
| M017 | Cataract Surgery | FAQ: What is an intraocular lens (IOL)? | It is the clear artificial lens placed in the eye to replace the natural lens that has become cloudy. Different designs exist, and the doctor discusses which may suit you. | ☐ |
| M018 | Cataract Surgery | FAQ: What does “stitchless” mean? | Modern cataract surgery is often done through a very small opening that may not need stitches. Whether stitches are needed depends on the eye and on the technique the surgeon chooses, and this is explained to you. | ☐ |
| M019 | Cataract Surgery | FAQ: Is cataract surgery suitable for everyone? | Suitability is decided after an examination. Other eye conditions and general health can affect the plan, and every operation carries some risk, which the doctor goes through with you. | ☐ |
| M020 | Cataract Surgery | FAQ: What should I bring to my first visit? | Previous prescriptions and eye reports, your current spectacles and a list of the medicines you take. | ☐ |
| M021 | Glaucoma Management | Introduction 1 | Glaucoma is a group of eye conditions in which the optic nerve, which carries what the eye sees to the brain, is gradually damaged. Raised pressure inside the eye is a common factor, but it is not the only one. | ☐ |
| M022 | Glaucoma Management | Introduction 2 | Glaucoma is usually a long-term condition that is managed rather than cured. Damage to the optic nerve cannot be reversed, so the aim of care is to find glaucoma early and to protect the vision that remains. Treatment and follow-up are planned for each person. | ☐ |
| M023 | Glaucoma Management | When to have your eyes checked | Anyone with a close relative who has glaucoma | ☐ |
| M024 | Glaucoma Management | When to have your eyes checked | People who are getting older, because the risk rises with age | ☐ |
| M025 | Glaucoma Management | When to have your eyes checked | People who are very short-sighted | ☐ |
| M026 | Glaucoma Management | When to have your eyes checked | People who use steroid medicines over a long period, as advised by their doctor | ☐ |
| M027 | Glaucoma Management | When to have your eyes checked | People who have had an injury to the eye | ☐ |
| M028 | Glaucoma Management | Urgent-symptom note | Sudden eye pain with redness, halos around lights, headache or sickness needs urgent medical attention. | ☐ |
| M029 | Glaucoma Management | Section "Often no early symptoms. That is why an examination matters." | Vision lost to glaucoma does not come back, and early on most people notice nothing. Regular examination is how it is found, and how any change is caught. | ☐ |
| M030 | Glaucoma Management | Section "What monitoring may include" | Which tests are needed, and how often, is for your doctor to decide. | ☐ |
| M031 | Glaucoma Management | Section "What monitoring may include" | The pressure inside the eye is measured, because raised pressure is a common factor in glaucoma. | ☐ |
| M032 | Glaucoma Management | Section "What monitoring may include" | The nerve at the back of the eye is examined for the changes that glaucoma causes. | ☐ |
| M033 | Glaucoma Management | Section "What monitoring may include" | A test of the field of vision shows whether any part of it has been lost, often without the person noticing. | ☐ |
| M034 | Glaucoma Management | Assessment steps | Examination: Your eyes are examined, including the optic nerve at the back of the eye. | ☐ |
| M035 | Glaucoma Management | Assessment steps | Tests chosen by the doctor: Tests may measure the pressure in the eye and the field of vision. Which tests are needed is the doctor's decision. | ☐ |
| M036 | Glaucoma Management | Assessment steps | Findings and plan: The doctor explains what was found, whether treatment is needed and what it aims to do. | ☐ |
| M037 | Glaucoma Management | Assessment steps | Treatment, where needed: Glaucoma can be treated with eye drops, laser or surgery. If any of these is suitable, the doctor explains the choices. | ☐ |
| M038 | Glaucoma Management | Assessment steps | Regular follow-up: Glaucoma needs monitoring over the long term, so check-ups continue as the doctor advises. | ☐ |
| M039 | Glaucoma Management | FAQ: Can glaucoma be cured? | Glaucoma is usually managed long term rather than cured. Treatment aims to slow or stop further damage to the optic nerve. | ☐ |
| M040 | Glaucoma Management | FAQ: Can I have glaucoma with normal eye pressure? | Yes. Some people develop optic nerve damage even when the pressure measures in the normal range, which is one reason a full examination is needed. | ☐ |
| M041 | Glaucoma Management | FAQ: Do I have to keep coming back? | Usually, yes. Glaucoma can change over time without symptoms, so regular follow-up is part of care. The doctor tells you how often. | ☐ |
| M042 | Glaucoma Management | FAQ: Does glaucoma run in families? | Having a close relative with glaucoma raises your own risk, so tell the doctor if someone in your family has it. | ☐ |
| M043 | Comprehensive Eye Examinations | Introduction 1 | A comprehensive eye examination looks at more than your spectacle number. The doctor checks how well you see, how your eyes work together and the health of the structures inside and around the eye. | ☐ |
| M044 | Comprehensive Eye Examinations | Introduction 2 | It can find conditions such as cataract and glaucoma before they cause obvious symptoms, and it is the starting point for any further tests or treatment. The tests used depend on your symptoms and age and are chosen by the doctor. | ☐ |
| M045 | Comprehensive Eye Examinations | When to have your eyes checked | A change in your vision, or spectacles that no longer help as they did | ☐ |
| M046 | Comprehensive Eye Examinations | When to have your eyes checked | Frequent headaches or tired eyes when reading | ☐ |
| M047 | Comprehensive Eye Examinations | When to have your eyes checked | Diabetes, for which regular eye checks are usually advised | ☐ |
| M048 | Comprehensive Eye Examinations | When to have your eyes checked | A family history of eye disease | ☐ |
| M049 | Comprehensive Eye Examinations | When to have your eyes checked | It has been a long time since your last examination | ☐ |
| M050 | Comprehensive Eye Examinations | Urgent-symptom note | Sudden loss of vision, a new eye injury, or severe eye pain needs urgent medical attention. Do not wait for a routine appointment. | ☐ |
| M051 | Comprehensive Eye Examinations | Section "What an examination may include" | The tests used depend on your symptoms and age and are chosen by the doctor. This page does not list the equipment available. | ☐ |
| M052 | Comprehensive Eye Examinations | Section "What an examination may include" | Your vision is checked with and without spectacles. | ☐ |
| M053 | Comprehensive Eye Examinations | Section "What an examination may include" | Your eyes are tested to see whether glasses would help, or whether your prescription has changed. | ☐ |
| M054 | Comprehensive Eye Examinations | Section "What an examination may include" | The pressure inside the eye may be measured, as part of looking for conditions such as glaucoma. | ☐ |
| M055 | Comprehensive Eye Examinations | Section "What an examination may include" | The eyelids, the surface of the eye and the lens are examined. | ☐ |
| M056 | Comprehensive Eye Examinations | Section "What an examination may include" | The retina and the optic nerve are looked at, sometimes after drops that widen the pupil. | ☐ |
| M057 | Comprehensive Eye Examinations | Assessment steps | Before you come: Bring previous prescriptions and eye reports, your current spectacles and a list of your medicines. | ☐ |
| M058 | Comprehensive Eye Examinations | Assessment steps | The examination: Your vision is checked, and the front and back of the eye are examined. Some visits include drops that widen the pupil; they can blur vision for some hours, so ask whether to bring someone with you. | ☐ |
| M059 | Comprehensive Eye Examinations | Assessment steps | The doctor's explanation: The findings are explained in plain language, and your questions are answered. | ☐ |
| M060 | Comprehensive Eye Examinations | Assessment steps | Next steps: If further tests or treatment are advised, the doctor explains why and what to expect. | ☐ |
| M061 | Comprehensive Eye Examinations | Assessment steps | Review: The doctor tells you when to have your eyes checked again. | ☐ |
| M062 | Comprehensive Eye Examinations | FAQ: How often should I have an eye examination? | It depends on your age, your health and any eye conditions. The doctor will advise you. | ☐ |
| M063 | Comprehensive Eye Examinations | FAQ: Will I need drops that widen the pupil? | Sometimes. They help the doctor see the back of the eye. They can blur near vision and make light uncomfortable for some hours, so avoid planning to drive straight afterwards. | ☐ |
| M064 | Comprehensive Eye Examinations | FAQ: Is an examination uncomfortable? | Most parts are comfortable, though some drops can sting briefly. Tell the team if you are uncomfortable at any point. | ☐ |
| M065 | Comprehensive Eye Examinations | FAQ: How do I arrange one? | Please call the centre to ask about arranging an eye consultation. | ☐ |
| M066 | Eyelid Surgery (Blepharoplasty) | Introduction 1 | Blepharoplasty is surgery on the eyelids. It may be considered when excess skin or fat weighs on the eyelids, either because it affects vision and comfort, or because someone is unhappy with how their eyes look. | ☐ |
| M067 | Eyelid Surgery (Blepharoplasty) | Introduction 2 | Surgery is only one possible outcome of a consultation. The doctor first examines the eyelids and eyes, explains what is causing the problem, and discusses whether surgery would help, what it can and cannot change, and what the risks are. | ☐ |
| M068 | Eyelid Surgery (Blepharoplasty) | When to have your eyes checked | Eyelids that feel heavy or droop | ☐ |
| M069 | Eyelid Surgery (Blepharoplasty) | When to have your eyes checked | Upper eyelids that block part of your vision | ☐ |
| M070 | Eyelid Surgery (Blepharoplasty) | When to have your eyes checked | Bags or puffiness under the eyes | ☐ |
| M071 | Eyelid Surgery (Blepharoplasty) | When to have your eyes checked | One eyelid sitting lower than the other | ☐ |
| M072 | Eyelid Surgery (Blepharoplasty) | When to have your eyes checked | Eyelid changes that appeared suddenly | ☐ |
| M073 | Eyelid Surgery (Blepharoplasty) | Urgent-symptom note | A drooping eyelid that appears suddenly, or comes with double vision or headache, needs prompt medical attention. | ☐ |
| M074 | Eyelid Surgery (Blepharoplasty) | Section "Functional or cosmetic?" | Many people have a mixture of reasons. The reason affects how any treatment is planned, so the doctor asks about both. | ☐ |
| M075 | Eyelid Surgery (Blepharoplasty) | Section "Functional or cosmetic?" | Excess skin that rests on the eyelashes or blocks part of the view | ☐ |
| M076 | Eyelid Surgery (Blepharoplasty) | Section "Functional or cosmetic?" | Eyelids that feel heavy or make the eyes tired | ☐ |
| M077 | Eyelid Surgery (Blepharoplasty) | Section "Functional or cosmetic?" | Difficulty keeping the eyes open comfortably | ☐ |
| M078 | Eyelid Surgery (Blepharoplasty) | Section "Functional or cosmetic?" | A tired or heavy look around the eyes | ☐ |
| M079 | Eyelid Surgery (Blepharoplasty) | Section "Functional or cosmetic?" | Bags or puffiness beneath the eyes | ☐ |
| M080 | Eyelid Surgery (Blepharoplasty) | Section "Functional or cosmetic?" | Loose skin on the upper or lower lids | ☐ |
| M081 | Eyelid Surgery (Blepharoplasty) | Assessment steps | Consultation and examination: The eyelids, the eyes and the surrounding skin are examined. | ☐ |
| M082 | Eyelid Surgery (Blepharoplasty) | Assessment steps | What is realistic: The doctor explains what surgery could change, what it could not, and whether other care would suit you better. | ☐ |
| M083 | Eyelid Surgery (Blepharoplasty) | Assessment steps | Risks and alternatives: The possible risks and the alternatives are discussed. | ☐ |
| M084 | Eyelid Surgery (Blepharoplasty) | Assessment steps | Your decision: You decide at your own pace. There is no obligation to go ahead. | ☐ |
| M085 | Eyelid Surgery (Blepharoplasty) | Assessment steps | Planning and aftercare: If you choose surgery, the centre explains how it is arranged, what aftercare involves and what follow-up is advised. | ☐ |
| M086 | Eyelid Surgery (Blepharoplasty) | FAQ: Is eyelid surgery the same as surgery for a drooping eyelid (ptosis)? | They are different. Blepharoplasty removes excess skin or fat. Ptosis surgery adjusts the muscle that lifts the eyelid. An examination shows which, or whether both, are relevant. | ☐ |
| M087 | Eyelid Surgery (Blepharoplasty) | FAQ: Will the result last for ever? | Eyelids continue to age. The doctor explains what to expect over time, and no result can be guaranteed. | ☐ |
| M088 | Eyelid Surgery (Blepharoplasty) | FAQ: What are the risks? | All surgery has risks, which can include swelling, bruising, infection and differences between the two sides. The doctor goes through them with you before you decide. | ☐ |
| M089 | Eyelid Surgery (Blepharoplasty) | FAQ: How long is recovery? | It differs between people and operations. The doctor explains what to expect in your case. | ☐ |
| M090 | Aesthetic Oculoplasty | Introduction 1 | Aesthetic oculoplasty is about the appearance of the eyelids and the skin around the eyes: for example heavy upper eyelids, bags or hollows beneath the eyes, and changes that come with age. | ☐ |
| M091 | Aesthetic Oculoplasty | Introduction 2 | It begins with an assessment. The doctor looks at your eyes and eyelids as well as the surrounding skin, explains what could and could not change, and discusses the options that may suit you, which can include surgery. Which treatments are offered is confirmed at the consultation. | ☐ |
| M092 | Aesthetic Oculoplasty | When to have your eyes checked | Heavy upper eyelids or loose skin around the eyes | ☐ |
| M093 | Aesthetic Oculoplasty | When to have your eyes checked | Bags or puffiness under the eyes | ☐ |
| M094 | Aesthetic Oculoplasty | When to have your eyes checked | Hollows or shadows beneath the eyes | ☐ |
| M095 | Aesthetic Oculoplasty | When to have your eyes checked | A tired look that does not match how you feel | ☐ |
| M096 | Aesthetic Oculoplasty | When to have your eyes checked | An eye symptom, such as watering or irritation, that should be checked first | ☐ |
| M097 | Aesthetic Oculoplasty | Urgent-symptom note | Changes to the eyelids that are sudden, or come with pain or a change in vision, need medical attention before any cosmetic discussion. | ☐ |
| M098 | Aesthetic Oculoplasty | Section "Changes are personal" | Faces are not perfectly symmetrical, and ageing affects each person differently. A good consultation leaves you clear about what can be improved, what cannot, how long a change may last and what the risks are. | ☐ |
| M099 | Aesthetic Oculoplasty | Section "Changes are personal" | Questions worth asking at any consultation | ☐ |
| M100 | Aesthetic Oculoplasty | Section "Changes are personal" | What exactly is being suggested, and why? | ☐ |
| M101 | Aesthetic Oculoplasty | Section "Changes are personal" | What are the risks for me? | ☐ |
| M102 | Aesthetic Oculoplasty | Section "Changes are personal" | What does recovery involve for my work and daily life? | ☐ |
| M103 | Aesthetic Oculoplasty | Section "Changes are personal" | What happens if I am not happy with the result? | ☐ |
| M104 | Aesthetic Oculoplasty | Assessment steps | Assessment: Your eyes, eyelids and the surrounding skin are examined. | ☐ |
| M105 | Aesthetic Oculoplasty | Assessment steps | Your goals: You describe what bothers you and what you hope for. The doctor explains what is realistic. | ☐ |
| M106 | Aesthetic Oculoplasty | Assessment steps | Options and risks: The options, their limits and their risks are explained, including the option of doing nothing. | ☐ |
| M107 | Aesthetic Oculoplasty | Assessment steps | Time to decide: You take the time you need. There is no obligation to go ahead. | ☐ |
| M108 | Aesthetic Oculoplasty | Assessment steps | Aftercare and review: If you choose treatment, the centre explains the aftercare and when you will be reviewed. | ☐ |
| M109 | Aesthetic Oculoplasty | FAQ: Is aesthetic treatment only about appearance? | Not always. Some eyelid concerns affect comfort or vision as well as looks, which is why the eyes are examined first. | ☐ |
| M110 | Aesthetic Oculoplasty | FAQ: Which treatments does the centre offer? | The centre confirms the treatments it offers at the consultation. This website does not list products or injectable treatments. | ☐ |
| M111 | Aesthetic Oculoplasty | FAQ: Will the result look natural? | The doctor discusses what you want to achieve and what is possible. No result can be guaranteed. | ☐ |
| M112 | Aesthetic Oculoplasty | FAQ: What does recovery involve? | That depends on the treatment, and the doctor explains it before you decide, including what it may mean for work and daily life. | ☐ |
| M113 | Reconstructive Oculoplasty | Introduction 1 | Oculoplasty is the specialty that looks after the eyelids, the tear drainage system and the bony socket (orbit) around the eye. Reconstructive oculoplasty focuses on how these structures work and feel, and on restoring a normal position and shape where something has changed. | ☐ |
| M114 | Reconstructive Oculoplasty | Introduction 2 | Conditions that may be assessed include a drooping upper eyelid (ptosis), eyelids that turn in or out, and watering eyes caused by blocked tear passages. The doctor confirms what can be treated at the centre after examining you, and will say if care elsewhere would suit you better. | ☐ |
| M115 | Reconstructive Oculoplasty | When to have your eyes checked | Eyes that water all the time | ☐ |
| M116 | Reconstructive Oculoplasty | When to have your eyes checked | An eyelid that droops or sits lower than the other | ☐ |
| M117 | Reconstructive Oculoplasty | When to have your eyes checked | Eyelashes that rub against the eye, or an eyelid that turns outwards | ☐ |
| M118 | Reconstructive Oculoplasty | When to have your eyes checked | A lump on or near an eyelid that is growing or changing | ☐ |
| M119 | Reconstructive Oculoplasty | When to have your eyes checked | Irritation or discomfort around the eyelids that does not settle | ☐ |
| M120 | Reconstructive Oculoplasty | Urgent-symptom note | After an eye injury, or if you notice double vision or a change in how the eye sits, seek urgent medical help. | ☐ |
| M121 | Reconstructive Oculoplasty | Section "Terms you may hear" | Oculoplasty uses some unfamiliar words. These are the common ones. The doctor explains any others. | ☐ |
| M122 | Reconstructive Oculoplasty | Section "Terms you may hear" | An upper eyelid that sits lower than normal. | ☐ |
| M123 | Reconstructive Oculoplasty | Section "Terms you may hear" | An eyelid that turns inwards, so the lashes rub the eye. | ☐ |
| M124 | Reconstructive Oculoplasty | Section "Terms you may hear" | An eyelid that turns outwards, away from the eye. | ☐ |
| M125 | Reconstructive Oculoplasty | Section "Terms you may hear" | Watering of the eye, often because tears are not draining as they should. | ☐ |
| M126 | Reconstructive Oculoplasty | Section "Terms you may hear" | A narrowing or block in the channel that drains tears from the eye into the nose. | ☐ |
| M127 | Reconstructive Oculoplasty | Section "Terms you may hear" | The bony socket that holds the eye. | ☐ |
| M128 | Reconstructive Oculoplasty | Assessment steps | Examination: The eyelids, the tear passages and the eyes are examined to find the cause of the problem. | ☐ |
| M129 | Reconstructive Oculoplasty | Assessment steps | Explanation: The doctor explains what is happening and what could help. | ☐ |
| M130 | Reconstructive Oculoplasty | Assessment steps | Options and risks: Treatment options, where there are any, are discussed together with their risks and limits. | ☐ |
| M131 | Reconstructive Oculoplasty | Assessment steps | Your decision: You decide at your own pace. | ☐ |
| M132 | Reconstructive Oculoplasty | Assessment steps | Aftercare and review: The centre explains aftercare and when you will be reviewed. | ☐ |
| M133 | Reconstructive Oculoplasty | FAQ: What is ptosis? | Ptosis means the upper eyelid sits lower than normal. It can be present from birth or develop later, and it can sometimes affect vision. An examination is needed to find the cause. | ☐ |
| M134 | Reconstructive Oculoplasty | FAQ: Why do my eyes keep watering? | Watering can come from dryness or irritation, infection, or blocked tear drainage, among other causes. Treatment depends on the cause, so persistent watering should be examined. | ☐ |
| M135 | Reconstructive Oculoplasty | FAQ: Is this surgery cosmetic? | Reconstructive oculoplasty focuses mainly on function and comfort. Appearance often improves as well, but that is not its only purpose. | ☐ |
| M136 | Reconstructive Oculoplasty | FAQ: Which conditions are treated at the centre? | The centre confirms what it treats at the consultation. This page lists general areas of assessment only. | ☐ |

Total: 136 statements. IDs are stable only for this version; regenerate the table from `src/content/services.ts` and the page files if the text changes.

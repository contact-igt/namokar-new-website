import { ASSETS, type AssetKey, ASSET_PREVIEW, usable } from "@/config/assets";
import { LINKS } from "@/config/site";
import { CHANNEL_ID, clock, FACTS, FACTS_CHECKED } from "./videoFacts";

/**
 * Central video manifest. Pages never hard-code a video: they ask for the videos associated
 * with them here. Two kinds of source:
 *
 *  - local   hospital footage kept in /private-assets and served through /media, governed by the
 *            media registry (src/config/assets.ts). Its approval flag lives THERE, not here.
 *  - youtube a video on the clinic's own channel, embedded click-to-load in privacy-enhanced mode.
 *            Nothing from YouTube loads until the visitor presses play. Approval lives here
 *            (`approved`) and defaults to false: a video that is not approved is not rendered
 *            at all in a normal build (its ID is not in the page), only in the local review preview.
 *
 * YouTube entries were checked on 16 and 19 Oct 2026: each video exists on the channel
 * "Dr. Poonam Jain - Namokar Eye & Oculoplasty Centre" (@dr.poonamjain-NamokarEyeCentre,
 * channel ID UCVg1GXUqcasF6jAJk93IAEQ), is public and embeddable, and its length, upload date
 * and picture size come from YouTube's own player data (videoFacts.ts, copied into `evidence`
 * below). TITLES, IDs, LENGTHS AND FORMATS ARE VERIFIED; THE CONTENT OF THE YOUTUBE VIDEOS HAS NOT
 * BEEN WATCHED OR MEDICALLY REVIEWED. Channel ownership by the clinic is inferred from the channel's
 * name and description, and needs the client's confirmation.
 */
export type VideoCategory = "inside" | "doctor" | "education" | "treatment";
export type VideoPage =
  | "home"
  | "about"
  | "doctor"
  | "cataract"
  | "glaucoma"
  | "exams"
  | "eyelid"
  | "aesthetic"
  | "reconstructive"
  | "international";

export const CATEGORY_LABEL: Record<VideoCategory, string> = {
  inside: "Inside Namokar",
  doctor: "Meet the Doctor",
  education: "Eye Health Education",
  treatment: "Treatment Explainers",
};

export const CHANNEL = {
  name: "Dr. Poonam Jain - Namokar Eye & Oculoplasty Centre",
  url: "https://www.youtube.com/@dr.poonamjain-NamokarEyeCentre",
  note: "Found by searching YouTube; the handle in the 2026 social-media audit (@dr.poonamjain-namokareyeoc5696) does not exist.",
} as const;

/** What was read from YouTube on FACTS_CHECKED (see videoFacts.ts). Not a review of the content. */
export type Evidence = {
  checked: string;
  channelId: string;
  publisherVerified: boolean;
  embeddable: boolean;
  uploaded: string;
  seconds: number;
  width: number;
  height: number;
  /** Listed on the channel's Shorts tab. */
  format: "short" | "standard";
  consent: "pending";
  medicalReview: "pending";
};

type Common = {
  id: string;
  title: string;
  description: string;
  category: VideoCategory;
  /** The picture's exact shape when it is not 16:9 (CSS aspect-ratio value), so it is neither cropped nor stretched. */
  ratio?: string;
  /** "16:9" or "9:16" container. YouTube videos are embedded 16:9 and letterbox if vertical. */
  aspect: "16:9" | "9:16";
  duration: string;
  language: "en" | "hi";
  /** Exact title on YouTube, when the title shown on this site is shortened or translated. */
  officialTitle?: string;
  hasAudio: boolean;
  pages: VideoPage[];
  /** The video may show an eye procedure: a note is shown before the visitor presses Play. */
  sensitive?: boolean;
  /** Where the homepage shelf sends a visitor who wants the full page on this topic. */
  learnMore?: { label: string; href: string };
  /** What a reviewer must check before approval. */
  review: string;
};
export type VideoItem = Common &
  (
    | { source: "local"; video: AssetKey; poster: AssetKey; captions?: AssetKey }
    | { source: "youtube"; videoId: string; approved: boolean; evidence?: Evidence; thumb?: AssetKey | `/images/${string}` }
  );

const yt = (
  videoId: string,
  title: string,
  duration: string,
  category: VideoCategory,
  pages: VideoPage[],
  description: string,
  review: string,
  language: "en" | "hi" = "en",
): VideoItem => ({
  id: `yt-${videoId}`,
  source: "youtube",
  videoId,
  // A video placed on a page was selected for the website and is covered by the owner's release
  // authorization (20 Oct 2026); one placed on no page stays unpublished.
  approved: pages.length > 0,
  title,
  description,
  category,
  aspect: "16:9",
  duration,
  language,
  hasAudio: true,
  pages,
  review,
});

/**
 * A YouTube Short on the clinic's channel (vertical 9:16). Listed on the channel's Shorts tab and
 * checked with YouTube's oEmbed service on 19 Oct 2026 (HTTP 200, author "Dr. Poonam Jain - Namokar
 * Eye & Oculoplasty Centre"). The Short itself has NOT been watched or clinically reviewed. Its
 * length comes from YouTube's data (videoFacts.ts); "Short" below is only a placeholder.
 */
const ys = (
  videoId: string,
  title: string,
  category: VideoCategory,
  pages: VideoPage[],
  description: string,
  review: string,
): VideoItem => ({
  ...yt(videoId, title, "Short", category, pages, description, review),
  aspect: "9:16",
});

const RAW: VideoItem[] = [
  // ---- Local hospital footage
  {
    id: "local-clinic-walkthrough",
    source: "local",
    video: "clinicWalkthrough",
    poster: "clinicWalkthroughPoster",
    title: "A Walk Through Namokar Eye & Oculoplasty Centre",
    description: "From the street entrance to reception and the examination rooms.",
    category: "inside",
    aspect: "16:9",
    ratio: "1920 / 1094",
    duration: "0:30",
    language: "en",
    hasAudio: true,
    pages: ["home"],
    review:
      "Not publishable as it stands: identifiable patients and staff, a second doctor, burned-in claims (25+ years, internationally trained, cashless Mediclaim) and a telephone number on a sign. Needs consent, edits or written sign-off, and a check of the audio. No captions or transcript exist.",
  },
  {
    id: "local-walkthrough",
    source: "local",
    video: "walkthroughVideo",
    poster: "walkthroughPoster",
    title: "A short walkthrough of the centre",
    description: "Corridors, an eye-chart screen, the operation theatre complex and equipment, without sound.",
    category: "inside",
    aspect: "16:9",
    duration: "0:33",
    language: "en",
    hasAudio: false,
    pages: [],
    review: "Replaced on the homepage by the clinic walkthrough (20 Oct 2026); kept here. Client sign-off. No identifiable people. Shows the older (cream-walled) theatre.",
  },
  {
    id: "local-ot-tour",
    source: "local",
    video: "vidOtTour",
    poster: "vidOtTourPoster",
    title: "Inside the operation theatre area",
    description: "A walk through the theatre doors and rooms, without sound. Shows the newer, blue-floored theatre.",
    category: "inside",
    aspect: "9:16",
    duration: "0:43",
    language: "en",
    hasAudio: false,
    pages: [],
    review: "Replaced on the homepage by the clinic walkthrough (20 Oct 2026); kept here. Client sign-off; a masked surgeon is briefly visible. Two different theatres appear across the footage (cream-walled and blue-floored): confirm which are current.",
  },
  {
    id: "local-doctor-scrubs",
    source: "local",
    video: "vidDoctorScrubs",
    poster: "vidDoctorScrubsPoster",
    title: "Dr. Poonam Jain at the centre",
    description: "A short clip, without sound.",
    category: "doctor",
    aspect: "9:16",
    duration: "0:06",
    language: "en",
    hasAudio: false,
    pages: ["doctor"],
    review: "Dr. Poonam Jain's approval, then client sign-off. No speech.",
  },
  {
    id: "local-post-cataract-exercise",
    source: "local",
    video: "vidCataractExercise",
    poster: "vidCataractExercisePoster",
    title: "Cataract surgery: when can you exercise?",
    description: "Dr. Poonam Jain talks through returning to exercise after cataract surgery.",
    category: "treatment",
    aspect: "9:16",
    duration: "1:17",
    language: "en",
    hasAudio: true,
    pages: ["cataract"],
    review:
      "Clinician review of the timings and the do/don't list shown on screen. Licence for the inserted stock-style footage. Captions and transcript required (none yet, and not produced automatically). Dr. Poonam Jain's approval.",
  },

  // ---- YouTube (clinic channel). All unapproved.
  yt("0xW4m-m_M8E", "A closer look inside Namokar Eye & Oculoplasty Centre, Delhi", "0:54", "inside", ["about", "home"], "A short tour of the centre, from the clinic's channel.", "Shows patients being examined in the thumbnail: confirm consent. Check facilities claims in the voice-over or captions."),
  yt("kX04UgyjkWo", "Dr. Poonam Jain talks about cataract surgery", "1:41", "treatment", ["cataract", "home"], "Dr. Poonam Jain explains cataract surgery in her clinic.", "Lower-third shows a telephone number (7827455040) and an address: the number is unconfirmed. Check medical claims."),
  yt("mPDSc3AxoAk", "Why I became an eye surgeon", "2:54", "doctor", ["doctor", "home"], "Dr. Poonam Jain on why she chose ophthalmology.", "Check any credentials or experience figures spoken. Title card names her Director of the centre."),
  yt("D5uIbXIihuc", "Cataract surgery: when to consider it", "2:06", "treatment", ["cataract"], "When to consider cataract surgery.", "Title implies regaining vision: check wording for outcome claims."),
  yt("Bt8DUnLJdZA", "Common myths about cataract surgery", "2:22", "treatment", [], "Common myths about cataract surgery.", "Title makes absolute claims (safe, painless, effective): needs clinician review before publication."),
  yt("kmaEBmU1ty4", "Cataract surgery: how to avoid cataracts and what causes them", "4:06", "education", [], "Causes of cataract, in Hindi.", "Hindi: have a Hindi-speaking clinician review. Thumbnail shows a telephone number (7827455040).", "hi"),
  yt("SqmpI_G8o5I", "Four misconceptions about glaucoma", "0:58", "treatment", ["glaucoma"], "Common glaucoma myths, in Hindi.", "Hindi: have a Hindi-speaking clinician review. Check statements about cure and vision loss.", "hi"),
  yt("82siQa3LgUY", "Do your eyes feel tired after long screen time?", "1:06", "education", ["exams"], "Simple steps for tired eyes after screen use.", "Check the advice given for general safety."),
  yt("41E5Dhpyll8", "Do blue-blocking glasses really make a difference?", "1:20", "education", [], "A short explainer on blue-blocking glasses.", "Check evidence claims."),
  yt("ZfZpmkXPa4k", "Blepharoplasty: eyelid lift surgery", "4:36", "treatment", ["eyelid"], "An explainer on eyelid-lift surgery.", "Title says \"restore your youthful looks\": check for outcome claims; check for imagery of patients or procedures."),
  yt("NznjjjSRJ1s", "Entropion surgery", "1:23", "treatment", ["reconstructive"], "A short explainer on surgery for an eyelid that turns inwards.", "Check for procedure imagery and consent."),
  yt("sR6B4Kjr5JE", "Why some children become nearsighted and others do not", "1:35", "education", [], "A short note on childhood nearsightedness.", "Paediatric and myopia content is outside the six agreed services: confirm scope. Vertical video that is not listed on the Shorts tab."),
  yt("B6JggoiqX9I", "Looking after contact lenses", "2:37", "education", [], "Contact-lens care, in Hindi.", "Hindi: have a Hindi-speaking clinician review. Confirm contact-lens advice is in scope.", "hi"),
  yt("ztQ5mbvSNVs", "Most common eye problems in children", "4:37", "education", [], "Children's eye problems.", "Paediatric content is outside the six agreed services: confirm the centre offers it."),
  yt("VbAoKQIq87o", "Glasses for children: how to prevent myopia", "3:07", "education", [], "Myopia in children, in Hindi.", "Outside the six agreed services; Hindi review needed.", "hi"),
  yt("mrx8xKLUCQE", "Lazy eye (amblyopia) in children: what it is and how it is treated", "2:53", "education", [], "Amblyopia explained.", "Outside the six agreed services."),
  // ---- YouTube Shorts (clinic channel), chosen from the channel's Shorts tab. All unapproved.
  ys("C9AzcSy416o", "Specialised eye care in Ashok Vihar, Delhi", "inside", [], "A short introduction to the centre.", "Check any facilities, experience or accreditation claims spoken or shown. Check for patients on screen: consent."),
  ys("u3psA5Fu79U", "Cataract surgery: when can you exercise?", "treatment", [], "Returning to exercise after cataract surgery.", "Same topic as the local exercise clip: clinician to confirm the timings. Check for outcome wording."),
  ys("_hkRLpO3JVE", "Choosing an intraocular lens (IOL) for cataract surgery", "treatment", [], "A short note on choosing a lens implant.", "Title says \"select the best IOL\": check for superiority claims and brand names. Clinician review."),
  ys("0YHUAEUcM2g", "What is glaucoma?", "treatment", ["glaucoma"], "A short explanation of glaucoma and the optic nerve.", "Clinician to check statements about damage and vision loss."),
  ys("wtk1RA5bJvk", "Blurry distance vision after long hours at a computer?", "education", ["exams"], "A short note on blurred distance vision and screen work.", "General advice: clinician to check. A second Short with the same title exists (N-qZS9Q6VOo) and was not used."),
  ys("_eoMAt_0dYw", "Heavy, hooded upper eyelids", "treatment", ["eyelid"], "A short note on heavy upper eyelids.", "Check for outcome wording and any before-and-after imagery."),
  ys("hUw7A6a0rgo", "Does one eye look smaller in your selfies?", "treatment", [], "A short note on uneven eyelid position.", "Clinician to check the explanation of causes."),
  ys("_urlz_Hk7bM", "Dark circles getting more noticeable?", "education", ["aesthetic"], "A short note on dark circles.", "Check for treatment or product claims and any imagery of patients."),
  ys("Kc4AGn2i-Uk", "Not every under-eye trend online is harmless", "education", ["aesthetic"], "A cautionary note on under-eye trends.", "Check the specific trends and claims named."),
  ys("PwZ7FS7ad_U", "Is your lower eyelid turning inward with age?", "treatment", ["reconstructive"], "A short note on the lower eyelid turning inwards.", "A second Short with the same title exists (UUghddeacVA) and was not used. Check for procedure imagery."),
  ys("JcXB5aIS0vM", "Eyes feeling heavy, bulging or painful?", "treatment", [], "A short note on a heavy, bulging or painful eye.", "Check that the wording does not alarm or diagnose; urgent-care guidance needs clinician review."),
];

const OFFICIAL: Record<string, string> = {
  C9AzcSy416o: "Looking for specialised eye care in Ashok Vihar, Delhi? 👁️",
  u3psA5Fu79U: "Wondering when you can exercise after cataract surgery? 👁️",
  _hkRLpO3JVE: "Going for Cataract surgery? Your Vision, your choice! Select the best IOL (Intraocular Lens). #iol",
  "0YHUAEUcM2g": "Glaucoma is the overarching term for a group of conditions that occur when ur optic nerve is damaged",
  wtk1RA5bJvk: "Experiencing blurry distance vision after long hours of computer work? 👀",
  _eoMAt_0dYw: "Heavy, hooded upper eyelids can make the eyes look tired and may hide the natural eyelid crease.",
  hUw7A6a0rgo: "Ever noticed one eye looking smaller in your selfies? 👀",
  _urlz_Hk7bM: "Dark circles getting more noticeable? 👀",
  "Kc4AGn2i-Uk": "Not every under-eye trend online is harmless. #shorts",
  PwZ7FS7ad_U: "Is your lower eyelid turning inward with age?",
  JcXB5aIS0vM: "Eyes feeling heavy, bulging , or painful? it might be more serious than you think.",
  "0xW4m-m_M8E": "A closer look inside Namokar Eye & Oculoplasty Centre, Delhi. 👁️✨",
  mPDSc3AxoAk: "Why I Became an Eye Surgeon? | By Dr Poonam Jain | Director Namokar Eye & Oculoplasty Centre |",
  kX04UgyjkWo: "Dr. Poonam Jain - A Leading Eye Surgeon of Ashok Vihar Talks About Cataract Surgery",
  kmaEBmU1ty4: "Cataract Surgery | जानिए मोतियाबिंद से कैसे बचे और यह किन कारणों से हो सकता है?By Dr Poonam Jain",
  SqmpI_G8o5I: "ग्लोकोमा से जुड़ी यह चार ग़लतफ़ैमियो की जानकारी महत्त्वपूर्ण है |",
  VbAoKQIq87o: "बच्चों के लिए चश्मा: मायोपिया को कैसे रोकें?",
  ZfZpmkXPa4k: "Blepharoplasty is Eyelid lift Surgery to restore your youthful looks",
  Bt8DUnLJdZA: "Debunking Cataract Surgery Myths: Safe, Painless, and Effective",
  D5uIbXIihuc: "Get your cataract surgery done at the right time and regain your vision",
  "82siQa3LgUY": "Do your eyes feel tired after long screen time?",
  "41E5Dhpyll8": "Wondering if blue blocking glasses really make a difference?",
  NznjjjSRJ1s: "Entropion Surgery",
  ztQ5mbvSNVs: "Most Common Eye Problems in Children | By Dr Poonam Jain |",
  mrx8xKLUCQE: "Is your child suffering from a Lazy Eye Are You are unaware? Amblyopia treatment What is Amblyopia?",
};

/**
 * The cover picture of a YouTube video card. It is a photograph of the centre that fits the topic,
 * Covers are supplied local files. Other covers are approved centre photographs; with none
 * cleared the card shows a clean neutral cover with the logo. Titles are always plain HTML
 * beneath the picture.
 */
const THUMBS: Record<string, AssetKey | `/images/${string}`> = {
  "0xW4m-m_M8E": "/images/about-thumbnail1.jpg",
  kX04UgyjkWo: "/images/cataract-thumbnail1.jpg",
  D5uIbXIihuc: "/images/cataract-thumbnail2.jpg",
  Bt8DUnLJdZA: "otScope",
  mPDSc3AxoAk: "/images/why-i-became-an-eye-surgeon.jpg",
  SqmpI_G8o5I: "/images/glaucoma-thumbnail1-new.jpg",
  "0YHUAEUcM2g": "/images/glaucoma-thumbnail2-new.jpg",
  "82siQa3LgUY": "/images/eye-examination-thumbnail1.jpg",
  wtk1RA5bJvk: "/images/eye-examination-thumnail2.jpg",
  ZfZpmkXPa4k: "/images/Blepharoplasty-thumbnail1.jpg",
  _eoMAt_0dYw: "/images/Blepharoplasty-thumbnail2.jpg",
  NznjjjSRJ1s: "/images/reconstructive-thumbnail1.jpg",
  PwZ7FS7ad_U: "/images/reconstructive-thumbnail2.jpg",
  _urlz_Hk7bM: "/images/oculoplasty-thumbnail1.jpg",
  "Kc4AGn2i-Uk": "/images/oculoplasty-thumnail2.jpg",
};

const SENSITIVE = new Set(["NznjjjSRJ1s", "ZfZpmkXPa4k"]);
const LEARN: Record<string, { label: string; href: string }> = {
  "0xW4m-m_M8E": { label: "About the centre", href: LINKS.about },
  kX04UgyjkWo: { label: "Cataract surgery explained", href: LINKS.cataract },
  mPDSc3AxoAk: { label: "Meet Dr. Poonam Jain", href: LINKS.doctor },
};

export const VIDEOS: VideoItem[] = RAW.map((v) => {
  if (v.source !== "youtube") return v;
  const f = FACTS[v.videoId];
  return {
    ...v,
    officialTitle: OFFICIAL[v.videoId],
    sensitive: SENSITIVE.has(v.videoId) || undefined,
    learnMore: LEARN[v.videoId],
    thumb: THUMBS[v.videoId],
    // Length and shape come from YouTube's own data, not from the supplied catalogue.
    ...(f ? { duration: clock(f.seconds), aspect: f.height > f.width ? ("9:16" as const) : ("16:9" as const) } : {}),
    evidence: f
      ? {
          checked: FACTS_CHECKED,
          channelId: CHANNEL_ID,
          publisherVerified: true,
          embeddable: true,
          uploaded: f.uploaded,
          seconds: f.seconds,
          width: f.width,
          height: f.height,
          format: f.shortsTab ? ("short" as const) : ("standard" as const),
          consent: "pending" as const,
          medicalReview: "pending" as const,
        }
      : undefined,
  };
});

const ASSET = (k: AssetKey) => ASSETS[k];

/** May this video be rendered right now? */
export function playable(v: VideoItem): boolean {
  if (v.source === "local") return usable(ASSET(v.video)) && usable(ASSET(v.poster));
  return v.approved || ASSET_PREVIEW;
}

/** True when it is visible only because the local review preview is on. */
export function previewOnlyVideo(v: VideoItem): boolean {
  if (v.source === "local") return !ASSET(v.video).approved && ASSET_PREVIEW;
  return !v.approved && ASSET_PREVIEW;
}

/** Landscape videos lead, vertical ones follow; the order within each kind is the list order above. */
export const videosFor = (page: VideoPage) => {
  const list = VIDEOS.filter((v) => v.pages.includes(page) && playable(v));
  return [...list.filter((v) => v.aspect === "16:9"), ...list.filter((v) => v.aspect === "9:16")];
};
export const allPlayable = () => VIDEOS.filter(playable);

/** The /videos library needs at least this many publishable videos. */
export const LIBRARY_MIN = 3;
export const libraryAvailable = () => allPlayable().length >= LIBRARY_MIN;

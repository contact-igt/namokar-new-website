import { ASSETS, type AssetKey, ASSET_PREVIEW, usable } from "@/config/assets";

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
 * YouTube entries were checked on 16 Oct 2026: the video exists on the channel
 * "Dr. Poonam Jain - Namokar Eye & Oculoplasty Centre" (@dr.poonamjain-NamokarEyeCentre,
 * channel ID UCVg1GXUqcasF6jAJk93IAEQ), and YouTube's oEmbed service returned HTTP 200 (public,
 * embeddable) for every ID. TITLES AND IDs ARE VERIFIED; THE CONTENT OF THE YOUTUBE VIDEOS HAS NOT
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

type Common = {
  id: string;
  title: string;
  description: string;
  category: VideoCategory;
  /** "16:9" or "9:16" container. YouTube videos are embedded 16:9 and letterbox if vertical. */
  aspect: "16:9" | "9:16";
  duration: string;
  language: "en" | "hi";
  /** Exact title on YouTube, when the title shown on this site is shortened or translated. */
  officialTitle?: string;
  hasAudio: boolean;
  pages: VideoPage[];
  /** What a reviewer must check before approval. */
  review: string;
};
export type VideoItem = Common &
  (
    | { source: "local"; video: AssetKey; poster: AssetKey; captions?: AssetKey }
    | { source: "youtube"; videoId: string; approved: boolean }
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
  approved: false,
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

const RAW: VideoItem[] = [
  // ---- Local hospital footage
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
    pages: ["home"],
    review: "Client sign-off. No identifiable people. Shows the older (cream-walled) theatre.",
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
    pages: ["home"],
    review: "Client sign-off; a masked surgeon is briefly visible. Two different theatres appear across the footage (cream-walled and blue-floored): confirm which are current.",
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
  yt("0xW4m-m_M8E", "A closer look inside Namokar Eye & Oculoplasty Centre, Delhi", "0:54", "inside", ["about"], "A short tour of the centre, from the clinic's channel.", "Shows patients being examined in the thumbnail: confirm consent. Check facilities claims in the voice-over or captions."),
  yt("mPDSc3AxoAk", "Why I became an eye surgeon", "2:54", "doctor", ["doctor"], "Dr. Poonam Jain on why she chose ophthalmology.", "Check any credentials or experience figures spoken. Title card names her Director of the centre."),
  yt("kX04UgyjkWo", "Dr. Poonam Jain talks about cataract surgery", "1:41", "treatment", [], "Dr. Poonam Jain explains cataract surgery in her clinic.", "Lower-third shows a telephone number (7827455040) and an address: the number is unconfirmed. Check medical claims."),
  yt("D5uIbXIihuc", "Get your cataract surgery done at the right time and regain your vision", "2:06", "treatment", [], "When to consider cataract surgery.", "Title implies regaining vision: check wording for outcome claims."),
  yt("Bt8DUnLJdZA", "Debunking cataract surgery myths: safe, painless and effective", "2:22", "treatment", [], "Common myths about cataract surgery.", "Title makes absolute claims (safe, painless, effective): needs clinician review before publication."),
  yt("kmaEBmU1ty4", "Cataract surgery: how to avoid cataracts and what causes them", "4:06", "education", [], "Causes of cataract, in Hindi.", "Hindi: have a Hindi-speaking clinician review. Thumbnail shows a telephone number (7827455040).", "hi"),
  yt("SqmpI_G8o5I", "Four misconceptions about glaucoma", "0:58", "treatment", ["glaucoma"], "Common glaucoma myths, in Hindi.", "Hindi: have a Hindi-speaking clinician review. Check statements about cure and vision loss.", "hi"),
  yt("82siQa3LgUY", "Do your eyes feel tired after long screen time?", "1:06", "education", ["exams"], "Simple steps for tired eyes after screen use.", "Check the advice given for general safety."),
  yt("41E5Dhpyll8", "Do blue-blocking glasses really make a difference?", "1:20", "education", [], "A short explainer on blue-blocking glasses.", "Check evidence claims."),
  yt("ZfZpmkXPa4k", "Blepharoplasty: eyelid lift surgery", "4:36", "treatment", ["eyelid"], "An explainer on eyelid-lift surgery.", "Title says \"restore your youthful looks\": check for outcome claims; check for imagery of patients or procedures."),
  yt("NznjjjSRJ1s", "Entropion surgery", "1:23", "treatment", ["reconstructive"], "A short explainer on surgery for an eyelid that turns inwards.", "Check for procedure imagery and consent."),
  yt("ztQ5mbvSNVs", "Most common eye problems in children", "4:37", "education", [], "Children's eye problems.", "Paediatric content is outside the six agreed services: confirm the centre offers it."),
  yt("VbAoKQIq87o", "Glasses for children: how to prevent myopia", "3:07", "education", [], "Myopia in children, in Hindi.", "Outside the six agreed services; Hindi review needed.", "hi"),
  yt("mrx8xKLUCQE", "Lazy eye (amblyopia) in children: what it is and how it is treated", "2:53", "education", [], "Amblyopia explained.", "Outside the six agreed services."),
];

const OFFICIAL: Record<string, string> = {
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

export const VIDEOS: VideoItem[] = RAW.map((v) =>
  v.source === "youtube" ? { ...v, officialTitle: OFFICIAL[v.videoId] } : v,
);

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

export const videosFor = (page: VideoPage) => VIDEOS.filter((v) => v.pages.includes(page) && playable(v));
export const allPlayable = () => VIDEOS.filter(playable);

/** The /videos library needs at least this many publishable videos. */
export const LIBRARY_MIN = 3;
export const libraryAvailable = () => allPlayable().length >= LIBRARY_MIN;

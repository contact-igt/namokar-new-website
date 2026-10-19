/**
 * Facts read from YouTube on 19 Oct 2026 for every video the site knows about, by loading each
 * watch page in a real browser and reading the page's own player data: the video exists, is
 * public (not unlisted), is embeddable, and belongs to the channel "Dr. Poonam Jain - Namokar
 * Eye & Oculoplasty Centre" (channel ID UCVg1GXUqcasF6jAJk93IAEQ). Length, upload date and the
 * picture size are as YouTube reports them. `shortsTab` is true only for videos listed on the
 * channel's Shorts tab: a video is never called a Short because of its length or shape alone.
 * These facts are about the videos' existence and format, NOT their content, which no one at
 * the project has watched or clinically reviewed.
 */
export const CHANNEL_ID = "UCVg1GXUqcasF6jAJk93IAEQ";
export const FACTS_CHECKED = "2026-10-19";

export type VideoFact = {
  seconds: number;
  uploaded: string;
  width: number;
  height: number;
  shortsTab: boolean;
};

// [seconds, uploaded, width, height, shortsTab]
const ROWS: Record<string, [number, string, number, number, boolean]> = {
  "0YHUAEUcM2g": [57, "2023-01-27", 352, 640, true],
  "0xW4m-m_M8E": [53, "2026-09-07", 1920, 1080, false],
  "41E5Dhpyll8": [80, "2024-03-17", 1920, 1080, false],
  "82siQa3LgUY": [66, "2026-01-23", 1920, 1080, false],
  Bt8DUnLJdZA: [142, "2024-07-09", 1920, 1080, false],
  C9AzcSy416o: [16, "2026-10-06", 1080, 1920, true],
  D5uIbXIihuc: [125, "2024-02-22", 640, 350, false],
  JcXB5aIS0vM: [32, "2025-08-05", 1080, 1920, true],
  "Kc4AGn2i-Uk": [9, "2026-09-21", 1080, 1920, true],
  NznjjjSRJ1s: [82, "2024-01-01", 1920, 1080, false],
  PwZ7FS7ad_U: [15, "2025-08-12", 480, 854, true],
  SqmpI_G8o5I: [58, "2024-04-19", 1920, 1080, false],
  VbAoKQIq87o: [187, "2024-04-17", 1920, 1080, false],
  ZfZpmkXPa4k: [276, "2024-02-20", 640, 350, false],
  _eoMAt_0dYw: [42, "2026-09-16", 1080, 1920, true],
  _hkRLpO3JVE: [89, "2025-08-22", 720, 1280, true],
  _urlz_Hk7bM: [60, "2026-08-19", 1080, 1920, true],
  hUw7A6a0rgo: [73, "2026-06-27", 1080, 1920, true],
  kX04UgyjkWo: [100, "2023-04-13", 1280, 720, false],
  kmaEBmU1ty4: [245, "2022-04-21", 1920, 1080, false],
  mPDSc3AxoAk: [174, "2022-06-11", 1920, 1080, false],
  mrx8xKLUCQE: [173, "2024-04-29", 1920, 1080, false],
  u3psA5Fu79U: [77, "2026-09-29", 1080, 1920, true],
  wtk1RA5bJvk: [37, "2026-10-17", 1080, 1920, true],
  ztQ5mbvSNVs: [277, "2022-06-11", 1920, 1080, false],
  sR6B4Kjr5JE: [95, "2023-01-27", 720, 1280, false],
  B6JggoiqX9I: [157, "2024-03-17", 1920, 1080, false],
};

export const FACTS: Record<string, VideoFact> = Object.fromEntries(
  Object.entries(ROWS).map(([id, [seconds, uploaded, width, height, shortsTab]]) => [
    id,
    { seconds, uploaded, width, height, shortsTab },
  ]),
);

/** 142 seconds becomes "2:22". */
export const clock = (seconds: number): string => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

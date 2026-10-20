import type { ServiceKey } from "@/config/site";

/**
 * Service page content.
 *
 * SOURCE: general patient information written for this build in neutral, widely accepted
 * terms. Nothing here is copied from the old WordPress pages, which contain absolute claims
 * ("painless", "100% accuracy"), surgery totals, recovery times, insurance and EMI offers and
 * technology claims that are not approved. Statements about what THIS centre offers are
 * limited to "the doctor will explain at consultation".
 *
 * STATUS: every page is awaiting clinician sign-off (see docs/full-site-build/CONTENT_FACT_CHECK.md).
 * Until then each page is excluded from search engines (src/config/routes.ts).
 */
export type ServicePageContent = {
  key: ServiceKey;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  eyebrow?: string;
  lead: string;
  introHeading: string;
  intro: string[];
  seekHelp: { heading: string; items: string[]; note: string };
  journeyLead: string;
  journey: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  related: ServiceKey[];
};

const URGENT =
  "Sudden loss of vision, a new eye injury, or severe eye pain needs urgent medical attention. Do not wait for a routine appointment.";

export const SERVICE_CONTENT: Record<ServiceKey, ServicePageContent> = {
  cataract: {
    key: "cataract",
    metaTitle: "Cataract Surgery in Ashok Vihar, New Delhi",
    metaDescription:
      "General information about cataracts and cataract surgery, and how to arrange an eye examination at Namokar Eye & Oculoplasty Centre in Ashok Vihar, New Delhi.",
    h1: "Cataract surgery, explained clearly.",
    eyebrow: "Stitchless cataract surgery",
    lead: "Understand cataract symptoms, when surgery is considered, lens choices and what the first consultation involves.",
    introHeading: "What is a cataract?",
    intro: [
      "A cataract is a clouding of the eye's natural lens. It usually develops slowly, and it is one of the common reasons that vision becomes blurred or dim as people get older.",
      "Age-related changes are the most common cause. Cataracts can also be associated with an eye injury, some long-term medicines such as steroids, diabetes or other eye conditions. They can affect one or both eyes, and symptoms may be different in each eye.",
      "Cataract surgery removes the clouded lens and, in most cases, replaces it with a clear artificial lens, called an intraocular lens (IOL). Not everyone with a cataract needs surgery straight away. The decision depends on how much your vision affects your daily life and on what the examination shows.",
    ],
    seekHelp: {
      heading: "When to have your eyes checked",
      items: [
        "Vision that looks cloudy, blurred or dim",
        "Glare from bright light or oncoming headlights, especially at night",
        "Trouble seeing in low light or at night",
        "Halos around lights or double vision in one eye",
        "Colours that look faded or yellowed",
        "Spectacles that need changing again and again",
        "Reading, driving or recognising faces becoming harder",
      ],
      note: URGENT,
    },
    journeyLead:
      "A general outline. The doctor decides which steps you need and explains each one.",
    journey: [
      {
        title: "Examination",
        text: "Your vision and the health of your eyes are checked, including the lens.",
      },
      {
        title: "Discussion",
        text: "The doctor explains whether surgery is likely to help, what the options are and what the risks are.",
      },
      {
        title: "Planning",
        text: "If you decide to go ahead, measurements of the eye help plan the operation and choose a replacement lens. The doctor also explains any instructions about medicines, eye drops or contact lenses.",
      },
      {
        title: "Surgery, if you choose it",
        text: "The centre explains how the operation is arranged, the benefits and risks in your case, and what to do before and afterwards.",
      },
      {
        title: "Follow-up",
        text: "The doctor advises on prescribed eye drops, protecting the eye, returning to daily activities and follow-up checks. Contact the centre promptly if you have worsening pain, redness or a sudden change in vision.",
      },
    ],
    faqs: [
      {
        q: "Do cataracts need surgery straight away?",
        a: "Not always. If a cataract is not troubling you, the doctor may suggest checking it from time to time. Surgery is considered when it affects what you need to do in daily life.",
      },
      {
        q: "What is an intraocular lens (IOL)?",
        a: "It is the clear artificial lens placed in the eye to replace the natural lens that has become cloudy. Different designs exist, and the doctor discusses which may suit you.",
      },
      {
        q: "What does “stitchless” mean?",
        a: "Modern cataract surgery is often done through a very small opening that may not need stitches. Whether stitches are needed depends on the eye and on the technique the surgeon chooses, and this is explained to you.",
      },
      {
        q: "Is cataract surgery suitable for everyone?",
        a: "Suitability is decided after an examination. Other eye conditions and general health can affect the plan, and every operation carries some risk, which the doctor goes through with you.",
      },
      {
        q: "What happens after cataract surgery?",
        a: "You are given individual instructions about eye drops, protecting the eye and follow-up. Vision can be blurred at first and improve over time. Do not rub the eye or restart driving, exercise or other activities until the doctor says it is appropriate for you.",
      },
      {
        q: "Can a cataract come back after surgery?",
        a: "The removed natural lens cannot develop another cataract. Some people later develop clouding of the capsule that holds the replacement lens. If this affects vision, the doctor can assess it and discuss treatment.",
      },
      {
        q: "What should I bring to my first visit?",
        a: "Previous prescriptions and eye reports, your current spectacles and a list of the medicines you take.",
      },
    ],
    related: ["exams", "glaucoma", "eyelid"],
  },

  glaucoma: {
    key: "glaucoma",
    metaTitle: "Glaucoma Management",
    metaDescription:
      "General information about glaucoma, why regular eye examinations matter, and how to arrange an assessment at Namokar Eye & Oculoplasty Centre, Ashok Vihar.",
    h1: "Glaucoma care starts with regular check-ups.",
    lead: "Glaucoma often has no early symptoms. Examination and long-term follow-up are how it is found and kept under watch.",
    introHeading: "What is glaucoma?",
    intro: [
      "Glaucoma is a group of eye conditions in which the optic nerve, which carries what the eye sees to the brain, is gradually damaged. Raised pressure inside the eye is a common factor, but it is not the only one.",
      "Glaucoma is usually a long-term condition that is managed rather than cured. Damage to the optic nerve cannot be reversed, so the aim of care is to find glaucoma early and to protect the vision that remains. Treatment and follow-up are planned for each person.",
    ],
    seekHelp: {
      heading: "Who should have regular eye checks",
      items: [
        "Anyone with a close relative who has glaucoma",
        "People who are getting older, because the risk rises with age",
        "People who are very short-sighted",
        "People who use steroid medicines over a long period, as advised by their doctor",
        "People who have had an injury to the eye",
      ],
      note: "Sudden eye pain with redness, halos around lights, headache or sickness needs urgent medical attention.",
    },
    journeyLead:
      "A general outline of long-term care. The doctor decides which tests you need and how often.",
    journey: [
      {
        title: "Examination",
        text: "Your eyes are examined, including the optic nerve at the back of the eye.",
      },
      {
        title: "Tests chosen by the doctor",
        text: "Tests may measure the pressure in the eye and the field of vision. Which tests are needed is the doctor's decision.",
      },
      {
        title: "Findings and plan",
        text: "The doctor explains what was found, whether treatment is needed and what it aims to do.",
      },
      {
        title: "Treatment, where needed",
        text: "Glaucoma can be treated with eye drops, laser or surgery. If any of these is suitable, the doctor explains the choices.",
      },
      {
        title: "Regular follow-up",
        text: "Glaucoma needs monitoring over the long term, so check-ups continue as the doctor advises.",
      },
    ],
    faqs: [
      {
        q: "Can glaucoma be cured?",
        a: "Glaucoma is usually managed long term rather than cured. Treatment aims to slow or stop further damage to the optic nerve.",
      },
      {
        q: "Can I have glaucoma with normal eye pressure?",
        a: "Yes. Some people develop optic nerve damage even when the pressure measures in the normal range, which is one reason a full examination is needed.",
      },
      {
        q: "Do I have to keep coming back?",
        a: "Usually, yes. Glaucoma can change over time without symptoms, so regular follow-up is part of care. The doctor tells you how often.",
      },
      {
        q: "Does glaucoma run in families?",
        a: "Having a close relative with glaucoma raises your own risk, so tell the doctor if someone in your family has it.",
      },
    ],
    related: ["exams", "cataract", "reconstructive"],
  },

  exams: {
    key: "exams",
    metaTitle: "Comprehensive Eye Examinations",
    metaDescription:
      "What a comprehensive eye examination involves and when to have one, and how to arrange a visit to Namokar Eye & Oculoplasty Centre, Ashok Vihar.",
    h1: "A thorough eye check, explained in plain language.",
    lead: "An examination looks at how well you see and how healthy your eyes are, and it is where any further care begins.",
    introHeading: "What a comprehensive examination is",
    intro: [
      "A comprehensive eye examination looks at more than your spectacle number. The doctor checks how well you see, how your eyes work together and the health of the structures inside and around the eye.",
      "It can find conditions such as cataract and glaucoma before they cause obvious symptoms, and it is the starting point for any further tests or treatment. The tests used depend on your symptoms and age and are chosen by the doctor.",
    ],
    seekHelp: {
      heading: "Reasons to book an eye check",
      items: [
        "A change in your vision, or spectacles that no longer help as they did",
        "Frequent headaches or tired eyes when reading",
        "Diabetes, for which regular eye checks are usually advised",
        "A family history of eye disease",
        "It has been a long time since your last examination",
      ],
      note: URGENT,
    },
    journeyLead: "A general outline. The tests used are chosen by the doctor.",
    journey: [
      {
        title: "Before you come",
        text: "Bring previous prescriptions and eye reports, your current spectacles and a list of your medicines.",
      },
      {
        title: "The examination",
        text: "Your vision is checked, and the front and back of the eye are examined. Some visits include drops that widen the pupil; they can blur vision for some hours, so ask whether to bring someone with you.",
      },
      {
        title: "The doctor's explanation",
        text: "The findings are explained in plain language, and your questions are answered.",
      },
      {
        title: "Next steps",
        text: "If further tests or treatment are advised, the doctor explains why and what to expect.",
      },
      {
        title: "Review",
        text: "The doctor tells you when to have your eyes checked again.",
      },
    ],
    faqs: [
      {
        q: "How often should I have an eye examination?",
        a: "It depends on your age, your health and any eye conditions. The doctor will advise you.",
      },
      {
        q: "Will I need drops that widen the pupil?",
        a: "Sometimes. They help the doctor see the back of the eye. They can blur near vision and make light uncomfortable for some hours, so avoid planning to drive straight afterwards.",
      },
      {
        q: "Is an examination uncomfortable?",
        a: "Most parts are comfortable, though some drops can sting briefly. Tell the team if you are uncomfortable at any point.",
      },
      {
        q: "How do I arrange one?",
        a: "Please call the centre to ask about arranging an eye consultation.",
      },
    ],
    related: ["cataract", "glaucoma", "reconstructive"],
  },

  eyelid: {
    key: "eyelid",
    metaTitle: "Eyelid Surgery (Blepharoplasty)",
    metaDescription:
      "General information about eyelid surgery (blepharoplasty) for heavy or drooping eyelids, and how to arrange an assessment at Namokar Eye & Oculoplasty Centre.",
    h1: "Eyelid surgery begins with an assessment.",
    eyebrow: "Blepharoplasty",
    lead: "Heavy, drooping or baggy eyelids can affect comfort and vision as well as appearance. The first step is to find out why.",
    introHeading: "What is blepharoplasty?",
    intro: [
      "Blepharoplasty is surgery on the eyelids. It may be considered when excess skin or fat weighs on the eyelids, either because it affects vision and comfort, or because someone is unhappy with how their eyes look.",
      "Surgery is only one possible outcome of a consultation. The doctor first examines the eyelids and eyes, explains what is causing the problem, and discusses whether surgery would help, what it can and cannot change, and what the risks are.",
    ],
    seekHelp: {
      heading: "Reasons to ask for an assessment",
      items: [
        "Eyelids that feel heavy or droop",
        "Upper eyelids that block part of your vision",
        "Bags or puffiness under the eyes",
        "One eyelid sitting lower than the other",
        "Eyelid changes that appeared suddenly",
      ],
      note: "A drooping eyelid that appears suddenly, or comes with double vision or headache, needs prompt medical attention.",
    },
    journeyLead: "A general outline. Every step is explained before you decide anything.",
    journey: [
      {
        title: "Consultation and examination",
        text: "The eyelids, the eyes and the surrounding skin are examined.",
      },
      {
        title: "What is realistic",
        text: "The doctor explains what surgery could change, what it could not, and whether other care would suit you better.",
      },
      {
        title: "Risks and alternatives",
        text: "The possible risks and the alternatives are discussed.",
      },
      {
        title: "Your decision",
        text: "You decide at your own pace. There is no obligation to go ahead.",
      },
      {
        title: "Planning and aftercare",
        text: "If you choose surgery, the centre explains how it is arranged, what aftercare involves and what follow-up is advised.",
      },
    ],
    faqs: [
      {
        q: "Is eyelid surgery the same as surgery for a drooping eyelid (ptosis)?",
        a: "They are different. Blepharoplasty removes excess skin or fat. Ptosis surgery adjusts the muscle that lifts the eyelid. An examination shows which, or whether both, are relevant.",
      },
      {
        q: "Will the result last for ever?",
        a: "Eyelids continue to age. The doctor explains what to expect over time, and no result can be guaranteed.",
      },
      {
        q: "What are the risks?",
        a: "All surgery has risks, which can include swelling, bruising, infection and differences between the two sides. The doctor goes through them with you before you decide.",
      },
      {
        q: "How long is recovery?",
        a: "It differs between people and operations. The doctor explains what to expect in your case.",
      },
    ],
    related: ["aesthetic", "reconstructive", "exams"],
  },

  aesthetic: {
    key: "aesthetic",
    metaTitle: "Aesthetic Oculoplasty",
    metaDescription:
      "Aesthetic oculoplasty: considered care for the eyelids and the area around the eyes, with a doctor's assessment first. Namokar Eye & Oculoplasty Centre.",
    h1: "Considered care for the area around your eyes.",
    eyebrow: "Aesthetic oculoplasty care",
    lead: "Aesthetic oculoplasty is planned by a doctor who also understands how the eyes work, and it starts with an assessment, not a procedure.",
    introHeading: "What aesthetic oculoplasty covers",
    intro: [
      "Aesthetic oculoplasty is about the appearance of the eyelids and the skin around the eyes: for example heavy upper eyelids, bags or hollows beneath the eyes, and changes that come with age.",
      "It begins with an assessment. The doctor looks at your eyes and eyelids as well as the surrounding skin, explains what could and could not change, and discusses the options that may suit you, which can include surgery. Which treatments are offered is confirmed at the consultation.",
    ],
    seekHelp: {
      heading: "Reasons people ask for an assessment",
      items: [
        "Heavy upper eyelids or loose skin around the eyes",
        "Bags or puffiness under the eyes",
        "Hollows or shadows beneath the eyes",
        "A tired look that does not match how you feel",
        "An eye symptom, such as watering or irritation, that should be checked first",
      ],
      note: "Changes to the eyelids that are sudden, or come with pain or a change in vision, need medical attention before any cosmetic discussion.",
    },
    journeyLead: "A general outline. Nothing is decided at the first visit unless you want it to be.",
    journey: [
      {
        title: "Assessment",
        text: "Your eyes, eyelids and the surrounding skin are examined.",
      },
      {
        title: "Your goals",
        text: "You describe what bothers you and what you hope for. The doctor explains what is realistic.",
      },
      {
        title: "Options and risks",
        text: "The options, their limits and their risks are explained, including the option of doing nothing.",
      },
      {
        title: "Time to decide",
        text: "You take the time you need. There is no obligation to go ahead.",
      },
      {
        title: "Aftercare and review",
        text: "If you choose treatment, the centre explains the aftercare and when you will be reviewed.",
      },
    ],
    faqs: [
      {
        q: "Is aesthetic treatment only about appearance?",
        a: "Not always. Some eyelid concerns affect comfort or vision as well as looks, which is why the eyes are examined first.",
      },
      {
        q: "Which treatments does the centre offer?",
        a: "The centre confirms the treatments it offers at the consultation. This website does not list products or injectable treatments.",
      },
      {
        q: "Will the result look natural?",
        a: "The doctor discusses what you want to achieve and what is possible. No result can be guaranteed.",
      },
      {
        q: "What does recovery involve?",
        a: "That depends on the treatment, and the doctor explains it before you decide, including what it may mean for work and daily life.",
      },
    ],
    related: ["eyelid", "reconstructive", "exams"],
  },

  reconstructive: {
    key: "reconstructive",
    metaTitle: "Reconstructive Oculoplasty",
    metaDescription:
      "Reconstructive oculoplasty: assessment of drooping eyelids, eyelid malposition and watering eyes at Namokar Eye & Oculoplasty Centre, Ashok Vihar, New Delhi.",
    h1: "Restoring how the eyelids and tear passages work.",
    eyebrow: "Eye plastic and reconstructive surgery",
    lead: "Care for the eyelids, tear passages and the area around the eyes when they are not working or positioned as they should.",
    introHeading: "What reconstructive oculoplasty looks after",
    intro: [
      "Oculoplasty is the specialty that looks after the eyelids, the tear drainage system and the bony socket (orbit) around the eye. Reconstructive oculoplasty focuses on how these structures work and feel, and on restoring a normal position and shape where something has changed.",
      "Conditions that may be assessed include a drooping upper eyelid (ptosis), eyelids that turn in or out, and watering eyes caused by blocked tear passages. The doctor confirms what can be treated at the centre after examining you, and will say if care elsewhere would suit you better.",
    ],
    seekHelp: {
      heading: "Reasons to have it checked",
      items: [
        "Eyes that water all the time",
        "An eyelid that droops or sits lower than the other",
        "Eyelashes that rub against the eye, or an eyelid that turns outwards",
        "A lump on or near an eyelid that is growing or changing",
        "Irritation or discomfort around the eyelids that does not settle",
      ],
      note: "After an eye injury, or if you notice double vision or a change in how the eye sits, seek urgent medical help.",
    },
    journeyLead: "A general outline. The doctor explains each step.",
    journey: [
      {
        title: "Examination",
        text: "The eyelids, the tear passages and the eyes are examined to find the cause of the problem.",
      },
      {
        title: "Explanation",
        text: "The doctor explains what is happening and what could help.",
      },
      {
        title: "Options and risks",
        text: "Treatment options, where there are any, are discussed together with their risks and limits.",
      },
      {
        title: "Your decision",
        text: "You decide at your own pace.",
      },
      {
        title: "Aftercare and review",
        text: "The centre explains aftercare and when you will be reviewed.",
      },
    ],
    faqs: [
      {
        q: "What is ptosis?",
        a: "Ptosis means the upper eyelid sits lower than normal. It can be present from birth or develop later, and it can sometimes affect vision. An examination is needed to find the cause.",
      },
      {
        q: "Why do my eyes keep watering?",
        a: "Watering can come from dryness or irritation, infection, or blocked tear drainage, among other causes. Treatment depends on the cause, so persistent watering should be examined.",
      },
      {
        q: "Is this surgery cosmetic?",
        a: "Reconstructive oculoplasty focuses mainly on function and comfort. Appearance often improves as well, but that is not its only purpose.",
      },
      {
        q: "Which conditions are treated at the centre?",
        a: "The centre confirms what it treats at the consultation. This page lists general areas of assessment only.",
      },
    ],
    related: ["eyelid", "aesthetic", "exams"],
  },
};

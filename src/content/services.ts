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
    metaTitle: "Aesthetic Oculoplasty in Ashok Vihar, New Delhi",
    metaDescription:
      "Aesthetic oculoplasty for the eyelids, under-eye area and surrounding eye region at Namokar Eye & Oculoplasty Centre.",
    h1: "Natural-looking eye rejuvenation with aesthetic oculoplasty.",
    eyebrow: "Aesthetic oculoplasty",
    lead: "Aesthetic oculoplasty focuses on improving the appearance of the eyelids, under-eye area and surrounding eye region while keeping eye safety and natural results as the priority.",
    introHeading: "What is aesthetic oculoplasty?",
    intro: [
      "Aesthetic oculoplasty is a specialized branch of eye care that combines ophthalmology and plastic surgery for the delicate areas around the eyes. It focuses on concerns such as heavy eyelids, under-eye bags, wrinkles and age-related changes around the eyes.",
      "Unlike general cosmetic procedures, aesthetic oculoplasty is performed with attention to both appearance and eye safety.",
    ],
    seekHelp: {
      heading: "Conditions and concerns addressed",
      items: [
        "Heavy or tired-looking eyelids",
        "Excess upper eyelid skin",
        "Under-eye bags or puffiness around the eyes",
        "Fine lines and wrinkles around the eye area",
        "Aesthetic oculofacial concerns and facial rejuvenation around the eyes",
        "Drooping brows, under-eye hollowness or dark circles",
      ],
      note: "Changes to the eyelids that are sudden, or come with pain or a change in vision, need medical attention before any cosmetic discussion.",
    },
    journeyLead: "Treatment is planned around your eye health, facial structure, concerns and expectations.",
    journey: [
      {
        title: "Consultation",
        text: "The doctor evaluates the eyelids, under-eye area, facial structure, eye health and your expectations.",
      },
      {
        title: "Personalized plan",
        text: "Treatment is planned based on whether the concern is cosmetic, functional or both.",
      },
      {
        title: "Procedure",
        text: "Depending on the concern, treatment may be surgical or non-surgical.",
      },
      {
        title: "Follow-up",
        text: "Post-procedure care and review are advised based on the treatment performed.",
      },
    ],
    faqs: [
      {
        q: "What is blepharoplasty or eyelid surgery?",
        a: "Blepharoplasty helps remove excess eyelid skin and address heaviness or puffiness around the eyes. In selected cases, it may also help with comfort or vision obstruction caused by excess skin.",
      },
      {
        q: "What does under-eye bag correction involve?",
        a: "It focuses on reducing or repositioning under-eye fat deposits to create a smoother and more refreshed appearance. The right approach is confirmed after an assessment.",
      },
      {
        q: "Are Botox, fillers or threads suitable for everyone?",
        a: "These may be recommended depending on the concern, age, skin quality and the doctor's assessment.",
      },
      {
        q: "Why see an oculoplastic surgeon for the eye area?",
        a: "The eyelid skin is thin and the eye area is delicate. An oculoplastic surgeon is trained as an eye specialist first, so procedures can be planned with both cosmetic outcome and eye protection in mind.",
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

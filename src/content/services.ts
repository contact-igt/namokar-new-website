import { SITE, type ServiceKey } from "@/config/site";

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

export const SERVICE_CONTENT: Record<Exclude<ServiceKey, "retina" | "lasik">, ServicePageContent> = {
  cataract: {
    key: "cataract",
    metaTitle: "Cataract Surgery in Delhi",
    metaDescription: "Consult Dr. Poonam Jain at Namokar, Ashok Vihar, Delhi, for cataract assessment, surgical planning and personalised guidance on intraocular lens options.",
    h1: "Cataract Surgery for Clearer Vision",
    eyebrow: "Cataract Surgery",
    lead: "Personalised cataract assessment and guidance on small-incision techniques and suitable intraocular lens options, with care planned around your eye health and visual needs.",
    introHeading: "What Is a Cataract?",
    intro: [
      "A cataract is a clouding of the eye's natural lens. It reduces the amount and quality of light reaching the retina and can cause blurred vision, increased glare and reduced contrast.",
      "Cataracts commonly develop with age but may also be associated with diabetes, eye injuries, prolonged steroid use, previous eye surgery or other medical conditions. They can affect one or both eyes and progress at different rates.",
      "Cataract surgery removes the cloudy natural lens and usually replaces it with a clear artificial lens called an intraocular lens (IOL).",
      "Not every cataract requires immediate surgery. The decision depends on the effect on your daily activities, overall eye health and clinical examination findings.",
    ],
    seekHelp: {
      heading: "Common Signs and Symptoms of Cataracts",
      items: [
        "Gradually blurred, cloudy or dim vision",
        "Increased glare from sunlight or headlights",
        "Difficulty seeing at night or in low light",
        "Halos around lights",
        "Colours appearing faded or yellowish",
        "Frequent changes in spectacle prescription",
        "Double vision in one eye",
        "Difficulty reading, driving or recognising faces",
      ],
      note: "Age-related cataracts usually cause gradual, painless vision changes. Sudden vision loss, severe eye pain, new flashes or floaters, a curtain-like shadow across your vision or an eye injury require urgent medical assessment. Do not wait for a routine cataract consultation.",
    },
    journeyLead: "Understand the stages of cataract care, from your initial consultation to treatment planning and postoperative follow-up.",
    journey: [
      {
        title: "Comprehensive Eye Examination",
        text: "Your ophthalmologist evaluates your vision, lens, eye pressure and overall eye health to determine the cause of visual difficulties.",
      },
      {
        title: "Treatment Discussion",
        text: "Discuss whether cataract surgery is appropriate, including potential benefits, risks, alternatives and expected visual outcomes.",
      },
      {
        title: "Preoperative Assessment & Lens Selection",
        text: "Eye measurements help determine intraocular lens power and suitable lens options. Additional investigations may be advised when required.",
      },
      {
        title: "Cataract Surgery",
        text: "If surgery is recommended and you choose to proceed, the surgical technique and intraocular lens are selected according to your clinical needs.",
      },
      {
        title: "Postoperative Care & Follow-up",
        text: "Follow individual instructions regarding eye drops, eye protection, daily activities and scheduled postoperative examinations.",
      },
    ],
    faqs: [
      {
        q: "Do cataracts need surgery straight away?",
        a: "Not always. Early cataracts may be monitored if they do not significantly affect vision or daily activities. Surgery may be recommended when visual difficulties interfere with daily life or when there is another clinical reason for treatment.",
      },
      {
        q: "Can cataracts be treated without surgery?",
        a: "Updated spectacles and improved lighting may help manage early symptoms. No eye drops, medicines or exercises have been established as a way to reverse an existing age-related cataract. Surgery is the definitive treatment when removal is required.",
      },
      {
        q: "What does stitchless cataract surgery mean?",
        a: "Many cataract procedures use small, self-sealing incisions. Stitches may still be required depending on the eye, the surgical technique and individual circumstances.",
      },
      {
        q: "Is cataract surgery painful?",
        a: "Cataract surgery is usually performed under local anaesthesia to minimise discomfort. Some patients may experience pressure or mild discomfort. Your surgeon will discuss the anaesthesia and pain management plan before surgery.",
      },
      {
        q: "What is an intraocular lens (IOL)?",
        a: "An intraocular lens is an artificial lens usually implanted during cataract surgery to replace the cloudy natural lens. Lens designs are chosen according to individual visual needs and eye health.",
      },
      {
        q: "Which intraocular lens is best for me?",
        a: "There is no single lens that is best for everyone. The appropriate lens depends on eye measurements, corneal and retinal health, astigmatism, lifestyle and visual expectations. Your ophthalmologist will discuss suitable options and their limitations.",
      },
      {
        q: "Will I need spectacles after cataract surgery?",
        a: "You may still require spectacles after surgery. Some lens designs can reduce dependence on glasses, but no lens can guarantee complete spectacle independence.",
      },
      {
        q: "Will cataract surgery completely restore my vision?",
        a: "Cataract surgery often improves vision affected by lens clouding. Glaucoma, macular degeneration, diabetic retinopathy, corneal disease and other conditions may limit the extent of improvement.",
      },
      {
        q: "What are the risks of cataract surgery?",
        a: "Potential risks include infection, inflammation, bleeding, raised eye pressure, swelling of the retina or cornea, lens capsule complications and retinal detachment. Serious complications affecting vision are uncommon but possible.",
      },
      {
        q: "How long does recovery take after cataract surgery?",
        a: "Vision may be blurred at first and improve over the following days or weeks. Recovery varies with eye health, the procedure and healing. Follow your surgeon's advice on eye drops, driving, exercise and other activities.",
      },
      {
        q: "Can a cataract come back after surgery?",
        a: "The removed natural lens cannot develop another cataract. The capsule behind the artificial lens may become cloudy months or years later. This is called posterior capsule opacification (PCO) and can often be treated with a YAG laser procedure after assessment.",
      },
      {
        q: "Can both eyes have cataract surgery?",
        a: "Yes, if cataracts affect both eyes and surgery is appropriate. The procedures are commonly planned separately, although same-day surgery may be considered in selected circumstances. Your surgeon will discuss suitable timing.",
      },
      {
        q: "When should I seek urgent help after cataract surgery?",
        a: "Seek urgent ophthalmic assessment if you experience increasing pain, worsening redness, reduced vision, sudden flashes or floaters, or a curtain-like shadow across your vision.",
      },
      {
        q: "What should I bring to my first consultation?",
        a: "Please bring previous eye examination reports, prescriptions, your current spectacles, details of any previous eye surgery and a list of medications you take.",
      },
    ],
    related: ["exams", "glaucoma", "retina"],
  },

  glaucoma: {
    key: "glaucoma",
    metaTitle: "Glaucoma Treatment & Management in Delhi",
    metaDescription: "Glaucoma assessment, diagnosis and personalised management at Namokar Eye & Oculoplasty Centre in Ashok Vihar, Delhi, led by Dr. Poonam Jain.",
    h1: "Glaucoma Detection, Treatment & Vision Protection",
    lead: "Glaucoma often develops without noticeable symptoms. Early detection, appropriate treatment and regular monitoring can help slow disease progression and protect your remaining vision.",
    introHeading: "What Is Glaucoma?",
    intro: [
      "Glaucoma is a group of eye conditions that damage the optic nerve, which carries visual information from the eye to the brain.",
      "Raised pressure inside the eye, known as intraocular pressure (IOP), is an important risk factor. Glaucoma can also develop when eye pressure is within the normal range.",
      "Common forms of glaucoma often develop gradually without noticeable symptoms and can cause irreversible vision loss. Acute angle closure can cause sudden symptoms and rapid damage.",
      "Glaucoma generally requires long-term management. Treatment aims to slow or prevent further optic nerve damage and preserve remaining vision through individualised care and regular follow-up.",
    ],
    seekHelp: {
      heading: "Who Is at Higher Risk of Glaucoma?",
      items: [
        "Increasing age, particularly after 40. Glaucoma can also develop earlier.",
        "Family history of glaucoma",
        "Elevated intraocular pressure",
        "Moderate to high short-sightedness, particularly for open-angle glaucoma",
        "Narrow drainage angles or certain eye anatomies, sometimes associated with long-sightedness",
        "Long-term use of steroid medicines",
        "Previous eye injuries or certain eye conditions",
        "Medical conditions such as diabetes",
      ],
      note: "Sudden severe eye pain, redness, blurred vision, rainbow-coloured halos around lights, headache, nausea or vomiting may indicate acute angle closure. Seek immediate emergency ophthalmic assessment. Do not wait for a scheduled consultation.",
    },
    journeyLead: "Glaucoma management involves clinical assessment, personalised treatment planning and regular monitoring to evaluate disease control and reduce the risk of further vision loss.",
    journey: [
      { title: "Comprehensive Eye Examination", text: "Your ophthalmologist reviews your symptoms, medical history, risk factors and optic nerve health." },
      { title: "Diagnostic Investigations", text: "Appropriate tests may include eye pressure measurement, visual field testing, OCT, gonioscopy and corneal thickness measurement." },
      { title: "Diagnosis & Personalised Care Plan", text: "Your clinical findings, glaucoma type, disease severity and individual risk are considered when planning care." },
      { title: "Individualised Treatment", text: "Suitable eye drops, laser procedures or surgery may be recommended to lower eye pressure and reduce the risk of further damage." },
      { title: "Regular Follow-up & Monitoring", text: "Ongoing assessment helps evaluate treatment effectiveness, identify progression and determine whether adjustments are needed." },
    ],
    faqs: [
      {
        q: "Can glaucoma be cured?",
        a: "Glaucoma generally requires long-term management. Existing optic nerve damage cannot currently be reversed, but appropriate treatment may slow or prevent further damage and help preserve remaining vision.",
      },
      {
        q: "Can I have glaucoma with normal eye pressure?",
        a: "Yes. Normal-tension glaucoma is a form of open-angle glaucoma in which optic nerve damage occurs despite eye pressure measurements being within the normal range. A comprehensive examination is necessary.",
      },
      {
        q: "Does high eye pressure always mean I have glaucoma?",
        a: "No. Elevated eye pressure without detectable glaucomatous damage is called ocular hypertension. Monitoring or treatment may be recommended depending on individual risk.",
      },
      {
        q: "Why is glaucoma called the silent thief of sight?",
        a: "Common forms of glaucoma can damage the optic nerve gradually without pain or noticeable early symptoms. Visual field changes may occur before you become aware of them.",
      },
      {
        q: "What are the early symptoms of glaucoma?",
        a: "Open-angle glaucoma usually has no noticeable early symptoms. Sudden pain, redness, blurred vision, halos, headache, nausea or vomiting may indicate acute angle closure and require immediate emergency eye care.",
      },
      {
        q: "Does glaucoma run in families?",
        a: "A family history increases your risk. If a close relative has glaucoma, tell your ophthalmologist and discuss an appropriate examination schedule.",
      },
      {
        q: "Who is at higher risk of glaucoma?",
        a: "Risk factors include increasing age, family history, elevated eye pressure, certain refractive errors, narrow drainage angles, previous eye injuries and prolonged steroid use. Risk varies by glaucoma type.",
      },
      {
        q: "How is glaucoma diagnosed?",
        a: "Diagnosis includes clinical assessment of the optic nerve and may involve eye pressure measurement, visual field testing, OCT, gonioscopy and corneal thickness measurement. Findings are interpreted together.",
      },
      {
        q: "What treatments are available for glaucoma?",
        a: "General treatment options include prescription eye drops, laser procedures and surgery. The appropriate choice depends on the type and severity of glaucoma and your examination findings. Your clinical team will discuss suitable options and arrangements.",
      },
      {
        q: "Will everyone with glaucoma need surgery?",
        a: "No. Many patients are managed with eye drops, laser treatment or both. Surgery may be recommended earlier in selected cases, including some patients with advanced disease.",
      },
      {
        q: "Can glaucoma treatment restore lost vision?",
        a: "Treatment aims to reduce the risk of further damage. Vision already lost due to glaucoma cannot usually be restored.",
      },
      {
        q: "Can I stop using glaucoma drops when my eye pressure becomes normal?",
        a: "Do not stop or change glaucoma medication without consulting your ophthalmologist. The pressure may be controlled because treatment is working. Stopping medication may increase the risk of further damage.",
      },
      {
        q: "Can glaucoma progress even when eye pressure is controlled?",
        a: "Yes. Regular optic nerve and visual field assessment helps detect progression despite apparently controlled pressure and determine whether treatment should be adjusted.",
      },
      {
        q: "How often should I have glaucoma follow-up visits?",
        a: "Follow-up depends on glaucoma type, severity, treatment response and risk of progression. Your ophthalmologist will recommend an individual monitoring schedule.",
      },
      {
        q: "When should I seek emergency eye care?",
        a: "Sudden severe eye pain, redness, blurred vision, halos around lights, headache, nausea or vomiting may indicate acute angle closure. Seek immediate emergency eye care. Do not wait for a routine appointment.",
      },
    ],
    related: ["exams", "cataract", "retina"],
  },

  exams: {
    key: "exams",
    metaTitle: "Comprehensive Eye Examination in Delhi",
    metaDescription: "Book a comprehensive eye examination at Namokar in Ashok Vihar, Delhi, for vision assessment, eye health evaluation and personalised clinical guidance.",
    h1: "Comprehensive Eye Examinations for Better Eye Health",
    lead: "Go beyond checking your spectacle prescription with a detailed assessment of your vision, eye health and visual function. Early detection and personalised guidance can help protect your long-term eye health.",
    introHeading: "What Is a Comprehensive Eye Examination?",
    intro: [
      "A comprehensive eye examination assesses visual clarity, focusing ability, eye alignment and the health of structures inside and around your eyes.",
      "Regular examinations matter for children and adults, including people who see clearly or do not wear spectacles.",
      "Glaucoma and diabetic retinopathy can develop without noticeable symptoms in their early stages. Comprehensive eye examinations can help detect changes and support timely care.",
      "Your ophthalmologist selects examinations and tests based on your age, symptoms, medical and family history, and clinical needs.",
      "Your ophthalmologist explains the findings and any recommended treatment, further tests or follow-up.",
    ],
    seekHelp: {
      heading: "When Should You Have an Eye Examination?",
      items: [
        "Gradual changes in vision or difficulty seeing clearly",
        "Frequent headaches associated with reading or visual tasks",
        "Tired or strained eyes after prolonged screen use",
        "Persistent watering, dryness or eye irritation",
        "Difficulty reading or focusing on nearby objects",
        "Diabetes or other medical conditions that may affect eye health",
        "A family history of glaucoma or other eye diseases",
        "Visual difficulties or suspected longstanding eye misalignment in children",
        "Age-related changes in vision or near focusing",
        "Being overdue for a routine eye examination",
      ],
      note: "Do not wait for a routine eye examination appointment. Seek urgent ophthalmic or emergency medical care.",
    },
    journeyLead: "From your initial consultation to diagnostic assessment and follow-up, each stage is guided by your individual clinical needs.",
    journey: [
      { title: "Before Your Visit", text: "Bring spectacles or contact lens details, previous reports and prescriptions, and a list of medicines. Make a note of concerns you want to discuss." },
      { title: "Medical History & Symptoms", text: "Your ophthalmologist reviews your symptoms, previous eye conditions, general health, medicines and family history." },
      { title: "Comprehensive Eye Assessment", text: "Your vision and eye health are evaluated with appropriate examinations and tests. Pupil dilation may be recommended for a detailed retinal examination." },
      { title: "Understanding Your Results", text: "Your ophthalmologist explains the findings, spectacle requirements and any eye health concerns." },
      { title: "Personalised Treatment & Next Steps", text: "Your doctor explains whether further investigations, corrective lenses, treatment or specialist care may help." },
      { title: "Follow-up & Continued Eye Care", text: "Follow-up depends on your age, clinical findings, medical conditions and risk factors." },
    ],
    faqs: [
      { q: "How often should I have a comprehensive eye examination?", a: "How often you need an examination depends on your age, medical history, eye conditions and risk factors. Diabetes, glaucoma or a family history of eye disease may warrant more frequent examinations." },
      { q: "How is a comprehensive eye examination different from a simple vision test?", a: "A basic vision test primarily assesses visual clarity and spectacle requirements. A comprehensive examination also assesses eye health, including structures such as the cornea, lens, retina and optic nerve." },
      { q: "Can an eye examination detect problems before symptoms appear?", a: "Yes. Glaucoma and diabetic retinopathy can develop without noticeable early symptoms. Appropriate examinations can help identify these changes." },
      { q: "Do I need an eye examination if my vision is clear?", a: "Yes. Eye disease can be present even when you see clearly. Your ophthalmologist can recommend a schedule based on your age, medical history and risk." },
      { q: "Will I need drops to dilate my pupils?", a: "Dilation may help your ophthalmologist examine the retina and optic nerve. Drops can temporarily blur vision and increase light sensitivity. Avoid driving until the effects have worn off and your vision is safe for driving." },
      { q: "Is a comprehensive eye examination painful?", a: "Most routine examinations are comfortable and non-invasive. Some drops or tests may cause brief discomfort. Tell the clinical team if you feel discomfort." },
      { q: "Should children have regular eye examinations?", a: "Children should receive age-appropriate vision screening even without symptoms. A comprehensive examination may be recommended after an abnormal screening result, if squint is suspected, or if other risk factors are present." },
      { q: "Can a comprehensive eye examination detect squint?", a: "Testing eye alignment, movement and visual function can help identify squint or strabismus. Further assessment may be needed to determine the cause and appropriate care." },
      { q: "Should people with diabetes have regular eye examinations?", a: "Yes. Diabetes can affect the retina before symptoms appear. Regular retinal examinations are important. Timing depends on the type and duration of diabetes, previous findings and your doctor's recommendations." },
      { q: "Does normal eye pressure mean I do not have glaucoma?", a: "No. Glaucoma can occur at normal measured eye pressure. Optic nerve assessment and other appropriate tests may be needed." },
      { q: "Will I receive a spectacle prescription after my examination?", a: "If a refraction is performed and corrective lenses are appropriate, you may receive a prescription. The doctor will also explain whether any eye condition needs further attention." },
      { q: "What should I bring to my first eye examination?", a: "Bring your current spectacles or contact lens details, previous reports and prescriptions, relevant medical records and a list of medicines." },
      { q: "When should I seek urgent eye care instead of a routine examination?", a: "Sudden vision loss, severe eye pain, new flashes, a sudden increase in floaters, a curtain-like shadow, sudden double vision, new eye misalignment, eye injury or chemical exposure need urgent assessment. Seek emergency eye or medical care immediately." },
      { q: "How do I arrange an eye examination at Namokar?", a: `Please call Namokar Eye & Oculoplasty Centre on ${SITE.phone.display}. Our team will help you arrange a suitable appointment.` },
    ],
    related: ["glaucoma", "retina"],
  },

  eyelid: {
    key: "eyelid",
    metaTitle: "Blepharoplasty & Eyelid Surgery in Delhi",
    metaDescription: "Consult Dr. Poonam Jain at Namokar, Delhi, for upper and lower eyelid blepharoplasty assessment, functional eyelid care and aesthetic surgery options.",
    h1: "Functional & Aesthetic Eyelid Surgery in Delhi",
    lead: "Specialised assessment and personalised surgical care for excess eyelid skin, hooded upper eyelids and under-eye bags, with careful consideration of eye health, eyelid function and appearance.",
    introHeading: "What Is Blepharoplasty?",
    intro: [
      "Blepharoplasty addresses excess skin, protruding fat and, when appropriate, muscle tissue in the upper or lower eyelids.",
      "Upper eyelid surgery may help when excess skin obstructs the upper visual field. The incision is commonly placed in the natural eyelid crease. Lower eyelid surgery addresses selected under-eye bags and excess skin, with an incision beneath the lashes or inside the lower eyelid depending on the technique.",
      "Ageing, inherited characteristics and medical factors can all affect the eyelids. An assessment distinguishes excess skin from ptosis, brow descent and other causes before any treatment is recommended.",
      "Planning considers anatomy, eyelid support and closure, tear-film stability, ocular surface health and individual goals. Dark circles, swelling and a low eyelid margin may need different care.",
    ],
    seekHelp: {
      heading: "When Should You Consider an Eyelid Assessment?",
      items: [
        "Heavy or hooded upper eyelids",
        "Excess skin obstructing part of your vision",
        "Frequently raising your eyebrows to see clearly",
        "Difficulty keeping the eyelids comfortably open",
        "Upper eyelid skin resting on the eyelashes",
        "Persistent under-eye bags or excess lower eyelid skin",
        "Gradual changes in eyelid position or symmetry",
        "Age-related changes around the eyes",
      ],
      note: "Sudden eyelid drooping, especially with double vision, severe headache, eye pain, unequal pupils or other neurological symptoms, can indicate a serious medical condition. Seek immediate emergency medical assessment. Do not wait for a routine consultation.",
    },
    journeyLead: "Every treatment recommendation begins with a detailed assessment of your eyelids, eye health, medical history and individual concerns.",
    journey: [
      { title: "Consultation & Medical History", text: "Discuss your concerns, medical conditions, medicines, allergies, thyroid disease and previous eye or eyelid surgery." },
      { title: "Detailed Oculoplastic Examination", text: "Assess eyelid position, skin, fat distribution, brow position, eyelid movements, closure and ocular surface health. Visual field testing may be recommended if function is affected." },
      { title: "Realistic Treatment Expectations", text: "Understand the cause, what surgery may improve and which concerns may need a different approach." },
      { title: "Benefits, Risks & Alternatives", text: "Discuss suitable procedures, possible complications, expected benefits and alternatives, including monitoring." },
      { title: "Informed Treatment Decision", text: "Decide whether to proceed after discussing the limitations, expected recovery and individual risks." },
      { title: "Surgical Planning & Follow-up", text: "If surgery is suitable, receive preparation instructions, postoperative care guidance and a follow-up schedule." },
    ],
    faqs: [
      { q: "What is blepharoplasty?", a: "Blepharoplasty addresses excess skin and selected underlying tissues in the upper or lower eyelids for functional or aesthetic reasons, or both." },
      { q: "Is blepharoplasty the same as ptosis surgery?", a: "Blepharoplasty addresses excess eyelid tissue. Ptosis surgery raises an abnormally low upper eyelid margin. Repair techniques and the eyelid-elevating structures involved depend on the cause. Some people may need both procedures." },
      { q: "Is blepharoplasty only cosmetic?", a: "Upper blepharoplasty may be considered when excess skin obstructs the upper visual field or for aesthetic reasons. An assessment guides the choice." },
      { q: "Who may be suitable for eyelid surgery?", a: "Suitability depends on eyelid anatomy, ocular surface health, medical history, general health and treatment goals. Another procedure or non-surgical care may be more appropriate." },
      { q: "Can upper and lower eyelid surgery be performed together?", a: "Yes, in selected patients. Timing depends on the surgical plan, eye health and general health." },
      { q: "Can blepharoplasty improve my vision?", a: "Upper blepharoplasty may improve the upper visual field when excess skin obstructs it. It does not correct refractive errors or treat cataract, glaucoma or retinal disease." },
      { q: "Can blepharoplasty remove under-eye bags and dark circles?", a: "Surgery may address bags caused by protruding fat or excess skin. Pigmentation, fluid retention and anatomical shadows may need different care." },
      { q: "Will I have visible scars after eyelid surgery?", a: "Upper incisions are usually placed within the natural crease. Lower incisions may be beneath the lashes or inside the lid. Scarring and healing vary." },
      { q: "Can eyelid surgery affect dry eyes?", a: "Surgery can cause or worsen dryness and irritation, particularly if eyelid closure or tear-film stability is affected. Symptoms can occasionally persist. Preoperative ocular surface assessment is important." },
      { q: "Is blepharoplasty painful?", a: "Anaesthesia helps minimise discomfort during surgery. Mild tightness or tenderness can occur during recovery. Severe or worsening pain needs urgent assessment." },
      { q: "How long does recovery take after blepharoplasty?", a: "Bruising and swelling often improve over one to two weeks. Residual swelling and complete healing can take longer. Follow your surgeon's instructions." },
      { q: "Will the results of eyelid surgery last forever?", a: "Changes can be long-lasting, and eyelids and surrounding tissues continue to age. Appearance and function may change over time." },
      { q: "What are the risks of blepharoplasty?", a: "Risks include bleeding, infection, scarring, asymmetry, persistent dryness, incomplete eyelid closure, abnormal lid position and further surgery. Rare bleeding behind the eye can threaten vision and requires emergency treatment." },
      { q: "When should I seek urgent medical care after eyelid surgery?", a: "Sudden reduced vision, severe or worsening pain, rapidly increasing swelling, bulging of the eye, significant bleeding or new double vision need immediate medical assessment. Contact your surgeon immediately or seek emergency ophthalmic care if the team is unavailable." },
      { q: "How do I arrange an eyelid surgery consultation at Namokar?", a: `Call Namokar Eye & Oculoplasty Centre on ${SITE.phone.display} to arrange an assessment with Dr. Poonam Jain.` },
    ],
    related: ["aesthetic", "reconstructive", "exams"],
  },

  aesthetic: {
    key: "aesthetic",
    metaTitle: "Aesthetic Oculoplasty & Periocular Care in Delhi",
    metaDescription: "Consult Dr. Poonam Jain at Namokar, Delhi, for aesthetic oculoplasty, under-eye concerns and personalised surgical and non-surgical periocular care.",
    h1: "Aesthetic Eyelid Surgery & Periocular Rejuvenation",
    lead: "Specialised aesthetic care for the eyelids, under-eye area and surrounding eye structures, with attention to facial harmony, eyelid function and eye health.",
    introHeading: "What Is Aesthetic Oculoplasty?",
    intro: [
      "Aesthetic oculoplasty is an area of ophthalmic plastic surgery focused on the appearance of the eyelids and surrounding facial structures, known as the periocular region.",
      "It addresses concerns such as excess eyelid skin, prominent under-eye bags, fine lines, brow descent, under-eye hollowness and selected age-related changes.",
      "Surgical or non-surgical approaches may be considered based on the cause, anatomy, eye health and aesthetic goals.",
      "The eyelids protect the eyes. Planning considers eyelid closure, tear-film stability and ocular surface health.",
      "Dr. Poonam Jain draws on her ophthalmic experience and specialised oculoplastic training to guide individual treatment decisions.",
    ],
    seekHelp: {
      heading: "Eyelid & Periocular Aesthetic Concerns",
      items: [],
      note: "Sudden eyelid drooping, painful or rapidly increasing swelling, double vision, unequal pupils or sudden changes in vision require urgent medical assessment. Do not wait for a scheduled aesthetic consultation.",
    },
    journeyLead: "Every recommendation begins with an assessment of your eye health, eyelid anatomy, facial structure, medical history and aesthetic concerns.",
    journey: [
      { title: "Consultation & Clinical Assessment", text: "Dr. Poonam Jain reviews your concerns, medical history, previous treatments, eyelid anatomy, eye health and expectations." },
      { title: "Personalised Treatment Planning", text: "Discuss suitable options, expected benefits, limitations, risks and alternatives, including choosing to have no treatment." },
      { title: "Treatment & Informed Decision", text: "If a procedure is appropriate and you choose to proceed after giving informed consent, treatment is planned around your clinical needs." },
      { title: "Aftercare & Follow-up", text: "Receive individual guidance on recovery, medicines, eye care, activity restrictions and follow-up based on the procedure." },
    ],
    faqs: [
      { q: "What is aesthetic oculoplasty?", a: "It is an area of ophthalmic plastic surgery focused on the appearance of the eyelids and surrounding structures while considering eye health and eyelid function." },
      { q: "What is blepharoplasty or eyelid surgery?", a: "Blepharoplasty addresses excess skin and selected underlying tissues. Ptosis correction addresses an abnormally low eyelid margin." },
      { q: "What does under-eye bag correction involve?", a: "Treatment depends on the cause. Lower eyelid surgery may be considered for protruding fat or excess skin. Puffiness from medical conditions may need different care." },
      { q: "Can aesthetic oculoplasty treat dark circles?", a: "Dark circles can result from pigmentation, visible vessels, shadows, hollowness or other causes. Treatment depends on the cause, and no single procedure suits every type." },
      { q: "What is the difference between botulinum toxin and dermal fillers?", a: "Botulinum toxin temporarily reduces activity in selected facial muscles and may soften expression lines. Fillers add volume to selected areas. Each has distinct indications and risks." },
      { q: "Are botulinum toxin, fillers or threads suitable for everyone?", a: "Suitability depends on the concern, anatomy, eye health, medical history and the procedure. Each has different benefits, limitations and risks. Ask which options are suitable and available." },
      { q: "Are dermal fillers around the eyes risk-free?", a: "Possible complications include swelling, lumps, infection and asymmetry. Rare vascular blockage can cause tissue damage, permanent vision loss or stroke." },
      { q: "Can aesthetic treatments affect my eyes or vision?", a: "Depending on the treatment, complications can include dryness, eyelid position changes, incomplete closure or double vision. Rare serious complications can threaten vision." },
      { q: "Why consult an oculoplastic surgeon for eyelid concerns?", a: "An oculoplastic surgeon is an ophthalmologist with specialised training in the eyelids, tear-drainage system, eye socket and surrounding structures. They consider eye function as well as appearance." },
      { q: "Will aesthetic oculoplasty make my eyes look perfectly symmetrical?", a: "Natural asymmetry, anatomy, ageing and healing affect outcomes. Your doctor will discuss realistic goals and limitations." },
      { q: "How long do aesthetic treatment results last?", a: "Duration varies by procedure, product, anatomy and ageing. Non-surgical effects are generally temporary. Surgical changes may last longer." },
      { q: "How much recovery time should I plan for?", a: "Recovery depends on the treatment and individual healing. Your doctor will explain expected swelling or bruising, activity restrictions, follow-up and when to return to work." },
      { q: "What should I bring to my aesthetic consultation?", a: "Bring previous eye reports, a medication and eye-drop list, details of past aesthetic treatments or surgery, and your questions." },
      { q: "When should I seek urgent care after an aesthetic procedure?", a: "Seek emergency care immediately for sudden vision changes, severe eye pain, new double vision, unusual severe pain or skin discolouration after filler, difficulty swallowing or breathing after botulinum toxin, or stroke symptoms." },
      { q: "How do I arrange an aesthetic oculoplasty consultation?", a: `Call Namokar Eye & Oculoplasty Centre on ${SITE.phone.display} to arrange a consultation with Dr. Poonam Jain.` },
    ],
    related: ["eyelid", "reconstructive", "exams"],
  },

  reconstructive: {
    key: "reconstructive",
    metaTitle: "Reconstructive Oculoplasty & Eyelid Repair in Delhi",
    metaDescription:
      "Consult Dr. Poonam Jain at Namokar, Delhi, for ptosis, eyelid abnormalities, tear-drainage disorders and specialised reconstructive oculoplasty care.",
    h1: "Reconstructive Oculoplasty for Eye Function & Protection",
    eyebrow: "Reconstructive oculoplasty",
    lead: "Specialised assessment and treatment of eyelid abnormalities, tear-drainage disorders and orbital conditions, with a focus on eye protection, functional improvement and individual patient needs.",
    introHeading: "What is reconstructive oculoplasty?",
    intro: [
      "Reconstructive oculoplasty is a specialised area of ophthalmic plastic surgery focused on conditions affecting the eyelids, tear-drainage system, orbit (eye socket) and surrounding eye structures.",
      "It addresses functional and structural abnormalities that may develop due to ageing, congenital conditions, disease, injury or previous surgery.",
      "Treatment aims to protect the eye, improve eyelid function, address tear-drainage problems and restore affected structures where possible. Management may involve medical treatment, supportive care or reconstructive surgery, depending on the underlying condition.",
      "At Namokar, Dr. Poonam Jain’s specialised oculoplastic training supports individualised assessment and treatment planning, with attention to eye health, function and appearance.",
    ],
    seekHelp: {
      heading: "Conditions treated",
      items: [
        "Ptosis or a drooping upper eyelid",
        "Entropion, where the eyelid turns inward and lashes rub against the eye",
        "Ectropion, where the eyelid turns outward and may cause watering or irritation",
        "Dermatochalasis, or excess and sagging eyelid skin",
        "Watering eyes and tear-duct problems",
        "Orbital, eye-socket, eyelid and oculoplastic reconstruction concerns",
      ],
      note: "After an eye injury, or if you notice double vision or a change in how the eye sits, seek urgent medical help.",
    },
    journeyLead: "Care begins with a detailed assessment of your symptoms, eyelid function, tear drainage, ocular surface health and the underlying cause of your condition.",
    journey: [
      {
        title: "Detailed evaluation",
        text: "The doctor examines eyelid position, eye-surface health, tear drainage, vision-related concerns and your symptoms.",
      },
      {
        title: "Diagnosis and planning",
        text: "The plan is based on whether the issue affects comfort, eye protection, vision, appearance or a combination of these.",
      },
      {
        title: "Surgical or medical management",
        text: "Depending on the condition, the doctor may recommend a corrective procedure or another suitable treatment plan.",
      },
      {
        title: "Recovery and follow-up",
        text: "Recovery depends on the condition and procedure performed. Follow-up visits help monitor healing and outcome.",
      },
    ],
    faqs: [
      {
        q: "What is reconstructive oculoplasty?",
        a: "Reconstructive oculoplasty is a specialised area of ophthalmic plastic surgery that addresses functional and structural abnormalities involving the eyelids, tear-drainage system, orbit and surrounding eye structures. Treatment may involve medical management or surgery.",
      },
      {
        q: "What is ptosis?",
        a: "Ptosis is an abnormally low upper eyelid margin. It may be present from birth or develop later due to age-related changes, muscle or nerve disorders, injury or previous surgery. Treatment depends on the underlying cause and effect on visual function.",
      },
      {
        q: "Does every drooping eyelid require surgery?",
        a: "No. Some causes of ptosis require medical or neurological evaluation rather than immediate corrective surgery. The appropriate treatment depends on the underlying cause, eyelid function and effect on vision.",
      },
      {
        q: "Can children develop ptosis?",
        a: "Yes. Ptosis can be present from birth or develop during childhood. Appropriate ophthalmic assessment is important because significant eyelid drooping may interfere with normal visual development.",
      },
      {
        q: "What are entropion and ectropion?",
        a: "Entropion is an inward-turning eyelid that may cause eyelashes to rub against the eye surface. Ectropion is an outward-turning eyelid that may expose the ocular surface and interfere with normal tear drainage.",
      },
      {
        q: "Can entropion or ectropion damage my eyes?",
        a: "Yes. Untreated eyelid malposition may cause persistent irritation, corneal injury, dryness or infection. In severe cases, corneal damage can affect vision. Timely ophthalmic assessment is important.",
      },
      {
        q: "Why do my eyes keep watering?",
        a: "Watering eyes may result from dry eye, irritation, allergies, eyelid abnormalities, excessive tear production or impaired tear drainage. An examination helps identify the cause and determine appropriate treatment.",
      },
      {
        q: "What is a blocked tear duct?",
        a: "A blocked tear duct is an obstruction within the tear-drainage system that prevents tears from draining normally. It may cause persistent watering, discharge or recurrent infections.",
      },
      {
        q: "What is DCR surgery?",
        a: "Dacryocystorhinostomy, or DCR, creates an alternative drainage pathway between the lacrimal sac and the nose to bypass an obstructed nasolacrimal duct. It is recommended only for suitable patients after appropriate assessment.",
      },
      {
        q: "Is reconstructive oculoplasty only about appearance?",
        a: "No. Its primary objectives include improving eyelid function, protecting the ocular surface, addressing tear-drainage problems and reconstructing affected structures. Appearance may also be considered during treatment planning.",
      },
      {
        q: "What is the difference between blepharoplasty and reconstructive eyelid surgery?",
        a: "Blepharoplasty addresses excess eyelid skin and selected underlying tissues. Reconstructive eyelid surgery addresses structural or functional abnormalities such as ptosis, eyelid malposition or eyelid defects. Some patients may require a combination of procedures.",
      },
      {
        q: "What are the risks of reconstructive oculoplasty?",
        a: "Risks vary by procedure and may include bleeding, infection, scarring, dry eye, incomplete eyelid closure, persistent watering, recurrence or the need for additional treatment. Rare serious complications may affect vision.",
      },
      {
        q: "How long does recovery take after reconstructive oculoplasty?",
        a: "Recovery depends on the condition, procedure and individual healing response. Your doctor will provide guidance regarding medications, wound care, daily activities and follow-up examinations.",
      },
      {
        q: "When should I seek urgent medical attention?",
        a: "Sudden eyelid drooping, sudden vision loss, new double vision, severe eye pain, rapidly increasing swelling, bulging of the eye or fever with painful orbital swelling require immediate medical assessment. Sudden drooping with unequal pupils, severe headache or other neurological symptoms can indicate a serious underlying condition. Do not wait for a routine appointment.",
      },
      {
        q: "What should I bring to my first consultation?",
        a: "Bring previous eye reports, medical records, details of earlier eye or eyelid procedures, a list of medications and information about when your symptoms began. You may also prepare questions about your treatment options. Tell your doctor about thyroid or neurological conditions, diabetes, allergies and any supplements or blood thinners. Check with your treating doctors before changing prescribed medication.",
      },
      {
        q: "How do risks differ by procedure?",
        a: "Ptosis correction can leave the eyelid too low or too high, create asymmetry or make closure difficult. Entropion and ectropion can recur after correction. Eyelid reconstruction can alter eyelid closure. Tear-duct surgery can cause nasal bleeding or persistent watering. Orbital surgery can cause altered sensation or double vision. Discuss the specific risks and the possibility of further treatment with your surgeon.",
      },
      {
        q: "What should I do after surgery?",
        a: "Use prescribed drops or ointments as directed, protect the operated area from rubbing or pressure and follow wound-care and activity instructions. Attend your planned reviews. After some tear-duct procedures, you may be advised to avoid forceful nose blowing. If a tube was placed, follow your surgeon’s instructions and avoid adjusting it yourself.",
      },
      {
        q: "Which symptoms need immediate assessment after surgery?",
        a: "Seek immediate medical assessment for sudden vision changes, severe or increasing pain, rapidly increasing swelling, new double vision, eye bulging or significant bleeding, including severe nosebleeds after tear-duct surgery. Increasing redness, fever, discharge or difficulty closing the eyelids also needs prompt assessment. Contact your treating team immediately or seek emergency care if they are unavailable.",
      },
      {
        q: "How are treatment options selected?",
        a: "Ptosis correction may raise the upper eyelid when appropriate. Entropion and ectropion treatment aim to improve eyelid position and protect the eye. Selected eyelid defects may require reconstruction. Tear-duct treatment depends on the location and cause of blockage. Orbital conditions may require imaging, medical management or referral for specialist care. Ask which options are suitable and where care can be arranged.",
      },
    ],
    related: ["eyelid", "aesthetic", "exams"],
  },
};

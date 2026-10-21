# Namokar image direction

Use this guide whenever commissioning or generating a new Namokar website image. It documents the visual cues reviewed from `C:\Invictus_Projects\pixel-eye-web-frontend` on 21 October 2026, adapted for Namokar rather than copied.

## Visual language

- Create warm, premium Indian eye-care editorial photography: real-feeling, calm clinician-and-patient interactions in an airy modern clinic.
- Compose around one clear care moment: a consultation, a non-invasive assessment, or an explanation using an eye model. Keep faces, eye contact, and the relevant clinical context readable at a wide crop.
- Take inspiration from Pixel Eye's approachable Indian care photography, soft blue clinical surfaces, generous breathing room, and friendly treatment scenes. Do not reuse its assets, branding, layouts, or exact compositions.
- Use Namokar's own palette and tone: clean ivory/white, a very subtle warm blush or pale-blue clinic background, charcoal ink (`#243238`), and restrained burnt-orange accents (`#d66b1f` / `#a9440d`). Orange is an accent, never an image-wide filter.
- Match the site image card: horizontal 3:2 source image that crops well to the wide `cinema` treatment, natural daylight, soft contrast, uncluttered background, no visual noise.

## Subject and safety rules

- Represent Indian adults where people are shown. Generated people must be described as fictional in the asset record.
- Do not depict a named clinician unless using a supplied, approved photograph of that clinician.
- Keep care non-invasive for service overviews: no surgery, blood, needles, open wounds, graphic anatomy, before-and-after comparisons, or implied treatment results.
- For reconstructive oculoplasty, prefer an eyelid-position or tear-drainage consultation with an anatomical eye model, tablet, or simple clinical reference. Do not claim a diagnosis or outcome through the image.
- For paired anatomy explainers, use matching numbered callouts and verify every label after generation. If generated text is unreliable, keep the artwork label-free and add the labels in HTML.
- Never generate text, logos, watermarks, UI, signage, or brand marks in the artwork.

## Prompt recipe

State the service, care moment, people, setting, composition, Namokar palette, and exclusions. For example:

> Horizontal premium editorial photograph for an Indian eye-care website: a fictional Indian ophthalmic specialist calmly explaining eyelid position and tear drainage with a small anatomical eye model to an adult Indian patient in a bright, modern clinic. Non-invasive consultation, warm attentive expressions, ivory and pale-blue interior with restrained burnt-orange accents, natural daylight, clean depth of field, spacious composition that crops safely in a wide card. No text, logo, watermark, surgery, needles, blood, before-and-after, or treatment-result claim.

## Asset workflow

1. Generate, inspect, and choose the image that reads clearly at the website's wide crop.
2. Save a versioned, descriptive file in `private-assets/`; do not overwrite a previously approved asset.
3. Register its filename, dimensions, accurate alt text, fictional-people provenance, and approval in `src/config/assets.ts`.
4. Apply it through the existing entry in `src/content/covers.ts`; use a caption that describes the scene, never a clinical result.
5. Record the source and approval in `docs/NAMOKAR_CONTENT_VERIFICATION.md`, then run lint and TypeScript validation.


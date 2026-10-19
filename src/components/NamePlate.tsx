/**
 * Fallback for the doctor's portrait while it is not cleared for use: a typographic
 * name plate. Decorative only (the name and role appear in the text beside it).
 */
export default function NamePlate() {
  return (
    <div className="nameplate" aria-hidden="true">
      <span className="nameplate-mono">PJ</span>
      <span className="nameplate-name">Dr. Poonam Jain</span>
      <span className="nameplate-role">Medical Director &amp; Senior Ophthalmologist</span>
      <span className="nameplate-place">Namokar Eye &amp; Oculoplasty Centre</span>
    </div>
  );
}

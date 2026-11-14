import Image from "next/image";

export default function UnderstandingCataracts() {
  return (
    <section className="uc-section" aria-labelledby="understanding-cataracts-title">
      {/* Decorative background swooshes */}
      <div className="uc-bg-decor" aria-hidden="true">
        <svg viewBox="0 0 1440 800" preserveAspectRatio="none" className="uc-bg-svg">
          <defs>
            <linearGradient id="ucSwoosh1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5DFCA" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#FDF7F2" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="ucSwoosh2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F5DFCA" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FDF7F2" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Top-left curved ribbon */}
          <path d="M 0 0 C 180 30, 280 120, 240 240 C 200 360, 60 380, 0 420 Z" fill="url(#ucSwoosh1)" />
          {/* Bottom-right curved ribbon */}
          <path d="M 1200 800 C 1240 680, 1360 620, 1440 640 L 1440 800 Z" fill="url(#ucSwoosh2)" />
        </svg>
      </div>

      <div className="container uc-container">
        {/* Main Grid: Left copy, Right cards */}
        <div className="uc-grid">
          {/* Left Column: Heading and explanation points */}
          <div className="uc-col-left">
            {/* Kicker with orange dash */}
            <div className="uc-kicker">
              <span className="uc-kicker-bar" aria-hidden="true" />
              <span>COMPREHENSIVE VISION CARE</span>
            </div>

            {/* Main Section Heading */}
            <h2 id="understanding-cataracts-title" className="uc-heading">
              Understanding<br />Cataracts
            </h2>

            {/* Point 1: What is a Cataract? */}
            <div className="uc-point">
              <div className="uc-point-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
                  <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z" />
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19 6l1.5-1.5" stroke="#C25E00" strokeWidth="2.2" />
                  <path d="M21 9h2" stroke="#C25E00" strokeWidth="2.2" />
                </svg>
              </div>
              <div className="uc-point-divider" aria-hidden="true" />
              <div className="uc-point-text">
                <h3 className="uc-point-title">What is a Cataract?</h3>
                <p className="uc-point-desc">
                  A cataract is a clouding of the eye&apos;s natural lens, which can cause blurred or dim vision.
                </p>
              </div>
            </div>

            {/* Point 2: Causes */}
            <div className="uc-point">
              <div className="uc-point-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
                  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z" />
                </svg>
              </div>
              <div className="uc-point-divider" aria-hidden="true" />
              <div className="uc-point-text">
                <h3 className="uc-point-title">Causes</h3>
                <p className="uc-point-desc">
                  Age, eye injuries, certain medicines and diabetes can contribute to cataracts.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual cards layout */}
          <div className="uc-col-right">
            {/* Top Card: Eye Anatomy Illustration */}
            <div className="uc-card uc-card--anatomy">
              <Image
                src="/images/cataract-eye-anatomy.webp"
                alt="Eye anatomy cross-section showing cornea, iris, clear lens, and retina"
                width={926}
                height={440}
                quality={96}
                className="uc-card-img"
              />
            </div>

            {/* Bottom Row: 2 Comparison Cards (Healthy vs Cloudy) */}
            <div className="uc-cards-row">
              {/* Healthy Lens */}
              <div className="uc-card uc-card--half">
                <Image
                  src="/images/cataract-healthy-lens.webp"
                  alt="Close-up photograph of a clear, healthy eye lens"
                  width={444}
                  height={262}
                  quality={96}
                  className="uc-card-img"
                />
              </div>

              {/* Cloudy Lens */}
              <div className="uc-card uc-card--half">
                <Image
                  src="/images/cataract-cloudy-lens.webp"
                  alt="Close-up photograph of an eye with a cloudy lens affected by a cataract"
                  width={442}
                  height={262}
                  quality={96}
                  className="uc-card-img"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner Callout: How cataract surgery helps */}
        <div className="uc-callout">
          <div className="uc-callout-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#C25E00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7.5 12s1.8-3 4.5-3 4.5 3 4.5 3-1.8 3-4.5 3-4.5-3-4.5-3Z" stroke="#C25E00" strokeWidth="1.8" />
              <circle cx="12" cy="12" r="1.5" fill="#C25E00" />
            </svg>
          </div>
          <div className="uc-callout-divider" aria-hidden="true" />
          <div className="uc-callout-content">
            <h3 className="uc-callout-title">How cataract surgery helps...</h3>
            <p className="uc-callout-text">
              Cataract surgery removes the cloudy lens and restores clear, sharp vision.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


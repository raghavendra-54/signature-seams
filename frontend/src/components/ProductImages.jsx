import React from "react";

/**
 * Self-contained ProductImages component using inline styles.
 * This DOES NOT rely on external CSS files.
 *
 * It uses a responsive aspect-box approach so both images are:
 *  - same aspect ratio/box
 *  - responsive width
 *  - capped height so they don't become huge
 *  - object-fit: cover so images keep aspect without distortion
 */

export default function ProductImages({ raw, tailored }) {
  // fallback image (put a small placeholder in public/assets/image.png)
  const fallback = "/assets/image.png";

  // wrapper style for the two image boxes
  const containerStyle = {
    display: "flex",
    gap: 12,
    alignItems: "stretch",
    flexWrap: "wrap"
  };

  // each box's style: aspect ratio + responsive + capped height
  const boxStyle = {
    flex: "1 1 0",
    minWidth: 220,
    // aspectRatio works in modern browsers; we also add maxHeight as cap
    aspectRatio: "4 / 3",
    maxHeight: 320,
    overflow: "hidden",
    borderRadius: 8,
    background: "#f6f7fb",
    boxShadow: "0 6px 12px rgba(20,20,30,0.06)",
    display: "block"
  };

  // img style: fill box and crop with object-fit
  const imgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block"
  };

  // When aspectRatio isn't honored by the browser, we provide a fallback
  // by wrapping with an inner container using the padding-top trick.
  // We'll render the inner fallback only if aspect-ratio isn't supported,
  // but inline code can't detect support reliably; so we include both:
  // the outer box will work in modern browsers; the inner fallback works everywhere.

  const innerFallbackWrapper = {
    position: "relative",
    width: "100%",
    paddingTop: `${(3 / 4) * 100}%`, // 4:3 ratio => 75% padding-top
    overflow: "hidden",
    borderRadius: 8
  };

  const innerFallbackImg = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover"
  };

  const handleImgError = (e) => {
    if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
  };

  return (
    <div style={containerStyle}>
      {/* Box 1 */}
      <div style={boxStyle}>
        <img
          src={raw}
          alt="Before Tailoring"
          style={imgStyle}
          onError={handleImgError}
        />
        {/* fallback layering for browsers that ignore aspectRatio */}
        <div style={innerFallbackWrapper} aria-hidden="true">
          <img src={raw} alt="" style={innerFallbackImg} onError={handleImgError} />
        </div>
      </div>

      {/* Box 2 */}
      <div style={boxStyle}>
        <img
          src={tailored}
          alt="After Tailoring"
          style={imgStyle}
          onError={handleImgError}
        />
        <div style={innerFallbackWrapper} aria-hidden="true">
          <img src={tailored} alt="" style={innerFallbackImg} onError={handleImgError} />
        </div>
      </div>
    </div>
  );
}

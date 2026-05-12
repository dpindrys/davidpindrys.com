/**
 * Lightbox / zoom-modal media: never wider than the container (`max-w-full` / 100%),
 * capped by viewport height; `w-auto` avoids stretching past intrinsic aspect when combined
 * with HTML width/height attributes on the element.
 */
export const ZOOM_MODAL_MEDIA_CLASSNAME =
  "box-border min-w-0 h-auto w-auto max-w-full max-h-[92vh] border-0 object-contain shadow-none";

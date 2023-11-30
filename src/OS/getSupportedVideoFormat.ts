/**
 * Detects the supported video format based on the browser.
 *
 * @returns 'mp4' | 'webm' - The recommended video format for the browser.
 */
export const getSupportedVideoFormat = (): 'mp4' | 'webm' => {
  const video = document.createElement('video');

  // Check for WebM support
  if (
    video.canPlayType('video/webm') === 'probably' ||
    video.canPlayType('video/webm') === 'maybe'
  ) {
    return 'webm';
  }

  // Default to MP4
  return 'mp4';
};

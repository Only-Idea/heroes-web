// Cached WebGL support detection

let result: boolean | null = null;

export function isWebGLSupported(): boolean {
  if (result !== null) return result;
  try {
    const canvas = document.createElement('canvas');
    result = !!(
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    );
  } catch {
    result = false;
  }
  return result;
}

export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

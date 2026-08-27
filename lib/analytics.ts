export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    // Only track meaningful, non-sensitive parameters
    (window as any).gtag('event', eventName, eventParams);
  }
};

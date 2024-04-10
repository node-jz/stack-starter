// src/lib/analytics.js
class TrackingService {
  init() {
    // intialize any 3rd party tracking
    // ex. amplitude.init(import.meta.env['VITE_AMPLITUDE_KEY']);
  }

  identifyUser(id: string, email: string, name: string) {
    if (import.meta.env['DEV'] == true) {
      return;
    }

    // Call identification method of 3rd party tracker(s)
    // ex. amplitude.identify(new amplitude.Identify().set('name', name));
  }

  trackEvent(event: string, properties = {}) {
    //
    if (import.meta.env['DEV'] == true) {
      return;
    }

    // Track an event with 3d party tracker(s)
    // ex. amplitude.track(event, properties);
  }
}

export const tracker = new TrackingService();

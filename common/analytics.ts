import { GA_TRACKING_ID } from './constants';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageView = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

interface EventParams {
  action: Gtag.EventNames | string;
  category?: string;
  label?: string;
  value?: string | number;
  nonInteraction?: boolean; // avoids affecting bounce rate.
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const trackEvent = ({ action, category, label, value, nonInteraction = false }: EventParams) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
    non_interaction: nonInteraction,
  });
};

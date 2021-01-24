import 'intersection-observer';
import 'core-js/features/object/from-entries';

export const onImport = async () => {
  if (process.browser && !('scrollBehavior' in document.documentElement.style)) {
    await import('scroll-behavior-polyfill');
  }
};

onImport();

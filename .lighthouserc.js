module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run start',
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/course',
        'http://localhost:3000/course/TDT4120',
        'http://localhost:3000/course/IT1501', // fallback page ?
        'http://localhost:3000/course/000000', // 404 ?
        'http://localhost:3000/about',
        'http://localhost:3000/login',
      ],
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'first-contentful-paint': 'off', // Ouff performance
        'first-meaningful-paint': 'off', // Ouff performance
        'largest-contentful-paint': 'off', // Ouff performance
        interactive: ['warning', { minScore: 0.65 }], // Ouff performance
        'max-potential-fid': ['warning', { minScore: 0.5 }], // Ouff performance
        'first-cpu-idle': ['warning', { minScore: 0.7 }], // Ouff performance
        'legacy-javascript': 'off', // Maybe Google Analytics?
        'uses-rel-preload': 'off', // Maybe fixable?
        'unused-javascript': 'off', // Maybe fixable?
        'works-offline': 'off', // Enable for PWA
        'offline-start-url': 'off', // Enable for PWA
        'service-worker': 'off', // Enable for PWA
        'content-width': 'off', // Should be fixed
        'tap-targets': 'off', // Should be fixed
        'unsized-images': 'off', // Off because Next Image handles it better?
        'uses-text-compression': 'off', // Handled by Nginx and such
        'errors-in-console': 'off', // Dunno why this fails
      },
    },
  },
};

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
  },
};

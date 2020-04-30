import React, { Fragment } from 'react';

const TECHNICAL_INFO = [
  {
    name: 'React',
    link: 'https://reactjs.org/',
    description: `
      React er et bibliotek for å utvikle dynamiske brukergensesnitt med JavaScript.
      For denne nettsiden brukes det for å generere all HTML og interaktivitet.
    `,
  },
  {
    name: 'NextJS',
    link: 'https://nextjs.org',
    description: `
      NextJS er et rammeverk for React som kan gjøre det mye lettere å lage større prosjekter.
      Rammeverket tilbyr Server Side Rendering (SSR), Static Site Generation (SSG),
      filbasert routing, data fetching, head manipulation og mye mye mer som gjør brukeropplevelsen enda bedre.
    `,
  },
  {
    name: 'Django',
    link: 'https://www.djangoproject.com/',
    description: `
      Django brukes som backend for å håndtere databasekall og datavalidering.
    `,
  },
  {
    name: 'Django Rest Framework',
    link: 'https://www.django-rest-framework.org',
    description: `
      Django Rest Framework brukes som bindeleddet mellom Django og NextJS.
    `,
  },
  {
    name: 'Bootstrap',
    link: 'https://getbootstrap.com/',
    description: `
      Bootstrap benyttes for at siden skal være responsive og tilpasse seg ulike skjermstørrelser.
      Dette gjør at siden også kan brukes på smarttelefoner uten noe ekstra styr.
    `,
  },
  {
    name: 'Victory',
    link: 'https://formidable.com/open-source/victory/',
    description: `
      Victory er et datavisualiseringsbibliotek fra Formidable.
      Biblioteket består av React komponenter som er svært enkle å tegne grafer med.
    `,
  },
];

const DATA_INFO = [
  {
    name: 'Karakterstatistikk',
    link: 'http://www.ntnu.no/karstat/login.do',
    description: `
      Inneholder karakterstatistikk for alle fakultetene på NTNU.
    `,
  },
  {
    name: 'Faginformasjon',
    link: 'http://www.ime.ntnu.no/api',
    description: `
      API som tidligere tilbød informasjon om fagene på NTNU.
    `,
  },
];

const AUTHOR_INFO = [
  {
    name: 'Tor Håkon Bonsaksen',
    link: 'https://github.com/Torrib',
    description: `
      Originalt utviklingsteam.
    `,
  },
  {
    name: 'Håvard Lian',
    link: 'https://github.com/haavardlian',
    description: `
      Originalt utviklingsteam.
    `,
  },
  {
    name: 'Ole Anders Stokker',
    link: 'https://github.com/oleast',
    description: `
      Videreutvikler, omskriving til NextJS/Django Rest Framework.
    `,
  },
  {
    name: 'Petter Rein',
    link: 'https://github.com/PetterRein',
    description: `
      Omskriving fra å hente informasjon fra IME-API til å hente fra NTNUs emnesider.
    `,
  },
  {
    name: 'Drifts- og Utviklingskomiteen i Linjeforeningen Online',
    link: 'https://github.com/dotkom',
    description: `
      Vedlikehold.
    `,
  },
];

const AboutPage = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-8">
          <h1>Teknisk info</h1>
          {TECHNICAL_INFO.map((technology) => (
            <Fragment key={technology.name}>
              <a target="_blank" rel="noopener noreferrer" href={technology.link}>
                <h3>{technology.name}</h3>
              </a>
              <p>{technology.description}</p>
            </Fragment>
          ))}
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          <h1>Informasjon</h1>
          {DATA_INFO.map((source) => (
            <Fragment key={source.name}>
              <a target="_blank" rel="noopener noreferrer" href={source.link}>
                <h3>{source.name}</h3>
              </a>
              <p>{source.description}</p>
            </Fragment>
          ))}
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          <h1>Utviklere</h1>
          {AUTHOR_INFO.map((author) => (
            <Fragment key={author.name}>
              <a target="_blank" rel="noopener noreferrer" href={author.link}>
                <h3>{author.name}</h3>
              </a>
              <p>{author.description}</p>
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default AboutPage;

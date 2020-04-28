import React from 'react';

const ApiInfoPage = () => {
  return (
    <div className="row">
      <div className="col-md-8">
        <h1>Grades API</h1>
        <h2>Nåværende API (v2)</h2>
        <p>
          <a href="https://grades.no/api/v2/docs/">Dokumentasjon for API v2</a>
        </p>
        <h2>Gamle API-endepunkter (v1)</h2>
        <p>Det finnes et gammelt API som skal fases ut på et ubestemt tidspunkt.</p>
        <ul>
          <li>
            /courses/&nbsp;&nbsp;&nbsp;&nbsp;<i>Merk: Tung spørring, laster alle data!</i>
          </li>
          <li>/courses/*code*/</li>
          <li>/courses/*code*/grades/</li>
          <li>/courses/*code*/grades/*semester*/</li>
        </ul>
      </div>
    </div>
  );
};

export default ApiInfoPage;

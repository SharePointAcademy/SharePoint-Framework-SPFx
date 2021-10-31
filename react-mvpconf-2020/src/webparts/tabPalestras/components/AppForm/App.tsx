import * as React from 'react';
import { useState, useEffect } from 'react';
import { Web } from '@pnp/sp';
import './App.css';

export const App: React.FunctionComponent = () => {

  const [palestras, setPalestras] = useState([]);
  const web = new Web(`https://seutenant.sharepoint.com/`);

  useEffect(() => {
    async function listarPalestras() {
      web.lists
        .getByTitle("Palestras")
        .select("ID, Title, Trilha, Palestrante")  
        .items      
        .get()
        .then(items => {
          setPalestras(items);
        },
        (err) => {
          console.log(err);
        });
    }

    listarPalestras();

  }, []);

  return (
    <div id="app">
      <main>
        <h2>Palestras MVPConf 2020</h2>
        <ul>
          {palestras.map(palestra => (
            <li>
              <span className="palestrante">{palestra.Palestrante}</span><br/>
              {palestra.Title}<br/>
              {palestra.Trilha}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );

};

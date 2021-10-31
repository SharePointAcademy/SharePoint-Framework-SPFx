import * as React from 'react';
import './style.css';

function DevItem(props) {
  const { dev } = props;

  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.login} />
        <div className="user-info">
          <strong>{dev.login}</strong>
        </div>
      </header>
      <a href={`https://github.com/${dev.login}`}>Acessar perfil no GitHub</a>
      <p></p>
    </li>
  );
}

export default DevItem;
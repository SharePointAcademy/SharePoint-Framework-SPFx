import * as React from 'react';
import axios from 'axios';

import styles from './ListaDevs.module.scss';
import { IListaDevsProps } from './IListaDevsProps';
import { IDevState } from './devs/IDevState';
import DevItem from './devs/DevItem';

export default class ListaDevs extends React.Component<IListaDevsProps, IDevState> {

  public constructor(props: IListaDevsProps, state: IDevState) {
    super(props);
    this.state = {
      items: [{
        "id": "",
        "login": "",
        "avatar_url": ""
      }]
    };
  }

  public componentDidMount() {
    var reactHandler = this;
    var iniciarDoID = '46784617';
    axios.get(`https://api.github.com/users?since=${iniciarDoID}`)
      .then((response) => {
        // handle success
        reactHandler.setState({
          items: response.data
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });

  }

  public render(): React.ReactElement<IListaDevsProps> {

    return (
      <div className={styles.listaDevs}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <ul>
                {                  
                  
                  this.state.items.map(usuario => (
                    <DevItem key={usuario.id} dev={usuario} />
                  ))
                  
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import styles from './FluentuiHome.module.scss';
import { PrimaryButton } from 'office-ui-fabric-react';

export interface IUserState
{
  nome: string;
  sobrenome: string;
  numero: string;
  cidade: string;
  estado: any;
}

export default class Tab1 extends React.Component<{}, IUserState> {
  constructor(props) { 
    super(props); 

    this.state = { 
      nome: "",
      sobrenome: "",
      numero: "",
      cidade: "",
      estado: "",
    }; 
  } 

  protected setNome(e){
    this.setState({nome: e.target.value});
    console.log("nome: ", e.target.value);
  }

  protected setSobreNome(e){
    this.setState({sobrenome: e.target.value});
    console.log("sobrenome: ", e.target.value);
  }

  protected setNumero(e){
    this.setState({numero: e.target.value});
    console.log("numero: ", e.target.value);
  }

  protected setCidade(e){
    this.setState({cidade: e.target.value});
    console.log("cidade: ", e.target.value);
  }

  protected setEstado(e){
    this.setState({estado: e.target.value});
    console.log("estado: ", e.target.value);
  }


  public render(): React.ReactElement<{}> {
    return (
      <div className={styles.fluentuiHome}>
        <h3>Usuário</h3>
        <TextField label="Nome" value={this.state.nome} onChange={(e) => this.setNome(e)}/>
        <TextField label="Sobrenome" value={this.state.sobrenome} onChange={(e) => this.setSobreNome(e)}/>
        <TextField label="Número" value={this.state.numero} onChange={(e) => this.setNumero(e)}/>
        <TextField label="Cidade" value={this.state.cidade} onChange={(e) => this.setCidade(e)}/>
        <TextField label="Estado" value={this.state.estado} onChange={(e) => this.setEstado(e)}/>
        <br />
        <PrimaryButton text="Save" />
      </div>
    );
  }
}

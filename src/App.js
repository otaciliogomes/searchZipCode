import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import worldwide from './img/worldwide.svg';

class App extends Component {

  state = {
    inputCep : '',
    agoraVai : '',
  }

searchZipCode = async (zipCode) => {
  const { data } = await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`);
  const cep = `End: ${data.logradouro}, ${data.localidade} - ${data.uf} CEP:${zipCode}`
  this.setState({ agoraVai : '' })
  this.setState({ agoraVai : cep })
}


writeText = (searchByZipCode) => {
    let textArray = searchByZipCode.split('');
    let painting = document.querySelector('p');
    textArray.forEach((letter, index) => {
        setTimeout(() => {
          painting.innerHTML += letter;
        }, 75 * index)
    });
}

getSearch = () => {
  const { inputCep } = this.state;
  this.searchZipCode(inputCep)
  this.essporra()

}

essporra = () => {
  const { agoraVai } = this.state;
  this.writeText(agoraVai);
}


vaiDarCerto = (event) => {
  this.setState({ inputCep : event.target.value })
}


render(){
  return (
    <div className="container">
        <header>
          <img src={worldwide} alt="Mundo"/>
        </header>
        <main>
            <label htmlFor="cep">CEP</label>
            <input type="text" className="cep" maxLength="8" onChange={this.vaiDarCerto} class="form-control cep-mask" placeholder="Ex.: 00000-000"/>
            <button type="button" onClick={this.getSearch} >Pesquisar</button>
        </main>
        <aside>
          <p></p>
        </aside>
    </div>
  );
}

}

export default App;

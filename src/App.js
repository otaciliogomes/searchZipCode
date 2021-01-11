import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import worldwide from './img/worldwide.svg';
import search from './img/big-search-len.svg';

class App extends Component {

  state = {
    inputCep : '',
    agoraVai : '',
  }

searchZipCode = async (zipCode) => {
  const { data } = await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`);
  const cep = `End: ${data.logradouro}, ${data.localidade} - ${data.uf} CEP:${zipCode}`
  this.setState({ agoraVai : cep })
}


writeText = (searchByZipCode) => {
    let textArray = searchByZipCode.split('');
    let painting = document.querySelector('h1');
    textArray.forEach((letter, index) => {
        setTimeout(() => {
          painting.innerHTML += letter;
        }, 75 * index)

        let apagarTexto = document.querySelector('input');
        apagarTexto.value = ''

    });
}

getSearch = () => {
  const verificarInput = document.querySelector('input')
  let texth1 = document.querySelector('h1')
  if (verificarInput.value == '' || verificarInput.value == null) {
    texth1.innerHTML = ''
  } else {
    const { inputCep } = this.state;
    this.searchZipCode(inputCep)
    this.essporra()
  }
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
        </header>
        <h2>CEP</h2>
        <main>
            <input type="text" className="cep" maxLength="8" onChange={this.vaiDarCerto} placeholder="Ex.: 00000-000"/>
            <p>|</p>
            <img src={search} onClick={this.getSearch} alt="Pesquisar"/>
        </main>
        <aside>
          <h1></h1>
        </aside>
    </div>
  );
}

}

export default App;

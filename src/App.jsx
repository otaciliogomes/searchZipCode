import React, { Component , Fragment} from 'react';
import './App.css';
import axios from 'axios';
import search from './img/big-search-len.svg';

class App extends Component {

  state = {
    zipCode : '',
    zipCodeModified : '',
  }

writeText = (cep) => {
  let textArray = cep.split('');
  let painting = document.querySelector('h1');

  textArray.forEach((letter, index) => {
      setTimeout(() => {
        painting.innerHTML += letter;
      }, 65 * index);
    
  });
}

searchZipCode = async (zipCode) => {
  const { data } = await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`);
  const cep = `End: ${data.logradouro}, ${data.localidade} - ${data.uf} CEP:${zipCode}`
  // console.log(data)
  this.writeText(cep)
}

toggle = () => {
  const blur = document.querySelector('.container')
  blur.classList.toggle('active')
  const popup = document.querySelector('.popup')
  popup.classList.toggle('active')

  let painting = document.querySelector('h1');
  painting.innerText = ''
  // let clearInput = document.querySelector('input[name=cep]')
  // clearInput.innerHTML = ''
}

getSearch = () => {
  const verificarInput = document.querySelector('input')
  let texth1 = document.querySelector('h1')

  if (verificarInput.value === '' || verificarInput.value === null) {
    texth1.innerHTML = ''
  } else {
    const { zipCode } = this.state;
    this.searchZipCode(zipCode)
    this.toggle()
  }
}

getInput = (event) => {
  this.setState({ zipCode : event.target.value })
}


render(){
  return (
    <Fragment>
    <div className="container">
        <div className="card">
          <div>
            <h2>Busca de CEP</h2>
            <p className="text"> Digite o cep desejada para receber o endereço...</p>
            <main>
                <input type="text" className="cep" maxLength="8" onChange={this.getInput} placeholder="Ex.: 00000-000"/>
                <p>|</p>
                <img src={search} onClick={this.getSearch} alt="Pesquisar"/>
            </main>
          </div>
        </div>
    </div>

    <div className="popup">
      <h1></h1>
      <a href="#" onClick={this.toggle}>Close</a>
    </div>
    </Fragment>
  );
}

}

export default App;

import React, { Component } from 'react';
import './App.css';

//Assets
import bannerImage from '../static/header-x2.png';

//Components
import Header from '../components/Header';
import Banner from '../components/Banner';
import Corner from '../components/github/Corner';
import Shelf from '../components/shelf/Shelf';
import Footer from '../components/Footer';
import FloatCart from '../components/floatCart/floatCart';

class App extends Component {
  render() {
    return (
      <div className="App">

        <Header />
        <Corner />
        <Banner src={bannerImage} alt={"Main Banner"} />

        <main>
          <Shelf />
        </main>

        <Footer />
        {/*<FloatCart />*/}        
      </div>
    );
  }
}

export default App;

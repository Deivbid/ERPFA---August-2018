import React, { Component } from 'react';
import './App.css'

//Assets
import bannerImage from '../static/banner.jpg'

//Components
import Banner from '../components/Banner';
import Corner from '../components/github/Corner';
import Shelf from '../components/shelf/Shelf';
import Footer from '../components/Footer';
import FloatCart from '../components/floatCart/floatCart';

class App extends Component {
  render() {
    return (
      <div className="App">

        <Corner />
        <Banner src={bannerImage} alt={"Main Banner"} />

        <main>
          <Shelf />
        </main>

        <Footer />
        <FloatCart />        
      </div>
    );
  }
}

export default App;

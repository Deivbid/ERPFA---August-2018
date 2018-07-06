import React, { Component } from 'react';
import './App.css'

//Assets
import bannerImage from '../static/banner.jpg'

//Components
import Banner from '../components/Banner';
import Corner from '../components/github/Corner';
import Shelf from '../components/shelf/Shelf';
import Footer from '../components/footer';

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
      </div>
    );
  }
}

export default App;

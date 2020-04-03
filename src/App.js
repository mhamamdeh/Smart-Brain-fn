import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import Rank from './components/rank/Rank';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import Singin from './components/singin/Singin';
import Registration from './components/registration/Registration';
import Particles from 'react-particles-js';
import './App.css';



const particlesOptions = {
                particles: {
                  number: {
                    value: 30,
                    density: {
                      enable: true,
                      value_area: 250
                    }
                  }
                }
              }

class App extends Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: [{
      }],
      route: 'signin',
      isSingedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }


  loadUser = (data) => {
    this.setState({user: {
      id: data.ID,
      name: data.NAME,
      email: data.EMAIL,
      entries: data.ENTRIES,
      joined: data.JOINED
    }
  });
  }


  calculateFaceLocation2 = (data2) => { 
    const {box} = this.state;
    const image = document.getElementById('inputImage');
    const width  = Number(image.width);
    const height = Number(image.height);
    for(var i=0 ; i < data2.outputs[0].data.regions.length ; i++) {
      var clarifaiFace = data2.outputs[0].data.regions[i].region_info.bounding_box;
      var x = {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        buttomRow: height - (clarifaiFace.bottom_row * height)
      }
      // if(i === 0) {
      //   this.setState({box: x})
      //   console.log('1')
      // }else {
        console.log('2')
        box.push(x)
        // box.shift()
      // }
    }
      return this.state.box;
  }
  

  calculateFaceLocation = (date) => {
   
    const clarifaiFace = date.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width  = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      buttomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

    
  onChangeRoute = (route) => {
    if(route === 'signin') {
      this.setState({isSingedIn: false})
      this.setState({imageUrl: ''})
    }else if(route === 'home'){
      this.setState({isSingedIn: true})
    }
    this.setState({route: route})
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonClick = () => {
    this.setState({imageUrl: this.state.input});
    fetch('https://fast-reef-20722.herokuapp.com/imageUrl' , {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              input: this.state.input
          })
    })
    .then(response => response.json())
    .then(response => {
      if(response) {
        fetch('https://fast-reef-20722.herokuapp.com/image' , {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user , {entries: count}))
        })
      }
      // this.displayFaceBox(this.calculateFaceLocation2(response))
      this.calculateFaceLocation2(response)
    })
    .catch(err => console.log(err));
  } 

  render() {
    const {isSingedIn , route , box , imageUrl} = this.state;
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions}/>
        <Navigation isSingedIn={isSingedIn} onChangeRoute={this.onChangeRoute}/>
        {route === 'home' ?
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm onInputChange={this.onInputChange} onButtonClick={this.onButtonClick}/>
            <FaceRecognition box={box} imageUrl={imageUrl}/>
          </div> :
          (route === 'signin' ?
            <Singin loadUser={this.loadUser} onChangeRoute={this.onChangeRoute}/> :
            <Registration loadUser = {this.loadUser} onChangeRoute={this.onChangeRoute}/>
            
          )
         
        }
      </div>
    );
  }
}

export default App;

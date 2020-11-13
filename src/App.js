import React, { Component } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import ScrubBar from './components/scrubBar/scrubBar.jsx';
import NavButton from './components/navButton/navButton.jsx';
import SearchModule from './components/searchModule/searchModule.jsx';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchQuery: "Example",
      body: "",
      songs: [],
    }
  }

  componentDidMount() {
    this.getSong();
  }

  async getSong() {

    const response = await fetch(`https://cherrymusic-api.herokuapp.com/${this.state.searchQuery}`)
    const data = await response.json()

    console.log(data);
    this.state.songs = [];

    data.forEach(song => {

      const songSchema = {
        songName: "",
        songPicture: "",
        isSearching: false
      }

      songSchema.songName = song.result.full_title;
      songSchema.songPicture = song.result.song_art_image_thumbnail_url;

      let joined = this.state.songs.concat(songSchema)
      this.setState({songs: joined})
    })

    console.log(this.state.songs);

  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  }

  handleClickOutside(e) {
    if(this.state.isSearching){
      this.setState({isSearching: false})
    }
  }

  handleSearch(e) {
    console.log(e.target.value);
    this.setState({searchQuery: e.target.value}, () => {
      this.getSong();
    });
  }

  render() {
    return (
      <div className="main">

      <OutsideClickHandler onOutsideClick={(e) => this.handleClickOutside()}>
        <SearchModule onChange={(e) => this.handleSearch(e)} isVisible={this.state.isSearching}/>
      </OutsideClickHandler>

        <div className="sideNav">
          <NavButton text="Home" />
          <NavButton text="Search" onClick={() => this.setState({isSearching: !this.state.isSearching}, () => {
            console.log(this.state.isSearching);
          })} />
        </div>

        <div className="content">
          {
            this.state.songs.map(song =>
            <div className="contentItem">
              <img src={song.songPicture} className="contentItemPicture"></img>
              <div className="contentItemName">{song.songName}</div>
            </div>
          )
          }
        </div>

        <ScrubBar className="scrubBar" />

      </div>
    );
  }

}

export default App;

import React, { Component, PropTypes } from 'react';

import MobileInfiniteScroll from './MobileInfiniteScroll';
import MobileSongListItem from './MobileSongListItem';
import Spinner from './Spinner';

import { fetchSongsIfNeeded } from '../actions/playlists';
import { playSong } from '../actions/player';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  playingSongId: PropTypes.number,
  playlist: PropTypes.string.isRequired,
  playlists: PropTypes.object.isRequired,
  songs: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

class MobileSongList extends Component {
  playSong(playlist, i, e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(playSong(playlist, i));
  }

  renderSongsListItems() {
    const { playingSongId, playlist, playlists, songs, users } = this.props;
    if (!(playlist in playlists)) {
      return null;
    }

    return playlists[playlist].items.map((songId, i) => {
      const song = songs[songId];
      const user = users[song.user_id];
      const playSongFunc = this.playSong.bind(this, playlist, i);

      return (
        <MobileSongListItem
          isActive={song.id === playingSongId}
          playSong={playSongFunc}
          song={song}
          user={user}
          key={`${songId}-${i}`}
        />
      );
    });
  }

  renderSpinner() {
    const { playlist, playlists } = this.props;

    if (!(playlist in playlists) || playlists[playlist].isFetching) {
      return <Spinner />;
    }

    return null;
  }

  render() {
    const { dispatch, playlist } = this.props;
    const scrollFunc = fetchSongsIfNeeded.bind(null, playlist);

    return (
      <MobileInfiniteScroll
        className="mobile-songs"
        dispatch={dispatch}
        scrollFunc={scrollFunc}
      >
        { this.renderSongsListItems() }
        { this.renderSpinner() }
      </MobileInfiniteScroll>
    );
  }
}

MobileSongList.propTypes = propTypes;

export default MobileSongList;

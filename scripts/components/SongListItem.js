import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { getImageUrl } from '../utils/SongUtils';
import { IMAGE_SIZES } from '../constants/SongConstants';
import { addCommas } from '../utils/FormatUtils';

import TogglePlayButtonContainer from '../containers/TogglePlayButtonContainer';
import Link from './Link';
import SongHeartCount from './SongHeartCount';
import Waveform from './Waveform';

const propTypes = {
  authed: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  player: PropTypes.object.isRequired,
  playSong: PropTypes.func.isRequired,
  song: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

class SongListItem extends Component {
  renderTogglePlayButton() {
    const { isActive, playSong } = this.props;

    if (isActive) {
      return <TogglePlayButtonContainer />;
    }

    return (
      <div className="toggle-play-button" onClick={playSong}>
        <i className="toggle-play-button-icon ion-ios-play" />
      </div>
    );
  }

  render() {
    const { authed, dispatch, isActive, player, playSong, song, user } = this.props;
    const image = getImageUrl(song.artwork_url, IMAGE_SIZES.LARGE);

    return (
      <div
        className={classNames({
          'song-list-item': true,
          active: isActive,
        })}
      >
        <div
          className="song-list-item-image"
          style={{ backgroundImage: `url(${image})` }}
        >
          { this.renderTogglePlayButton() }
        </div>
        <div className="song-list-item-info">
          <Link
            className="song-list-item-title"
            dispatch={dispatch}
            route={{ path: ['songs', song.id] }}
          >
            { song.title }
          </Link>

          <div className="song-list-item-info-extra">
            <div className="song-list-item__user">
              <div
                className="song-list-item-user-image"
                style={{ backgroundImage: `url(${getImageUrl(user.avatar_url)})` }}
              />

              <Link
                className="song-list-item-username"
                dispatch={dispatch}
                route={{ path: ['users', song.user_id] }}
              >
                { user.username }
              </Link>
            </div>

            <div className="song-list-item-stats">
              <SongHeartCount
                authed={authed}
                count={song.favoritings_count}
                dispatch={dispatch}
                songId={song.id}
              />
              <div className="song-list-item-stat">
                <i className="icon ion-play" />
                <span>{ addCommas(song.playback_count) }</span>
              </div>
              <div className="song-list-item-stat">
                <i className="icon ion-chatbubble" />
                <span>{ addCommas(song.comment_count) }</span>
              </div>
            </div>
          </div>
        </div>
        <div className="song-list-item-waveform">
          <Waveform
            currentTime={player.currentTime}
            dispatch={dispatch}
            duration={song.duration}
            isActive={isActive}
            playSong={playSong}
            waveformUrl={song.waveform_url.replace('https', 'http')}
          />
        </div>
      </div>
    );
  }
}

SongListItem.propTypes = propTypes;

export default SongListItem;

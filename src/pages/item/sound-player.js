import React, { Component } from 'react';
import {Howl} from 'howler';
import { navigate, withPrefix } from "gatsby"

import playerBackground from '../../assets/svg/player/player-background2.png';

import playPauseTogglePaused from '../../assets/svg/player/player-play-pause-toggle.svg';
import playPauseToggleHover from '../../assets/svg/player/player-playpause-hover.svg';
import playPauseTogglePlaying from '../../assets/svg/player/player-playpause-focus.svg';

import nextButtonDefault from '../../assets/svg/player/player-next-default.svg';
import nextButtonHover from '../../assets/svg/player/player-next-hover.svg';
import nextButtonFocus from '../../assets/svg/player/player-next-focus.svg';
import prevButtonDefault from '../../assets/svg/player/player-prev-default.svg';
import prevButtonHover from '../../assets/svg/player/player-prev-hover.svg';
import prevButtonFocus from '../../assets/svg/player/player-prev-focus.svg';

import * as styles from './sound-player.module.css';

class SoundPlayer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sound: null,
            currentTrack: 0,
            animationTimeout: null,
            audioLoaded: false,
            initialPlayTimeout: null,
            showPlayPauseAsPlaying: true,
            moveIn: false,
            moveOut: false,
        }
    }

    componentDidMount() {
        const component = this;

        component.setState({
            audioLoaded:false,
            showPlayPauseAsPlaying:true
        });

        component.prepareHowl(component, 0);
    }

    playSound = () => {
        this.state.sound.play();
    }

    prepareHowl = (component,trackNumber) => {

        if (component.state.sound)
            component.state.sound.unload();

        var sound = new Howl({

            src: [withPrefix(component.props.audio[trackNumber])],

            onload: function() {
                if ((!component.props.prevItems || component.props.prevItems.length === 0) 
                    &&
                    component.state.currentTrack == 0
                )
                {
                    component.props.addFadeInClass();
                    var initialPlayTimeout = setTimeout(component.playSound,3000);
                    component.setState({
                        moveIn:true,
                        initialPlayTimeout: initialPlayTimeout,
                    });
                }
                else
                {
                    this.play();
                }
                // this.play();
                component.props.setAudioLoaded();

                clearTimeout(component.state.animationTimeout);

                component.setState({
                    audioLoaded:true,
                    showPlayPauseAsPlaying:false
                 });
            },

            onplay: function() {
                // if (component.state.currentTrack == component.props.audio.length - 1)
                // {
                //     clearTimeout(this.state.animationTimeout);
                //     var timeoutTime = this.duration() - this.seek() - 1;
                //     if (timeoutTime < 0) timeoutTime = 0;
                //     const fadeTimeout = setTimeout(component.props.addFadeOutClass,timeoutTime * 1000);
                //     component.setState({ animationTimeout:fadeTimeout });
                // }
                
                component.setState({ showPlayPauseAsPlaying:false });
            },

            onpause: function() {
                clearTimeout(component.state.animationTimeout);

                component.setState({ });
            },

            onend: function() {
                if (component.state.currentTrack < component.props.audio.length - 1)
                {
                    component.prepareHowl(component, component.state.currentTrack + 1);
                    component.props.onSwitchToNext();
                    component.setState({ showPlayPauseAsPlaying:true });
                }
                else if (!component.props.nextItem || !component.props.nextItem.length > 0)
                {
                    setTimeout(component.props.addFadeOutClass, 1000);
                    setTimeout(() => {component.setState({ moveOut:true, });}, 2000);
                    setTimeout(component.goHome, 5000);
                    ;
                } else {
                    component.goToNextItem();
                }
                
            }

          });

        component.setState({
            sound: sound,
            currentTrack: trackNumber,
        });
    }

    componentWillUnmount() {
        this.state.sound.unload();
    }

    chooseRandom = array => {
        return array[Math.floor(Math.random() * array.length)];
    }

    onPlay = () => {
        clearTimeout(this.state.initialPlayTimeout);
        this.state.sound.play();
    }

    onPause = () => {
        this.state.sound.pause();
    }

    prevIsAvailable = () => {
        return (this.props.prevItems && this.props.prevItems.length > 0)
    }

    onPrev = () => {
        this.state.sound.unload();
        if (!this.props.prevItems || this.props.prevItems.length === 0) return;
        const lastItem = this.props.prevItems.pop();
        navigate(
            `/item/${lastItem}`,
            {
                state: {
                    prevItems:this.props.prevItems
                },
            }
        );
    }

    nextIsAvailable = () => {
        return (this.props.nextItem && this.props.nextItem.length > 0)
    }

    onNext = () => {
        this.state.sound.unload();
        this.goToNextItem();
    }

    goToNextItem = () => {
        const nextItem = this.chooseRandom(this.props.nextItem);
        const prevItems = this.props.prevItems ? this.props.prevItems : [];
        if (prevItems.length == 0 && this.props.possiblePrevItems.length > 0)
        {
            prevItems.push(this.props.possiblePrevItems[0].node);
        }
        prevItems.push(this.props.slug);
        navigate(
            `/item/${nextItem}`,
            {
                state: {
                    prevItems:prevItems
                },
            }
        );
    }

    goHome = () => {
        const prevItems = this.props.prevItems ? this.props.prevItems : [];
        prevItems.push(this.props.slug);
        navigate(
            `/`,
            {
                state: {
                    prevItems:prevItems
                }
            }
        )
    }

    render() {
        const { sound,
                audioLoaded, showPlayPauseAsPlaying,
                moveIn, moveOut
            } = this.state;

        const loaded = sound && sound.state() === 'loaded';
        const playing = loaded && sound.playing();
        const doMovedOut = (this.props.prevItems == null ||
            this.props.prevItems.length == 0) &&
            !audioLoaded;

        return (
            <div
                className={`${styles.background}
                            ${doMovedOut && styles.movedOut}
                            ${moveIn && styles.moveIn}
                            ${moveOut && styles.moveOut}
                        `}
                style={{ backgroundImage:`url(${playerBackground})` }}
            >
                
                <div className={`${styles.buttonsContainer}`}>
                    <button
                        className={`${styles.prevButton} ${styles.button}`}
                        onClick={this.onPrev}
                        disabled={!this.prevIsAvailable()}
                    >
                        <img
                            src={prevButtonDefault}
                            onMouseOver={e => e.currentTarget.src=prevButtonHover}
                            onMouseOut={e => e.currentTarget.src=prevButtonDefault}
                            onMouseDown={e => e.currentTarget.src=prevButtonFocus}
                        />
                    </button>
                    <button
                        className={`${styles.playPauseToggle} ${styles.button}`}
                        onClick={loaded ? (sound.playing() ? this.onPause : this.onPlay) : null}
                    >
                        <img
                            src={(showPlayPauseAsPlaying) || (loaded && playing) ?
                                playPauseTogglePlaying  :
                                playPauseTogglePaused
                            }
                            onMouseOver={e => e.currentTarget.src=playPauseToggleHover}
                            onMouseOut={e => e.currentTarget.src=(showPlayPauseAsPlaying) || (loaded && playing) ? playPauseTogglePlaying : playPauseTogglePaused  }
                            onMouseDown={e => e.currentTarget.src=(showPlayPauseAsPlaying) || (loaded && playing) ? playPauseTogglePaused : playPauseTogglePlaying }
                        />
                    </button>
                    <button
                        className={`${styles.nextButton} ${styles.button}`}
                        onClick={this.onNext}
                        disabled={!this.nextIsAvailable()}
                    >
                        <img
                            src={nextButtonDefault}
                            onMouseOver={e => e.currentTarget.src=nextButtonHover}
                            onMouseOut={e => e.currentTarget.src=nextButtonDefault}
                            onMouseDown={e => e.currentTarget.src=nextButtonFocus}
                        />
                    </button>
                </div>
                
            </div>
        )
    }
}

export default SoundPlayer;
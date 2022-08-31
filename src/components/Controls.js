import React, { forwardRef } from "react";
import PropTypes from "prop-types"; // checking React props and similar objects;

import './Controls.css';
import { IconButton, Button, Tooltip } from "@mui/material";
import { styled } from '@mui/material/styles';
import { FastForward, FastRewind, Fullscreen, Pause, PlayArrow, VolumeDown, VolumeMute, VolumeUp } from "@mui/icons-material";

// Using for Slider
import Slider from '@mui/material/Slider';
function ValueLabelComponent(props) {
    const { children, value } = props;
    return (
        <Tooltip enterTouchDelay={0} placement="top" title={value}>
            {children}
        </Tooltip>
    );
}

ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    value: PropTypes.number.isRequired,
};

// Slider Design
const PrettoSlider = styled(Slider)({
    color: '#52af77',
    height: 5,
    width: '96%',
    marginLeft: '2%',
    marginRight: '2%',
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 18,
        width: 18,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&:before': {
            display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 32,
        height: 32,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: '#52af77',
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&:before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
        },
        '& > *': {
            transform: 'rotate(45deg)',
        },
    },
});

const Controls = forwardRef((
    {
        onSeek,
        onSeekMouseDown,
        onSeekMouseUp,
        onDuration,
        onRewind,
        onPlayPause,
        onFastForward,
        playing,
        played,
        elapsedTime,
        totalDuration,
        onMute,
        muted,
        onVolumeSeekDown,
        onChangeDispayFormat,
        playbackRate,
        onPlaybackRateChange,
        onToggleFullScreen,
        volume,
        onVolumeChange,
    },
    ref
) => {
    /*const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;*/


    return (
        <div ref={ref} className="controlsWrapper">
            <div className='controlsContainer'>
                {/*Top Icons*/}
                <div className="TopGrid">
                    <div className='TopGridItem'>
                        <text class='title'>Video Title</text>
                    </div>
                </div>

                {/* Middle Icons*/}
                <div className="midContainer">
                    <IconButton
                        onClick={onRewind}
                        className="controlIcons"
                        aria-label="rewind">
                        <FastRewind className="controlIcons" fontSize="large" />
                    </IconButton>
                    <IconButton
                        onClick={onPlayPause}
                        className="controlIcons"
                        aria-label="play"
                    >
                        {playing ? (
                            <Pause fontSize="large" className="controlIcons" />
                        ) : (
                            <PlayArrow fontSize="large" className="controlIcons" />
                        )}
                    </IconButton>
                    <IconButton
                        onClick={onFastForward}
                        className="controlIcons"
                        aria-label="forward"
                    >
                        <FastForward fontSize="large" className="controlIcons" />
                    </IconButton>
                </div>

                {/*Bottom Controls*/}
                <div className="BotGrid">
                    <PrettoSlider
                        min={0}
                        max={100}
                        ValueLabelComponent={(props) => (
                            <ValueLabelComponent {...props} value={elapsedTime} />
                        )}
                        aria-label="custom thumb label"
                        value={played * 100}
                        onChange={onSeek}
                        onMouseDown={onSeekMouseDown}
                        onChangeCommitted={onSeekMouseUp}
                        onDuration={onDuration}
                    />

                    <div className="BotGridItem" xs={12}>
                        <div className="BotButtons">
                            <IconButton
                                onClick={onPlayPause}
                                className='bottomIcons'
                            >
                                {playing ? (
                                    <Pause fontSize="large" className="bottomIcons" />
                                ) : (
                                    <PlayArrow fontSize="large" className="bottomIcons" />
                                )}
                            </IconButton>

                            <IconButton
                                // onClick={() => setState({ ...state, muted: !state.muted })}
                                onClick={onMute}
                                className="bottomIcons" //volumeButton
                            >
                                {muted ? (
                                    <VolumeMute className="bottomIcons" fontSize="large" />
                                ) : volume > 0.5 ? (
                                    <VolumeUp className="bottomIcons" fontSize="large" />
                                ) : (
                                    <VolumeDown className="bottomIcons" fontSize="large" />
                                )}
                            </IconButton>

                            <Slider
                                min={0}
                                max={100}
                                value={muted ? 0 : volume * 100}
                                onChange={onVolumeChange}
                                aria-labelledby="input-slider"
                                className='volumeSlider'
                                onMouseDown={onSeekMouseDown}
                                onChangeCommitted={onVolumeSeekDown}
                            />
                            <Button
                                variant="text"
                                onClick={
                                    onChangeDispayFormat
                                    //     () =>
                                    //   setTimeDisplayFormat(
                                    //     timeDisplayFormat == "normal" ? "remaining" : "normal"
                                    //   )
                                }
                            >
                                <text
                                    variant="body1"
                                    style={{ color: "#fff", marginLeft: 16 }}
                                >
                                    {elapsedTime}/{totalDuration}
                                </text>
                            </Button>
                        </div>

                        {[0.5, 1, 1.5, 2].map((rate) => (
                            <Button
                                key={rate}
                                onClick={() => onPlaybackRateChange(rate)}
                                variant="text"
                            >
                                <text
                                    color={rate === playbackRate ? "secondary" : "inherit"}
                                >
                                    {rate}X
                                </text>
                            </Button>
                        ))}

                        <div className="BotGridItem">
                            <IconButton
                                onClick={onToggleFullScreen}
                                className={'bottomIcons'}
                            >
                                <Fullscreen fontSize="large" className="bottomIcons" />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

})

Controls.propTypes = {
    onSeek: PropTypes.func,
    onSeekMouseDown: PropTypes.func,
    onSeekMouseUp: PropTypes.func,
    onDuration: PropTypes.func,
    onRewind: PropTypes.func,
    onPlayPause: PropTypes.func,
    onFastForward: PropTypes.func,
    onVolumeSeekDown: PropTypes.func,
    onChangeDispayFormat: PropTypes.func,
    onPlaybackRateChange: PropTypes.func,
    onToggleFullScreen: PropTypes.func,
    onMute: PropTypes.func,
    playing: PropTypes.bool,
    played: PropTypes.number,
    elapsedTime: PropTypes.string,
    totalDuration: PropTypes.string,
    muted: PropTypes.bool,
    playbackRate: PropTypes.number,
};

export default Controls;
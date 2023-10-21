'use client'

import ReactSlider from 'react-slider'
import styled from 'styled-components';
import Progressbar from './ProgressBar';
import { ProgressBar } from 'react-bootstrap';

const StyledSlider = styled(ReactSlider)`
    width: 100%;
    height: 25px;
`;

const StyledThumb = styled.div`
    height: 25px;
    line-height: 25px;
    width: 25px;
    text-align: center;
    background-color: #000;
    color: #fff;
    border-radius: 50%;
    cursor: grab;
`;

const Thumb = (props: any, state: any) => <StyledThumb {...props}>{state.valueNow}</StyledThumb>;

const StyledTrack = styled.div`
    top: 0;
    bottom: 0;
    background: ${(props: any) => (props.index === 2 ? '#f00' : props.index === 1 ? '#0f0' : '#f00')};
    border-radius: 999px;
`;

const Track = (props: any, state: any) => <StyledTrack {...props} index={state.index} />;

const StyledContainer = styled.div`
    resize: horizontal;
    overflow: auto;
    width: 50%;
    max-width: 100%;
    padding-right: 8px;
`;

const ResizableSlider = ({ range, setRange, barRange }: { range: { min: number, max: number }, setRange: any, barRange: { lower: number, upper: number } }) => {

    const onChange = (val: number[]) => {
        setRange({ min: val[0], max: val[1] });
    }

    return (
        <StyledContainer>
            <StyledSlider defaultValue={[range.min, range.max]} renderTrack={Track} renderThumb={Thumb} min={barRange.lower} max={barRange.upper} onChange={onChange} />
        </StyledContainer>
    )
};


export default ResizableSlider;
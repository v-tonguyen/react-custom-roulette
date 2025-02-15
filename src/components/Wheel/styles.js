import styled from 'styled-components';

import { NonDraggableImage } from '../common/styledComponents';

export const RouletteContainer = styled.div`
  position: relative;
  width: 80vw;
  max-width: 445px;
  height: 80vw;
  max-height: 445px;
  object-fit: contain;
  flex-shrink: 0;
  z-index: 5;
  pointer-events: none;
`;

export const RotationContainer = styled.div`
  position: absolute;
  width: 100%;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(${props => props.finalRotationDegrees}deg);

  &.started-spinning {
    animation: continueSpin-${({ classKey }) => classKey} ${({
        continueSpinningTime,
      }) => continueSpinningTime / 1000}s linear 0s infinite normal forwards running;
  }

  &.stop-spinning {
    animation: stopSpin-${({ classKey }) => classKey} ${({
        stopSpinningTime,
      }) => stopSpinningTime / 1000}s cubic-bezier(0, 0, 0.35, 1.02) 0s 1 normal
      forwards running;
  }

  @keyframes spin-${({ classKey }) => classKey} {
    from {
      transform: rotate(${props => props.startRotationDegrees}deg);
    }
    to {
      transform: rotate(${props => props.startRotationDegrees + 360}deg);
    }
  }
  @keyframes continueSpin-${({ classKey }) => classKey} {
    from {
      transform: rotate(${props => props.startRotationDegrees}deg);
    }
    to {
      transform: rotate(${props => props.startRotationDegrees + 360}deg);
    }
  }
  @keyframes stopSpin-${({ classKey }) => classKey} {
    from {
      transform: rotate(${props => props.startRotationDegrees}deg);
    }
    to {
      transform: rotate(${props => 1440 + props.finalRotationDegrees}deg);
    }
  }
`;

export const RoulettePointerImage = styled(NonDraggableImage)`
  position: absolute;
  z-index: 5;
  width: 17%;
  right: 6px;
  top: 15px;
`;

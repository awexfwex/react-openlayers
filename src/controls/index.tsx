import { Attribution } from './attribution';
import { Controls } from './controls';
import { FullScreen } from './full-screen';
import { MousePosition } from './mouse-position';
import { OverviewMap } from './overview-map';
import { Rotate } from './rotate';
import { ScaleLine } from './scale-line';
import { Zoom } from './zoom';
import { ZoomSlider } from './zoom-slider';
import { ZoomToExtent } from './zoom-to-extent';

export interface ControlType<T extends ol.control.Control> {
  controlRef?(control: T): void;
}

const control = {
  ScaleLine,
  Attribution,
  FullScreen,
  MousePosition,
  OverviewMap,
  Rotate,
  ZoomSlider,
  ZoomToExtent,
  Zoom,
};

export {
  Controls,
  control
};

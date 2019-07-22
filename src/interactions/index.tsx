import { DoubleClickZoom } from './double-click-zoom';
import { DragAndDrop } from './drag-and-drop';
import { DragBox } from './drag-box';
import { DragPan } from './drag-pan';
import { DragRotate } from './drag-rotate';
import { DragRotateAndZoom } from './drag-rotate-and-zoom';
import { DragZoom } from './drag-zoom';
import { Draw } from './draw';
import { Extent } from './extent';
import { Interactions } from './interactions';
import { KeyboardPan } from './keyboard-pan';
import { KeyboardZoom } from './keyboard-zoom';
import { Modify } from './modify';
import { MouseWheelZoom } from './mouse-wheel-zoom';
import { PinchRotate } from './pinch-rotate';
import { PinchZoom } from './pinch-zoom';
import { Pointer } from './pointer';
import { Select } from './select';
import { Snap } from './snap';
import { Translate } from './translate';

import { Interaction } from 'ol/interaction';

export interface InteractionType<T extends Interaction> {
  active?:boolean
  interactionRef?(ref:T):void,
}

const interaction = {
  DoubleClickZoom,
  DragAndDrop,
  DragBox,
  DragPan,
  DragRotate,
  DragRotateAndZoom,
  DragZoom,
  Draw,
  Extent,
  KeyboardPan,
  KeyboardZoom,
  Modify,
  MouseWheelZoom,
  PinchRotate,
  PinchZoom,
  Pointer,
  Select,
  Snap,
  Translate
};

export {
  Interactions,
  interaction
};


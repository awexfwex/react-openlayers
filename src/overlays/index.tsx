import olOverlay from 'ol/Overlay';

import { Overlay } from './overlay';
import { Overlays } from './overlays';

export interface OverlayType<T extends olOverlay> {
  overlayRef?(layer: T): void;
}

export { 
  Overlays,
  Overlay,
};

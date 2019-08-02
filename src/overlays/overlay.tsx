import * as React from 'react';

import olOverlay, { Options } from 'ol/Overlay';

import { OverlayType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export type OverlayOptions = Options;

export interface OverlayProps extends OverlayOptions, OverlayType<olOverlay> {
  onChange?: ReactOpenlayersEvent;
  onChangeelement?: ReactOpenlayersEvent;
  onChangemap?: ReactOpenlayersEvent;
  onChangeoffset?: ReactOpenlayersEvent;
  onChangeposition?: ReactOpenlayersEvent;
  onChangepositioning?: ReactOpenlayersEvent;
  onPropertychange?: ReactOpenlayersEvent;
}

export interface OverlayEvents extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent;
  'change:element': ReactOpenlayersEvent;
  'change:map': ReactOpenlayersEvent;
  'change:offset': ReactOpenlayersEvent;
  'change:position': ReactOpenlayersEvent;
  'change:positioning': ReactOpenlayersEvent;
  'propertychange': ReactOpenlayersEvent;
}

export class Overlay extends React.Component<OverlayProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public overlay: olOverlay;
  public el: HTMLElement | null;

  public options: OverlayOptions = {
    id: undefined,
    element: undefined,
    offset: undefined,
    position: undefined,
    stopEvent: undefined,
    insertFirst: undefined,
    autoPan: undefined,
    autoPanAnimation: undefined,
    autoPanMargin: undefined
  };

  public events: OverlayEvents = {
    'change': undefined,
    'change:element': undefined,
    'change:map': undefined,
    'change:offset': undefined,
    'change:position': undefined,
    'change:positioning': undefined,
    'propertychange': undefined
  };

  public render() {
    return (
      <div ref={r => { this.el = r; }}>
        {this.props.children}
      </div>
    );
  }

  public componentDidMount() {
    const options = Util.getOptions<OverlayOptions, OverlayProps>(this.options, this.props);
    this.overlay = new olOverlay(options);
    this.context.overlays.push(this.overlay);
    if (this.props.overlayRef) this.props.overlayRef(this.overlay);
  }
}

import * as React from 'react';

import olVector from 'ol/layer/Vector';
import olVectorTile from 'ol/layer/vectortile';

import { LayerType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export interface VectorTileOptions extends ol.olx.layer.VectorTileOptions {
  // Completing missing props fromm official types for v4.6.5
  preload?: number
  declutter?: boolean
}
export interface VectorTileProps extends VectorTileOptions, LayerType<olVector> {
  onChange?: ReactOpenlayersEvent
  onChangeExtent?: ReactOpenlayersEvent
  onChangeMaxResolution?: ReactOpenlayersEvent
  onChangeMinResolution?: ReactOpenlayersEvent
  onChangeOpacity?: ReactOpenlayersEvent
  onChangePreload?: ReactOpenlayersEvent
  onChangeSource?: ReactOpenlayersEvent
  onChangeUseInterimTilesOnError?: ReactOpenlayersEvent
  onChangeVisible?: ReactOpenlayersEvent
  onChangeZIndex?: ReactOpenlayersEvent
  onPostcompose?: ReactOpenlayersEvent
  onPrecompose?: ReactOpenlayersEvent
  onPropertychange?: ReactOpenlayersEvent
  onRender?: ReactOpenlayersEvent
}

export interface VectorTileEvents  extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent
  'change:extent': ReactOpenlayersEvent
  'change:maxResolution': ReactOpenlayersEvent
  'change:minResolution': ReactOpenlayersEvent
  'change:opacity': ReactOpenlayersEvent
  'change:preload': ReactOpenlayersEvent
  'change:source': ReactOpenlayersEvent
  'change:useInterimTilesOnError': ReactOpenlayersEvent
  'change:visible': ReactOpenlayersEvent
  'change:zIndex': ReactOpenlayersEvent
  'postcompose': ReactOpenlayersEvent
  'precompose': ReactOpenlayersEvent
  'propertychange': ReactOpenlayersEvent
  'render': ReactOpenlayersEvent
}

export class VectorTile extends React.Component<VectorTileProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public layer: olVector;

  public options: VectorTileOptions = {
    renderBuffer: undefined,
    renderMode: undefined,
    renderOrder: undefined,
    extent: undefined,
    minResolution: undefined,
    maxResolution: undefined,
    opacity: undefined,
    preload: undefined,
    source: undefined,
    style: undefined,
    updateWhileAnimating: undefined,
    updateWhileInteracting: undefined,
    visible: undefined
  };

  public events: VectorTileEvents = {
    'change': undefined,
    'change:extent': undefined,
    'change:maxResolution': undefined,
    'change:minResolution': undefined,
    'change:opacity': undefined,
    'change:preload': undefined,
    'change:source': undefined,
    'change:useInterimTilesOnError': undefined,
    'change:visible': undefined,
    'change:zIndex': undefined,
    'postcompose': undefined,
    'precompose': undefined,
    'propertychange': undefined,
    'render': undefined
  };

  public render() { return null; }

  public componentDidMount () {
    const options = Util.getOptions<VectorTileOptions, VectorTileProps>(this.options, this.props);
    this.layer = new olVectorTile(options);
    if(this.props.zIndex){
      this.layer.setZIndex(this.props.zIndex);
    }
    this.context.layers.push(this.layer);
    
    if (this.props.layerRef) this.props.layerRef(this.layer);
    
    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.layer.on(eventName, olEvents[eventName]);
    });
  }

  public componentWillReceiveProps(nextProps: VectorTileProps) {
    const options = Util.getOptions<VectorTileOptions, VectorTileProps>(this.options, this.props);

    // Updating options first
    Object.keys(options).forEach((option: string) => {
      if (options[option] === nextProps[option]) return;
      const newVal = nextProps[option];
      switch (option) {
        case 'renderBuffer': this.layer.set('renderBuffer', newVal); break;
        case 'renderMode': this.layer.set('renderMode', newVal); break;
        case 'renderOrder': this.layer.set('renderOrder', newVal); break;
        case 'extent': this.layer.setExtent(newVal); break;
        case 'minResolution': this.layer.setMinResolution(newVal); break;
        case 'maxResolution': this.layer.setMaxResolution(newVal); break;
        case 'opacity': this.layer.setOpacity(newVal); break;
        case 'source': this.layer.setSource(newVal); break;
        case 'style': this.layer.setStyle(newVal); break;
        case 'updateWhileAnimating': this.layer.set('updateWhileAnimating', newVal); break;
        case 'updateWhileInteracting': this.layer.set('updateWhileInteracting', newVal); break;
        case 'zIndex': this.layer.setZIndex(newVal); break;
        case 'visible': this.layer.setVisible(newVal); break;
        default:
      }
    });

    if (nextProps.layerRef && nextProps.layerRef !== this.props.layerRef) {
      nextProps.layerRef(this.layer);
    }

    // Then update events
    const oldEvents = Util.getEvents(this.events, this.props);
    const newEvents = Util.getEvents(this.events, nextProps);
    Object.keys(this.events).forEach((eventName:string) => {
      if (oldEvents[eventName]) this.layer.un(eventName, oldEvents[eventName]);
      if (newEvents[eventName]) this.layer.on(eventName, newEvents[eventName]);
    })
  }
  
  public componentWillUnmount () {
    this.context.map.removeLayer(this.layer);
  }
}
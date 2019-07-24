import * as React from 'react';

import olTile from 'ol/layer/tile';
import olOSMSource from 'ol/source/osm';

import { LayerType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { Omit, ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export type TileOptions = layer.TileOptions;
export interface TileProps extends Omit<TileOptions, 'source'>, LayerType<olTile> {
  source?: TileOptions['source']
  onChange?:ReactOpenlayersEvent
  onChangeExtent?:ReactOpenlayersEvent
  onChangeMinResolution?:ReactOpenlayersEvent
  onChangeMaxResolution?:ReactOpenlayersEvent
  onChangeOpacity?:ReactOpenlayersEvent
  onChangePreload?:ReactOpenlayersEvent
  onChangeSource?:ReactOpenlayersEvent
  onChangeUseInterimTilesOnError?:ReactOpenlayersEvent
  onChangeVisible?:ReactOpenlayersEvent
  onChangeZIndex?:ReactOpenlayersEvent
  onPostcompose?:ReactOpenlayersEvent
  onPrecompose?:ReactOpenlayersEvent
  onPropertychange?:ReactOpenlayersEvent
  onRender?:ReactOpenlayersEvent
}

export interface TileEvents extends ReactOpenlayersEvents {
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

export class Tile extends React.Component<TileProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public layer: olTile;

  public options: TileOptions = {
    source: new olOSMSource(),
  };

  public events: TileEvents = {
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

  public render() {
    return null;
  }

  public componentDidMount () {
    const options = Util.getOptions<TileOptions, TileProps>(this.options, this.props);
    this.layer = new olTile(options);
    if (this.props.zIndex){
      this.layer.setZIndex(this.props.zIndex);
    }
    this.context.layers.push(this.layer)

    if (this.props.layerRef) this.props.layerRef(this.layer);

    const olEvents = Util.getEvents<TileEvents, TileProps>(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.layer.on(eventName, olEvents[eventName]);
    });
  }

  public componentWillReceiveProps(nextProps: TileProps) {
    const options = Util.getOptions<TileOptions, TileProps>(this.options, this.props);

    // Updating options first
    Object.keys(options).forEach((option: string) => {
      if (options[option] === nextProps[option]) return;
      const newVal = nextProps[option];
      switch (option) {
        case 'zIndex': this.layer.setZIndex(newVal); break;
        case 'opacity': this.layer.setOpacity(newVal); break;
        case 'preload': this.layer.setPreload(newVal); break;
        case 'source': this.layer.setSource(newVal || new olOSMSource()); break;
        case 'visible': this.layer.setVisible(newVal); break;
        case 'extent': this.layer.setExtent(newVal); break;
        case 'minResolution': this.layer.setMinResolution(newVal); break;
        case 'maxResolution': this.layer.setMaxResolution(newVal); break;
        case 'useInterimTilesOnError': this.layer.setUseInterimTilesOnError(newVal);
        default:
      }
    });

    if (nextProps.layerRef && nextProps.layerRef !== this.props.layerRef) {
      nextProps.layerRef(this.layer);
    }

    // Then update events
    const oldEvents = Util.getEvents(this.events, this.props);
    const newEvents = Util.getEvents(this.events, nextProps);
    Object.keys(this.events).forEach((eventName: string) => {
      if (oldEvents[eventName]) this.layer.un(eventName, oldEvents[eventName]);
      if (newEvents[eventName]) this.layer.on(eventName, newEvents[eventName]);
    })
  }
  
  public componentWillUnmount () {
    this.context.map.removeLayer(this.layer);
  }

}
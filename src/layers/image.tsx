import * as React from 'react';

import olImage from 'ol/layer/image';
import olProjection from 'ol/proj/Projection'
import olImageStaticSource from 'ol/source/imagestatic'

import { LayerType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export type ImageOptions = layer.ImageOptions;
export interface ImageProps extends ImageOptions, LayerType<olImage> {
  onChange?: ReactOpenlayersEvent;
  onChangeExtent?: ReactOpenlayersEvent;
  onChangeGradient?: ReactOpenlayersEvent;
  onChangeMaxResolution?: ReactOpenlayersEvent;
  onChangeMinResolution?: ReactOpenlayersEvent;
  onChangeOpacity?: ReactOpenlayersEvent;
  onChangeSource?: ReactOpenlayersEvent;
  onChangeVisible?: ReactOpenlayersEvent;
  onChangeZIndex?: ReactOpenlayersEvent;
  onPostcompose?: ReactOpenlayersEvent;
  onPrecompose?: ReactOpenlayersEvent;
  onPropertychange?: ReactOpenlayersEvent;
  onRender?: ReactOpenlayersEvent;
}

export interface ImageEvents extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent;
  'change:extent': ReactOpenlayersEvent;
  'change:gradient': ReactOpenlayersEvent;
  'change:maxResolution': ReactOpenlayersEvent;
  'change:minResolution': ReactOpenlayersEvent;
  'change:opacity': ReactOpenlayersEvent;
  'change:source': ReactOpenlayersEvent;
  'change:visible': ReactOpenlayersEvent;
  'change:zIndex': ReactOpenlayersEvent;
  'postcompose': ReactOpenlayersEvent;
  'precompose': ReactOpenlayersEvent;
  'propertychange': ReactOpenlayersEvent;
  'render': ReactOpenlayersEvent;
}

export class Image extends React.Component<ImageProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public layer: olImage;

  public options: ImageOptions = {
    opacity: undefined,
    // Source from official OpenLayers example
    source: new olImageStaticSource({
      attributions: '© <a href="http://xkcd.com/license.html">xkcd</a>',
      url: 'https://imgs.xkcd.com/comics/online_communities.png',
      projection: new olProjection({
        code: 'xkcd-image',
        units: 'pixels',
        extent: [0, 0, 1024, 968]
      }),
      imageExtent: [0, 0, 1024, 968]
    }),
    visible: undefined,
    extent: undefined,
    minResolution: undefined,
    maxResolution: undefined
  };

  public events: ImageEvents = {
    'change': undefined,
    'change:extent': undefined,
    'change:gradient': undefined,
    'change:maxResolution': undefined,
    'change:minResolution': undefined,
    'change:opacity': undefined,
    'change:source': undefined,
    'change:visible': undefined,
    'change:zIndex': undefined,
    'postcompose': undefined,
    'precompose': undefined,
    'propertychange': undefined,
    'render': undefined
  };

  public render() { return null; }

  public componentDidMount () {
    const options = Util.getOptions<ImageOptions, ImageProps>(this.options, this.props);
    this.layer = new olImage(options);
    if(this.props.zIndex){
      this.layer.setZIndex(this.props.zIndex);
    }
    this.context.layers.push(this.layer);

    if (this.props.layerRef) this.props.layerRef(this.layer);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.layer.on(eventName, olEvents[eventName]);
    })
  }

  public componentWillReceiveProps (nextProps: ImageProps) {
    const options = Util.getOptions<ImageOptions, ImageProps>(this.options, this.props);

    // Updating options first
    Object.keys(options).forEach((option: string) => {
      if (options[option] === nextProps[option]) return;
      const newVal = nextProps[option];
      switch (option) {
        case 'zIndex': this.layer.setZIndex(newVal); break;
        case 'opacity': this.layer.setOpacity(newVal); break;
        case 'source': this.layer.setSource(newVal); break;
        case 'visible': this.layer.setVisible(newVal); break;
        case 'extent': this.layer.setExtent(newVal); break;
        case 'minResolution': this.layer.setMinResolution(newVal); break;
        case 'maxResolution': this.layer.setMaxResolution(newVal);
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
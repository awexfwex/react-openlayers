import * as React from 'react';

import olHeatmap from 'ol/layer/heatmap';
import olVectorSource from 'ol/source/Vector';

import { LayerType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export type HeatmapOptions = ol.olx.layer.HeatmapOptions
export interface HeatmapProps extends HeatmapOptions, LayerType<olHeatmap> {
  onChange?: ReactOpenlayersEvent
  onChangeBlur?: ReactOpenlayersEvent
  onChangeExtent?: ReactOpenlayersEvent
  onChangeGradient?: ReactOpenlayersEvent
  onChangeMaxResolution?: ReactOpenlayersEvent
  onChangeMinResolution?: ReactOpenlayersEvent
  onChangeOpacity?: ReactOpenlayersEvent
  onChangeRadius?: ReactOpenlayersEvent
  onChangeSource?: ReactOpenlayersEvent
  onChangeVisible?: ReactOpenlayersEvent
  onChangeZIndex?: ReactOpenlayersEvent
  onPostcompose?: ReactOpenlayersEvent
  onPrecompose?: ReactOpenlayersEvent
  onPropertychange?: ReactOpenlayersEvent
  onRender?: ReactOpenlayersEvent
}

export interface HeatmapEvents extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent
  'change:blur': ReactOpenlayersEvent
  'change:extent': ReactOpenlayersEvent
  'change:gradient': ReactOpenlayersEvent
  'change:maxResolution': ReactOpenlayersEvent
  'change:minResolution': ReactOpenlayersEvent
  'change:opacity': ReactOpenlayersEvent
  'change:radius': ReactOpenlayersEvent
  'change:source': ReactOpenlayersEvent
  'change:visible': ReactOpenlayersEvent
  'change:zIndex': ReactOpenlayersEvent
  'postcompose': ReactOpenlayersEvent
  'precompose': ReactOpenlayersEvent
  'propertychange': ReactOpenlayersEvent
  'render': ReactOpenlayersEvent
};

export class Heatmap extends React.Component<HeatmapProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public layer: olHeatmap;

  public options: HeatmapOptions = {
    weight: "weight",
    source: new olVectorSource,
  };

  public events: HeatmapEvents = {
    'change': undefined,
    'change:blur': undefined,
    'change:extent': undefined,
    'change:gradient': undefined,
    'change:maxResolution': undefined,
    'change:minResolution': undefined,
    'change:opacity': undefined,
    'change:radius': undefined,
    'change:source': undefined,
    'change:visible': undefined,
    'change:zIndex': undefined,
    'postcompose': undefined,
    'precompose': undefined,
    'propertychange': undefined,
    'render': undefined
  };

  public render() { return null; }

  public componentDidMount() {
    const options = Util.getOptions<HeatmapOptions, HeatmapProps>(this.options, this.props);
    if (!options.weight) options.weight = 'weight';
    this.layer = new olHeatmap(options);
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

  public componentWillReceiveProps(nextProps: HeatmapProps) {
    const options = Util.getOptions<HeatmapOptions, HeatmapProps>(this.options, this.props);

    // Updating options first
    Object.keys(options).forEach((option: string) => {
      if (options[option] === nextProps[option]) return;
      const newVal = nextProps[option];
      switch (option) {
        case 'gradient': this.layer.setGradient(newVal); break;
        case 'radius': this.layer.setRadius(newVal); break;
        case 'blur': this.layer.setBlur(newVal); break;
        case 'shadow': this.layer.set('shadow', newVal); break;
        case 'extent': this.layer.setExtent(newVal); break;
        case 'minResolution': this.layer.setMinResolution(newVal); break;
        case 'maxResolution': this.layer.setMaxResolution(newVal); break;
        case 'opacity': this.layer.setOpacity(newVal); break;
        case 'source': this.layer.setSource(newVal); break;
        case 'visible': this.layer.setVisible(newVal); break;
        case 'zIndex': this.layer.setZIndex(newVal); break;
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

  public componentWillUnmount() {
    this.context.map.removeLayer(this.layer);
  }
}
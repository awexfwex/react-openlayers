import * as React from 'react';

import olControls from 'ol/control';
import olControl from 'ol/control/Control';
import olInteractions from 'ol/interaction';
import olInteraction from 'ol/interaction/Interaction';
import olLayer from 'ol/layer/Layer';
import olMap from 'ol/Map';
import MapBrowserEvent from 'ol/MapBrowserEvent';
import MapEvent from 'ol/MapEvent';
import RenderEvent from 'ol/render/Event';
import olOverlay from 'ol/Overlay';
import olView, {ViewOptions} from 'ol/View';
import { MapOptions } from 'ol/PluggableMap';

import Util, { Omit, ReactOpenlayersEvent, ReactOpenlayersEvents } from './util';

import { ControlsProps } from './controls/controls';
import { InteractionsProps } from './interactions/interactions';

import './ol.css';

export type MapContextType = Map | void;
export const MapContext = React.createContext<MapContextType>(undefined);

export type MapOptions = MapOptions;

export interface MapProps extends Omit<MapOptions, 'view'> {
  view?: ViewOptions | olView;
  className?: string;
  style?: React.CSSProperties;
  target?: HTMLElement | string;
  onChange?: ReactOpenlayersEvent;
  onChangeLayerGroup?: ReactOpenlayersEvent;
  onChangeSize?: ReactOpenlayersEvent;
  onChangeTarget?: ReactOpenlayersEvent;
  onChangeView?: ReactOpenlayersEvent;
  onClick?: ReactOpenlayersEvent<MapBrowserEvent>;
  onDblclick?: ReactOpenlayersEvent<MapBrowserEvent>;
  onMovestart?: ReactOpenlayersEvent<MapEvent>;
  onMoveend?: ReactOpenlayersEvent<MapEvent>;
  onPointerdrag?: ReactOpenlayersEvent<MapBrowserEvent>;
  onPointermove?: ReactOpenlayersEvent<MapBrowserEvent>;
  onPostcompose?: ReactOpenlayersEvent<RenderEvent>;
  onPostrender?: ReactOpenlayersEvent<MapEvent>;
  onPrecompose?: ReactOpenlayersEvent<RenderEvent>;
  onPropertychange?: ReactOpenlayersEvent;
  onSingleclick?: ReactOpenlayersEvent<MapBrowserEvent>;
  mapRef?(map: olMap): void;
}

export interface MapEvents extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent;
  'change:layerGroup': ReactOpenlayersEvent;
  'change:size': ReactOpenlayersEvent;
  'change:target': ReactOpenlayersEvent;
  'change:view': ReactOpenlayersEvent;
  'click': ReactOpenlayersEvent<MapBrowserEvent>;
  'dblclick': ReactOpenlayersEvent<MapBrowserEvent>;
  'movestart': ReactOpenlayersEvent<MapEvent>;
  'moveend': ReactOpenlayersEvent<MapEvent>;
  'pointerdrag': ReactOpenlayersEvent<MapBrowserEvent>;
  'pointermove': ReactOpenlayersEvent<MapBrowserEvent>;
  'postcompose': ReactOpenlayersEvent<RenderEvent>;
  'postrender': ReactOpenlayersEvent<MapEvent>;
  'precompose': ReactOpenlayersEvent<RenderEvent>;
  'propertychange': ReactOpenlayersEvent;
  'singleclick': ReactOpenlayersEvent<MapBrowserEvent>;
}

/**
 * Implementation of map https://openlayers.org/en/latest/apidoc/Map.html
 *
 * example:
 * <Map view={{center: [0, 0], zoom: 1}} mapRef={map => this.map = map}>
 *   <layers>
 *     <layer.Tile source={new source.OSM()} />
 *     <layer.Vector options={}/>
 *   </layers>
 *   <controls></controls>
 *   <interactions></interactions>
 *   <overlays></overlays>
 * </Map>
 */
export class Map extends React.Component<MapProps> {

  public map: olMap;
  public mapDiv: React.RefObject<HTMLDivElement>;

  public layers: olLayer[] = [];
  public interactions: olInteraction[] = [];
  public controls: olControl[] = [];
  public overlays: olOverlay[] = [];

  public options: MapOptions = {
    pixelRatio: undefined,
    keyboardEventTarget: undefined,
    loadTilesWhileAnimating: undefined,
    loadTilesWhileInteracting: undefined,
    view: new olView({ center: [0, 0], zoom: 3 }),
    controls: undefined,
    interactions: undefined,
    layers: undefined,
    overlays: undefined
  };

  public events: MapEvents = {
    'change': undefined,
    'change:layerGroup': undefined,
    'change:size': undefined,
    'change:target': undefined,
    'change:view': undefined,
    'click': undefined,
    'dblclick': undefined,
    'movestart': undefined,
    'moveend': undefined,
    'pointerdrag': undefined,
    'pointermove': undefined,
    'postcompose': undefined,
    'postrender': undefined,
    'precompose': undefined,
    'propertychange': undefined,
    'singleclick': undefined
  };

  public constructor(props: MapProps) {
    super(props);
    this.mapDiv = React.createRef<HTMLDivElement>();
  }

  public componentDidMount() {
    const options = Util.getOptions<MapOptions, MapProps>(this.options, this.props);
    if (options.view && !(options.view instanceof olView)) {
      options.view = new olView(options.view);
    }

    const controlsCmp = Util.findChild<React.ReactElement<ControlsProps>>(this.props.children, 'Controls');
    const interactionsCmp = Util.findChild<React.ReactElement<InteractionsProps>>(this.props.children, 'Interactions');

    options.controls = olControls.defaults(controlsCmp ? controlsCmp.props : {}).extend(this.controls);
    options.interactions = olInteractions.defaults(interactionsCmp ? interactionsCmp.props : {}).extend(this.interactions);

    options.layers = this.layers;
    options.overlays = this.overlays;
    this.map = new olMap(options);
    if (this.props.target) {
      this.map.setTarget(this.props.target);
    } else if (this.mapDiv.current) {
      this.map.setTarget(this.mapDiv.current);
    }
    this.updateFromProps(this.props, /* isMounting = */ true);

    if (this.props.mapRef) this.props.mapRef(this.map);

    //regitster events
    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.map.on(eventName, olEvents[eventName]);
    })
  }

  public componentWillReceiveProps(nextProps: MapProps) {
    this.updateFromProps(nextProps, false);
  }

  public componentDidUpdate() {
    if (this.map && this.mapDiv.current) {
      this.map.setTarget(this.mapDiv.current);
    }
  }

  public render() {
    return (
      <MapContext.Provider value={this}>
        <div
          className={(this.props.className || "openlayers-map")}
          ref={this.mapDiv}
          tabIndex={0}
          style={this.props.style}
        >
          {this.props.children}
        </div>
      </MapContext.Provider>
    );

  }

  public componentWillUnmount() {
    // this.map.setTarget(undefined)
  }
  
  private updateFromProps(props: MapProps, isMounting: boolean) {
    if (isMounting || props.view) {
      // Update the center and the resolution of the view only when it is
      // mounted the first time but not when the properties are updated.
      // *Unless* we're passed a position object that explicitly declares
      // that we need to update.
      this.updateCenterAndResolutionFromProps(props)
    }
  }

  private updateCenterAndResolutionFromProps(props: MapProps) {
    const view = this.map.getView();

    if (props.view && !(props.view instanceof olView)) {
      if (props.view.center !== undefined) view.setCenter(props.view.center);
      if (props.view.zoom !== undefined) view.setZoom(props.view.zoom);
      if (props.view.resolution !== undefined) view.setResolution(props.view.resolution)
    }
  }
}

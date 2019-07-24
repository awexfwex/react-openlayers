import * as React from 'react';

import olPinchZoom, { Options as PinchZoomOptions } from 'ol/interaction/PinchZoom';

import { InteractionType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export interface PinchZoomProps extends PinchZoomOptions, InteractionType<olPinchZoom> {
  onChange?: ReactOpenlayersEvent
  onChangeActive?: ReactOpenlayersEvent
  onPropertychange?: ReactOpenlayersEvent
};

export interface PinchZoomEvents extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent
  'change:active': ReactOpenlayersEvent
  'propertychange': ReactOpenlayersEvent
};

export class PinchZoom extends React.Component<PinchZoomProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public interaction: olPinchZoom;

  public options: PinchZoomOptions = {
    duration: undefined,
    constrainResolution: undefined
  };

  public events: PinchZoomEvents = {
    'change': undefined,
    'change:active': undefined,
    'propertychange': undefined
  };

  public render() { return null; }

  public componentDidMount() {
    const options = Util.getOptions<PinchZoomOptions, PinchZoomProps>(this.options, this.props);
    this.interaction = new olPinchZoom(options);
    this.context.interactions.push(this.interaction)

    this.initInteraction(this.props);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.interaction.on(eventName, olEvents[eventName]);
    });
  }

  public componentWillReceiveProps(nextProps: PinchZoomProps) {
    if (nextProps !== this.props) {
      this.context.map.removeInteraction(this.interaction);
      const options = Util.getOptions<PinchZoomOptions, PinchZoomProps>(this.options, nextProps);
      this.interaction = new olPinchZoom(options);
      this.context.map.addInteraction(this.interaction);

      this.initInteraction(nextProps);

      const olEvents = Util.getEvents(this.events, this.props);
      Object.keys(olEvents).forEach((eventName: string) => {
        this.interaction.on(eventName, olEvents[eventName]);
      });
    }
  }

  public componentWillUnmount() {
    this.context.map.removeInteraction(this.interaction);
  }

  private initInteraction(props: PinchZoomProps) {
    if (props.interactionRef) props.interactionRef(this.interaction);
    if (props.active !== undefined) this.interaction.setActive(props.active);
  }
}
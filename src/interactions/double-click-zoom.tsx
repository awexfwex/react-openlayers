import * as React from 'react';

import olDoubleClickZoom, { Options as DoubleClickZoomOptions } from 'ol/interaction/DoubleClickZoom';

import { InteractionType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export interface DoubleClickZoomProps extends DoubleClickZoomOptions, InteractionType<olDoubleClickZoom> {
  onChange?: ReactOpenlayersEvent;
  onChangeActive?: ReactOpenlayersEvent;
  onPropertychange?: ReactOpenlayersEvent;
}

export interface DoubleClickZoomEvents extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent;
  'change:active': ReactOpenlayersEvent;
  'propertychange': ReactOpenlayersEvent;
}

export class DoubleClickZoom extends React.Component<DoubleClickZoomProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public interaction: olDoubleClickZoom;

  public options: DoubleClickZoomOptions = {
    duration: undefined,
    delta: undefined
  };

  public events: DoubleClickZoomEvents = {
    'change': undefined,
    'change:active': undefined,
    'propertychange': undefined
  };

  public render() { return null; }

  public componentDidMount() {
    const options = Util.getOptions<DoubleClickZoomOptions, DoubleClickZoomProps>(this.options, this.props);
    this.interaction = new olDoubleClickZoom(options);
    this.context.interactions.push(this.interaction)

    this.initInteraction(this.props);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.interaction.on(eventName, olEvents[eventName]);
    });
  }

  public componentWillReceiveProps(nextProps: DoubleClickZoomProps) {
    if (nextProps !== this.props) {
      this.context.map.removeInteraction(this.interaction);
      const options = Util.getOptions<DoubleClickZoomOptions, DoubleClickZoomProps>(this.options, nextProps);
      this.interaction = new olDoubleClickZoom(options);
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

  private initInteraction(props: DoubleClickZoomProps) {
    if (props.interactionRef) props.interactionRef(this.interaction);
    if (props.active !== undefined) this.interaction.setActive(props.active);
  }
}
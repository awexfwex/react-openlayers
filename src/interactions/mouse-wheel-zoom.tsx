import * as React from 'react';

import olMouseWheelZoom, { Options as MouseWheelZoomOptions } from 'ol/interaction/MouseWheelZoom';

import { InteractionType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export interface MouseWheelZoomProps extends MouseWheelZoomOptions, InteractionType<olMouseWheelZoom> {
  onChange?: ReactOpenlayersEvent
  onChangeActive?: ReactOpenlayersEvent
  onPropertychange?: ReactOpenlayersEvent
};

export interface MouseWheelZoomEvents extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent
  'change:active': ReactOpenlayersEvent
  'propertychange': ReactOpenlayersEvent
};

export class MouseWheelZoom extends React.Component<MouseWheelZoomProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public interaction: olMouseWheelZoom;

  public options: MouseWheelZoomOptions = {
    duration: undefined,
    timeout: undefined,
    useAnchor: undefined
  };

  public events: MouseWheelZoomEvents = {
    'change': undefined,
    'change:active': undefined,
    'propertychange': undefined
  };

  public render() { return null; }

  public componentDidMount() {
    const options = Util.getOptions<MouseWheelZoomOptions, MouseWheelZoomProps>(this.options, this.props);
    this.interaction = new olMouseWheelZoom(options);
    this.context.interactions.push(this.interaction)

    this.initInteraction(this.props);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.interaction.on(eventName, olEvents[eventName]);
    })
  }

  public componentWillReceiveProps(nextProps: MouseWheelZoomProps) {
    if (nextProps !== this.props) {
      this.context.map.removeInteraction(this.interaction);
      const options = Util.getOptions<MouseWheelZoomOptions, MouseWheelZoomProps>(this.options, nextProps);
      this.interaction = new olMouseWheelZoom(options);
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

  private initInteraction(props: MouseWheelZoomProps) {
    if (props.interactionRef) props.interactionRef(this.interaction);
    if (props.active !== undefined) this.interaction.setActive(props.active);
  }
}
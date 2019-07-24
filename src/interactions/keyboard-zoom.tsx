import * as React from 'react';

import olKeyboardZoom, { Options as KeyboardZoomOptions } from 'ol/interaction/KeyboardZoom';

import { InteractionType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export interface KeyboardZoomProps extends KeyboardZoomOptions, InteractionType<olKeyboardZoom> {
  onChange?: ReactOpenlayersEvent
  onChangeActive?: ReactOpenlayersEvent
  onPropertychange?: ReactOpenlayersEvent
};

export interface KeyboardZoomEvents extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent
  'change:active': ReactOpenlayersEvent
  'propertychange': ReactOpenlayersEvent
};

export class KeyboardZoom extends React.Component<KeyboardZoomProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public interaction: olKeyboardZoom;

  public options: KeyboardZoomOptions = {
    condition: undefined,
    duration: undefined,
    delta: undefined
  };

  public events: KeyboardZoomEvents = {
    'change': undefined,
    'change:active': undefined,
    'propertychange': undefined
  };

  public render() { return null; }

  public componentDidMount() {
    const options = Util.getOptions<KeyboardZoomOptions, KeyboardZoomProps>(this.options, this.props);
    this.interaction = new olKeyboardZoom(options);
    this.context.interactions.push(this.interaction)

    this.initInteraction(this.props);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.interaction.on(eventName, olEvents[eventName]);
    })
  }

  public componentWillReceiveProps(nextProps: KeyboardZoomProps) {
    if (nextProps !== this.props) {
      this.context.map.removeInteraction(this.interaction);
      const options = Util.getOptions<KeyboardZoomOptions, KeyboardZoomProps>(this.options, nextProps);
      this.interaction = new olKeyboardZoom(options);
      this.context.map.addInteraction(this.interaction);

      this.initInteraction(nextProps);

      const olEvents = Util.getEvents(this.events, this.props);
      Object.keys(olEvents).forEach((eventName: string) => {
        this.interaction.on(eventName, olEvents[eventName]);
      })
    }
  }

  public componentWillUnmount() {
    this.context.map.removeInteraction(this.interaction);
  }

  public initInteraction(props: KeyboardZoomProps) {
    if (props.interactionRef) props.interactionRef(this.interaction);
    if (props.active !== undefined) this.interaction.setActive(props.active);
  }

}
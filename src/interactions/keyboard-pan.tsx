import * as React from 'react';

import olKeyboardPan, { Options as KeyboardPanOptions } from 'ol/interaction/KeyboardPan';

import { InteractionType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export interface KeyboardPanProps extends KeyboardPanOptions, InteractionType<olKeyboardPan> {
  onChange?: ReactOpenlayersEvent;
  onChangeActive?: ReactOpenlayersEvent;
  onPropertychange?: ReactOpenlayersEvent;
}

export interface KeyboardPanEvents extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent;
  'change:active': ReactOpenlayersEvent;
  'propertychange': ReactOpenlayersEvent;
}

export class KeyboardPan extends React.Component<KeyboardPanProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public interaction: olKeyboardPan;

  public options: KeyboardPanOptions = {
    condition: undefined,
    duration: undefined,
    pixelDelta: undefined
  };

  public events: KeyboardPanEvents = {
    'change': undefined,
    'change:active': undefined,
    'propertychange': undefined
  };

  public render() { return null; }

  public componentDidMount() {
    const options = Util.getOptions<KeyboardPanOptions, KeyboardPanProps>(this.options, this.props);
    this.interaction = new olKeyboardPan(options);
    this.context.interactions.push(this.interaction)

    this.initInteraction(this.props);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.interaction.on(eventName, olEvents[eventName]);
    });
  }

  public componentWillReceiveProps(nextProps: KeyboardPanProps) {
    if (nextProps !== this.props) {
      this.context.map.removeInteraction(this.interaction);
      const options = Util.getOptions<KeyboardPanOptions, KeyboardPanProps>(this.options, nextProps);
      this.interaction = new olKeyboardPan(options);
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

  private initInteraction(props: KeyboardPanProps) {
    if (props.interactionRef) props.interactionRef(this.interaction);
    if (props.active !== undefined) this.interaction.setActive(props.active);
  }
}
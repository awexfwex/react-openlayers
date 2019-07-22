import * as React from 'react';

import { Options as DragZoomOptions } from 'ol/interaction/DragZoom';

import { InteractionType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export interface DragZoomProps extends DragZoomOptions, InteractionType<olDragZoom> {
  onBoxdrag?: ReactOpenlayersEvent
  onBoxend?: ReactOpenlayersEvent
  onBoxstart?: ReactOpenlayersEvent
  onChange?: ReactOpenlayersEvent
  onChangeActive?: ReactOpenlayersEvent
  onPropertychange?: ReactOpenlayersEvent
};

export interface DragZoomEvents extends ReactOpenlayersEvents {
  'boxdrag': ReactOpenlayersEvent
  'boxend': ReactOpenlayersEvent
  'boxstart': ReactOpenlayersEvent
  'change': ReactOpenlayersEvent
  'change:active': ReactOpenlayersEvent
  'propertychange': ReactOpenlayersEvent
};

export class DragZoom extends React.Component<DragZoomProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public interaction: olDragZoom;

  public options: DragZoomProps = {
    className: undefined,
    condition: undefined,
    duration: undefined,
    out: undefined
  };

  public events: DragZoomEvents = {
    'boxdrag': undefined,
    'boxend': undefined,
    'boxstart': undefined,
    'change': undefined,
    'change:active': undefined,
    'propertychange': undefined
  };

  public render() { return null; }

  public componentDidMount() {
    const options = Util.getOptions<DragZoomOptions, DragZoomProps>(this.options, this.props);
    this.interaction = new olDragZoom(options);
    this.context.interactions.push(this.interaction)

    this.initInteraction(this.props);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.interaction.on(eventName, olEvents[eventName]);
    });
  }

  public componentWillReceiveProps(nextProps: DragZoomProps) {
    if (nextProps !== this.props) {
      this.context.map.removeInteraction(this.interaction);
      const options = Util.getOptions<DragZoomOptions, DragZoomProps>(this.options, nextProps);
      this.interaction = new olDragZoom(options);
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

  private initInteraction(props: DragZoomProps) {
    if (props.interactionRef) props.interactionRef(this.interaction);
    if (props.active !== undefined) this.interaction.setActive(props.active);
  }

}
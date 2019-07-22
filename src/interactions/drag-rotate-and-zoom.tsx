import * as React from 'react';

import olDragRotateAndZoom from 'ol/interaction/DragRotateAndZoom';

import { InteractionType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export type DragRotateAndZoomOptions = ol.olx.interaction.DragRotateAndZoomOptions;
export interface DragRotateAndZoomProps extends DragRotateAndZoomOptions, InteractionType<olDragRotateAndZoom> {
  onChange?: ReactOpenlayersEvent
  onChangeActive?: ReactOpenlayersEvent
  onPropertychange?: ReactOpenlayersEvent
};

export interface DragRotateAndZoomEvents extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent
  'change:active': ReactOpenlayersEvent
  'propertychange': ReactOpenlayersEvent
}
export class DragRotateAndZoom extends React.Component<DragRotateAndZoomProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public interaction: olDragRotateAndZoom;

  public options: DragRotateAndZoomProps = {
    condition: undefined,
    duration: undefined
  };

  public events: DragRotateAndZoomEvents = {
    'change': undefined,
    'change:active': undefined,
    'propertychange': undefined
  };

  public render() { return null; }

  public componentDidMount() {
    const options = Util.getOptions<DragRotateAndZoomOptions, DragRotateAndZoomProps>(this.options, this.props);
    this.interaction = new olDragRotateAndZoom(options);
    this.context.interactions.push(this.interaction)

    this.initInteraction(this.props);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.interaction.on(eventName, olEvents[eventName]);
    });
  }

  public componentWillReceiveProps(nextProps: DragRotateAndZoomProps) {
    if (nextProps !== this.props) {
      this.context.map.removeInteraction(this.interaction);
      const options = Util.getOptions<DragRotateAndZoomOptions, DragRotateAndZoomProps>(this.options, nextProps);
      this.interaction = new olDragRotateAndZoom(options);
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

  private initInteraction(props: DragRotateAndZoomProps) {
    if (props.interactionRef) props.interactionRef(this.interaction);
    if (props.active !== undefined) this.interaction.setActive(props.active);
  }
}
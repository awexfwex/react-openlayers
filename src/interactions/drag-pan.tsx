import * as React from 'react';

import olDragPan, { Options as DragPanOptions } from 'ol/interaction/DragPan';

import { InteractionType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export interface DragPanProps extends DragPanOptions, InteractionType<olDragPan> {
  onChange?: ReactOpenlayersEvent;
  onChangeActive?: ReactOpenlayersEvent;
  onPropertychange?: ReactOpenlayersEvent;
}

export interface DragPanEvents extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent;
  'change:active': ReactOpenlayersEvent;
  'propertychange': ReactOpenlayersEvent;
}


export class DragPan extends React.Component<DragPanProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public interaction: olDragPan;

  public options: DragPanProps = {
    condition: undefined,
    kinetic: undefined
  };

  public events: DragPanEvents = {
    'change': undefined,
    'change:active': undefined,
    'propertychange': undefined
  };

  public render() { return null; }

  public componentDidMount() {
    const options = Util.getOptions<DragPanOptions, DragPanProps>(this.options, this.props);
    this.interaction = new olDragPan(options);
    this.context.interactions.push(this.interaction)

    this.initInteraction(this.props);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.interaction.on(eventName, olEvents[eventName]);
    })
  }

  public componentWillReceiveProps(nextProps: DragPanProps) {
    if (nextProps !== this.props) {
      this.context.map.removeInteraction(this.interaction);
      const options = Util.getOptions<DragPanOptions, DragPanProps>(this.options, nextProps);
      this.interaction = new olDragPan(options);
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

  private initInteraction(props: DragPanProps) {
    if (props.interactionRef) props.interactionRef(this.interaction);
    if (props.active !== undefined) this.interaction.setActive(props.active);
  }

}
import * as React from 'react';

import olDraw, { Options as DrawOptions } from 'ol/interaction/Draw';

import { InteractionType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';
import GeometryType from 'ol/geom/GeometryType';

export interface DrawProps extends DrawOptions, InteractionType<olDraw> {
  onChange?: ReactOpenlayersEvent;
  onChangeActive?: ReactOpenlayersEvent;
  onDrawend?: ReactOpenlayersEvent;
  onDrawstart?: ReactOpenlayersEvent;
  onPropertychange?: ReactOpenlayersEvent;
}

export interface DrawEvents extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent;
  'change:active': ReactOpenlayersEvent;
  'drawend': ReactOpenlayersEvent;
  'drawstart': ReactOpenlayersEvent;
  'propertychange': ReactOpenlayersEvent;
}

export class Draw extends React.Component<DrawProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public interaction: olDraw;

  public options: DrawOptions = {
    clickTolerance: undefined,
    features: undefined,
    source: undefined,
    snapTolerance: undefined,
    type: GeometryType.POINT,
    maxPoints: undefined,
    minPoints: undefined,
    finishCondition: undefined,
    style: undefined,
    geometryFunction: undefined,
    geometryName: undefined,
    condition: undefined,
    freehand: undefined,
    freehandCondition: undefined,
    wrapX: undefined
  };

  public events: DrawEvents = {
    'change': undefined,
    'change:active': undefined,
    'drawend': undefined,
    'drawstart': undefined,
    'propertychange': undefined
  };

  public render() { return null; }

  public componentDidMount() {
    const options = Util.getOptions<DrawOptions, DrawProps>(this.options, this.props);
    this.interaction = new olDraw(options);
    this.context.interactions.push(this.interaction);

    this.initInteraction(this.props);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.interaction.on(eventName, olEvents[eventName]);
    });
  }

  public componentWillReceiveProps(nextProps: DrawProps) {
    if (nextProps !== this.props) {
      this.context.map.removeInteraction(this.interaction);
      const options = Util.getOptions<DrawOptions, DrawProps>(this.options, nextProps);
      this.interaction = new olDraw(options);
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

  private initInteraction(props: DrawProps) {
    if (props.interactionRef) props.interactionRef(this.interaction);
    if (props.active !== undefined) this.interaction.setActive(props.active);
  }

}
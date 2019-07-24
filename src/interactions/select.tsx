import * as React from 'react';

import olSelect, { Options as SelectOptions, SelectEvent, SelectEventType } from 'ol/interaction/Select';

import { InteractionType } from '.';
import { MapContext, MapContextType } from '../map';
import Util, { ReactOpenlayersEvent, ReactOpenlayersEvents } from '../util';

export interface SelectProps extends SelectOptions, InteractionType<olSelect> {
  instance?: olSelect;
  onChange?: ReactOpenlayersEvent;
  onChangeActive?: ReactOpenlayersEvent;
  onPropertychange?: ReactOpenlayersEvent;
  onSelect?: ReactOpenlayersEvent<SelectEvent>;
}

export interface SelectEvents extends ReactOpenlayersEvents {
  'change': ReactOpenlayersEvent;
  'change:active': ReactOpenlayersEvent;
  'propertychange': ReactOpenlayersEvent;
  'select': ReactOpenlayersEvent;
}

export class Select extends React.Component<SelectProps> {
  public static contextType: React.Context<MapContextType> = MapContext;

  public interaction: olSelect;

  public options: SelectOptions = {
    addCondition: undefined,
    condition: undefined,
    layers: undefined,
    style: undefined,
    removeCondition: undefined,
    toggleCondition: undefined,
    multi: undefined,
    features: undefined,
    filter: undefined,
    wrapX: undefined,
    hitTolerance: undefined
  };

  public events: SelectEvents = {
    'change': undefined,
    'change:active': undefined,
    'propertychange': undefined,
    'select': undefined
  };

  public render() { return null; }

  public componentDidMount() {
    if (this.props.instance) {
      this.interaction = this.props.instance;
    } else {
      const options = Util.getOptions<SelectOptions, SelectProps>(this.options, this.props);
      this.interaction = new olSelect(options);
    }
    this.context.interactions.push(this.interaction)

    this.initInteraction(this.props);

    const olEvents = Util.getEvents(this.events, this.props);
    Object.keys(olEvents).forEach((eventName: string) => {
      this.interaction.on(eventName, olEvents[eventName]);
    });
  }

  public componentWillReceiveProps(nextProps: SelectProps) {
    if (nextProps !== this.props) {
      this.context.map.removeInteraction(this.interaction);

      if (this.props.instance) {
        this.interaction = this.props.instance;
      } else {
        const options = Util.getOptions<SelectOptions, SelectProps>(this.options, nextProps);
        this.interaction = new olSelect(options);
      }
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

  private initInteraction(props: SelectProps) {
    if (props.interactionRef) props.interactionRef(this.interaction);
    if (props.active !== undefined) this.interaction.setActive(props.active);
  }
}
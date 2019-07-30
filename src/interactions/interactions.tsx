import * as React from 'react';

// import { InteractionOptions } from 'ol/interaction/Interaction';

import { DefaultsOptions } from 'ol/interaction';

export type InteractionsProps = DefaultsOptions;

export class Interactions extends React.Component<InteractionsProps> {
  public render() {
    return (<div>{this.props.children}</div>);
  }
}
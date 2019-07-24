import * as React from 'react';

import { InteractionOptions as InteractionsProps } from 'ol/interaction/Interaction';

// export type InteractionsProps = interaction.DefaultsOptions;

export class Interactions extends React.Component<InteractionsProps> {
  public render() {
    return (<div>{this.props.children}</div>);
  }
}
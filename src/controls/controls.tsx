import * as React from 'react';

import Util from '../util';
import { AttributionProps } from './attribution';
import { RotateProps } from './rotate';
import { ZoomProps } from './zoom';

export interface ControlsProps {
  attribution?: boolean;
  attributionOptions?: AttributionProps;
  rotate?: boolean;
  rotateOptions?: RotateProps;
  zoom?: boolean;
  zoomOptions?: ZoomProps;
}

// I wish I can name it as 'layers', not 'Layers'
export class Controls extends React.Component<ControlsProps> {
  public options: ControlsProps = {
    attribution: undefined,
    attributionOptions: undefined,
    rotate: undefined,
    rotateOptions: undefined,
    zoom: undefined,
    zoomOptions: undefined
  };

  public constructor(props: ControlsProps) {
    super(props);
    this.options = Util.getOptions<ControlsProps, ControlsProps>(this.options, this.props);
  }

  public render() {
    return (<div>{this.props.children}</div>);
  }
}
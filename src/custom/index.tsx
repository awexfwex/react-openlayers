import {Popup} from './popup';
import {ClusterStyle} from './style/cluster-style';
import {MarkerStyle} from './style/marker-style';
// import {GeoCoderControl} from './control/geo-coder-control';
// import {GeoCoderComponent} from './control/geo-coder-component';

const custom = {
  style: {
    MarkerStyle: MarkerStyle,
    ClusterStyle: ClusterStyle
  },
  control: {
    // GeoCoderControl: GeoCoderControl,
    // GeoCoderComponent: GeoCoderComponent
  },
  Popup: Popup,
};

export {custom};


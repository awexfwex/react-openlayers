import {Heatmap} from './heatmap';
import {Image} from './image';
import {Layers} from './layers';
import {Tile} from './tile';
import {Vector} from './vector';
import {VectorTile} from './vector-tile';

export interface LayerType<T extends ol.layer.Layer> {
  layerRef?(layer: T): void;
}

const layer = {
  Tile: Tile,
  Vector: Vector,
  Heatmap: Heatmap,
  Image: Image,
  VectorTile: VectorTile,
};

export { 
  Layers,
  layer,
  Heatmap,
  Image,
  VectorTile
};

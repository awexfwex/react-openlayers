import IconStyle from 'ol/style/icon'
import Style from 'ol/style/style'

// Why the hell do we have src/custom/marker-style and src/custom/style/marker-style ??
export class MarkerStyle {
  public src: string = 'https://openlayers.org/en/v4.6.5/examples/data/icon.png';

  constructor(src?: string) {
    if (src) {
      this.src = src;
    }
  }

  public selectStyleFunction = ()  => {
    return new Style({
      image: new IconStyle({
        anchor: [0.5, 0.96],
        color: '#4271AE',
        src: 'https://openlayers.org/en/v4.6.5/examples/data/dot.png'
      })
    })
  };
}
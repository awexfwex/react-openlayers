declare module 'react-syntax-highlighter';
declare module 'react-syntax-highlighter/dist/styles/prism';

declare namespace olFix {
  namespace olx {
    namespace interaction {
      export interface ExtentOptions {
        extent?: ol.Extent
        boxStyle?: ol.style.Style
        pixelTolerance?: number
        pointerStyle?: ol.style.Style
        wrapX?: boolean
      }
    }
  }
}

declare module 'ol/interaction/extent' {
  export default class Extent extends ol.interaction.Pointer {
    constructor(opt_options: olFix.olx.interaction.ExtentOptions)
    setMap?(map: ol.Map): void
    getExtent?(): ol.Extent
    setExtent?(ext: ol.Extent): void
  }

}

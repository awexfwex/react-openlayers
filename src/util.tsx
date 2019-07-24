import * as React from 'react';

import olStyle from 'ol/style/Style';
import olEvent from 'ol/events/Event';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type ReactOpenlayersEvent<T extends olEvent = olEvent> = ((event: T | olEvent) => void) | void;

export interface ReactOpenlayersEvents {
  [key: string]: ((event: olEvent | void) => void ) | void;
} 

/**
 * Extract default options from props
 * 
 * @param defaultOpts Default options
 * @param props Props to extract
 */
export const getOptions = <O, P>(defaultOpts: O, props: P): O => {
  const options: O = { ...defaultOpts };
  Object.keys(props).forEach((key: string) => {
    if (
      key !== 'children'
        && props[key] !== undefined //exclude undefined ones
        && !key.match(/^on[A-Z]/)     //exclude events
    ) {
      options[key] = props[key];
    }
  });

  return options;
}

/**
 * Converts eventName to camelCase
 * 
 * @param {string} eventName
 * @returns {string}
 */
export const getPropsKey = (eventName: string): string => {
  const processedEventName: string = eventName
    .replace(/(\:[a-z])/g, ($1: string) => $1.toUpperCase())
    .replace(/^[a-z]/, ($1: string) => $1.toUpperCase())
    .replace(':','');

  return `on${processedEventName}`;
}

/**
 * Extract events from props
 * 
 * @param events 
 * @param props 
 */
export const getEvents = <E extends ReactOpenlayersEvents, P>(events: E, props: P): Partial<P> => {
  const prop2EventMap: Partial<P> = {};
  Object.keys(events).forEach((key: string) => {
    prop2EventMap[getPropsKey(key)] = key;
  })

  const ret: Partial<P> = {};
  Object.keys(props).forEach((propName: string) => {
    const eventName = prop2EventMap[propName];
    const prop = props[propName];
    if (prop !== undefined && propName.match(/^on[A-Z]/) && eventName) {
      ret[eventName] = prop;
    }
  })

  return ret;
}

const typeOf = (obj: {}) => ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();

/**
 * Clones recursively Style objects
 * 
 * @param obj Style object
 */
export const cloneStyle = (obj: olStyle): olStyle => {
  const type = typeOf(obj);
  if (type === 'object' || type === 'array') {
    if (obj.clone) {
      return obj.clone();
    }
    
    // return Object.assign( Object.create( Object.getPrototypeOf(obj)), obj)
    const clone = type === 'array' ? [] : {};
    Object.keys(obj).forEach((key: string) => {
      clone[key] = cloneStyle(obj[key]);
    })

    return clone as olStyle;
  }

  return obj;
}

/**
 * Search children for a given element type
 * 
 * @param children React children
 * @param childType Child type to find
 */
export const findChild = <T extends React.ReactElement<{}>>(children: React.ReactNode, childType: string): T | void => {
  let found: T | void;
  const childrenArr = React.Children.toArray(children);
  for (const child of childrenArr) {
    if (React.isValidElement(child)) {
      if (typeof child.type === 'string' && child.type === childType){
        found = child as T;
        break;
      } else if (typeof child.type === 'function' && child.type.name === childType) {
        found = child as T;
        break;
      }
    }
  }

  return found;
}

export default {
  getOptions,
  getEvents,
  cloneStyle,
  findChild,
}
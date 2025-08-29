import { App } from 'vue';
import { Thumbmark } from '@thumbmarkjs/thumbmarkjs';
import { ThumbmarkPluginOptions } from './types';

export const ThumbmarkSymbol = Symbol('thumbmark');

export interface ThumbmarkInstance {
  thumbmarkInstance: Thumbmark;
}

export function createThumbmarkPlugin(options: ThumbmarkPluginOptions = {}) {
  return {
    install(app: App) {
      const config = options.apiKey 
        ? { ...options.options, api_key: options.apiKey } 
        : options.options || {};
      
      const thumbmarkInstance = new Thumbmark(config);

      app.provide<ThumbmarkInstance>(ThumbmarkSymbol, {
        thumbmarkInstance,
      });

      app.config.globalProperties.$thumbmark = thumbmarkInstance;
    },
  };
}
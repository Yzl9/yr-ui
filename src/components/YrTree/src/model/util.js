
import defaultLang from 'element-ui/src/locale/lang/zh-CN';
import Vue from 'vue';

import deepmerge from 'deepmerge';
import Format from './format';


export const NODE_KEY = '$treeNodeId';
export const markNodeData = function(node, data) {
  if (!data || data[NODE_KEY]) return;
  Object.defineProperty(data, NODE_KEY, {
    value: node.id,
    enumerable: false,
    configurable: false,
    writable: false
  });
};


export const objectAssign = function(target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {};
    for (let prop in source) {
      if (Object.prototype.hasOwnProperty.call(source,prop) ) {
        let value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }

  return target;
};
let merged = false;
const format = Format(Vue);
let lang = defaultLang;

let i18nHandler = function() {

  

  const vuei18n = Object.getPrototypeOf(this || Vue).$t;
  if (typeof vuei18n === 'function' && !!Vue.locale) {
    if (!merged) {
      merged = true;
      Vue.locale(
        Vue.config.lang,
        deepmerge(lang, Vue.locale(Vue.config.lang) || {}, { clone: true })
      );
    }
    return vuei18n.apply(this, arguments);
  }
};


export const t = function(path, options) {
  let value = i18nHandler.apply(this, arguments);

  if (value !== null && value !== undefined) return value;

  const array = path.split('.');
  let current = lang;

  for (let i = 0, j = array.length; i < j; i++) {
    const property = array[i];
    value = current[property];
    if (i === j - 1) return format(value, options);
    if (!value) return '';
    current = value;
  }
  return '';
};
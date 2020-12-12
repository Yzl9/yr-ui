import Node from './node.js'
export default class TreeStore {
  constructor(options){
    for (const option in options) {
      if (Object.prototype.hasOwnProperty.call(options,option)) {
       this[option] = options[option]
      }
    }
   
    this.root = new Node({
      store:this,
      data:this.data
    })
  }

}
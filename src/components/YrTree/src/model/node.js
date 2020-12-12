
export default class Node {
  constructor(options){
    for (const option in options) {
      if (Object.prototype.hasOwnProperty.call(options,option)) {
       this[option] = options[option]
      }
    }
    this.childNodes = []
    this.level = 0
    this.setData(this.data)
  }
  setData(node){
    for(let i=0;i<node.length;i++){
      this.insertChild({data:node[i]})
    }
  }
  insertChild(child){
    child.level = this.level +1
    let children = new Node(child)
    this.childNodes.push(child)
  }
}
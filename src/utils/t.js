class T{
  beforeEnter(el){
    console.log(el)
  }
}

export default {
  name:"YrTranstion",
  render:(h,{children})=>{
    let data  = {
      on:new T()
    },
    return h('transition',data,children)
  }
}
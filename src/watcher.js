import Dep from './dep'
export default  class Watcher{
    constructor(vm,key,cb){
      this.vm = vm
      this.key = key
      this.cb = cb
  
      Dep.target = this;
      this.vm[this.key]; // 触发getter，添加依赖
      Dep.target = null;
    }
    update(){
      this.cb.call(this.vm,this.vm[this.key])
    }
  }
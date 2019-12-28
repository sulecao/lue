
export default class Dep{
    constructor(){
      this.deps = []
    }
    addDep(watch){
     this.deps.push(watch)
    }
    notify(){
      this.deps.forEach(item=>item.update())
    }
  }
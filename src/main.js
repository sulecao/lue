import Compile from './compile'
import Dep from './dep'
class Vue{
  constructor(options){
    this.$options = options
    this.$data = options.data

    this.observe(this.$data);

    new Compile(options.el, this);

    if (options.created) {
        options.created.call(this);
    }
  }

  observe(data){
    if (!data || typeof data !== "object") {
        return;
      }
      Object.keys(data).forEach(key=>{
        this.defineReactive(data,key,data[key])
        // 将数据都代理到vm上
        this.proxyData(key);
      })
 
  }
  defineReactive(obj,key,val){
    // val也可能还是对象，继续观察
    this.observe(val)

    const dep = new Dep();

    Object.defineProperty(obj,key,{
        get(){
          console.log(dep)
            Dep.target && dep.addDep(Dep.target);
            return val
        },
        set(newVal){
            if(val ===newVal ){
                return
            }else{
                val = newVal
                console.log('数据变化了')
            }
          
        }
    })
  }

  proxyData(key){
    Object.defineProperty(this,key,{
        get(){
            return this.$data[key]
        },
        set(newVal){

        this.$data[key] = newVal
          
        }
    })
  }
}
window.Vue = Vue
// Vue 的特点在data新增属性不能添加get和set，所以不能响应



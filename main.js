

function Lue(options) {
    this.$options = options
    var data = this._data = this.$options.data
    observe(data)
    for(let key in data){
        Object.defineProperty(this,key,{
            configurable: true,//可删除
            enumerable: true,//可枚举
            get(){
                return this._data[key]
            },
            set(newVal){
                this._data[key] = newVal
            }
        })
    }
    new Compile(options.el,this)
}

function Compile(el,vm){
    var app = document.querySelector(el)
    var fragment  = document.createDocumentFragment(),child;
    while(child=app.firstChild){
        fragment.appendChild(child)
    }
    console.log(fragment)
}

function Observe(data) {
    for (let key in data) {
        let val = data[key]
        observe(val)
        Object.defineProperty(data, key, {
            configurable: true,//可删除
            enumerable: true,//可枚举
            get() {
                return val
            }, set(newVal) {
                if( newVal===val){
                    return
                }else{
                    console.log(this)
                    val = newVal
                    observe(newVal)
                }
                
            }
        })
    }
}
function observe(data) {
    if(typeof data!=='object'){
        return
    }else{
        return new Observe(data)
    }
   
}
// Vue 的特点在data新增属性不能添加get和set，所以不能响应

import Watcher from './watcher'
export default class Compile{
    constructor(el,vm){
        this.$el = el
        this.$vm = vm;

        // 将模板放入Fragment
        var frag = this.node2Fragment(el)
        // 编译模板
        this.compile(frag)
        // 将编译好的模板放回DOM
        document.querySelector(el).appendChild(frag)
    }
    node2Fragment(el){
        var app = document.querySelector(el)
        var frag = document.createDocumentFragment()
        var child = ''
        while(child =app.firstChild){
         frag.appendChild(child)
        }
        return frag
    }

    compile(frag){
        const childNodes = frag.childNodes;
        Array.from(childNodes).forEach(node=>{
            if(node.nodeType === 1){
                // 是元素 
                //查看元素上绑定的属性值
                const nodeAttrs = node.attributes;
                Array.from(nodeAttrs).forEach(attr => {
                  const attrName = attr.name; //属性名
                  const exp = attr.value; // 属性值
                  if (this.isDirective(attrName)) {
                    // v-开头的属性名
                    const dir = attrName.substring(2);
                    // 执行指令
                    this[dir] && this[dir](node, this.$vm, exp);
                  }
                  if (this.isEvent(attrName)) {
                    //   是否是事件
                    const dir = attrName.substring(1); // @click
                    this.eventHandler(node, this.$vm, exp, dir);
                  }
                });
            }else if(this.isInterpolation(node)){
                //  是文本节点且是插值
                this.compileText(node);
            }
            if(node.childNodes &&node.childNodes.length>0){
                console.log(1)
                this.compile(node)
            }
        })
    }
    // 是文本节点且是插值
    isInterpolation(node){
       return node.nodeType ===3 && /\{\{(.*)\}\}/.test(node.textContent);
    }

    isDirective(attr) {
        return attr.indexOf("v-") == 0;
      }
      isEvent(attr) {
        return attr.indexOf("@") == 0;
      }

    compileText(node){
        this.update(node, this.$vm, RegExp.$1, "text");
    }

      // 更新函数
  update(node, vm, key, dir) {
    const updaterFn = this[dir + "Updater"];
    // 初始化
    console.log(vm)
    updaterFn && updaterFn(node, vm[key]);
    // 依赖收集
    new Watcher(vm, key, function(value) {
      updaterFn && updaterFn(node, value);
    });
  }
  textUpdater(node, value) {
    node.textContent = value;
  }
  htmlUpdater(node, value) {
    node.innerHTML = value;
  }
  modelUpdater(node, value) {
    node.value = value;
  }

  // V-指令text model html
  text(node, vm, exp) {
    this.update(node, vm, exp, "text");
  }

  //   双绑
   model(node, vm, exp) {
    // 指定input的value属性
    this.update(node, vm, exp, "model");

    // 视图对模型响应
    node.addEventListener("input", e => {
      vm[exp] = e.target.value;
    });
  }
  html(node, vm, exp) {
    this.update(node, vm, exp, "html");
  }

    //   事件处理器
    eventHandler(node, vm, exp, dir) {
        //   @click="onClick"
        let fn = vm.$options.methods && vm.$options.methods[exp];
        if (dir && fn) {
          node.addEventListener(dir, fn.bind(vm));
        }
      }
}
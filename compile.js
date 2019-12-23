class Compile{
    constructor(el,vm){
        this.el = el
        this.vm = vm

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
            }else if(node.nodeType === 3){
                // 是文本,编译文本
                /\{\{(.*)\}\}/.test(node.textContent)
                console.log(RegExp.$1)
               
            }
            if(node.childNodes &&node.childNodes.length>0){
                console.log(1)
                this.compile(node)
            }
        })
    }
    compileText(node){
        /\{\{(.*)\}\}/.test(node.textContent)
    }
}
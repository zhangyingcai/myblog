// instanceof 原理 原型链查找
// obj intanceof fun

const intanceof = (left, right)=>{
    // left 原型
    const leftPrototype = left.__proto__;
    let rightPrototype = right.prototype;
    while(true) {
        // 最后一环
        // if()
        if(leftPrototype === rightPrototype){
            return true;
        }
        leftPrototype = leftPrototype.__proto__
    }
}
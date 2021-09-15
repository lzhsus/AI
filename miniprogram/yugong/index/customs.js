let _num = (speed,num)=>{
    let arr = [];
    for(let i=1;i<999;i++){
        arr.push(speed*(i*100))
    }
    return arr;
}
const customs = [{
    id:1,
    name:"草丛",
    num:0,
    speed:"0.1",
    _num:[],
    desc:"人类文明的繁衍，重曹冲开始！",
    isOpen:true
},{
    id:2,
    name:"《九阳神功》",
    num:0,
    speed:"0.5",
    _num:[],
    desc:"人类文明的繁衍，重曹冲开始！",
    isOpen:false
}].map(item=>{ 
    item._num = _num(item.speed,item.num)
    return item;
});
console.log('customs',customs)
module.exports = customs;
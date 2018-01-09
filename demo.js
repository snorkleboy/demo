document.addEventListener("DOMContentLoaded", function () {

  // setTimeout(function(){demoEl.innerHTML = element;},3000);
  demo(new ElememntObj(element1, add1, remove1), 3000)
  .then(()=>demo(new ElememntObj(element2,add1,remove1),2000))
  .then(()=>demo(new ElememntObj(element1, add1, remove1), 3000))
});

const element1 = document.createElement('div');
element1.innerHTML=`
<div class='aa'>
  <h2> this is template</h2>
</div>
`;
const element2 = document.createElement('div');
element2.innerHTML=`
<div class='aa'>
  <h2> This is second demo page</h2>
</div>
`;

const add1 = function(el, stayFunc){
  const demoEl = document.getElementById('demo');
  demoEl.appendChild(el);
};

const remove1 = function(el){
  const demoEl = document.getElementById('demo');
  demoEl.removeChild(el);
};
const demo = function(elobj, time){
    return new Promise((resolve)=>{
      elobj.build(resolve,time);
    });
};
class ElememntObj{
  constructor(el, add, remove){
    this.el = el;
    this.add = add;
    this.remove = remove;
    this.to = null;
    this.resolve = null;
  }
  build(resolve, time){
    this.resolve = resolve;
    const toDestroy = function(){
      console.log(this);
      this.destroy();
    };
    toDestroy.bind(this);

    this.add(this.el,this.stay);
    this.to = setTimeout(toDestroy.bind(this), time);
  }
  destroy(){
    this.remove(this.el);
    this.resolve('resolved promise');
  }
  stay(){
    clearTimeout(this.to)
  }
}

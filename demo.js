document.addEventListener("DOMContentLoaded", function () {

  // setTimeout(function(){demoEl.innerHTML = element;},3000);
  demo(new ElemementObj(element1, add1, remove2), 3000)
    .then(() => demo(new ElemementObj(element2, add3,remove1),4000),null)
    .then(() => demo(new ElemementObj(element3, add2, remove2), 3000));
});

const demo = function(elobj, time){
    return new Promise((resolve, reject)=>{
      elobj.build(resolve,reject,time);
    });
};
class ElemementObj{
  constructor(el, add, remove){
    this.el = el;
    this.add = add;
    this.remove = remove;
    this.to = null;
    this.resolve = null;
  }
  build(resolve,reject, time){
    this.resolve = resolve;
    this.reject = reject;
    
    // this.el.setAttribute('stay', this.stay.bind(this));
    // this.el.setAttribute('destroy', this.destroy.bind(this));
    // this.el.setAttribute('test', function(){console.log("this")});
    window.stay = this.stay.bind(this);
    window.destroy = this.destroy.bind(this);
    window.test = ()=>console.log("test func");
    window.destroyReject = this.destroyReject.bind(this);

    this.add(this.el,this.stay);    
    this.to = setTimeout(this.destroy.bind(this), time);
  }
  destroyReject(){

    clearTimeout(this.to);
    this.reject();
    this.destroy();
  }
  destroy(){
    this.remove(this.el);
    this.resolve('resolved promise');
    clearTimeout(this.to);
  }
  stay(){
    clearTimeout(this.to);
  }
}


const element1 = document.createElement('div');
element1.innerHTML = `
<div class='aa'>
  <h2> this is template</h2>
  <h1> it might explain stuff</h1>
  <button onclick="stay()">stay</button>
  <button onclick="destroy()">destroy</button>
  <button onclick="test()">test</button>
  <button onclick="destroyReject()">REJECT</button>
</div>
`;
const element2 = document.createElement('div');
element2.innerHTML = `
<div class='aa'>
  <h2> This is second demo page</h2>
  <button onclick="stay()">stay</button>
  <button onclick="destroy()">destroy</button>
  <button onclick="test()">test</button>
</div>
`;

const element3 = document.createElement('div');
element3.innerHTML = `
<div onclick='stay()' class='aa'>
  <h2> third page</h2>
  <button onclick="stay()">stay</button>
  <button onclick="destroy()">destroy</button>
  <button onclick="test()">test</button>
</div>
`;

const add1 = function (el) {
  el.style.position = 'absolute';
  const demoEl = document.getElementById('demo');
  demoEl.appendChild(el);
};

const add2 = function(el){
  const demoEl = document.getElementById('demo');
  el.style.position = 'absolute';
  el.style.right = '0';
  el.style.opacity = '0';
  el.style.transition = 'all 2s';
  demoEl.appendChild(el);
  setTimeout(() => { el.style.right = '500px'; }, 0);
  setTimeout(() => { el.style.opacity = '1'; }, 0);

};

const add3 = function (el) {
  const demoEl = document.getElementById('demo');

  el.style.transition = 'right 1s';
  el.style.position = 'absolute';
  el.style.right = '0px';
  demoEl.appendChild(el);
  setTimeout(()=>{el.style.right = '500px';},0);
};

const remove1 = function (el) {
  const demoEl = document.getElementById('demo');
  demoEl.removeChild(el);
};

const remove2 = function (el) {
  const demoEl = document.getElementById('demo');
  el.style.transition = 'opacity 1s';
  el.style.opacity = '1';
  
  setTimeout(() => { el.style.opacity = '0'; }, 0);
  setTimeout(() => { demoEl.removeChild(el); }, 1000);
};



class runner {

  constructor(elobjs){
    this.elements = elobjs;
    this.index=0;
    this.to = null;
  }
  run(){
    const obj = this.elements[this.index];
    ++this.index;
    this.destroyCurrent = obj.destroy;
    this.bindMethods();

    obj.build();
    this.to = setTimeout(function(){
      obj.destroy();
      run();
    }, obj.time);
  }
  bindMethods(){
    window.stay = this.stay.bind(this);
    window.destroy = this.destroy.bind(this);
    window.test = () => console.log("test func");
    window.destroyReject = this.destroyReject.bind(this);
  }
  goBack(){
    this.destroyCurrent();
    this.index = this.index - 2;
    this.clear();
    this.run();
  }
  clear(){
    clearTimeout(this.to);
  }
  stay(){
    clearTimeout(this.to);
  }
  destroyCurrent(){
    // dymanically set in build()
  }
  endRun(){
    this.destroyCurrent();
    this.clear();
  }

}
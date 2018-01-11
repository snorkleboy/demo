document.addEventListener("DOMContentLoaded", function () {
  const objs = [
    new ElementObj(element1, add2,remove2,3000),
    new ElementObj(element2, add2, remove2, 3000),
    new ElementObj(element3,add3, remove2, 2000)
  ];
  const runner = new Runner(objs);
  runner.run();

});


class ElementObj{
  constructor(el, add, remove,time){
    this.el = el;
    this.add = add;
    this.remove = remove;
    this.time = time;
  }
  build(){
    this.add(this.el);
  }
  destroy(){
    this.remove(this.el);
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
</div>
`;
const element2 = document.createElement('div');
element2.innerHTML = `
<div class='aa'>
  <h2> This is second demo page</h2>
  <button onclick="stay()">stay</button>
  <button onclick="destroy()">destroy</button>
  <button onclick="goBack()">goback</button>
  <button onclick="test()">test</button>
</div>
`;

const element3 = document.createElement('div');
element3.innerHTML = `
<div onclick='stay()' class='aa'>
  <h2> third page</h2>
  <button onclick="stay()">stay</button>
  <button onclick="destroy()">destroy</button>
  <button onclick="goBack()">goback</button>
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



class Runner {

  constructor(elobjs){
    console.log(elobjs);
    this.elements = elobjs;
    this.index=0;
    this.to = null;
    this.current = null;
  }
  run(){
    console.log(this.index);
    if (this.index > this.elements.length){
      return true;
    }
    const obj = this.elements[this.index];
    this.current = obj;
    this.bindMethods();
    obj.build();

    const destroyRun = function () {
      obj.destroy();
      ++this.index;
      this.run();
    };
    this.to = setTimeout(destroyRun.bind(this), obj.time);
  }
  bindMethods(){
    window.stay = this.stay.bind(this);
    window.destroy = this.destroyCurrentAndRun.bind(this);
    window.goBack = this.goBack.bind(this);
  }
  goBack(){
    if (this.index >= 1){
      clearTimeout(this.to);
      this.destroyCurrent();
      console.log("index to destroy", this.index)
      this.index = this.index - 1;
      console.log("index to run", this.index)
      this.run();
    }
  }
  stay(){
    clearTimeout(this.to);
  }
  destroyCurrentAndRun() {
    this.destroyCurrent();
    ++this.index;
    this.run();
  }
  destroyCurrent(){
    clearTimeout(this.to);
    this.current.destroy();
  }
  endRun(){
    clearTimeout(this.to);
    this.current.destroy();
  }

}
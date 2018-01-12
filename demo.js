document.addEventListener("DOMContentLoaded", function () {
  const objs = [
    new ElementObj(element1, add1, remove2, 5000, script1),
    new ElementObj(element2, add2, remove2, 5000, script1),
    new ElementObj(element3,add3, remove3, 5000)
  ];
  new Runner(objs).run();

});


class ElementObj{
  constructor(el, add, remove,time, CBScript){
    this.el = el;
    this.add = add;
    this.remove = remove;
    this.time = time;
    this.CBScript = CBScript;
  }
  build(){
    this.add(this.el);
  }
  destroy(next){
    this.remove(next, this.el);
  }
  
}
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
    if (this.index > this.elements.length - 1) return this.endRun();
    const obj = this.elements[this.index];
    this.current = obj;
    this.bindMethods();
    obj.build();
    ++this.index;
    if (typeof obj.CBScript === 'function') obj.CBScript();
    this.to = setTimeout(this.destroyCurrentAndRun.bind(this), obj.time);
  }
  bindMethods(){
    window.demo.stay = this.stay.bind(this);
    window.demo.destroy = this.destroyCurrentAndRun.bind(this);
    window.demo.goBack = this.goBack.bind(this);
    window.demo.end = this.endRun.bind(this);
  }
  goBack(){
    if (this.index >= 1){
      clearTimeout(this.to);
      this.destroyCurrent();
      console.log("index to destroy", this.index);
      this.index = this.index - 1;
      console.log("index to run", this.index);
      this.run();
    }
  }
  stay(){
    clearTimeout(this.to);
  }
  destroyCurrentAndRun() {
    this.current.destroy(this.run.bind(this));
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


const script1 = function () {
  const arbButton = document.getElementById('arb');
  console.log(arbButton);
  for (let i = 0; i < 5; i++) {

    arbButton.click();
  }

}
const element1 = document.createElement('div');
element1.innerHTML = `
<div class='aa'>
 <h2> 1</h2>
  <h2> this is template</h2>
  <h1> it might explain stuff</h1>
  <button onclick="demo.stay()">stay</button>
  <button onclick="demo.destroy()">destroy</button>
  <button onclick="demo.test()">test</button>
  <button onClick="demo.end()">end demo</button>
</div>
`;
const element2 = document.createElement('div');
element2.innerHTML = `
<div class='aa'>
 <h2> 2</h2>
  <h2> This is second demo page</h2>
  <button onclick="demo.stay()">stay</button>
  <button onclick="demo.destroy()">destroy</button>
  <button onclick="demo.goBack()">goback</button>
  <button onclick="demo.test()">test</button>

  <button onClick="demo.end()">end demo</button>
</div>
`;

const element3 = document.createElement('div');
element3.innerHTML = `
<div onclick='stay()' class='aa'>
  <h2> third page</h2>
  <h2> 3</h2>
  <button onclick="demo.stay()">stay</button>
  <button onclick="demo.destroy()">destroy</button>
  <button onclick="demo.goBack()">goback</button>
  <button onclick="demo.test()">test</button>

  <button onClick="demo.end()">end demo</button>
</div>
`;

const add1 = function (el) {
  el.style.position = 'absolute';
  const demoEl = document.getElementById('demo');
  demoEl.appendChild(el);
};

const add2 = function (el) {
  const demoEl = document.getElementById('demo');
  // el.style.position = 'absolute';
  // el.style.right = '0px';
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
  el.style.right = '-5%';
  demoEl.appendChild(el);
  setTimeout(() => { el.style.right = '500px'; }, 0);
};

const remove1 = function (next, el) {
  const demoEl = document.getElementById('demo');
  demoEl.removeChild(el);
  next();
};

const remove2 = function (next, el) {
  const demoEl = document.getElementById('demo');
  el.style.transition = 'opacity .3s';
  el.style.opacity = '1';
  setTimeout(() => { el.style.opacity = '0'; }, 0);
  setTimeout(() => {
    demoEl.removeChild(el);
    next();
  }, 500);
};

const remove3 = function (next, el) {
  const demoEl = document.getElementById('demo');
  demoEl.removeChild(el);
  next();
};
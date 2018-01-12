class DemoObj{
  constructor(el, add, remove,time, CBScript){
    this.el = el;
    this.add = add;
    this.remove = remove;
    this.time = time;
    this.CBScript = CBScript;
    this.attached = false;
  }
  build(){
    this.add(this.el);
    this.attached = true;
  }
  destroy(next){
    this.remove(next, this.el);
    this.attached = false;
  }
  
}
class DemoRunner {

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
    if (this.index >= 0){
      clearTimeout(this.to);
      this.destroyCurrent();
      console.log("index to destroy", this.index-1);
      this.index = this.index - 2;
      console.log("index to run", this.index);
      this.run();
    }
  }
  stay(){
    clearTimeout(this.to);
  }
  destroyCurrentAndRun() {
    clearTimeout(this.to);
    this.current.destroy(this.run.bind(this));
  }
  destroyCurrent(){
    clearTimeout(this.to);
    this.current.destroy(function(){});
  }
  endRun(){
    if (this.current.attached) this.destroyCurrent();
  }
}

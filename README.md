# Demoizer
This is a JavaScript App to help make and sequence a Demo function. It lets you dynamically and  asynchronously create HTML elements and call scripts at different life-cycle hooks. 
[The best example of It in action currently is my other project:](https://github.com/snorkleboy/Compression-visualizer/blob/master/js/demo.js)
[demo](http://res.cloudinary.com/flyakite/video/upload/c_scale,w_654/v1515997239/DemoDemo_uhbcc1.gif)

### OverView
  The DemoRunner obj keeps an array of DemoObjs, calls build() on one and starts a cancellabe countdown ontil it calls Destroy() on the DemoObj, which calls build() on the next DemoObj. You can run custom scripts for each DemoObj using the cbScript callbacks, as well as in the add, remove callbacks. 
  The DemoRuner has functions that allow you to have the current DemoObj stay, be destroyed immediately and run the next Demobj, go back a DemoObj, or to quit out of the demo entirely. 

 ### the DemoObj
 A DemoObj requires atleast 4 arguments and its constructor looks like
  ```
  constructor(InnerHTMLFunction, add, remove, time, ...cbScripts)
  ```
  #### InnerHTMLFunction
  the InnerHTMLFunction should be a function that retuns inner html. When build() is called on the DemoObj by the Runner a new Div element will be created and its innerHTML set to the InnerHTMLFunction(), for example
  ```
  const firstEl = () => `<h1> Hello World </h1>`
  ```
  #### Add
  the add function should a be function which takes in a HTML element and attaches it to the dom. It can also optionally take in a message parameter which will be the return of the last Remove()
  ```
  const add = function (el, message) {
    parent.appendChild(el);
};
  ```
  #### Remove
  the remove function should take in an element to remove, and crucially a next callback which will start the build of the next DemoObj
  ```
  export const fadeOut = function (el, next) {
        parent.removeChild(el);
        next();
};
```
#### time

the time parameter is the number of milliseconds for the element to stay before its remove() is called, which should call next()
#### cbScripts

Lastly the ...cbScripts arguments will collect functions put at the end of the constructor and call them after build() has been run. and they are called with a referene to the DemoRunner so you can do something like:
```
export const stay = function (runner) {
    runner.stay(); // same as window.demo.stay()
};
```
note that some default function are bound to the window

If you want to bind custom event handlers or have various actions happen after the element has been added a cbScript is the place to do it
#### all together
  ```  
  const firstEl = () => `<h1> Hello World </h1>`
  const secondEl = () => `<h1> Hello Again </h1>
  
  const parent = document.getElementById('some-element')
  `
  const add = (el) => parent.appendChild(el)
  
  const remove = (el, next) => {
    parent.removeChild(el)
    next()
  }
  export const stay = function (runner) {
    runner.stay();
};
  const demo = [
    new DemoObj(firstEl, add, remove, 3500),
    new DemoObj(secondEl, add, remove, 13000, stay),
   ]
  new DemoRunner(demo).toggle();
 ```
### the DemoRunner
```
constructor(elobjs, destroyCB)
```

```
  run(message) {
    if (this.index > this.elements.length - 1) return this.endRun();
    const obj = this.elements[this.index];
    this.current = obj;
    this.bindMethods();
    obj.build(message);
    ++this.index;
    this.to = setTimeout(this.destroyCurrentAndRun.bind(this), obj.time);
    const that = this;
    obj.cbScripts.forEach(function(cbScript){
      if (typeof cbScript === 'function') cbScript(that);
    });
  }
  ```
  
  ```
    stay() {
    clearTimeout(this.to);
  }
  destroyCurrentAndRun() {
    clearTimeout(this.to);
    this.current.destroy(this.run.bind(this));
  }
  ```
  #### destroy Callback
```
  endRun() {
    clearTimeout(this.to);
    if (this.current.attached) this.destroyCurrent();
    this.switch = false;
    if (typeof this.destroyCB === 'function') this.destroyCB();
    window.demo = undefined;
    this.index = 0;
    
  }
  ```

#### window Methods
```
    window.demo.stay = this.stay.bind(this);
    window.demo.destroyCurrentAndRun = this.destroyCurrentAndRun.bind(this); //next
    window.demo.goBack = this.goBack.bind(this);
    window.demo.endRun = this.endRun.bind(this);
```
```
export const stay = function (runner) {
    runner.stay();
};
export const stay = function () {
    window.demo.stay();
};
```
### coming soon
 - insertAt(DemoObj, index)
 - insertAt([DemoObj], index)
 - replaceAt(DemoObj, index)
 - ReplaceAt([DemoObj],start,end)
 
 - DemoRunner functions like run() and destroy() will be made into private methods so that DemoRunner is accidently thrown off track. 

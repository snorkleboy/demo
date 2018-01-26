# Demoizer
This is a JavaScript App to help make and sequence a Demo function. It lets you dynamically and  asynchronously create HTML elements and call scripts at different life-cycle hooks. 
[The best example of It in action currently is my other project:](https://github.com/snorkleboy/Compression-visualizer/blob/master/js/demo.js)
![demo](http://res.cloudinary.com/flyakite/video/upload/c_scale,w_654/v1515997239/DemoDemo_uhbcc1.gif)

### OverView
  Your given DemoRunner and a DemoObj objects. DemoRunner needs to be instantiated with an array of DemoObjs. Every DemoObjs needs a function which returns inner html, a function which adds element to the dom, a function which removes it from the dom and calls next(), and a time to stay on the dom before calling remove. 

  Then you can call toggle() on DemoRuner to start the sequence. You also have control over the sequence with functions on the DemoRunner such as stay() or destroy(). There is also optional callbacks you can give demoObjs which are called after they have been attached and the demoRunner takes an optional callback it runs after its finished its sequence.

## The DemoObj
 A DemoObj requires atleast 4 arguments and its constructor looks like
  ```
  constructor(InnerHTMLFunction, add, remove, time, ...cbScripts)
  ```
  #### InnerHTMLFunction
  the InnerHTMLFunction should be a function that returns inner html. When build() is called on the DemoObj by the Runner a new Div element will be created and its innerHTML set to the InnerHTMLFunction(). 
  ```
  const firstEl = () => `<h1> Hello World </h1>`;
  ```
  NB: you cannot create `<script/>` tags inside the inner html, they will not cause errors but they will not be run. You can however put code before the return of the template or use CBscripts 

  #### Add
  the add function should a be function which takes in a HTML element and attaches it to the dom. The element it will receive is the element that was created from the InnerHTMLFunction. It also optionally takes in a message parameter which will be the return of the last Remove()
  ```
  const add = function (el, message) {
    parent.appendChild(el);
};
  ```
  #### Remove
  the remove function should take in an element to remove, and crucially a next callback which will start the build of the next DemoObj. If you want to create CSS or Timeout transitions and the next DemoObj is supposed to have the same parent, it is recommended to use setTimeout to call next only after this object has actually been removed from the dom. 
  ```
  export const fadeOut = function (el, next) {
        parent.removeChild(el);
        message=input.value
        next(message);
};
```
#### time

the time parameter is the number of milliseconds for the element to stay before its remove() is called, which should call next()
#### cbScripts

Lastly the ...cbScripts arguments will collect functions put at the end of the constructor and call them after build() has been run. and they are called with a reference to the DemoRunner and the element so you can do something like:
```
export const stay = function (runner,el) {
    runner.stay(); // same as window.demo.stay()
    el.style.opacity=.9;
};
```
note that some default function are bound to the window

If you want to bind custom event handlers or have various actions happen after the element has been added a cbScript is the place to do it
#### all together
  ```  
    const firstEl = () => `<h1 style="color:red;"> Hello World </h1>`;
    const secondEl = () => `<h1 style="color:blue;"> Hello Again </h1>`;

    const parent = document.getElementById('topdiv');
    console.log(parent);

    const add = (el) => {
        parent.appendChild(el);
    };

    const remove = (el, next) => {
        parent.removeChild(el);
        next();
    };
    const stay = function (runner) {
        runner.stay();
    };
    const demo = [
        new DemoObj(firstEl, add, remove, 2000),
        new DemoObj(secondEl, add, remove, 2000,stay),
    ]
    new DemoRunner(demo).toggle();
 ```
## The DemoRunner

  You must instantiate a DemoRunner with an array of DemoObjs, and optionally a callback to run when the Demo is finished or toggled off.

  The DemoRunner binds a few useful functions to Window.Demo,
```
    window.demo.stay = this.stay.bind(this);
    window.demo.destroyCurrentAndRun = this.destroyCurrentAndRun.bind(this); //next
    window.demo.goBack = this.goBack.bind(this);
    window.demo.endRun = this.endRun.bind(this);
```

  you can also use these function by calling them on the DemoRunner obj you called toggle on or inside of CBScripts using the referene to the runner. The following three functions will all result in the currently displayed element voiding its countdown and staying on the page until the DemoRunner is toggled off or destroyCurrentAndRun is called.
```
demorunner = New DemoRunner(demobjs);
const stay = function(){
  demorunnerstay();
}


export const stay = function (runner) {
    runner.stay();
};
export const stay = function () {
    window.demo.stay();
};
```

## LifeCycle
Runner Toggled=> demobjs[0]'s innerHTMLFunction is used to make an element => demoObjs[0]'s add(el) is called with the resulting element =>demoObjs[0] CBscripts are called => after Time demoOBjs[0] remove is called which calls next(message)=> demoObjs[1] innerHTMLfunction is called to make an element=> DemoObjs[1] add(el) is called with the message from demoOBj[0]s remove();
### coming soon
 - insertAt(DemoObj, index)
 - insertAt([DemoObj], index)
 - replaceAt(DemoObj, index)
 - ReplaceAt([DemoObj],start,end)
 
 - DemoRunner functions like run() and destroy() will be made into private methods so that DemoRunner is accidently thrown off track. 

# Demoizer
This is a JavaScript App to help make and sequence a Demo function. It lets you dynamically and  asynchronously create HTML elements and call scripts at different life-cycle hooks. 
[The best example of It in action currently is my other project:](https://github.com/snorkleboy/Compression-visualizer/blob/master/js/demo.js)

##How to
### OverView
  you Need to instantiate a DemoRunner obj with an array of DemoObjs and then call Toggle() on it. DemoObjs have a function which returns the InnerHTML of that element, a add function which attaches it to the dom, a remove function which detaches, and a time which tells the Demo runner how long to leave the element up before calling destroy() on it. 
  The DemoRunner has functions on it which let you manipulate the demo sequence, such as endRun() or stay();
  A DemoObj requires atleast 4 arguments and its constructor looks like
  ```
  constructor(InnerHTMLFunction, add, remove, time, ...cbScripts)
  ```
  the InnerHTMLFunction should be a function that retuns inner html. When build() is called on the DemoObj by the Runner a new Div element will be created and its innerHTML set to the InnerHTMLFunction(), for example
  ```
  const firstEl = () => `<h1> Hello World </h1>`
  ````
  the add function should a be function which takes in a HTML element and attaches it to the dom. It can also optionally take in a message parameter which will be the return of the last Remove()
  ```
  const add = function (el, message) {
    parent.appendChild(el);
};
  ```
  
  the remove function should take in an element to remove, and crucially a next callback which will start the build of the next DemoObj
  ```
  export const fadeOut = function (el, next) {
        parent.removeChild(el);
        next();
};
```

the time parameter is the number of milliseconds for the element to stay before its remove() is called, which should call next()

Lastly the ...cbScripts arguments will collect functions put at the end of the constructor and call them after build() has been run.
If you want to bind custom event handlers or have various actions happen after the element has been added a cbScript is the place to do it
all together
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
  
  const demo = [
    new DemoObj(firstEl, add, remove, 3500),
    new DemoObj(secondEl, add, remove, 13000),
   ]
  new DemoRunner(demo).toggle();
 ```
 
 DemoRunner binds some  
### the DemoRunner

####destroy Callback
####window Methods

### the DemoObj

####cbScripts
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

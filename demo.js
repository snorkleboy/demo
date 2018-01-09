document.addEventListener("DOMContentLoaded", function () {
  const demoEl = document.getElementById('demo');
  demoEl.innerText = 'javascript';
  setTimeout(function(){demoEl.innerHTML = element;},3000);

});

const element = `
<div class='aa'>
  <h2> this is template</h2>
</div>
`;
let myFirstPromise = new Promise((resolve, reject) => {
  // We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed.
  // In this example, we use setTimeout(...) to simulate async code.
  // In reality, you will probably be using something like XHR or an HTML5 API.
  setTimeout(function(){
    resolve("Success!"); // Yay! Everything went well!
  }, 1250);
});

myFirstPromise.then((successMessage) => {
  // successMessage is whatever we passed in the resolve(...) function above.
  // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
  console.log("Yay! " + successMessage);
});

let demo = function(elobj, time){
    return new Promise((resolve)=>{
      elobj.build(resolve,time);
    });
};
class ElememntObj{
  constructor(el, add, remove){
    this.element = el;
    this.add = add;
    this.remove = remove;
    this.to = null;
    this.resolve = null;
  }
  build(resolve, time){
    this.resolve = resolve;
    const toDestroy = function(){
      this.destroy();
      this.resolve('message');
    };
    toDestroy.bind(this);

    this.add(this.el);
    this.to = setTimeout(toDestroy, time);
  }
  destroy(){
    this.remove(this.el)
  }
  stay(){
    clearTimeout(this.to)
  }
}

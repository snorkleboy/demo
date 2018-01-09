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


class ElememntObj{
  constructor(el, add, remove, time){
    this.element = el;
    this.add = add;
    this.remove = remove;
    this.time = time;
    this.to = null;
    this.resolve = null;
  }
  build(resolve){
    this.resolve = resolve;
    const toDestroy = function(){
      this.destroy();
      this.resolve();
    };
    toDestroy.bind(this);

    this.add(this.el);
    this.to = setTimeout(toDestroy, this.time);
  }
  destroy(){
    this.remove(this.el)
  }
  stay(){
    clearTimeout(this.to)
  }
}

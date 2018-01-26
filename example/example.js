
document.addEventListener('DOMContentLoaded',()=>{
    
    const firstEl = () => `<h1 style='color:red;'> Hello World </h1>`;
    const secondEl = () => `<h1 style='color:blue;'> Hello Again </h1>`;

    const parent = document.getElementById('topdiv');
    console.log(parent);

    const add = (el) => {
        parent.appendChild(el);
    }

    const remove = (el, next) => {
        parent.removeChild(el);
        next();
    }
    const stay = function (runner) {
        runner.stay();
    };
    const demo = [
        new DemoObj(firstEl, add, remove, 2000),
        new DemoObj(secondEl, add, remove, 2000),
        new DemoObj(firstEl, add, remove, 2000,stay)
    ]
    new DemoRunner(demo).toggle();
})

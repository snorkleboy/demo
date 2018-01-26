
document.addEventListener('DOMContentLoaded',()=>{
    
    const firstEl = () => `<h1> Hello World </h1>`;
    const secondEl = () => `<h1> Hello Again </h1>`;

    const parent = document.getElementById('topdiv');
    console.log(parent);

    const add = (el) => {
        
        parent.appendChild(el);
        console.log('!!!!!');
    }

    const remove = (el, next) => {
        parent.removeChild(el);
        next();
    }
    const stay = function (runner) {
        runner.stay();
    };
    const demo = [
        new DemoObj(firstEl, add, remove, 3500),
        new DemoObj(secondEl, add, remove, 13000, stay),
    ]
    new DemoRunner(demo).toggle();
})

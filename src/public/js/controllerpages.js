addEventListener('DOMContentLoaded', (event) => {

const nuevaMercancia = document.getElementById('nueva-mercancia');

const loadSectionNuevaMercancia = (entradas,obs)=>{
    entradas.forEach((entrada)=>{
        if (entrada.isIntersecting) {
            nuevaMercancia.classList.add('is-visible');
        };    
    })
};

const observer = new IntersectionObserver(loadSectionNuevaMercancia,{
    root:null,
    rootMargin: '0px 0px 0px 0px',
    threshold: 0.3,
});

observer.observe(nuevaMercancia);

});


//---------------------------------------------------------------------------------------------

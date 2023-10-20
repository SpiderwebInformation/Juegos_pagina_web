 //divs
 const blanco = document.getElementById('blanco')
 const unoq = document.querySelector('#uno')
 const dosq = document.querySelector('#dos')
 const tresq = document.querySelector('#tres')
 const cuatroq = document.querySelector('#cuatro')
 const cincoq = document.querySelector('#cinco')
 const seixq = document.querySelector('#seix')
 const sieteq = document.querySelector('#siete')
 const ochoq = document.querySelector('#ocho')
 const nueveq = document.querySelector('#nueve')
 const diezq = document.querySelector('#diez')
 const onceq = document.querySelector('#once')
 const doceq = document.querySelector('#doce')
 const treceq = document.querySelector('#trece')
 const catroceq = document.querySelector('#catorce')
 const quinceq = document.querySelector('#quince')
 const tiempo = document.getElementById('tiempo')
 
 //botones
 const reset = document.getElementById('reset')
  
  
 objetivo = 15
 cont = 999
  
 var startTime, endTime;
 resetea()  
 function cumprueba() {
         if (getorden(unoq) == 0 && getorden(dosq) == 1 && getorden(tresq) == 2 && getorden(cuatroq) == 3 && getorden(cincoq) == 4 && getorden(seixq) == 5 && getorden(sieteq) == 6 && getorden(ochoq) == 7 && getorden(nueveq) == 8 && getorden(diezq) == 9 && getorden(onceq) == 10 && getorden(doceq) == 11 && getorden(treceq) == 12 && getorden(catroceq) == 13 && getorden(quinceq) == 14) {
                 end()
                 start()
         }
 }
 
 function getorden(selector) {
         const style = window.getComputedStyle(selector);
         const order = style.getPropertyValue('order');
         return +order
 }
 
 document.getElementsByClassName('caja uno')[0]
         .addEventListener('click', () => {
                 mueve(unoq)
         });
 document.getElementsByClassName('caja dos')[0]
         .addEventListener('click', () => {
                 mueve(dosq)
         });
 document.getElementsByClassName('caja tres')[0]
         .addEventListener('click', () => {
                 mueve(tresq)
         });
 document.getElementsByClassName('caja cuatro')[0]
         .addEventListener('click', () => {
                 mueve(cuatroq)
         });
 document.getElementsByClassName('caja quinto')[0]
         .addEventListener('click', () => {
                 mueve(cincoq)
         });
 document.getElementsByClassName('caja sexta')[0]
         .addEventListener('click', () => {
                 mueve(seixq)
         });
 
 document.getElementsByClassName('caja septima')[0]
         .addEventListener('click', () => {
                 mueve(sieteq)
         });
 document.getElementsByClassName('caja octava')[0]
         .addEventListener('click', () => {
                 mueve(ochoq)
         });
 
 document.getElementsByClassName('caja novena')[0]
         .addEventListener('click', () => {
                 mueve(nueveq)
         });
 
 document.getElementsByClassName('caja decima')[0]
         .addEventListener('click', () => {
                 mueve(diezq)
         });
 
 document.getElementsByClassName('caja undecima')[0]
         .addEventListener('click', () => {
                 mueve(onceq)
         });
 
 document.getElementsByClassName('caja doceaba')[0]
         .addEventListener('click', () => {
                 mueve(doceq)
         });
 document.getElementsByClassName('caja trece')[0]
         .addEventListener('click', () => {
                 mueve(treceq)
         });
 document.getElementsByClassName('caja catroce')[0]
         .addEventListener('click', () => {
                 mueve(catroceq)
         });
 
 document.getElementsByClassName('caja quince')[0]
         .addEventListener('click', () => {
                 mueve(quinceq)
         });
 
 reset.addEventListener('click', () => {
         resetea()
 })
 
 function mueve(quaerry) {
         const style = window.getComputedStyle(quaerry);
         const order = style.getPropertyValue('order');
         if (valida(order, objetivo) == true) {
                 blanco.style.order = order
                 quaerry.style.order = objetivo
                 objetivo = +order
         } cumprueba()
 }
 
 
 function resetea2(){
   const number = Math.floor(Math.random() * (30-15)-15);
   for (let index = 0; index < number; index++) {
         const number = Math.floor(Math.random() * 3) 
         switch(number){
                 case 0:
                        const casilla = casilla -4
                        
         }
           
         
   }
 }
 
 
 // function aleatorio(casilla){
 //         casillas.forEach(element => {
 //                 const style = window.getComputedStyle(element);
 //                 const order = style.getPropertyValue('order');   
 //                 if  
 //         });
 // }
 function resetea() {
         start()
         const results = [];
         const limit = 15;
         while (results.length <= limit) {
 
                 const number = Math.floor(Math.random() * 16);
 
                 if (!results.includes(number)) {
                         results.push(number);
                 }
         }
         unoq.style.order = results[0]
         dosq.style.order = results[1]
         tresq.style.order = results[2]
         cuatroq.style.order = results[3]
         cincoq.style.order = results[4]
         seixq.style.order = results[5]
         sieteq.style.order = results[6]
         ochoq.style.order = results[7]
         nueveq.style.order = results[8]
         diezq.style.order = results[9]
         onceq.style.order = results[10]
         doceq.style.order = results[11]
         treceq.style.order = results[12]
         catroceq.style.order = results[13]
         quinceq.style.order = results[14]
         blanco.style.order = results[15]
         objetivo = results[15]
 }
 
 function valida(order, objetivo) {
         if (objetivo == 3 || objetivo == 7 || objetivo == 11) {
                 if (objetivo - 4 == order || objetivo + 4 == order || objetivo - 1 == order) {
                         return true
                 }
         } else {
                 if (objetivo - 4 == order || objetivo + 4 == order || objetivo - 1 == order || objetivo + 1 == order) {
                         return true
                 }
         }
         return false
 }
 function start() {
         startTime = new Date();
  
 };
 function end() {
         endTime = new Date();
      
         var timeDiff = endTime - startTime; //in ms
         // strip the ms
         timeDiff /= 1000;
 
         // get seconds  
         if( Math.round(timeDiff)< cont ){
  
          cont = Math.round(timeDiff);
          tiempo.innerText = cont + ' segundos'
      
         } 
         alert('Ganastes! en ' + Math.round(timeDiff)+ ' segundos');
 }
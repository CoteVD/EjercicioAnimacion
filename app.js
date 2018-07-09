//La firma es el nombre de la función, los parámetros y lo que retorna.
function animateElement(element, start, target, duration){ //Retornará promesa con elemento.
  element.style.left = start; 
  let counter = 0;
  const delta = (target - start)*40/duration; //Delta es lo que se debe mover por cuadro.
  return new Promise((resolve, reject)=>{ //Acá se está declarando la promesa. Los parametros indican lo que resuelven y lo que se rechaza, cuando se resuelve se llama a resolve() y si no se llama a reject().
      const loop = setInterval(()=>{ // Toma una funcion y la repite cada ciertos milisegundos.
          const current = start + counter++ * delta; //Acá indicamos el movimientoto, ++counter hace que sume y luego se multiplique. Counter ++ suma después. Formula = posición inicial + velocidad*tiempo.
          element.style.left = current;
          if(start > target && current <= target){ //Acá indicamos cuando queremos que finalize el moviento que seria alb llegar a target.
              element.style.left = current;
              clearInterval(loop); //Acá se termina la promesa.
              resolve();//Si queremos pasar una respuesta es a través del parámetro de resolve.
          }else if(start < target && current >= target){
              element.style.left = current;
              clearInterval(loop); //Acá se termina la promesa.
              resolve();//Si queremos pasar una respuesta es a través del parámetro de resolve.
          }
      }, 40);//40 es lo que se va a demorar en ejecutar la funcion de nuevo, entre cada llamada a la funcion. Frames per second.
  });                
}

// Somos programadoras de la promise.
//===================== Promise ===================
// Somos las usuarias de la promise.

//Secuencial.
const allLi = document.getElementsByTagName("li");
Promise.all( //Esto devuelve un arreglo de promesas y ejecutarlas a la vez, se resuelve cuando terminan todas las promesas.
  [
      animateElement(allLi[1], -200, 600, 2000),
      animateElement(allLi[0], -200, 600, 2000)
  ]
).then((results)=>{
  console.log("Todas las animaciones terminaron");
  return Promise.all( //Esto devuelve un arreglo de promesas y ejecutarlas a la vez, se resuelve cuando terminan todas las promesas.
      [
          animateElement(allLi[1], 600, -200, 2000),
          animateElement(allLi[0], 600, -200, 2000)
      ]
  )
}).then(()=>{
  console.log("Terminaron las animaciones de vuelta");
}).catch(()=>{
  console.log("Falló la animación");
});
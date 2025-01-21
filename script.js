let tiempo = 0;
let intervalo;
let cronometroActivo = false;
let solving = false;
let reset = false;

const cube = document.querySelector(".cube");
const transformValueElement = document.getElementById("transformValue");
let isMouseDown = false;
let lastX = 0;
let lastY = 0;
let rotateX = 35;
let rotateY = 315;

const whiteOne = document.getElementById("white-one");
const whiteTwo = document.getElementById("white-two");
const whiteThree = document.getElementById("white-three");
const whiteFour = document.getElementById("white-four");

const whiteSix = document.getElementById("white-six");
const whiteSeven = document.getElementById("white-seven");
const whiteEight = document.getElementById("white-eight");
const whiteNine = document.getElementById("white-nine");

let x;
let y;
let xDir;
let yDir;

let moveSide = false;

let cubeDataPlay = [];

function resetCube(){
    
    const cubeData = {
        1: {
            one: "w",
            two: "w",
            three: "w",
            four: "w",
            face_center: "w",
            six: "w",
            seven: "w",
            eight: "w",
            nine: "w",
        },
        2: {
            one: "y",
            two: "y",
            three: "y",
            four: "y",
            face_center: "y",
            six: "y",
            seven: "y",
            eight: "y",
            nine: "y",
        },
        3: {
            one: "r",
            two: "r",
            three: "r",
            four: "r",
            face_center: "r",
            six: "r",
            seven: "r",
            eight: "r",
            nine: "r",
        },
        4: {
            one: "o",
            two: "o",
            three: "o",
            four: "o",
            face_center: "o",
            six: "o",
            seven: "o",
            eight: "o",
            nine: "o",
        },
        5: {
            one: "g",
            two: "g",
            three: "g",
            four: "g",
            face_center: "g",
            six: "g",
            seven: "g",
            eight: "g",
            nine: "g",
        },
        6: {
            one: "b",
            two: "b",
            three: "b",
            four: "b",
            face_center: "b",
            six: "b",
            seven: "b",
            eight: "b",
            nine: "b",
        }
    };
    localStorage.setItem("cubeData", JSON.stringify(cubeData));
}

if (localStorage.getItem("cubeData")) {
  cubeDataPlay = JSON.parse(localStorage.getItem("cubeData"));
} else {
  const cubeData = {
    1: {
      one: "w",
      two: "w",
      three: "w",
      four: "w",
      face_center: "w",
      six: "w",
      seven: "w",
      eight: "w",
      nine: "w",
    },
    2: {
      one: "y",
      two: "y",
      three: "y",
      four: "y",
      face_center: "y",
      six: "y",
      seven: "y",
      eight: "y",
      nine: "y",
    },
    3: {
      one: "r",
      two: "r",
      three: "r",
      four: "r",
      face_center: "r",
      six: "r",
      seven: "r",
      eight: "r",
      nine: "r",
    },
    4: {
      one: "o",
      two: "o",
      three: "o",
      four: "o",
      face_center: "o",
      six: "o",
      seven: "o",
      eight: "o",
      nine: "o",
    },
    5: {
      one: "g",
      two: "g",
      three: "g",
      four: "g",
      face_center: "g",
      six: "g",
      seven: "g",
      eight: "g",
      nine: "g",
    },
    6: {
      one: "b",
      two: "b",
      three: "b",
      four: "b",
      face_center: "b",
      six: "b",
      seven: "b",
      eight: "b",
      nine: "b",
    }
  };

  localStorage.setItem("cubeData", JSON.stringify(cubeData));
  cubeDataPlay = JSON.parse(localStorage.getItem("cubeData"));
}


//cube.style.transform = `rotateX(-35deg) rotateY(315deg)`;

// Bandera para bloquear la rotación
let rotationBlocked = false;

// Controlar el evento de clic para bloquear/desbloquear
cube.addEventListener("mousedown", () => {
  rotationBlocked = !rotationBlocked; // Alternar el estado de bloqueo
  cube.style.cursor = rotationBlocked ? "not-allowed" : "pointer";
});

// Control de la rotación del cubo con el mouse
document.addEventListener("mousemove", (e) => {
  if (!isMouseDown || rotationBlocked) return;

  const deltaX = e.clientX - lastX;
  const deltaY = e.clientY - lastY;

  // Ajustar los ángulos de rotación en X y Y
  rotateX += deltaY * 0.4; // Ajustar la velocidad de rotación en el eje X
  rotateY += deltaX * 0.4; // Ajustar la velocidad de rotación en el eje Y

  if (rotateX <= 0) {
    rotateX = 360;
  }
  if (rotateX > 360) {
    rotateX = 0;
  }
  if (rotateY <= 0) {
    rotateY = 360;
  }
  if (rotateY > 360) {
    rotateY = 0;
  }
  // Aplicar las transformaciones al cubo
  cube.style.transform = `translateZ(500px) rotateX(-${rotateX}deg) rotateY(${rotateY}deg)`;

  // Actualizar el valor del transform en la pantalla
  transformValueElement.textContent = `transform: rotateX(${Math.round(
    rotateX
  )}deg) rotateY(${Math.round(rotateY)}deg)`;

  lastX = e.clientX;
  lastY = e.clientY;
});

// Iniciar la rotación con el mouse cuando se presiona el botón izquierdo
document.addEventListener("mousedown", (e) => {
  if (rotationBlocked) return; // No permitir rotación si está bloqueado

  isMouseDown = true;
  lastX = e.clientX;
  lastY = e.clientY;
});

// Detener la rotación con el mouse cuando se suelta el botón izquierdo
document.addEventListener("mouseup", () => {
  isMouseDown = false;
  rotationBlocked = false;
});

function rotate_F(clockwise) {
  if (clockwise) {
    console.log("rotar FRONT antihorario");
  } else {
    console.log("rotar FRONT horario");
  }
}

function rotate_L(clockwise) {
  if (clockwise) {
    console.log("rotar LEFT horario");
  } else {
    console.log("rotar LEFT antihorario");
  }
}

let valuesToChangeRightRotate = {
    1: [7, 4, 1], //blamco
    5: [3, 6, 9], // verde
    6: [7, 4, 1], //azul
    2: [7, 4, 1], // naranja
};


function rigthRotate(cara, tile, direction) {
  let encontrado = false;
  let keys = [];
  keys = Object.keys(valuesToChangeRightRotate);

  keys.forEach((key) => {
    element = valuesToChangeRightRotate[key];

    let exist = element.find((color) => color == tile && key == cara);
    

    if (exist != null && encontrado == false) {
      encontrado = true;
    }
  });

  let carasTemporal = caras;
  if (encontrado) {
    if (direction == 1) {
        for (const key in valuesToChangeRightRotate) {
            let index = keys.indexOf(key);
            
            let actual;
            let siguiente;

            if(keys[index+1] != null){
                actual = keys[index];
                siguiente = keys[index + 1];
            }else{
                actual = keys[index];
                siguiente = keys[0];
            }

            valuesToChangeRightRotate[actual].forEach((color) => {
                
                carasTemporal[actual][color] = caras[siguiente][color];
            });
        }

    } else {
        
    }
    caras = carasTemporal;
  }
}

function rotate_T() {
    
    let array = ["one", "two", "three"];
    const cubeDataPlay = JSON.parse(localStorage.getItem("cubeData"));
    let aux;

    array.forEach(item => {

        aux = cubeDataPlay[6][item];
        cubeDataPlay[6][item] = cubeDataPlay[4][item];
        cubeDataPlay[4][item] = cubeDataPlay[5][item];
        cubeDataPlay[5][item] = cubeDataPlay[3][item];
        cubeDataPlay[3][item] = aux;
    });

    aux = cubeDataPlay[2]["one"];
    cubeDataPlay[2]["one"] = cubeDataPlay[2]["three"];
    cubeDataPlay[2]["three"] = cubeDataPlay[2]["nine"];
    cubeDataPlay[2]["nine"] = cubeDataPlay[2]["seven"];
    cubeDataPlay[2]["seven"] = aux;

    aux = cubeDataPlay[2]["two"];
    cubeDataPlay[2]["two"] = cubeDataPlay[2]["six"];
    cubeDataPlay[2]["six"] = cubeDataPlay[2]["eight"];
    cubeDataPlay[2]["eight"] = cubeDataPlay[2]["four"];
    cubeDataPlay[2]["four"] = aux;

    localStorage.setItem('cubeData', JSON.stringify(cubeDataPlay));
}

function rotate_D() {

    let array = ["seven", "eight", "nine"];
    const cubeDataPlay = JSON.parse(localStorage.getItem("cubeData"));
    let aux;

    array.forEach(item => {

        aux = cubeDataPlay[6][item];
        cubeDataPlay[6][item] = cubeDataPlay[4][item];
        cubeDataPlay[4][item] = cubeDataPlay[5][item];
        cubeDataPlay[5][item] = cubeDataPlay[3][item];
        cubeDataPlay[3][item] = aux;
    });

    aux = cubeDataPlay[1]["one"];
    cubeDataPlay[1]["one"] = cubeDataPlay[1]["seven"];
    cubeDataPlay[1]["seven"] = cubeDataPlay[1]["nine"];
    cubeDataPlay[1]["nine"] = cubeDataPlay[1]["three"];
    cubeDataPlay[1]["three"] = aux;

    aux = cubeDataPlay[1]["two"];
    cubeDataPlay[1]["two"] = cubeDataPlay[1]["four"];
    cubeDataPlay[1]["four"] = cubeDataPlay[1]["eight"];
    cubeDataPlay[1]["eight"] = cubeDataPlay[1]["six"];
    cubeDataPlay[1]["six"] = aux;
    
    localStorage.setItem('cubeData', JSON.stringify(cubeDataPlay));
}

function rotate_R() {
    
    const cubeDataPlay = JSON.parse(localStorage.getItem("cubeData"));
    let aux;
    
    aux = cubeDataPlay[6]["three"];
    cubeDataPlay[6]["three"] = cubeDataPlay[1]["three"];
    cubeDataPlay[1]["three"] = cubeDataPlay[5]["seven"];
    cubeDataPlay[5]["seven"] = cubeDataPlay[2]["three"];
    cubeDataPlay[2]["three"] = aux;
    
    aux = cubeDataPlay[6]["six"];
    cubeDataPlay[6]["six"] = cubeDataPlay[1]["six"];
    cubeDataPlay[1]["six"] = cubeDataPlay[5]["four"];
    cubeDataPlay[5]["four"] = cubeDataPlay[2]["six"];
    cubeDataPlay[2]["six"] = aux;
    
    aux = cubeDataPlay[6]["nine"];
    cubeDataPlay[6]["nine"] = cubeDataPlay[1]["nine"];
    cubeDataPlay[1]["nine"] = cubeDataPlay[5]["one"];
    cubeDataPlay[5]["one"] = cubeDataPlay[2]["nine"];
    cubeDataPlay[2]["nine"] = aux;
    


    aux = cubeDataPlay[3]["one"];
    cubeDataPlay[3]["one"] = cubeDataPlay[3]["seven"];
    cubeDataPlay[3]["seven"] = cubeDataPlay[3]["nine"];
    cubeDataPlay[3]["nine"] = cubeDataPlay[3]["three"];
    cubeDataPlay[3]["three"] = aux;

    aux = cubeDataPlay[3]["two"];
    cubeDataPlay[3]["two"] = cubeDataPlay[3]["four"];
    cubeDataPlay[3]["four"] = cubeDataPlay[3]["eight"];
    cubeDataPlay[3]["eight"] = cubeDataPlay[3]["six"];
    cubeDataPlay[3]["six"] = aux;

    localStorage.setItem('cubeData', JSON.stringify(cubeDataPlay));
}

function rotate_L (){

    const cubeDataPlay = JSON.parse(localStorage.getItem("cubeData"));
    let aux;
    
    aux = cubeDataPlay[6]["one"];
    cubeDataPlay[6]["one"] = cubeDataPlay[1]["one"];
    cubeDataPlay[1]["one"] = cubeDataPlay[5]["nine"];
    cubeDataPlay[5]["nine"] = cubeDataPlay[2]["one"];
    cubeDataPlay[2]["one"] = aux;
    
    aux = cubeDataPlay[6]["four"];
    cubeDataPlay[6]["four"] = cubeDataPlay[1]["four"];
    cubeDataPlay[1]["four"] = cubeDataPlay[5]["six"];
    cubeDataPlay[5]["six"] = cubeDataPlay[2]["four"];
    cubeDataPlay[2]["four"] = aux;
    
    aux = cubeDataPlay[6]["seven"];
    cubeDataPlay[6]["seven"] = cubeDataPlay[1]["seven"];
    cubeDataPlay[1]["seven"] = cubeDataPlay[5]["three"];
    cubeDataPlay[5]["three"] = cubeDataPlay[2]["seven"];
    cubeDataPlay[2]["seven"] = aux;
    


    aux = cubeDataPlay[4]["one"];
    cubeDataPlay[4]["one"] = cubeDataPlay[4]["three"];
    cubeDataPlay[4]["three"] = cubeDataPlay[4]["nine"];
    cubeDataPlay[4]["nine"] = cubeDataPlay[4]["seven"];
    cubeDataPlay[4]["seven"] = aux;

    aux = cubeDataPlay[4]["two"];
    cubeDataPlay[4]["two"] = cubeDataPlay[4]["six"];
    cubeDataPlay[4]["six"] = cubeDataPlay[4]["eight"];
    cubeDataPlay[4]["eight"] = cubeDataPlay[4]["four"];
    cubeDataPlay[4]["four"] = aux;

    localStorage.setItem('cubeData', JSON.stringify(cubeDataPlay));
}

function rotate_B(){

    const cubeDataPlay = JSON.parse(localStorage.getItem("cubeData"));
    let aux;
    
    aux = cubeDataPlay[2]["one"];
    cubeDataPlay[2]["one"] = cubeDataPlay[3]["three"];
    cubeDataPlay[3]["three"] = cubeDataPlay[1]["nine"];
    cubeDataPlay[1]["nine"] = cubeDataPlay[4]["seven"];
    cubeDataPlay[4]["seven"] = aux;
    
    aux = cubeDataPlay[2]["two"];
    cubeDataPlay[2]["two"] = cubeDataPlay[3]["six"];
    cubeDataPlay[3]["six"] = cubeDataPlay[1]["eight"];
    cubeDataPlay[1]["eight"] = cubeDataPlay[4]["four"];
    cubeDataPlay[4]["four"] = aux;
    
    aux = cubeDataPlay[2]["three"];
    cubeDataPlay[2]["three"] = cubeDataPlay[3]["nine"];
    cubeDataPlay[3]["nine"] = cubeDataPlay[1]["seven"];
    cubeDataPlay[1]["seven"] = cubeDataPlay[4]["one"];
    cubeDataPlay[4]["one"] = aux;
    


    aux = cubeDataPlay[5]["one"];
    cubeDataPlay[5]["one"] = cubeDataPlay[5]["seven"];
    cubeDataPlay[5]["seven"] = cubeDataPlay[5]["nine"];
    cubeDataPlay[5]["nine"] = cubeDataPlay[5]["three"];
    cubeDataPlay[5]["three"] = aux;

    aux = cubeDataPlay[5]["two"];
    cubeDataPlay[5]["two"] = cubeDataPlay[5]["four"];
    cubeDataPlay[5]["four"] = cubeDataPlay[5]["eight"];
    cubeDataPlay[5]["eight"] = cubeDataPlay[5]["six"];
    cubeDataPlay[5]["six"] = aux;

    localStorage.setItem('cubeData', JSON.stringify(cubeDataPlay));
}

function rotate_F(){

    const cubeDataPlay = JSON.parse(localStorage.getItem("cubeData"));
    let aux;
    
    aux = cubeDataPlay[2]["seven"];
    cubeDataPlay[2]["seven"] = cubeDataPlay[3]["one"];
    cubeDataPlay[3]["one"] = cubeDataPlay[1]["three"];
    cubeDataPlay[1]["three"] = cubeDataPlay[4]["nine"];
    cubeDataPlay[4]["nine"] = aux;
    
    aux = cubeDataPlay[2]["eight"];
    cubeDataPlay[2]["eight"] = cubeDataPlay[3]["four"];
    cubeDataPlay[3]["four"] = cubeDataPlay[1]["two"];
    cubeDataPlay[1]["two"] = cubeDataPlay[4]["six"];
    cubeDataPlay[4]["six"] = aux;
    
    aux = cubeDataPlay[2]["nine"];
    cubeDataPlay[2]["nine"] = cubeDataPlay[3]["seven"];
    cubeDataPlay[3]["seven"] = cubeDataPlay[1]["one"];
    cubeDataPlay[1]["one"] = cubeDataPlay[4]["three"];
    cubeDataPlay[4]["three"] = aux;
    


    aux = cubeDataPlay[6]["one"];
    cubeDataPlay[6]["one"] = cubeDataPlay[6]["three"];
    cubeDataPlay[6]["three"] = cubeDataPlay[6]["nine"];
    cubeDataPlay[6]["nine"] = cubeDataPlay[6]["seven"];
    cubeDataPlay[6]["seven"] = aux;

    aux = cubeDataPlay[6]["two"];
    cubeDataPlay[6]["two"] = cubeDataPlay[6]["six"];
    cubeDataPlay[6]["six"] = cubeDataPlay[6]["eight"];
    cubeDataPlay[6]["eight"] = cubeDataPlay[6]["four"];
    cubeDataPlay[6]["four"] = aux;

    localStorage.setItem('cubeData', JSON.stringify(cubeDataPlay));
}

function updateCube(){

    const cube = document.querySelector('.cube');
    const cubeDataPlay = JSON.parse(localStorage.getItem('cubeData'));
    let paint = ''; 
    let key;
    let iter;


    Object.keys(cubeDataPlay).forEach(face => { 

        paint += '<div class="tiles ' + careValue(face) + '" style="background-color: #00000000;"><div class="ball"></div>';

        for (let i = 0; i < 9; i++) {

            if (i+1 === 1) key = "one";
            if (i+1 === 2) key = "two";
            if (i+1 === 3) key = "three";
            if (i+1 === 4) key = "four";
            if (i+1 === 5) key = "face_center";
            if (i+1 === 6) key = "six";
            if (i+1 === 7) key = "seven";
            if (i+1 === 8) key = "eight";
            if (i+1 === 9) key = "nine";
            const character = face[key];

            paint += `<div
                onmousedown="mouseDown(event)"
                onmouseup="mouseUp(event)"
                onmousemove="mouseMove(event)"
                style="font-size: 0px; background-color: ` + nombreValue(cubeDataPlay[face][key]) + `;"
                class="` + nombreValue(cubeDataPlay[face]["one"]) + `-tile" id="` + nombreValue(cubeDataPlay[face]["one"]) + `-` + numText(i+1) + `">${i+1}</div>`;
        }
        
        paint += "</div>";

        iter++;
    });

    cube.innerHTML = paint;

    if (isCubeSolved(cubeDataPlay)) {

        setTimeout(() => {
            onCubeChange(cubeDataPlay);
        }, 100);
    }
}

updateCube();
/*
function renderCube() {

  let cubo = document.getElementsByClassName("cube")[0];
  let print = "";

  Object.keys(caras).forEach((cara) => {
    print +=
      '<div class="tiles ' +
      careValue(cara) +
      '" style="background-color: black;">';

    Object.keys(caras[cara]).forEach((tile) => {
      print +=
        `<div onmousedown="mouseDown(this,event)" onmouseup="mouseUp(this,event)" onmousemove="mouseMove(this,event)" data-target="` +
        cara +
        `;` +
        tile +
        `" class="` +
        faceValue(caras[cara][tile]) +
        `-tile" id="${caras[cara][tile]}">${tile}</div>`;
    });

    print += "</div>";
  });

  cubo.innerHTML = print;
}
*/
function nombreValue(cara){

    if (cara == "w") {
        return "white";
    }
    if (cara == "y") {
        return "yellow";
    }
    if (cara == "r") {
        return "red";
    }
    if (cara == "o") {
        return "orange";
    }
    if (cara == "g") {
        return "green";
    }
    if (cara == "b") {
        return "blue";
    }
}

function numText(cara){

    if (cara == 1) {
        return "one";
    }
    if (cara == 2) {
        return "two";
    }
    if (cara == 3) {
        return "three";
    }
    if (cara == 4) {
        return "four";
    }
    if (cara == 5) {
        return "five";
    }
    if (cara == 6) {
        return "six";
    }
    if (cara == 7) {
        return "seven";
    }
    if (cara == 8) {
        return "eight";
    }
    if (cara == 9) {
        return "nine";
    }
}

function careValue2(cara) {

    //console.log(cara);

  if (cara == "w") {
    return "careOne";
  }
  if (cara == "y") {
    return "careTwo";
  }
  if (cara == "r") {
    return "careThree";
  }
  if (cara == "o") {
    return "careFour";
  }
  if (cara == "g") {
    return "careFive";
  }
  if (cara == "b") {
    return "careSix";
  }
}

function careValue(cara) {
    
    if (cara == 1) {
      return "careOne";
    }
    if (cara == 2) {
      return "careTwo";
    }
    if (cara == 3) {
      return "careThree";
    }
    if (cara == 4) {
      return "careFour";
    }
    if (cara == 5) {
      return "careFive";
    }
    if (cara == 6) {
      return "careSix";
    }
  }

  function careValue3(cara) {

    if (cara == "careOne") {
        return 1;
    }
    if (cara == "careTwo") {
        return 2;
    }
    if (cara == "careThree") {
        return 3;
    }
    if (cara == "careFour") {
        return 4;
    }
    if (cara == "careFive") {
        return 5;
    }
    if (cara == "careSix") {
        return 6;
    }
}

function reverseCareValue(cara) {

    if (cara === "white") {
        return 1;
    }
    if (cara === "yellow") {
        return 2;
    }
    if (cara === "red") {
        return 3;
    }
    if (cara === "orange") {
        return 4;
    }
    if (cara === "green") {
        return 5;
    }
    if (cara === "blue") {
        return 6;
    }
}





function mouseDown(event) {

    sessionStorage.removeItem('coor');
    x = event.offsetX;
    y = event.offsetY;
    moveSide = true;
}
function mouseUp(event) {

    // sessionStorage.removeItem('coor');
    moveSide = false;
}
function mouseMove(event) {

    let cara;
    let tile;
    let absoluteOffsetX;
/*
    if (event.offsetX < 30) {
        
        relativeOffsetX = event.offsetX
    } else if (event.offsetX >= 30) {

        relativeOffsetX = event.offsetX
    }*/

    if (moveSide) {
        /*
        if (sessionStorage.getItem('coor')) {
            let array = JSON.parse(sessionStorage.getItem('coor'));
            
            let coor = {
                x: event.offsetX,
                y: event.offsetY,
            };

            array.push(coor);
            sessionStorage.setItem('coor', JSON.stringify(array));

        } else {
            let coor = {
                x: event.offsetX,
                y: event.offsetY,
            };


            sessionStorage.setItem('coor', JSON.stringify(coor));
        }

        // leer coordenadas
*/
        if (x + 12 <= event.offsetX) {
            
            cara = careValue3(event.target.parentElement.className.slice(6));
            tile = event.target.textContent;

            if (tile == 1 || tile == 2 || tile == 3) {
                if (cara == 3 || cara == 4 || cara == 5 || cara == 6) {
                    rotate_T();
                    moveSide = false;
                    updateCube();
                }
            } else if (tile == 7 || tile == 8 || tile == 9) {
                if (cara == 3 || cara == 4 || cara == 5 || cara == 6) {
                    rotate_D();
                    moveSide = false;
                    updateCube();
                }
            }

            if (cara == 1) {
                if (tile == 7 || tile == 8  || tile == 9) {
                    rotate_B();
                    moveSide = false;
                    updateCube();
                }
            } else if (cara == 2) {
                if (tile == 1 || tile == 2  || tile == 3) {
                    rotate_B();
                    rotate_B();
                    rotate_B();
                    moveSide = false;
                    updateCube();
                }
            }

            if (cara == 1) {
                if (tile == 1 || tile == 2  || tile == 3) {
                    rotate_F();
                    moveSide = false;
                    updateCube();
                }
            } else if (cara == 2) {
                if (tile == 7 || tile == 8  || tile == 9) {
                    rotate_F();
                    rotate_F();
                    rotate_F();
                    moveSide = false;
                    updateCube();
                }
            }

            sessionStorage.removeItem('coor');
        }


        if (x - 12 >= event.offsetX) {

            cara = careValue3(event.target.parentElement.className.slice(6));
            tile = event.target.textContent;

            if (tile == 1 || tile == 2 || tile == 3) {
                if (cara == 3 || cara == 4 || cara == 5 || cara == 6) {
                    rotate_T();
                    rotate_T();
                    rotate_T();
                    moveSide = false;
                    updateCube();
                }
            } else if (tile == 7 || tile == 8 || tile == 9) {
                if (cara == 3 || cara == 4 || cara == 5 || cara == 6) {
                    rotate_D();
                    rotate_D();
                    rotate_D();
                    moveSide = false;
                    updateCube();
                }
            }

            if (cara == 1) {
                if (tile == 1 || tile == 2 || tile == 3) {
                    rotate_F();
                    rotate_F();
                    rotate_F();
                    moveSide = false;
                    updateCube();
                }
            } else if (cara == 2) {
                if (tile == 7 || tile == 8  || tile == 9) {
                    rotate_F();
                    moveSide = false;
                    updateCube();
                }
            }

            if (cara == 1) {
                if (tile == 7 || tile == 8 || tile == 9) {
                    rotate_B();
                    rotate_B();
                    rotate_B();
                    moveSide = false;
                    updateCube();
                }
            } else if (cara == 2) {
                if (tile == 1 || tile == 2 || tile == 3) {
                    rotate_B();
                    moveSide = false;
                    updateCube();
                }
            }

            sessionStorage.removeItem('coor');
        }

        if (y - 12 >= event.offsetY) {

            cara = careValue3(event.target.parentElement.className.slice(6));
            tile = event.target.textContent;
            
            if (tile == 3 || tile == 6 || tile == 9) {
                if (cara == 6 || cara == 1 || cara == 2) {
                    rotate_R();
                    moveSide = false;
                    updateCube();
                }
            } else if (tile == 1 || tile == 4 || tile == 7) {
                if (cara == 5) {
                    rotate_R();
                    rotate_R();
                    rotate_R();
                    moveSide = false;
                    updateCube();
                }
            }
            
            if (tile == 1 || tile == 4 || tile == 7) {
                if (cara == 6 || cara == 1 || cara == 2) {
                    rotate_L();
                    moveSide = false;
                    updateCube();
                }
            } else if (tile == 3 || tile == 6 || tile == 9) {
                if (cara == 5) {
                    rotate_L();
                    rotate_L();
                    rotate_L();
                    moveSide = false;
                    updateCube();
                }
            }

            if (cara == 3) {
                if (tile == 3 || tile == 6 || tile == 9) {
                    rotate_B();
                    moveSide = false;
                    updateCube();
                }
            } else if (cara == 4) {
                if (tile == 1 || tile == 4 || tile == 7) {
                    rotate_B();
                    rotate_B();
                    rotate_B();
                    moveSide = false;
                    updateCube();
                }
            }

            if (cara == 3) {
                if (tile == 1 || tile == 4 || tile == 7) {
                    rotate_F();
                    moveSide = false;
                    updateCube();
                }
            } else if (cara == 4) {
                if (tile == 3 || tile == 6 || tile == 9) {
                    rotate_F();
                    rotate_F();
                    rotate_F();
                    moveSide = false;
                    updateCube();
                }
            }

            sessionStorage.removeItem('coor');
        }
    
        if (y + 12 <= event.offsetY) {

            cara = careValue3(event.target.parentElement.className.slice(6));
            tile = event.target.textContent;
            
            if (tile == 3 || tile == 6 || tile == 9) {
                if (cara == 6 || cara == 1 || cara == 2) {
                    rotate_R();
                    rotate_R();
                    rotate_R();
                    moveSide = false;
                    updateCube();
                }
            } else if (tile == 1 || tile == 4 || tile == 7) {
                if (cara == 5) {
                    rotate_R();
                    moveSide = false;
                    updateCube();
                }
            }
            
            if (tile == 1 || tile == 4 || tile == 7) {
                if (cara == 6 || cara == 1 || cara == 2) {
                    rotate_L();
                    rotate_L();
                    rotate_L();
                    moveSide = false;
                    updateCube();
                }
            } else if (tile == 3 || tile == 6 || tile == 9) {
                if (cara == 5) {
                    rotate_L();
                    moveSide = false;
                    updateCube();
                }
            }

            if (cara == 3) {
                if (tile == 3 || tile == 6 || tile == 9) {
                    rotate_B();
                    rotate_B();
                    rotate_B();
                    moveSide = false;
                    updateCube();
                }
            } else if (cara == 4) {
                if (tile == 1 || tile == 4 || tile == 7) {
                    rotate_B();
                    moveSide = false;
                    updateCube();
                }
            }

            if (cara == 3) {
                if (tile == 1 || tile == 4 || tile == 7) {
                    rotate_F();
                    rotate_F();
                    rotate_F();
                    moveSide = false;
                    updateCube();
                }
            } else if (cara == 4) {
                if (tile == 3 || tile == 6 || tile == 9) {
                    rotate_F();
                    moveSide = false;
                    updateCube();
                }
            }

            sessionStorage.removeItem('coor');
        }
    }
}

// Función para verificar si el cubo está resuelto
function isCubeSolved(cube) {

    for (const face in cube) {
      const values = Object.values(cube[face]);
      const firstColor = values[0];
      if (!values.every((color) => color === firstColor)) {
        return false; // Si una cara no es uniforme, el cubo no está resuelto
      }
    }
    return true; // Si todas las caras son uniformes, el cubo está resuelto
}
  
// Observador para reconocer cambios y validar
function onCubeChange(newCubeData) {

    const body = document.getElementById('body');
    const bodyText = document.getElementById('body-text');

    if (isCubeSolved(newCubeData)) {
        
        if (solving) {

            body.style.backgroundColor = '#c8f5b0';
            bodyText.style.opacity = '1';
            clearInterval(intervalo);  // Detiene el cronómetro
            cronometroActivo = false;
            solving = false;
        }
    }
}

function generateRandomSequence() {
    const functions = [rotate_R, rotate_L, rotate_T, rotate_D, rotate_F, rotate_B];
    const sequenceLength = Math.floor(Math.random() * 80) + 1; // Número aleatorio entre 1 y 15
    const sequence = [];

    for (let i = 0; i < sequenceLength; i++) {
        const randomFunction = functions[Math.floor(Math.random() * functions.length)];
        sequence.push(randomFunction);
    }

    return sequence;
}

document.getElementById("reset").addEventListener("click", () => {
    
    resetCube();
    updateCube();

    const resetDiv = document.getElementById('reset');
    const scramble = document.getElementById('scramble');
    const body = document.getElementById('body');
    const bodytext = document.getElementById('body-text');
    document.getElementById('cronometro').textContent = '0.000s';

    resetDiv.style.display = 'none';
    scramble.style.display = 'block';
    body.style.backgroundColor = '#fef';
    bodytext.style.opacity = '0';

    clearInterval(intervalo);
    cronometroActivo = false;
    solving = false;
    reset = true;
    tiempo = 0

});

// Manejar el botón
document.getElementById("scramble").addEventListener("click", () => {

    const reset = document.getElementById('reset');
    const scramble = document.getElementById('scramble');
    const body = document.getElementById('body');
    const bodyText = document.getElementById('body-text');

    reset.style.display = 'block';
    scramble.style.display = 'none';
    bodyText.style.opacity = '0';
    body.style.backgroundColor = '#f5e5b0';

    const randomSequence = generateRandomSequence();
    randomSequence.forEach(fn => fn());
    updateCube();

    solving = true;

    if (!cronometroActivo) {
        intervalo = setInterval(function() {
            tiempo++;  // Incrementa el tiempo
            document.getElementById('cronometro').textContent = (tiempo/100).toFixed(1) + "00s";  // Muestra el tiempo
        }, 10);  // Se ejecuta cada segundo (1000 ms)
        
        cronometroActivo = true;
    } else {
        tiempo = 0;  // Reinicia el contador
        document.getElementById('cronometro').textContent = tiempo;  // Muestra el tiempo reiniciado
    }
});

function fakeRotation(cara){

    // obtener la cara de rotación

    // obtener los valores de la cara

    // insertar cara falsa y ocultar los componentes de la cara real

    // rotar la cara falsa

    
}
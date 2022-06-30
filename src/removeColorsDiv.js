export const removeColorsDiv = () => {
  const colorsDiv = {
    firstColor: document.getElementById("first-color"),
    secondColor: document.getElementById("second-color"),
    thirdColor: document.getElementById("third-color"),
    fourthColor: document.getElementById("fourth-color"),
    fifthColor: document.getElementById("fifth-color"),
  };

  for (let div in colorsDiv) {
    if (colorsDiv[div]) colorsDiv[div].remove();
  }
};

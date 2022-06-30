import { removeColorsDiv } from "./removeColorsDiv";
import Clarifai from "clarifai";

const app = new Clarifai.App({ apiKey: "5416841fc2a0484c9b6dcc5f30273491" });

export const detectColors = (input) => {
  app.models
    .predict(Clarifai.COLOR_MODEL, input)
    .then((response) => {
      removeColorsDiv();
      const colorsArray = response.outputs[0].data.colors;
      const hexColorArray = [];
      for (let i in colorsArray) {
        const hexColor = colorsArray[i].w3c.hex;
        hexColorArray.push(hexColor);
        const colorName = colorsArray[i].w3c.name;
        console.log(`Hex Color: ${hexColor} Color Name: ${colorName}`);
      }
      const relatedColorsDiv = document.getElementById(`related-colors`);
     
      if (hexColorArray[0]) {
        const firstColor = document.createElement(`div`);
        firstColor.id = `first-color`;
        relatedColorsDiv.append(firstColor);
        document.getElementById(`first-color`).style.backgroundColor =
          hexColorArray[0];
      }
      if (hexColorArray[1]) {
        const secondColor = document.createElement(`div`);
        secondColor.id = `second-color`;
        relatedColorsDiv.append(secondColor);
        document.getElementById(`second-color`).style.backgroundColor =
          hexColorArray[1];
      }
      if (hexColorArray[2]) {
        const thirdColor = document.createElement(`div`);
        thirdColor.id = `third-color`;
        relatedColorsDiv.append(thirdColor);
        document.getElementById(`third-color`).style.backgroundColor =
          hexColorArray[2];
      }
      if (hexColorArray[3]) {
        const fourthColor = document.createElement(`div`);
        fourthColor.id = `fourth-color`;
        relatedColorsDiv.append(fourthColor);
        document.getElementById(`fourth-color`).style.backgroundColor =
          hexColorArray[3];
      }
      if (hexColorArray[4]) {
        const fifthColor = document.createElement(`div`);
        fifthColor.id = `fifth-color`;
        relatedColorsDiv.append(fifthColor);
        document.getElementById(`fifth-color`).style.backgroundColor =
          hexColorArray[4];
      }
    })
    .catch((err) => console.log(`ERROR: `, err));
};

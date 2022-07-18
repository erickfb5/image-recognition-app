import "./App.css";
import Clarifai from "clarifai";
const app = new Clarifai.App({ apiKey: "5416841fc2a0484c9b6dcc5f30273491" });

export const detectWords = (input) => {
  app.models
    .predict(Clarifai.GENERAL_MODEL, input)
    .then((response) => {
      if (response) {
        console.log("PASSEI AQUI")
        fetch("http://localhost:3001/image", {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: this.user.id,
          }),
        });
      }
    })
    .then((response) => {
      const wordsArray = response.outputs[0].data.concepts;
      let relatedWords = [];
      for (let i in wordsArray) {
        if (i < 10) relatedWords.push(`${+i + 1} - ${wordsArray[i].name}`);
      }
      relatedWords = relatedWords
        .toString()
        .split(`,`)
        .join(`, `);
      console.log(`Top-10 most-related words: ${relatedWords}.`);
      const h1 = document.createElement(`div`);
      h1.id = `test`;
      document.getElementById(`related-words`).append(h1);
      return (document.getElementById(
        `test`
      ).innerHTML = `<h2>Top-10 most-related words:</h2><h3>${relatedWords}.</h3><h2>most-related colors:</h2>`.toUpperCase());
    })

    .catch((err) => console.log(`ERROR: `, err));
};

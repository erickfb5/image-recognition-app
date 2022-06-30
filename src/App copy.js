import "./App.css";
import React, { useState } from "react";
import Navigation from "./components/ Navigation/Navigation";
import Face from "./components/Face/Face";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Particles from "./components/Particles/Particles";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Clarifai from "clarifai";

const app = new Clarifai.App({ apiKey: "5416841fc2a0484c9b6dcc5f30273491" });

const App = () => {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const onInputChange = (event) => setInput(event.target.value);
  const onButtonSubmit = () => {
    setImageUrl(input);
    app.models
      .predict(Clarifai.GENERAL_MODEL, input)
      .then((response) => {
        const array = response.outputs[0].data.concepts;
        const relatedWords = [];
        for (let i in array) {
          if (i < 10) relatedWords.push(`${+i + 1} - ${array[i].name}`);
        }
        console.log(
          `These are the top-10 most-related words to the uploaded picture: ${relatedWords
            .toString()
            .split(`,`)
            .join(`, `)}`
        );
      })
      .catch((err) => console.log(`ERROR: `, err));
  };

  return (
    <div className="App">
      <Navigation />
      <Face />
      <Rank />
      <ImageLinkForm
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
      />
      <FaceRecognition imageUrl={imageUrl} />
      <Particles />
    </div>
  );
};

export default App;

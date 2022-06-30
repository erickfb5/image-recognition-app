import "./App.css";
import React, { useState } from "react";
import Navigation from "./components/Navigation/Navigation";
import Face from "./components/Face/Face";
import Rank from "./components/Rank/Rank";
import RelatedColors from "./components/RelatedColors/RelatedColors";
import RelatedWords from "./components/RelatedWords/RelatedWords";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Particles from "./components/Particles/Particles";
import ImageRecognition from "./components/ImageRecognition/ImageRecognition";
import { detectColors } from "./detectColors"
import { detectWords } from "./detectWords";

const App = () => {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
 
  const onInputChange = (event) => setInput(event.target.value);
  const onButtonSubmit = () => {
    if (!input) return;
    setImageUrl(input);
    detectWords(input);
    detectColors(input);
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
      <ImageRecognition imageUrl={imageUrl} />
      <RelatedWords />
      <RelatedColors />
      <Particles />
    </div>
  );
};

export default App;

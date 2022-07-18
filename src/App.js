import "./App.css";
import React, { useState } from "react";
import Navigation from "./components/Navigation/Navigation";
import Face from "./components/Face/Face";
import Rank from "./components/Rank/Rank";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import RelatedColors from "./components/RelatedColors/RelatedColors";
import RelatedWords from "./components/RelatedWords/RelatedWords";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Particles from "./components/Particles/Particles";
import ImageRecognition from "./components/ImageRecognition/ImageRecognition";
import { detectColors } from "./detectColors";
import Clarifai from "clarifai";

const app = new Clarifai.App({ apiKey: "5416841fc2a0484c9b6dcc5f30273491" });
// import { detectWords } from "./detectWords";

const App = () => {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [route, setRoute] = useState("signin");
  const [user, setUser] = useState("");

  const onInputChange = (event) => setInput(event.target.value);
  const onPictureSubmit = () => {
    if (!input) return;
    setImageUrl(input);
    // detectWords(input);

    app.models
      .predict(Clarifai.GENERAL_MODEL, input)
      .then((response) => {
        if (response) {
          fetch("http://localhost:3000/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.user.id,
            }),
          });
        }
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
        document.getElementById(
          `test`
        ).innerHTML = `<h2>Top-10 most-related words:</h2><h3>${relatedWords}.</h3><h2>most-related colors:</h2>`.toUpperCase();
        return user.user.entries;
      })
      .then((count) => {
        setUser({
          user: {
            entries: count + 1,
          },
        });
      })
      .catch((err) => console.log(`ERROR: `, err));

    detectColors(input);
  };

  const loadUser = (data) => {
    setUser({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  const onRouteChange = (route) => {
    setRoute(route);
  };

  return (
    <div className="App">
      <Navigation onRouteChange={onRouteChange} route={route} />
      <Particles />

      {route === `signin` ? (
        <>
          <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
        </>
      ) : route === `register` ? (
        <Register loadUser={loadUser} onRouteChange={onRouteChange} />
      ) : (
        <>
          <Face />
          <Rank user={user.user} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onPictureSubmit={onPictureSubmit}
          />
          <ImageRecognition imageUrl={imageUrl} />
          <RelatedWords />
          <RelatedColors />
        </>
      )}
    </div>
  );
};

export default App;

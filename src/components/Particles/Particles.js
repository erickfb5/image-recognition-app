import React from "react";
import TSParticles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "./Particles.css";

const Particles = () => {
  const particlesInit = async (main) => {
    console.log(main);
    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };
  const particlesLoaded = (container) => {
    console.log(container);
  };

  const particlesOptions = {
    background: {
      color: {
        value: "#0d47a1",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: false,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: -1,
        },
        repulse: {
          distance: 200,
          duration: 0.1,
        },
      },
    },
    particles: {
      color: {
        value: "#ffffff",
      },
      links: {
        color: "#ffffff",
        distance: 200,
        enable: true,
        opacity: 0.5,
        width: 0.5,
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: true,
        speed: 4.95,
        straight: true,
      },
      number: {
        density: {
          enable: true,
          area: 900,
        },
        value: 70,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  };
  return (
    <TSParticles
      className="particles"
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={particlesOptions}
    />
  );
};

export default Particles;

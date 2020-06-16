import React, { useState } from "react"

import "./gallery.css"

import Card from "./card"

import almanax from "../../content/almanax.json"
import almanaxB64 from "../../content/almanaxB64.json"

const Gallery = ({ startIndex, lang }) => {
  const initWindow = [
    startIndex - 2,
    startIndex - 1,
    startIndex,
    startIndex + 1,
    startIndex + 2,
  ]

  const [window, setWindow] = useState(initWindow)

  const { content } = almanax
  const { content: images } = almanaxB64

  const handleAnimation = step => {
    const c0 = document.querySelector(".c0")
    const c1 = document.querySelector(".c1")
    const c2 = document.querySelector(".c2")
    const c3 = document.querySelector(".c3")
    const c4 = document.querySelector(".c4")

    if (step === -1) {
      c0.classList.add("fade-in")
      c1.classList.add("c1-c2")
      c2.classList.add("c2-c3")
      c3.classList.add("fade-out")
      c4.classList.add("hidden")

      setTimeout(() => {
        c0.classList.remove("fade-in")
        c1.classList.remove("c1-c2")
        c2.classList.remove("c2-c3")
        c3.classList.remove("fade-out")
        c4.classList.remove("hidden")
        setWindow(window.map(el => el + step))
      }, 450)
    }

    if (step === 1) {
      c0.classList.add("hidden")
      c1.classList.add("fade-out")
      c2.classList.add("c2-c1")
      c3.classList.add("c3-c2")
      c4.classList.add("fade-in")

      setTimeout(() => {
        c0.classList.remove("hidden")
        c1.classList.remove("fade-out")
        c2.classList.remove("c2-c1")
        c3.classList.remove("c3-c1")
        c4.classList.remove("fade-in")
        setWindow(window.map(el => el + step))
      }, 450)
    }
  }

  const handleClick = step => {
    if (step === 0) {
      // Todo - in the future, add animation to go back to "today"
      setWindow(initWindow)
    } else {
      handleAnimation(step)
    }
  }

  return (
    <>
      <div className="gallery">
        {window.map((i, index) => (
          <Card
            key={i}
            data={{
              cardIndex: index,
              info: content[i],
              image: Object.values(images[i])[0],
              lang,
            }}
          />
        ))}
      </div>
      <button onClick={() => handleClick(-1)}>-1 day</button>
      <button onClick={() => handleClick(0)}>Today</button>
      <button onClick={() => handleClick(1)}>+1 day</button>
    </>
  )
}

export default Gallery

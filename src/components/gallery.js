import React, { useState } from "react"

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

  const handleClick = step => {
    if (step === 0) {
      setWindow(initWindow)
    } else {
      setWindow(window.map(el => el + step))
    }
  }

  return (
    <div>
      {window.map(i => (
        <div>
          <img
            src={`data:image/png;base64,${Object.values(images[i])[0]}`}
            alt={content[i].item.name[lang]}
            title={content[i].item.name[lang]}
          />
          <p>{content[i].merida}</p>
        </div>
      ))}
      <button onClick={() => handleClick(1)}>add</button>
      <button onClick={() => handleClick(-1)}>sub</button>
      <button onClick={() => handleClick(0)}>reset</button>
    </div>
  )
}

export default Gallery

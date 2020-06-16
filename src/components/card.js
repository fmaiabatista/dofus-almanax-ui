import React from "react"

import "./card.css"

const Card = ({ data }) => {
  const { cardIndex, info, image, lang } = data

  return (
    <div className={`card c${cardIndex}`}>
      <div className="header">
        <img
          src={`data:image/png;base64,${image}`}
          alt={info.item.name[lang]}
          title={info.item.name[lang]}
        />
      </div>

      <div className="body">
        <span className="qty">{info.item.qty}x</span>
        <span className="name">{info.item.name[lang]}</span>
      </div>

      <div className="footer">
        <span className="merida">{info.merida}</span>
        <span className="date">{info.date}</span>
      </div>

      <div className="overlay">
        <span className="copy">Copy</span>
        <span className="encyclopedia">Wiki</span>
      </div>
    </div>
  )
}

export default Card

import React from 'react';
import './card.scss';

const Card = ({data}, onClick) => {
  // console.log(data);
  const {id, imdb_code, title, title_english, title_long, language, rating, runtime, summary, synopsis, medium_cover_image, large_cover_image, like} = data;
  
  return (<>
      <div className="card" onClick={()=>onClick}>
          <h1 className='card_title'>card</h1>
          <h1 className='card_title'>{title}</h1>
          <img src={medium_cover_image} alt={title} />
      </div>
  </>);
};

export default Card;

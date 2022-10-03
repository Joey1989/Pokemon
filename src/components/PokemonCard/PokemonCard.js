import React from 'react';
import { useNavigate } from "react-router-dom";
import './PokemonCard.css';

function PokemonCard({url, name, id, exp, types}) {
  const navigate = useNavigate();

  return (
    <div className='PokemonCard' onClick={() => navigate(`/pokemon/${id}`)}>
      <div className='CardImgWrapper'>
        {/* If no image url is available, use the placeholder image */}
        {!url && <img
          alt='pokemon placeholder'
          src='https://www.clipartmax.com/png/small/64-649852_i-am-starting-a-project-which-is-making-pokemon-silhouettes-whos-that.png'
          data-src='https://www.clipartmax.com/png/small/64-649852_i-am-starting-a-project-which-is-making-pokemon-silhouettes-whos-that.png'
          className='card-img'
        />}
        {url && <img
          alt='pokemon bio'
          src={url}
          data-src={url}
          className='card-img'
        />}
      </div>
      <div className='CardInfoWrapper'>
        <div className='CardStats'>
          <div>#{id}</div>
          <div>EXP: {exp ? exp : '???'}</div>
        </div>
        <div className='CardName'>{name}</div>
        <div className='CardType'>
          {types.map((type, i) => (
              <div key={i} className={`bg-${type.type.name}`}>{type.type.name}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default React.memo(PokemonCard);

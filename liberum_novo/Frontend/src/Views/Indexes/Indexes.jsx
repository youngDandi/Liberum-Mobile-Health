import './Indexes.css';
import goBack from '../../assets/img/goBack.png';
import threeDots from '../../assets/img/threeDots.png';
import portfolioIcon from '../../assets/img/portfolioicon.png';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const api = 'http://192.168.1.8:3000';

function Indexes() {
  const [indexes, setIndexes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const fetchIndexes = async () => {
      try {
        const response = await axios.get(api + '/indexes');
        setIndexes(response.data.indexes); // Certifica-te que o backend retorna 'indexes'
        setLoading(false);
      } catch (err) {
        setErro(err.message);
        setLoading(false);
      }
    };

    fetchIndexes();
  }, []);


  return (
    <div className='FullContentIn'>
      <div className='HeaderIn'>
        <div className='goBackDivIn'>
          <Link to={'/Home'}> <img src={goBack} alt="Voltar" /></Link>
        </div>

        <h2>Índices</h2>

        <div className='threeDotsdivIn'>
          <Link to={'/Settings'}><img src={threeDots} alt="Menu" /></Link>
        </div>
      </div>

      <div className='bigCardDivIn'>
        <h3 id='portfolioIn'>Valor do portfolio</h3>
        <h1 id='portfolioValueIn'>100.000 AKZ</h1>
        <img src={portfolioIcon} id='portfolioIconIn' alt="Ícone do portfólio" />
        <div className='sellsDivIn'>
          <p className='sellItemIn'>Vender</p>
          <div className='bordaVerticalIn'></div>
          <p className='sellItemIn'>Vender</p>
          <div className='bordaVerticalIn'></div>
          <p className='sellItemIn'>Vender</p>
        </div>
      </div>

      <div>
        <h3>Activos</h3>
        <div className='activeListIn'>
          {indexes.map((indexItem, index) => (
            <React.Fragment key={indexItem.id}>
              <div className='activeItemdivIn'>
                <div
                  className='activeLogoDivIn'
                  style={{ backgroundColor: indexItem.color || '#ccc' }}
                >
                  <h2 id='activeLogoIn'>{indexItem.logo}</h2>
                </div>
                <Link to={`/indexes/${indexItem.id}`} className='LinkIn'>
                  <h3 id='activeNameIn'>{indexItem.name}</h3>
                </Link>
                
              </div>

              {/* Linha divisória, exceto após o último item */}
              {index < indexes.length - 1 && <div className='bordaIn'></div>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Indexes;

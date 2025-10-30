import './Cryptocurrencies.css';
import goBack from '../../assets/img/goBack.png';
import threeDots from '../../assets/img/threeDots.png';
import portfolioIcon from '../../assets/img/portfolioicon.png';
import {Link} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
  const api ='http://192.168.1.8:3000';


function Cryptocurrencies (){
    const [cryptos, setCryptos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
   
    useEffect(() => {
        const fetchCryptos = async () => {
          try {
            const response = await axios.get(api+'/cryptocurrencies'); // ou o teu endpoint real
            setCryptos(response.data.cryptocurrencies);
            setLoading(false);
          } catch (err) {
            setErro(err.message);
            setLoading(false);
          }
        };
    
        fetchCryptos();
      }, []);

    return(
        <div className='FullContentTOP'>
                <div className='HeaderTOP'>
                    <div className='goBackDiv'>
                       <Link to={'/Home'}> <img src={goBack} /></Link>
                    </div>
                    
                    <h2>Criptomoedas</h2>
                    <div className='threeDotsdiv'>
                       <Link to={'/Settings'}><img src={threeDots} /></Link> 
                    </div>
                </div>

                <div className='bigCardDiv'>
                    <h3 id='portfolio'>Valor do portfolio</h3>
                    <h1 id='portfolioValue'>100.000 AKZ</h1> 
                    <img src={portfolioIcon} id='portfolioIcon' />
                    <div className='sellsDiv'>
                        <p className='sellItem'>Vender</p>
                        <div className='bordaVertical'></div>
                        <p className='sellItem'>Vender</p>
                        <div className='bordaVertical'></div>
                        <p className='sellItem'>Vender</p>
                    </div>
                </div>


                <div>
                    <h3>Activos</h3>
                    <div className='activeList'>
                    {cryptos.map((crypto, index) => (
                        <React.Fragment key={crypto.id}>
                        <div className='activeItemdiv'>
                            <div className='activeLogoDiv' style={{ backgroundColor: crypto.color || '#ccc' }}>
                                <h2 id='activeLogo'>{crypto.logo}</h2>
                            </div>
                            <Link to={`/crypto/${crypto.id}`} className='Link'>
                                <h3 id='activeName'>{crypto.name}</h3>
                            </Link>
                            
                        </div>

                        {/* Linha divisória, exceto após o último item */}
                        {index < cryptos.length - 1 && <div className='borda'></div>}
                        </React.Fragment>
                    ))}

                    </div>
                </div>

                
        </div>
    );
}


export default Cryptocurrencies;
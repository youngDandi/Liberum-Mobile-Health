import './Stocks.css';
import goBack from '../../assets/img/goBack.png';
import threeDots from '../../assets/img/threeDots.png';
import portfolioIcon from '../../assets/img/portfolioicon.png';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'; 
const api ='http://192.168.1.8:3000';

function Stocks(){
    const [stocks, setStocks]= useState([]);
    const [loading, setLoading]= useState(true);
    const [erro, setError]= useState(null);

    useEffect(() => {
        const fetchStocks = async () =>{
                try{
                        const response = await axios.get(api+'/stocks');
                        setStocks(response.data.stocks);
                        setLoading(false);
                } catch(err){
                        setError(err.message);
                        setLoading(false);
                }
        }

        fetchStocks();
    }, []);




    return(
        <div className='FullContentSTK'>
                        <div className='HeaderSTK'>
                            <div className='goBackDivSTK'>
                               <Link to={'/Home'}> <img src={goBack} /></Link>
                            </div>
                            
                            <h2>Acções</h2>
                            <div className='threeDotsdivSTK'>
                               <Link to={'/Settings'}><img src={threeDots} /></Link> 
                            </div>
                        </div>
        
                        <div className='bigCardDivSTK'>
                            <h3 id='portfolioSTK'>Valor do portfolio</h3>
                            <h1 id='portfolioValueSTK'>100.000 AKZ</h1> 
                            <img src={portfolioIcon} id='portfolioIconSTK' />
                            <div className='sellsDivSTK'>
                                <p className='sellItemSTK'>Vender</p>
                                <div className='bordaVerticalSTK'></div>
                                <p className='sellItem'>Vender</p>
                                <div className='bordaVertical'></div>
                                <p className='sellItem'>Vender</p>
                            </div>
                        </div>
        
        
                        <div>
                            <h3>Activos</h3>
                            <div className='activeList'>
                            {stocks.map((stock, index) => (
                                    <React.Fragment key={stock.id}>
                                        <div className='activeItemdivSTK'>
                                            <div className='activeLogoDivSTK' style={{ backgroundColor: stock.color || '#ccc' }}>
                                                <h2 id='activeLogoSTK'>{stock.logo}</h2>
                                            </div>
                                            <Link to={`/stocks/${stock.id}`} className='Link'>
                                                <h3 id='activeNameSTK'>{stock.name}</h3>
                                            </Link>
                                            
                                        </div>

                                        {/* Linha divisória, exceto no último elemento */}
                                        {index < stocks.length - 1 && <div className='bordaSTK'></div>}
                                    </React.Fragment>
                                ))}
        
                            </div>
                        </div>
        
                        
                </div>
    );
}


export default Stocks;
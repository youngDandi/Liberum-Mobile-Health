import './Product.css';
import goBack from '../../assets/img/goBack.png';
import threeDots from '../../assets/img/threeDots.png';
import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


function Product() {
    const [crypto, setCrypto] = useState(null);
    const { id } = useParams();
    const api = 'http://192.168.1.6:3000';

    useEffect(() => {
        const fetchCrypto = async () => {
          try {
            console.log(`🔍 Fazendo fetch da criptomoeda com ID: ${id}`);
      
            const response = await fetch(api+`/api/cryptos/${id}`);
      
            if (!response.ok) {
              throw new Error('Erro ao buscar a Criptomoeda!!');
            }
      
            const data = await response.json();
      
            console.log('📥 Dados recebidos do backend:', data);
            console.log('✅ Criptomoeda recebida:', data);
      
            setCrypto(data.crypto);
      
          } catch (error) {
            console.error('❌ Erro ao buscar a criptomoeda: ', error);
          }
        };
      
        fetchCrypto();
      }, [id]);
      
      useEffect(() => {
        console.log("📊 Estado atualizado da Criptomoeda:", crypto);
      }, [crypto]);
      
    

    return (
        <div className='FullScreenProduct'>
            <div className='HeaderProduct'>
                <div className='goBackDivProduct'>
                    <Link to={'/TypeOfProduct'}> <img src={goBack} /></Link>
                </div>

                <h2>Estátistica</h2>
                <div className='threeDotsdivProduct'>
                    <Link to={'/Settings'}><img src={threeDots} /></Link>
                </div>
            </div>

            <div className='activeNameDivProduct'>
                <div
                    className='activeLogoDivProduct'
                    style={{ backgroundColor: crypto?.color || '#F89A29' }}
                >
                    <h2 id='activeLogoProduct'>{crypto?.logo || 'B'}</h2>
                </div>
                <h3 id='activeNameProduct'>{crypto?.name || 'Bitcoin'}</h3>
            </div>

            <div className='calenderDiv'>
                <p id='day' className='calenderItems'>02</p>
                <p id='month' className='calenderItems'>Julho</p>
                <p id='year' className='calenderItems'>2025</p>
                <p id='weekDay' className='calenderItems'>Ter</p>
            </div>

            <div className='amountandCurrentBalanse'>
                <p className='amount'>1.246.700 AKZ</p>
                <p className='currentBalanse'>Balanço Corrente</p>
            </div>

            <div className="chart-container">
                <iframe
                    src={`${api}/stock-chart`}
                    width="110%"
                    height="400px"
                    style={{ border: 'none' }}
                ></iframe>
            </div>

            <div className='divproductButton'>
                <button id='buyBtn'>Comprar</button>
                <button id='withdrawBtn'>Sacar</button>
            </div>

            <div className='allOrders'>
                <div className='divAllOrders'>
                    <p id='ordens'>Ordens</p>
                    <p id='verTodas'>Ver todas</p>
                </div>

                <div className='allOrdersMainDiv'>
                    <div className='allordersDiv'>
                        <div className='allOrdersItems'>
                            <p id='allOrderslogo'>C</p>
                        </div>
                        <div className='OrderValueandName'>
                            <h4 id='OrderValue'>1.000</h4>
                            <h6 id='OrderNome'>S&P 500</h6>
                        </div>
                    </div>

                    <div className='allordersDiv'>
                        <div className='allOrdersItemsWithdraw'>
                            <p id='allOrderslogo'>V</p>
                        </div>
                        <div className='OrderValueandName'>
                            <h4 id='OrderValue'>1.000</h4>
                            <h6 id='OrderNome'>S&P 500</h6>
                        </div>
                    </div>

                    <div className='allordersDiv'>
                        <div className='allOrdersItems'>
                            <p id='allOrderslogo'>C</p>
                        </div>
                        <div className='OrderValueandName'>
                            <h4 id='OrderValue'>1.000</h4>
                            <h6 id='OrderNome'>S&P 500</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;

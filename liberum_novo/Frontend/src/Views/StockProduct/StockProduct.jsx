import React, { useEffect, useState } from 'react';
import './StockProduct.css';
import { Link, useParams } from 'react-router-dom';
import goBack from '../../assets/img/goBack.png';
import threeDots from '../../assets/img/threeDots.png';


function StockProduct(){
    const [stock, setStock]= useState(null);

    const { id } = useParams();
    const api = 'http://192.168.1.8:3000';

    useEffect(() => {
        const fecthStock = async () =>{
            try{
                console.log(`🔍 Fazendo o fetch da Acção com ID: ${id}`);

                const response = await fetch(api+`/api/stocks/${id}`);
                
                if(!response.ok){
                    throw new Error('Erro ao Buscar a Acção!!');
                }

                const data= await response.json();
                console.log('📥 Dados recebidos do backend:', data);
                console.log('✅ Acção Recebida: ', data);

                setStock(data.stock);
            } catch(error){
                console.error('❌ Erro ao buscar a Acção: ', error);
            }
        }

        fecthStock();
    }, [id]);

    useEffect(() => {
            console.log("📊 Estado atualizado da Acção:", stock);
          }, [stock]);

    return(
        <div className='FullScreenStockProduct'>
            <div className='HeaderStockProduct'>
                <div className='goBackDivStockProduct'>
                    <Link to={'/Stocks'}> <img src={goBack} /></Link>
                </div>

                <h2>Estátistica</h2>
                <div className='threeDotsdivStockProduct'>
                    <Link to={'/Settings'}><img src={threeDots} /></Link>
                </div>
            </div>

            <div className='activeNameDivStockProduct'>
                <div
                    className='activeLogoDivStockProduct'
                    style={{ backgroundColor: stock?.color || '#F89A29' }}
                >
                    <h2 id='activeLogoStockProduct'>{stock?.logo || 'B'}</h2>
                </div>
                <h3 id='activeNameStockProduct'>{stock?.name || 'Bitcoin'}</h3>
            </div>

            <div className='calenderDivStock'>
                <p id='dayStock' className='calenderItemsStock'>02</p>
                <p id='monthStock' className='calenderItemsStock'>Julho</p>
                <p id='yearStock' className='calenderItemsStock'>2025</p>
                <p id='weekDayStock' className='calenderItemsStock'>Ter</p>
            </div>

            <div className='amountandCurrentBalanseStock'>
                <p className='amountStock'>1.246.700 AKZ</p>
                <p className='currentBalanseStock'>Balanço Corrente</p>
            </div>

            <div className="chart-containerStock">
                <iframe
                    src={`${api}/stock-chart?ticker=${stock?.ticker}`}
                    width="110%"
                    height="400px"
                    style={{ border: 'none' }}>

                </iframe>
            </div>

            <div className='divproductButtonStock'>
                <button id='buyBtnStock'>Comprar</button>
                <button id='withdrawBtnStock'>Sacar</button>
            </div>

            <div className='allOrdersStock'>
                <div className='divAllOrdersStock'>
                    <p id='ordensStock'>Ordens</p>
                    <p id='verTodasStock'>Ver todas</p>
                </div>

                <div className='allOrdersMainDivStock'>
                    <div className='allordersDivStock'>
                        <div className='allOrdersItemsStock'>
                            <p id='allOrderslogoStock'>C</p>
                        </div>
                        <div className='OrderValueandNameStock'>
                            <h4 id='OrderValueStock'>1.000</h4>
                            <h6 id='OrderNomeStock'>S&P 500</h6>
                        </div>
                    </div>

                    <div className='allordersDivStock'>
                        <div className='allOrdersItemsWithdrawStock'>
                            <p id='allOrderslogoStock'>V</p>
                        </div>
                        <div className='OrderValueandNameStock'>
                            <h4 id='OrderValueStock'>1.000</h4>
                            <h6 id='OrderNomeStock'>S&P 500</h6>
                        </div>
                    </div>

                    <div className='allordersDivStock'>
                        <div className='allOrdersItemsStock'>
                            <p id='allOrderslogoStock'>C</p>
                        </div>
                        <div className='OrderValueandNameStock'>
                            <h4 id='OrderValueStock'>1.000</h4>
                            <h6 id='OrderNomeStock'>S&P 500</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StockProduct;
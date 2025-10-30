import './IndexesProduct.css';
import { Link, useParams } from 'react-router-dom';
import goBack from '../../assets/img/goBack.png';
import threeDots from '../../assets/img/threeDots.png';
import React, { useEffect, useState } from 'react';

function IndexesProduct() {
  const [index, setIndex] = useState(null);
  const { id } = useParams();
  const api = 'http://192.168.1.8:3000';

  useEffect(() => {
    const fetchIndex = async () => {
      try {
        console.log(`🔍 Fazendo o fetch do Índice com ID: ${id}`);
        const response = await fetch(api + `/api/indexes/${id}`);

        if (!response.ok) {
          throw new Error('Erro ao Buscar o Índice!!');
        }

        const data = await response.json();
        console.log('📥 Dados recebidos do backend:', data);
        setIndex(data.index);
      } catch (error) {
        console.error('❌ Erro ao buscar o Índice: ', error);
      }
    };

    fetchIndex();
  }, [id]);

  useEffect(() => {
    console.log('📊 Estado atualizado do Índice:', index);
  }, [index]);

  return (
    <div className='FullScreenIndexProduct'>
      <div className='HeaderIndexProduct'>
        <div className='goBackDivIndexProduct'>
          <Link to={'/Indexes'}>
            <img src={goBack} />
          </Link>
        </div>

        <h2>Estatística</h2>
        <div className='threeDotsdivIndexProduct'>
          <Link to={'/Settings'}>
            <img src={threeDots} />
          </Link>
        </div>
      </div>

      <div className='activeNameDivIndexProduct'>
        <div
          className='activeLogoDivIndexProduct'
          style={{ backgroundColor: index?.color || '#F89A29' }}
        >
          <h2 id='activeLogoIndexProduct'>{index?.logo || 'B'}</h2>
        </div>
        <h3 id='activeNameIndexProduct'>{index?.name || 'S&P 500'}</h3>
      </div>

      <div className='calenderDivIndex'>
        <p id='dayIndex' className='calenderItemsIndex'>02</p>
        <p id='monthIndex' className='calenderItemsIndex'>Julho</p>
        <p id='yearIndex' className='calenderItemsIndex'>2025</p>
        <p id='weekDayIndex' className='calenderItemsIndex'>Ter</p>
      </div>

      <div className='amountandCurrentBalanseIndex'>
        <p className='amountIndex'>1.246.700 AKZ</p>
        <p className='currentBalanseIndex'>Balanço Corrente</p>
      </div>

      <div className="chart-containerIndex">
        <iframe
          src={`${api}/stock-chart`}
          width="110%"
          height="400px"
          style={{ border: 'none' }}
        ></iframe>
      </div>

      <div className='divproductButtonIndex'>
        <button id='buyBtnIndex'>Comprar</button>
        <button id='withdrawBtnIndex'>Sacar</button>
      </div>

      <div className='allOrdersIndex'>
        <div className='divAllOrdersIndex'>
          <p id='ordensIndex'>Ordens</p>
          <p id='verTodasIndex'>Ver todas</p>
        </div>

        <div className='allOrdersMainDivIndex'>
          <div className='allordersDivIndex'>
            <div className='allOrdersItemsIndex'>
              <p id='allOrderslogoIndex'>C</p>
            </div>
            <div className='OrderValueandNameIndex'>
              <h4 id='OrderValueIndex'>1.000</h4>
              <h6 id='OrderNomeIndex'>Apple</h6>
            </div>
          </div>

          <div className='allordersDivIndex'>
            <div className='allOrdersItemsWithdrawIndex'>
              <p id='allOrderslogoIndex'>V</p>
            </div>
            <div className='OrderValueandNameIndex'>
              <h4 id='OrderValueStock'>1.000</h4>
              <h6 id='OrderNomeStock'>Netflix</h6>
            </div>
          </div>

          <div className='allordersDivStock'>
            <div className='allOrdersItemsStock'>
              <p id='allOrderslogoIndex'>C</p>
            </div>
            <div className='OrderValueandNameIndex'>
              <h4 id='OrderValueIndex'>1.000</h4>
              <h6 id='OrderNomeIndex'>Amazon</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndexesProduct;

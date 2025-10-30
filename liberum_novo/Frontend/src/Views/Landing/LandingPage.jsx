import './LandingPage.css';
import invest from '../../assets/img/Invest.png';
import {Link} from 'react-router-dom';

function LandingPage() {
  

  return (
    <div className='FullScreen'>
      <h1 id='logo'>Liberum</h1>
      <div className='FirstDivFig'>
        <div className='SecondDivFig'>
            <img src={invest} />
        </div>
      </div>
      <Link to={'/Login'}>
      <button id='ContinuarBtn'>Continuar</button>
      </Link>
    </div>
  )
}

export default LandingPage
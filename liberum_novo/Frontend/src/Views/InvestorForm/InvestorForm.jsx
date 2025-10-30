import './InvestorForm.css';

import graphic from '../../assets/img/graphic.png';

import {Link} from 'react-router-dom';

function InvestorForm() {
  

  return (
    <div className='ImageDiv'>
      
      <div className='ContentDivIF'>
            
            <img id='graphicIF' src={graphic} />
            <h2 id='info'>Questionário para determinar o seu perfil de investidor</h2>
            <div className='inputsDivIF'>
              <input className='inputStyleIF' placeholder="Já investiu em activos cotados na bolsa de valores?" />
              <input className='inputStyleIF' placeholder="Quantos anos tens?" />
              <input className='inputStyleIF' placeholder="Como descreve o conhecimento/experiência que tem sobre estes investimentos?" />
              <input className='inputStyleIF' placeholder="Quanto dos seus rendimentos estaria disposto a investir na bolsa?" />
              <input className='inputStyleIF' placeholder="Como descreve o seu nível de exposição a riscos?" />
              <input className='inputStyleIF' placeholder="Qual das alternativas melhor descreve os seus objectivos de investimento?" />
              <Link to={'/Home'}>   <button id='AvancarBtn'>Avançar</button> </Link>
            </div>
      </div>
      
      
    </div>
  )
}

export default InvestorForm
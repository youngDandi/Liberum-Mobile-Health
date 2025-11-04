import './Settings.css';
import goBack from '../../assets/img/goBack.png';
import threeDots from '../../assets/img/threeDots.png';
import {Link} from 'react-router-dom';

function Settings (){

    return(
        <div className='FullScreenSeetings'>
                <div className='HeaderSettings'>
                    <div className='goBackDivSettings'>
                     <Link to={'/Home'}>  <img src={goBack} /></Link> 
                    </div>
                    
                    <h2>Definições</h2>
                    <div className='threeDotsdivSettings'>
                      <Link to={'/Settings'}> <img src={threeDots} /> </Link> 
                    </div>
                </div>

                <div className='OptionsSettingsDiv'>
                    <p className='optionsItem'>Mudar palavra-passe</p>
                    <p className='optionsItem'>Mudar Idioma</p>
                    <div className='optionsDiv1'>
                        <p className='optionsItem'>Modo escuro</p>
                        <label class="switch">
                            <input type="checkbox" />
                            <span class="slider"></span>
                        </label>

                    </div>
                    <div className='optionsDiv2'>
                        <p className='optionsItem'>Autenticação de 2 factores</p>
                        <label class="switch">
                            <input type="checkbox" />
                            <span class="slider"></span>
                        </label>
                    </div>
                    <div className='optionsDiv'>
                       <Link to={'/'}><p className='optionsItem'>Sair</p></Link> 
                    </div>
                    
                </div>
        </div>
    );
}

export default Settings;
import './Home.css';
import { Link } from 'react-router-dom';
import arrowDown from '../../assets/img/arrowDown.png';
import card from '../../assets/img/card.png';
import userImage from '../../assets/img/user.png';
import circle from '../../assets/img/Circle.png';
import rectangle from '../../assets/img/Rectangle.png';
import deposit from '../../assets/img/deposit.png';
import withdraw from '../../assets/img/withdraw.png';
import simulations from '../../assets/img/simulations.png';

import { useAuth } from '../../hooks/AuthContext.jsx';

function Home(){

    const {user} = useAuth();

    console.log("🔍 Dados do utilizador logado:", user);

    return(
        <div className='FullScreenHome'>
            <div className='UserandCard'>
                <div className='UserandMessage'>
                        <div className='UsernameDiv'> 
                            <h2 id='Ola'>Olá</h2>
                            <h2 id='Username'> {user.nome}!</h2>
                            <img src={arrowDown} />
                        </div>
                        <h4 id='message'>Pronto para começar o dia?</h4>
                </div>

                <div className='CardandTextDiv'>
                    <div className='cardDiv'>
                       <img src={card} id='card'/> 
                    </div>
                    <h4>Saúde</h4>
                </div>

            </div>
               
                <h1 id='money'>Liberum</h1>

                <div className='MenuButtonsDiv'>
                            <div className='MenuandTextDiv'>
                                <div className='MenuDiv'>
                                    <p>M</p>
                                </div>
                            <Link to={"/PedidosPendentes"} className='Link'>   <h4>Marcações</h4> </Link> 
                            </div>

                            <div className='divDesign'>
                                <p>luis</p>
                            </div>


                            
                        




                            <div className='MenuandTextDiv'>
                                <div className='MenuDiv'>
                                    <p>H</p>
                                </div>
                                <Link to={"/Consultas"} className='Link'> <h4>Histórico</h4> </Link>
                            </div>


                </div>


                <div className='MenuButtonsDiv1'>
                            <div className='MenuandTextDiv'>
                                <div className='MenuDiv'>
                                    <p>CH</p>
                                </div>
                                <Link to={"/ChatBot"} className='Link'> <h4>ChatBot</h4> </Link>
                            </div>

                            <div className='divDesign'>
                                <p>luis</p>
                            </div>


                            
                        




                            <div className='MenuandTextDiv'>
                                <div className='MenuDiv'>
                                    <p>E</p>
                                </div>
                              <Link to={"/Exames"} className='Link'>  <h4>Exames</h4> </Link>
                            </div>


                </div>




                <div>


                    <div className='OrderandDay'>
                        <h2>Receitas</h2>
                        <div className='DayandArrow'>
                                <h4>Hoje</h4>
                                <img src={arrowDown} />
                        </div>
                        
                    </div>



                    <div className='Orderlist'>


                                <div className='plusDiv'>
                                    <p id='plusIcon'>+</p>
                                </div>

                                <div className='OrdersItemDiv'>
                                        <div className='itemDiv'>
                                            <p>R</p>
                                        </div>
                                        <h4 id='OrderName'>Receita1</h4> 
                                </div>
                                <div className='OrdersItemDiv'>
                                        <div className='itemDiv'>
                                            <p>R</p>
                                        </div>
                                        <h4 id='OrderName'>Receita2</h4> 
                                </div>
                                <div className='OrdersItemDiv'>
                                        <div className='itemDiv'>
                                            <p>R</p>
                                        </div>
                                        <h4 id='OrderName'>Receita3</h4> 
                                </div>
                    </div>




                    <h2 id='Investments'>Módulos</h2>
                    <div className='InvestimentslistDiv'>


                                <div className='InvestmentsItemDiv'>
                                                <div className='itemDivInv'>
                                                    <p>MC</p>
                                                </div>
                                                <Link to={"/MarcarConsultas"} className='Link'>   <h4 id='OrderNameI'>Marcar Consultas</h4> </Link>
                                </div>
                                
                                    {/* 🔽 Mostra "Análise de Imagens" apenas se o user for mulher */}
                                        {user.sexo === "Feminino" && (
                                            <div className='InvestmentsItemDiv'>
                                                <div className='itemDivInv'>
                                                    <p>AI</p>
                                                </div>
                                                <Link to={"/AnaliseImagens"} className='Link'>   
                                                    <h4 id='OrderNameI'>Análise de Imagens</h4> 
                                                </Link>
                                            </div>
                                        )}
                                
                                


                    </div>
                    
                </div>
                
            
        </div>
    )
}


    export default Home
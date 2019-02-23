import React,{Component} from 'react';
import {connect} from 'react-redux';
import {modifica_Adiciona_Contato_Email,adiciona_Contato} from '../actions/AppAction';

class AdicionarContato extends Component{

    _adiciona_Contato(){
        const {adicionar_contato_email} = this.props;
    
        if(adicionar_contato_email!=""){
            this.props.adiciona_Contato(adicionar_contato_email);
        }else{
            alert("Preencha o campo Email para Adicionarmos o Contato !!");
        }
    }

    renderAdicionarContato(){
        if(!this.props.cadastro_resultado_inclusao){
            return(
                <div>

                    <div style={{textAlign:'center',marginTop:20,marginLeft:400}}>
                         <span style={{fontSize:40,color:'#FFF',backgroundColor:'#115e54',padding:20}}> <a href="/principal" style={{color:'#8744ff',fontSize:40,textDecoration:'none'}}> <img src={require('../imgs/voltarbtn.png')}/>  </a>Adicionar Contato</span>
                    </div>

                    <div style = {{textAlign:'center',marginTop:220,marginLeft:400}}> 
                        <input type="email" name="emailAd" id="emailAd" placeholder="Email" style = {{height:60,fontSize:20,color:'#000',width:400}} value = {this.props.adicionar_contato_email} onChange = {texto => this.props.modifica_Adiciona_Contato_Email(texto.target.value)}/>
                    </div>
        
                    <div  style = {{textAlign:'center',marginTop:160,marginLeft:400}}>
                        <button type="button" id="btnAd" style={{fontSize:20,backgroundColor:'#115e54',color:'#FFF',height:75,width:375}} onClick = {() => {this._adiciona_Contato()}}>ADICIONAR</button>
                        <br></br><br></br><h3 style={{fontSize:23,color:"#ff0000"}}>{this.props.adiciona_contato_erro}</h3>
                    </div>
            </div>
            );
        }else{
            return(
                <div>
                     <div style={{textAlign:'center',marginTop:20,marginLeft:400}}>
                         <span style={{fontSize:40,color:'#FFF',backgroundColor:'#115e54',padding:20}}> <a href="/adicionar_contato" style={{color:'#8744ff',fontSize:40,textDecoration:'none'}}> <img src={require('../imgs/voltarbtn.png')}/>  </a>Adicionar Contato</span>
                     </div>

                    <div style={{textAlign:'center',backgroundColor:'#115e54',height:60,marginTop:240,marginLeft:535,width:545,padding:10}}>
                        <span style ={{fontSize:30,color:'#FFF'}}>Cadastro Realizado com Sucesso</span>
                    </div>
                </div>
            )
        }
    }

    render(){
        return(
            <div>
                {this.renderAdicionarContato()}
            </div>
        );
    }
}
   



const mapStateToProps = state => (
  {
        adicionar_contato_email:state.AppReducer.adicionar_contato_email,
        adiciona_contato_erro:state.AppReducer.adiciona_contato_erro,
        cadastro_resultado_inclusao:state.AppReducer.cadastro_resultado_inclusao

    }

)

export default connect(mapStateToProps,{modifica_Adiciona_Contato_Email,adiciona_Contato})(AdicionarContato);
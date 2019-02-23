import React,{Component} from 'react';
import {connect} from 'react-redux';
import {modificaEmail,modificaSenha,autenticarUsuario} from '../actions/AutenticacaoAction';


class  FormLogin extends Component{


    _autenticarUsuario(){
        const {email,senha} = this.props;

        if(this.validaAuth({email,senha})){
            this.props.autenticarUsuario({email,senha});
        }else{
           alert("Preencha Todos os Campos para fazermos a Autenticação !!");

        }
    }

    validaAuth({email,senha}){
        if(email ==""  || senha ==""){
            return false;
        }

        return true;
    }


    render(){
        return(

            <div style={styles.viewPrincipal}>
                <div >
                   <span style={{fontSize:35,color:'#FFF'}}> WhatsApp Clone</span>
                </div>
                <div style={{marginTop:40}}>
                    <input type="text" placeholder="Email" style={{height:45,fontSize:20,width:400}} name="email" id="email" value={this.props.email} onChange={texto => this.props.modificaEmail(texto.target.value)}/>
                    <br></br><br></br><br></br>
                    <input type="password"  placeholder="Senha" style={{height:45,fontSize:20,width:400}} name="pwd" id="pwd" value={this.props.senha} onChange={texto => this.props.modificaSenha(texto.target.value)}/>
                    <br></br><br></br>
                    <a href="/cadastro" style={{fontSize:20,color:'#888',textDecoration:'none',color:'#000',fontWeight:'bolder'}}>Ainda não tem cadastro ? Cadastre - se</a >
                </div>
        
                <div style={{marginTop:80}}>
                    <button type="button" style={{backgroundColor:'#115E54',width:400,height:70,fontSize:20,color:'#FFF'}} id="btnLog" onClick = {() => this._autenticarUsuario()}>Acessar</button>
                    <br></br><br></br><h3 style={{fontSize:22,color:"#ff0000"}}>{this.props.erroLogin}</h3>
                </div>  
            </div>
            
        );
    }
}



const mapStateToProps = state =>(
    {
        email:state.AutenticacaoReducer.email,
        senha:state.AutenticacaoReducer.senha,
        erroLogin:state.AutenticacaoReducer.erroLogin
    }
);
  
export default connect(mapStateToProps,{modificaEmail,modificaSenha,autenticarUsuario})
(FormLogin);


const styles={

    viewPrincipal:{
        padding:10,
        textAlign:'center',
        marginTop:40,
        marginBottom:25,
        marginLeft:400

    }
    
};
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {modificaEmail,modificaSenha,modificaNome,cadastraUsuario} from '../actions/AutenticacaoAction';

class FormCadastro extends Component{


    _cadastraUsuario(){
        const{nome,email,senha} = this.props;

        if(this.validaCadastro({nome,email,senha})){
            this.props.cadastraUsuario({nome,email,senha});
        }else{
           alert("Preencha Todos os Campos para fazermos o Cadastro !!");

           
        }
      
    }

    validaCadastro({nome,email,senha}){
        if(nome =="" || email=="" || senha ==""){
            return false;
        }

        return true;
    }

    render(){
        return(
              
        <div  style={{padding:10,textAlign:'center',marginTop:40,marginBottom:25,marginLeft:400}}>
        <div >
           <span style={{fontSize:35,color:'#FFF'}}> Área de Cadastro</span>
        </div>

        <div style={{marginTop:25}}>
            <input type="text" placeholder="Nome" style={{height:45,fontSize:20,width:400}} name="nomeCad" id="nomeCad" value={this.props.nome} onChange={texto => this.props.modificaNome(texto.target.value)} />
            <br></br><br></br><br></br>
            <input type="email" value={this.props.email}  placeholder="Email" style={{height:45,fontSize:20,width:400}} name="emailCad" id="emailCad" onChange={texto => this.props.modificaEmail(texto.target.value)}/>
            <br></br><br></br><br></br>
            <input type="password"  value={this.props.senha}  placeholder="Senha" style={{height:45,fontSize:20,width:400}} name="pwdCad" id="pwdCad" onChange={texto => this.props.modificaSenha(texto.target.value)}/>
        </div>
        <div>
        <button type="button" style={{backgroundColor:'#115E54',width:400,height:70,fontSize:20,color:'#FFF',marginTop:40}} id="btnCad" onClick={()=>this._cadastraUsuario()}>CADASTRAR</button>
        <br></br><br></br><h3 style={{fontSize:22,color:"#ff0000"}}>{this.props.erroCadastro}</h3>
        </div>
        <div style={{marginTop:20}}><a href="/" style={{fontSize:21,color:'#888',textDecoration:'none',color:'#000',fontWeight:'bolder'}}>Retomar a Área Principal</a></div>
    </div>
        );
    }
}

const mapStateToProps = state =>(
    {
        nome:state.AutenticacaoReducer.nome,
        email:state.AutenticacaoReducer.email,
        senha:state.AutenticacaoReducer.senha,
        erroCadastro:state.AutenticacaoReducer.erroCadastro
    }
);
  
export default connect(mapStateToProps,{modificaEmail,modificaSenha,modificaNome,cadastraUsuario})
(FormCadastro);

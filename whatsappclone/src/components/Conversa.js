import React,{Component} from  'react';
import {connect} from 'react-redux';
import {modificaMensagem,enviarMensagem,modificaEmailContato,modificaNomeContato,conversaUsuarioFetch} from '../actions/AppAction';
import _ from 'lodash';
const Conversa = class Conversa extends Component{


    urlToJson(){
        var str = window.location.href;    
        var regex = /[&?](\w+)=(\w+)/g;    
        var arr, parametros = {};    
        while(arr = regex.exec(str)){        
            parametros[arr[1]] = arr[2];
        }

        var email=str.split('@');
        email= email[1].toString();

        parametros.nomeEmail +='@'+email;

      return parametros;

    }


    _enviarMensagem(){

        const {nomeContato,nomeEmail,mensagem}  = this.props;

      this.props.enviarMensagem(mensagem,nomeContato,nomeEmail);



    
      
    }

    renderConversa(conversa){

        if(conversa!=undefined){

            
        let itens = Object.values(conversa);




        let ListView =itens.map(v =>{
            if(v.tipo ==='e'){
                return(
                    <div style = {{alignItems:'flex-end',marginTop:50,marginBottom:20,marginLeft:320}}>
                        <span style ={{fontSize:18,padding:20,color:'#000',backgroundColor:'#dbf5b4',elevation:1}}>{v.mensagem}</span>
                    </div>
                )
             
            }else if(v.tipo ==='r'){
                return(
                    <div style = {{alignItems:'flex-start',marginTop:50,marginBottom:20,marginRight:320}}>
                        <span style ={{fontSize:18,padding:20,color:'#000',backgroundColor:'#f7f7f7',elevation:1}}>{v.mensagem}</span>
                    </div>
                )
          
            }

           
        });


        return ListView;
       
         
        }

        return null;
       
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps.conversa);
        
    }

    componentWillMount(){
        let url= this.urlToJson();
        let email = url.nomeEmail;
        let contato = url.nomeContato;
        
        
        this.props.modificaEmailContato(email);
        this.props.modificaNomeContato(contato);

        this.props.conversaUsuarioFetch(email);

    }

    render(){   
        return(
            <div style={{textAlign:'center',marginTop:50}}>
           
               
                    <span style={{fontSize:30,color:'#FFF',padding:10,marginLeft:250}}> <a href="/principal" style={{color:'#8744ff',fontSize:40,textDecoration:'none'}}><img src={require('../imgs/voltarbtn.png')}/> </a>{this.props.nomeContato}</span>
                

                <div style = {{marginTop:70,padding:10,backgroundColor:'#eee4dc',width:545,marginLeft:540,height:8000}}>

                 { this.renderConversa(this.props.conversa)}
                    
                    <input value={this.props.mensagem} type="text" name="msg" id="msg" style={{fontSize:22,backgroundColor:'#FFF',height:80,width:410,textAlign:'center',marginLeft:10,marginTop:200}} onChange={texto => this.props.modificaMensagem(texto.target.value)} /><button type="button" style={{backgroundColor:'#CCC',marginLeft:10}} onClick={() => this._enviarMensagem()}><img src={require('../imgs/enviar_mensagem.png')} style={{marginLeft:10}}/></button>
                </div>

            </div>
        )
    }
}



const mapStateToProps = state =>{

    const conversa = state.ListaConversaReducer;

   console.log(conversa);
    

 
    return({
        conversa,
        mensagem:state.AppReducer.mensagem,
        nomeContato:state.AppReducer.nomeContato,
        nomeEmail:state.AppReducer.nomeEmail
    })
}
export default connect(mapStateToProps,{modificaMensagem,enviarMensagem,modificaEmailContato,conversaUsuarioFetch,modificaNomeContato})(Conversa);
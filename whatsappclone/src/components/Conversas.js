import React,{Component} from 'react';
import {connect} from 'react-redux';
import { conversasUsuarioFetch} from '../actions/AppAction';
import _ from 'lodash';

class Conversas extends Component{

    renderListaConversas(convesas){
        
        let ListView = convesas.map(v =>{
         let link=`/conversa?nomeContato=${v.nome}&nomeEmail=${v.email}`;
            return(
               
                     <div style={{ borderBottom: "2px solid #CCC",borderBottomWidth:1,padding:20}}>
                             <a href ={link} style={{textDecoration:'none',color:'#888'}}>
                                 <span style={{fontSize:26}}>{v.nome}</span>
                             </a>
                     </div>
             
               
            );
        })
 
        return ListView;
     }
 

    componentWillMount(){
        this.props.conversasUsuarioFetch();
    }

    render(){
        return(             
            <div style={{padding:20}}>
               {this.renderListaConversas(this.props.conversas)}
            </div>
        )
    }
}

const mapStateToProps = state =>{
    const conversas = _.map(state.ListaConversasReducer,(val,uid)=>{
        return {...val,uid};
    });

    console.log('conversas',conversas);
    return({
        conversas
    })
}

export default connect(mapStateToProps,{conversasUsuarioFetch})(Conversas);
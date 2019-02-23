import React,{Component} from 'react';
import {connect} from 'react-redux';
import {contatoUsuarioFetch} from '../actions/AppAction';
import _ from 'lodash';

class Contatos extends Component{

    componentWillMount(){
     this.props.contatoUsuarioFetch();
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps.contatos);
    }

    renderListaContatos(contatos){
        
       let ListView = contatos.map(v =>{
        let link=`/conversa?nomeContato=${v.nome}&nomeEmail=${v.email}`;
           return(
              
                    <div style={{ borderBottom: "2px solid #CCC",borderBottomWidth:1,padding:20}}>
                            <a href ={link} style={{textDecoration:'none',color:'#888'}}>
                                <span style={{fontSize:26}}>{v.nome}</span><br></br>
                                <span style={{fontSize:22}}>{v.email}</span>
                            </a>
                    </div>
            
              
           );
       })

       return ListView;
    }


    render(){
        return(
            <div style={{padding:20}}>
            {this.renderListaContatos(this.props.contatos)}
             </div>
        )
    }
}

const mapStateToProps = state =>{
    let contatos = _.map(state.ListaContatosReducer,(val,uid)=>{
        return {...val,uid};
    });
    
    return {contatos};
}

export default connect(mapStateToProps,{contatoUsuarioFetch})(Contatos)
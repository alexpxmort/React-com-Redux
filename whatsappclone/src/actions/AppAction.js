import {LISTA_CONVERSA_USUARIO,LISTA_CONVERSAS_USUARIO,ENVIADA_COM_SUCESSO,MODIFICA_ADICIONA_CONTATO_EMAIL,MODIFICA_MENSAGEM,ADICIONA_CONTATO_ERRO,ADICIONA_CONTATO_SUCESSO,LISTA_CONTATO_USUARIO}  from './types';
import b64 from 'base-64';
import firebase from 'firebase';
import _ from 'lodash';



export const modifica_Adiciona_Contato_Email = texto =>{
    return({
        type:MODIFICA_ADICIONA_CONTATO_EMAIL,payload:texto
    })
}

export const adiciona_Contato = email =>{

    return dispatch =>{
        let emailB64 = b64.encode(email);

        firebase.database().ref(`/contatos/${emailB64}`)
        .once('value')
        .then(snapshot =>{
           if(snapshot.val()){
               console.log("Usuário Existe");

               const dadosUsuario = _.first(_.values(snapshot.val()));
               console.log(dadosUsuario.nome);

                const {currentUser} =  firebase.auth();
               let emailUsuarioB64 = b64.encode(currentUser.email);

               firebase.database().ref(`/usuario_contato/${emailUsuarioB64}`)
               .push({email,nome:dadosUsuario.nome})
               .then(() => adicionaContatoSucesso(dispatch) )
               .catch(erro => adicionaContatoErro(erro.message,dispatch));

           }else{
               dispatch({
                   type:ADICIONA_CONTATO_ERRO,payload:'Email informado não corresponde a um usuário válido !!'
               })
           }
        })
    }
}

const adicionaContatoErro = (erro,dispatch) => {
    return dispatch({
        type:ADICIONA_CONTATO_ERRO,payload:'Email informado não corresponde a um usuário válido !!'
    })
}

const adicionaContatoSucesso = dispatch =>{
    dispatch({
        type:ADICIONA_CONTATO_SUCESSO,payload:true
    })
}

export const habilitaInclusaoContato = () =>{
    return({
        type:ADICIONA_CONTATO_SUCESSO,payload:false
    })
}

export const contatoUsuarioFetch = () =>{

    
   return (dispatch) =>{
        firebase.auth().onAuthStateChanged(user =>{
            if(user){
                let emailUser = b64.encode(user.toJSON().email);
                firebase.database().ref(`/usuario_contato/${emailUser}`)
                .on('value',snapshot =>{
                    dispatch({
                        type:  LISTA_CONTATO_USUARIO,payload:snapshot.val()
                    })
                })
            }
        })

        
   }
   
}

export const modificaMensagem  = texto =>{
    return({
        type:MODIFICA_MENSAGEM,
        payload:texto
    })
}

export const enviarMensagem  = (mensagem,nomeContato,nomeEmail) =>{
  
    return dispatch =>{
        firebase.auth().onAuthStateChanged(user =>{
            if(user){

                let emailUser = user.toJSON().email;
                let emailContato = nomeEmail;
    
                let emailUserB64 = b64.encode(emailUser);
                let emailContatoB64 = b64.encode(emailContato);

              firebase.database().ref(`/mensagens/${emailUserB64}/${emailContatoB64}`)
              .push({mensagem,tipo:'e'})
              .then(()=>{
                  firebase.database().ref(`/mensagens/${emailContatoB64}/${emailUserB64}`)
                  .push({mensagem,tipo:'r'})
                  .then(() => dispatch({type:ENVIADA_COM_SUCESSO}))
              })
              .then(()=>{
                  firebase.database().ref(`/usuario_conversas/${emailUserB64}/${emailContatoB64}`)
                  .set({nome:nomeContato,email:emailContato})
              })
              .then(()=>{

                firebase.database().ref(`/contatos/${emailUserB64}`)
                .once("value")
                .then(snapshot =>{
                    
                    const dadosUsuario = _.first(_.values(snapshot.val()));

                    firebase.database().ref(`/usuario_conversas/${emailContatoB64}/${emailUserB64}`)
                    .set({nome:dadosUsuario.nome,email:emailUser})
                  
                })
            })
               
    
    
            }
        })
    }
}

export const modificaEmailContato = (email) =>{
    return({
        type:'teste',
        payload:email
    })
}

export const modificaNomeContato = (contato) =>{
    return({
        type:'x',
        payload:contato
    })
}

export const conversaUsuarioFetch = contatoEmail =>{

    
    return dispatch =>{
   

        firebase.auth().onAuthStateChanged(user =>{

            if(user){
                let emailUser = user.toJSON().email;
                let emailUserB64 = b64.encode(emailUser);
                let emailContatoB64 = b64.encode(contatoEmail);
    

                    firebase.database().ref(`/mensagens/${emailUserB64}/${emailContatoB64}`)
                    .on('value',snapshot =>{
                        
                        dispatch({type:LISTA_CONVERSA_USUARIO,payload:snapshot.val()})
    
                  })
                
        

            }
        })
    }
}

export const conversasUsuarioFetch = () => {


    return dispatch =>{
            
        firebase.auth().onAuthStateChanged(user =>{
            if(user){
                let emailUsuarioB64 = b64.encode(user.toJSON().email);

                firebase.database().ref(`/usuario_conversas/${emailUsuarioB64}`)
                .on("value",snapshot =>{
                    dispatch({type:LISTA_CONVERSAS_USUARIO,payload:snapshot.val()})
                })
            }
        })
    }

}


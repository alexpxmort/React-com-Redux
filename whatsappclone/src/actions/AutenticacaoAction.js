import firebase from'firebase';
import b64 from 'base-64';
import {MODIFICA_EMAIL,MODIFICA_SENHA,MODIFICA_NOME,CADASTRO_USUARIO_ERRO,CADASTRO_USUARIO_SUCESSO,LOGIN_USUARIO_ERRO,LOGIN_USUARIO_SUCESSO} from '../actions/types';

export const modificaEmail = (texto) => {
    return(
        {
            type:MODIFICA_EMAIL,
            payload :texto
        
        }
    )
}

export const modificaSenha = (texto) =>{
    return({
        type:MODIFICA_SENHA,
        payload:texto
    })
}

export  const modificaNome = (texto ) =>{
    return({
        type:MODIFICA_NOME,
        payload:texto
    })
}

export const cadastraUsuario = ({nome,email,senha}) =>{
    return dispatch => {
        firebase.auth().createUserWithEmailAndPassword(email,senha)
        .then(user =>{
            let emailB64=b64.encode(email);
            firebase.database().ref(`/contatos/${emailB64}`)
            .push({nome})
            .then(value => cadastraUsuarioSucesso(dispatch))
        }) 
        .catch(erro => cadastraUsuarioErro(erro,dispatch));

    }
}

const cadastraUsuarioSucesso = (dispatch) => {
    dispatch({
        type:CADASTRO_USUARIO_SUCESSO
    });

    window.location.href="/boasvindas";
}

const cadastraUsuarioErro = (erro,dispatch) => {
    switch(erro.code){
        case 'auth/invalid-email':
            erro.message = 'O email está mal formatado';
        break;

        case 'auth/weak-password':
            erro.message = 'A senha deve ter pelo menos 6 caracteres';
        break;

        case 'auth/email-already-in-use':
            erro.message = 'O email inserido já está em uso por outra conta !!';
        break;

        default:
         erro.message = 'Erro ao Cadastrar Usuario !!';
        break;
    }

    dispatch({
        type:CADASTRO_USUARIO_ERRO,payload:erro.message
    })
}

export const autenticarUsuario = ({email,senha}) => {
    
    return dispatch =>{
        firebase.auth().signInWithEmailAndPassword(email,senha)
        .then(value => loginUsuarioSucesso(dispatch))
        .catch(erro => loginUsuarioErro(erro,dispatch))
    }
}

const loginUsuarioSucesso = (dispatch) =>{
    dispatch({
        type:LOGIN_USUARIO_SUCESSO
    })

    window.location.href="/principal";

}

const loginUsuarioErro = (erro,dispatch) =>{
    switch(erro.code){
        case 'auth/wrong-password':
            erro.message = 'Usuário ou senha Incorretos !!';
        break;

        case 'auth/invalid-email':
            erro.message = 'Email inválido';
        break;

        case 'auth/user-not-found':
            erro.message = 'Usuário não Encontrado'
        break;

        default:
            erro.message = 'Erro ao Autenticar Usuario !!';
        break;
    }
    dispatch({
        type:LOGIN_USUARIO_ERRO,payload:erro.message
    })
}
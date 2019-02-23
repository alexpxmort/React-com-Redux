import {MODIFICA_EMAIL,CADASTRO_USUARIO_SUCESSO,MODIFICA_SENHA,MODIFICA_NOME,CADASTRO_USUARIO_ERRO,LOGIN_USUARIO_ERRO,LOGIN_USUARIO_SUCESSO} from '../actions/types';


const INITIAL_STATE = {
    nome:'',
    email:'',
    senha:'',
    erroCadastro:'',
    erroLogin:''
}


export default (state = INITIAL_STATE,action) => {
    
    switch(action.type){
        case MODIFICA_EMAIL:
            return{...state,email:action.payload};
        break;

        case MODIFICA_SENHA:
            return{...state,senha:action.payload};
        break;

        case MODIFICA_NOME:
            return{...state,nome:action.payload};
        break;

        case CADASTRO_USUARIO_ERRO:
            return{...state,erroCadastro:action.payload};
        break;

        case CADASTRO_USUARIO_ERRO:
            return{...state,nome:'',senha:''};
        break;

        case LOGIN_USUARIO_ERRO:
            return {...state,erroLogin:action.payload}
        break;

        case LOGIN_USUARIO_SUCESSO:
            return{...state,...INITIAL_STATE};
        break;

        default :
            return state;
        break;
    }
  
}
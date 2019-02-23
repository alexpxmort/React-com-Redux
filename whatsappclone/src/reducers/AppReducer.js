import {MODIFICA_ADICIONA_CONTATO_EMAIL,ADICIONA_CONTATO_ERRO,ADICIONA_CONTATO_SUCESSO,MODIFICA_MENSAGEM,ENVIADA_COM_SUCESSO} from '../actions/types';

const INITIAL_STATE = {
    adicionar_contato_email:'',
    adiciona_contato_erro:'',
    cadastro_resultado_inclusao:false,
    mensagem:'',
    nomeContato:'',
    nomeEmail:''
};

export default (state = INITIAL_STATE,action) => {
    console.log(action);
    switch(action.type){
        case MODIFICA_ADICIONA_CONTATO_EMAIL:
            return {...state,adicionar_contato_email:action.payload};
        break;

        case ADICIONA_CONTATO_ERRO :
            return {...state,adiciona_contato_erro:action.payload}
        break;

        case ADICIONA_CONTATO_SUCESSO :
            return {...state,cadastro_resultado_inclusao:action.payload}
        break;

        case MODIFICA_MENSAGEM:
            return{...state,mensagem:action.payload}
        break;

        case 'teste':
            return{...state,nomeEmail:action.payload}
        break;

        case 'x':
            return{...state,nomeContato:action.payload}
        break;

        case ENVIADA_COM_SUCESSO:
            return{...state,mensagem:''}
        break;
        
        default:
            return state;
    }
}
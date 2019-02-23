import React from 'react';
import FormCadastro from './FormCadastro';
import FormLogin from './FormLogin';
import {BoasVindas} from './BoasVindas';
import Conversa from './Conversa';
import AdicionarContato from './AdicionarContato';
import Principal from './Principal';
import {Switch,Route} from 'react-router-dom';

const Routerx = props =>(
    <Switch>
        <Route exact path="/" component={FormLogin}/>
        <Route path="/cadastro" component={FormCadastro}/>
        <Route path="/boasvindas" component={BoasVindas}/>
        <Route path="/principal" component={Principal}/>
        <Route path="/adicionar_contato" component={AdicionarContato}/>
        <Route path="/conversa" component={Conversa}/>
        
        
    </Switch>
);

export {Routerx};
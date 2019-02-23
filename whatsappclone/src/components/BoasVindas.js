import React from 'react';

const BoasVindas = props =>(
    <div style = {{padding:15,textAlign:'center',marginLeft:400}}>
        <div>
            <span style={{fontSize:40,color:'#fff'}}>Seja Bem - Vindo</span><br></br>
            <img src={require('../imgs/logo.png')}  style={{height:180,width:160,marginTop:35}}/>
        </div>
        <div style={{marginTop:250}}>
         <a href="/">   <button type="button" className="btn btn-info" style={{height:80,width:250,fontSize:22}}>Fazer Login</button></a>
        </div>
    </div>
)

export {BoasVindas};
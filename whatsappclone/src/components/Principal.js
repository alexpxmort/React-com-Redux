import  React,{Component}  from  'react';
import CoolTabs from 'react-cool-tabs';
import Conversas from '../components/Conversas';
import Contatos from '../components/Contatos';
import {connect} from  'react-redux';
import {habilitaInclusaoContato} from '../actions/AppAction';
import firebase from 'firebase';

  class  Principal  extends  Component {
		render() {
			return (
				<div>
						<div style={{padding:20,textAlign:'center',backgroundColor:'#115e54',color:'#FFF',fontSize:40,width:680,marginLeft:520}}>
						WhatsApp Clone <a href="/adicionar_contato"><img src={require('../imgs/adicionar-contato.png')} style = {{width:50,marginLeft:180}} onClick={() => this.props.habilitaInclusaoContato()}/></a>
								<span style = {{fontSize:30,color:'#FFF',marginLeft:40}} onClick={() => firebase.auth().signOut().then( () => window.location.href="/")}>Sair</span><br></br>
						</div>
					<CoolTabs
						tabKey={'1'}
						style={{ marginTop:0.4, width:  650, height:  800, background:  '#115e54',marginLeft:535 }}
						activeTabStyle={{ background:  '#115e54', color:  'white',fontSize:30 }}
						unActiveTabStyle={{ background:  '#115e54', color:  'white',fontSize:30 }}
						activeLeftTabBorderBottomStyle={{ background:  'yellow', height:  4 }}
						activeRightTabBorderBottomStyle={{ background:  'yellow', height:  4 }}
						tabsBorderBottomStyle={{ background:  '#115e54', height:  4 }}
						leftContentStyle={{ background:  '#FFF',color:'#888',fontSize:22 }}
						rightContentStyle={{ background:  '#FFF',color:'#888',fontSize:22 }}
						leftTabTitle={'Conversas'}
						rightTabTitle={'Contatos'}
						leftContent={<Conversas/>}
						rightContent={<Contatos/>}
						contentTransitionStyle={'transform 0.6s ease-in'}
						borderTransitionStyle={'all 0.6s ease-in'}/>
				</div>
		);
}}



export default connect(null,{habilitaInclusaoContato})(Principal)
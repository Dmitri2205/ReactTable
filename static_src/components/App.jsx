import React from 'react';
import ReactDOM from 'react-dom';
import Table from "./Table";
import style from './style/style.css';

export default class App extends React.Component {

	state = {
		input:'',
		responseData:[],
		minData:'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',
		maxData:'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',
		isFetching:false,
	};
	handleChange = (event) => {
		this.setState({input:event.target.value});
	};
	inputUpdate = (state) => {
		this.setState({input:state});
	}

baseButton = (value) => {
    	this.setState({isFetching:true});
	if(value == this.state.minData ){
	    fetch(value)
        .then( (response) => {
    		response.json().then( (data) => {
    			if(response.ok){
    		this.setState({responseData:data,isFetching:false});
    			}else{
    				setTimeout(()=>{
    		this.setState({responseData:data,isFetching:false});
    		}, 200);
    		};
    })
  })
	}else{
		fetch(value)
        .then( (response) => {
    			response.json().then( (data) => {
    				if(response.ok){
    			this.setState({responseData:data,isFetching:false})
    				}else{
    						setTimeout(()=>{
    					this.setState({responseData:data, isFetching:false})
    					}, 540);
    				};
    			})
	  	})
	};
}




  render(){
     return(
		<div className="app">
		<div className='loader' style={this.state.isFetching ? {display:'block'} : {display:'none'}}>
			<h1 style={ {textAlign:'center', marginTop:'10px',marginBottom:0} }>Загрузка данных</h1>
			<img src={ 'https://avatars.mds.yandex.net/get-pdb/936467/ec8e0f4a-2f47-40ff-a361-f68a90664934/orig' } />
		</div>
		<h1 style={{marginLeft:'20px'} , this.state.isFetching === true ? {display:'none'}:{display:'block'}}>Выберите размер базы</h1>
		<button 
		style={this.state.isFetching === true ? {display:'none'}:{display:'inline-block'}}
		className="basebutton" onClick={ () => { this.baseButton(this.state.minData) } }>32</button>
		<button 
		style={this.state.isFetching === true ? {display:'none'}:{display:'inline-block'}}
		className="basebutton" onClick={ () => { this.baseButton(this.state.maxData)} }>1000</button>
			<Table table={ this.state.responseData }
					isFetching={this.state.isFetching}
					inputEvent={this.handleChange} 
					input={this.state.input}
					update={this.inputUpdate}
			/>
		</div>
	 );
  }
}


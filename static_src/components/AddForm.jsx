import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";


export default class AddForm extends React.Component {

state={
data:{},
visible:false,
allValues:false,
id:Number(),
firstname:'',
lastname:'',
email:'',
phone:'',
};

componentDidUpdate(prevProps){
	if(prevProps.visible != this.props.visible){
		this.setState({visible:this.props.visible});
	}
};

handleChange = (event) => {
		this.setState({[event.target.name]: event.target.value});
	setTimeout(()=>{
	this.handleValues();
	},100);
};


handleValues = () => {
	this.forceUpdate();
	setTimeout( () => {
	if(this.state.id.length != 0 && this.state.firstname.length != 0 && this.state.lastname.length != 0 && this.state.email.length != 0 && this.state.phone.length != 0 ){
			this.setState({allValues:true});
		}else{
			this.setState({allValues:false});
		}
	},100)
	this.compileData();
};

compileData = () => {
			const item = new Object();
				item.id = this.state.id;
				item.firstname = this.state.firstname;
				item.lastname = this.state.lastname;
				item.email = this.state.email;
				item.phone = this.state.phone;
			this.setState({ data:item });
	setTimeout( () => {
		if(this.state.data.length > 0){
			this.setState({id:'',
						   firstname:'',
						   lastname:'',
						   email:'',
						   phone:'',})
		}else{
		console.log('Не все данные заполнены');/*Подсказка*/
		}

		},50);
}




render(){
return(
	<div className='AddForm' style={this.state.visible ? {display:'block'}:{display:'none'}}>
	<h1 >Форма добавления данных</h1>
	<button className='close' onClick={ () => {this.props.addDataClose()} }></button>
	<table>
		<tbody>
			<tr>
			<td>id</td>
			<td>first name</td>
			<td>last name</td>
			<td>email</td>
			<td>phone</td>
			</tr>
		</tbody>
	</table>
			<div className="inputRow">
				<input name='id' value={this.state.id}onChange={ this.handleChange}/>
				<input name='firstname' value={this.state.firstname} onChange={ this.handleChange}/>
				<input name='lastname' value={this.state.lastname} onChange={ this.handleChange} />
				<input name='email' value={this.state.email} onChange={ this.handleChange}/>
				<input name='phone' value={this.state.phone} onChange={ this.handleChange}/>

				<button className='adddatabutton' onClick={ ()=>{ this.props.addData(this.state.data, 0) } }
				style={this.state.allValues ? {display:'block'} : {display:'none'} }
				>Добавить данные</button>

			</div>
	</div>	
	);

}
}
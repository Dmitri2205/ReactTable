import React from 'react';
import ReactDOM from 'react-dom';


export default class SelectedElement extends React.Component {
	state = {
		v:false,//Visible
	};

componentDidUpdate(prevProps){//Определение предыдущих пропс для управления видимостью 
	if (prevProps.selected !== this.props.selected) {
		this.setState({user:this.props.user,v:true});
		this.forceUpdate();
	};
};

	closeSelected = () => {//Закрытие окна выбранного пользователя
	if(this.state.v === true){
		this.setState({v:false});
	};
};





render(){
		return(
			<div className='selectedelement'
			style={this.state.v === true ? {display:'block'}:{display:'none'} }
			>
			<button 
			className='closeselectedbutton'
			onClick={ ()=>{ this.closeSelected() }}></button>
				<h1>Выбран пользователь:{this.props.selected[1]} {this.props.selected[2]}</h1>
					<h2>Описание:
					<br/>
					{this.props.selected[9]}
					  </h2>
					  <h2>Адрес проживания:{this.props.selected[5]}</h2>
							<h2>Город:{this.props.selected[6]} </h2>
							<h2>Провинция/штат:{this.props.selected[7]} </h2>
							<h2>Индекс:{this.props.selected[8]} </h2>
			</div>
		)

	}
}


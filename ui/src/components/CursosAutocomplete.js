import React, {Component, Fragment} from 'react';
import { Badge, Button, Card, Col, Divider, Progress, Tooltip, Skeleton, AutoComplete } from "antd";
import api from "../services/api";

export default class CursosAutocomplete extends Component{
	constructor(props){
		super(props);
		this.state = {
			cursosAll: {},
			cursos: {}
		}
	}
	onSelect(value){
			console.log(value);
	}
	async componentDidMount(){
		const response = await api.get('/cursos');
		this.setState({cursosAll: response.data})
		this.state.cursosAll.map(curso=>(
			this.setState({cursos: curso.titulo})
		))
		console.log(this.state.cursos);
	}

	render(){
		const {cursosAll} = this.state;
		return(
			<p></p>
		)
	}
}
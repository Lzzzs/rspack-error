import React from 'react';
import './App.css';
import { WangEditor } from './components/editor';

interface IProps {

}

interface IState {
	data: string;
}

export default class App extends React.Component<IProps, IState> {
	private editorRef: any = React.createRef();

	readonly state = {
		data: ''
	} as IState

	public render() {
		return (
			<div className="App">
				<WangEditor
					ref={this.editorRef}
					defaultValue={this.state.data ?? ''}
					onChange={(html) => {
						this.setState({ data: html });
					}}
				/>
			</div>
		);
	}
}
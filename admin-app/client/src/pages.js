import React, { Component } from 'react';
import { draftToMarkdown } from 'markdown-draft-js';
import { markdownToDraft } from 'markdown-draft-js';
import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';


class MyEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }
  render() {
  	console.log("I am in myeditor render.");
    return (
        <Editor editorState={this.state.editorState} onChange={this.onChange} />
    );
  }
}


class Pages extends Component {

    render () {
        return (
            <div id="content">
                <h1> Pages</h1>
                <h2> Update the title and description of each page here.</h2>
                <MyEditor />
				<input
				type="text"
				/>

            </div>
        )
    }

}



export default Pages
import React,{Component} from "react";
import {Redirect} from "react-router-dom"
import Quill from "react-quill"
import 'react-quill/dist/quill.snow.css'

export default class PostForm extends Component{

    state={
        post:{
        id:this.props.post.id,
        slug:this.props.post.slug,
        title:this.props.post.title,
        content:this.props.post.content,
        },
        saved:false
    }
    handlePostForm = e =>{
        e.preventDefault();
        if(this.state.post.title){
            if(this.props.updatePost){
                this.props.updatePost(this.state.post)
            }else{
            this.props.addNewPost(this.state.post)
            }
            this.setState({saved:true})
        }else{
            alert("Did not enter title")
        }
    }

    componentDidUpdate(prevProps,prevState){
        console.log(prevProps)
        if(prevProps.post.id !== this.props.post.id){
            this.setState({
                post:{
                    key:this.props.post.key,
                    slug:this.props.post.slug,
                    title:this.props.post.title,
                    content:this.props.post.content,
                }
            })
        }
    }
    
    render(){
        if(this.state.saved===true){
            return<Redirect to="/" /> ;
        }
        return(
            <div>
                <form className="container" onSubmit={this.handlePostForm}>
                    <h1>Add a new post</h1>

                        <p>
                            <label htmlFor ="form-title">Title:</label>
                            <br/>
                            <input 
                            defaultValue={this.props.title}
                            id ="form-title"
                            value={this.state.post.title}
                            onChange={e => this.setState({

                                post:{
                                    ...this.state.post,
                                    title:e.target.value
                                }
                            })}
                            />
                        </p>
                        
                        <p>
                            <label htmlFor="form-content">Content</label>
                        </p>
                        <Quill
                            defaultValue={this.state.post.content}
                            onChange={(content,delta,source, editor)=>{
                                this.setState({
                                    post:{
                                        ...this.state.post,
                                        content:editor.getContents()
                                    }
                                });
                            }}
                        />
                        <p>
                            <button type="submit" >Save</button>
                        </p>
                </form>
            </div>
        )
    }
}
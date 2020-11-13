import React ,{Component} from "react";
import "./App.css";
import {BrowserRouter as Router,Switch,Route, Redirect} from "react-router-dom"
import firebase from "./firebase"
import SimpleStorage from "react-simple-storage"
import Header from "./components/Header";
import Posts from "./components/Posts";
import Post from "./components/Post";
import NotFound from "./components/NotFound";
import PostForm from "./components/PostForm";
import Message from "./components/Message";
import Login from "./components/Login";

export default class App extends Component{
  state ={
    message:null,
    isAuthenticated:false,
    posts :[{
      id:1,
      slug:"hello-react",
      title:"Hello React",
      content:"Lorem"
      },
      {
        id:2,
        slug:"hello-project",
        title:"Hello Poject",
        content:"Ipsum"
      },
      {
        id:3,
        slug:"hello-blog",
        title:"Hello Blog",
        content:"Tothe"
      }
  ]}

  componentDidMount(){
    const postsRef = firebase.database().ref("posts")
    postsRef.on("value",snapshot => {
      const posts = snapshot.val();
      const newStatePosts =[];
      for(let post in posts){
        newStatePosts.push({
          key:post,
          slug:posts[post].slug,
          title:posts[post].title,
          content:posts[post].content

        })
      }
      this.setState({ posts:newStatePosts })
    })
  }

  displayMessage = type =>{
    this.setState({message:type});
    setTimeout(()=>{
      this.setState({message:null})
    },1600)
  }

  getNewSlugFromTitle = title =>
  encodeURIComponent(
    title.toLowerCase()
    .split(" ")
    .join("-")
  )

    onLogin = (email,password) => {
      firebase
      .auth()
      .signInWithEmailAndPassword(email,password)
      .then(user =>{
         this.setState({isAuthenticated:true})
      })
      .catch(error => console.log(error))
    }

    onLogout =()=>{
      firebase
      .auth()
      .signOut()
      .then(()=>{
        this.setState({isAuthenticated:false})
      })
    }
  addNewPost = post =>{
    const postsRef = firebase.database().ref("posts")
    post.slug = this.getNewSlugFromTitle(post.title);
    delete post.key;
    postsRef.push(post)
    this.displayMessage("saved")
  }

  updatePost = post =>{
    const postRef = firebase.database().ref("posts/"+post.key)
    postRef.update({
      slug:this.getNewSlugFromTitle(post.title),
      title:post.title,
      content:post.content
    })
    this.displayMessage("updated")
  }

  deletePost = post =>{

    if(window.confirm("Delete this post")){
      const postRef = firebase.database().ref("posts/"+post.key)
      postRef.remove();
      this.setState({
        message:"deleted"
      })
      this.displayMessage("deleted")
    }
  }

  render(){
    return (
      
      <div className="App">
        <SimpleStorage parent= {this} />
        <Router>
        <Header isAuthenticated={this.state.isAuthenticated}
        onLogout={this.onLogout} />

        {this.state.message && <Message type={this.state.message}/>}
        <Switch>
          <Route exact
           path="/"
           render={ ()=> <Posts
            posts={this.state.posts} 
            isAuthenticated={this.state.isAuthenticated}
            deletePost={this.deletePost}
            />
            } />

          <Route 
            path="/post/:postSlug"
             render = {props =>{
               const post = this.state.posts.find(
                 post => post.slug === props.match.params.postSlug
               );
               if(post) return <Post post = {post} />
               else return <NotFound />
             }}
          />
          <Route exact
            path="/login"
            render={()=>(
                this.state.isAuthenticated?(
                  <Redirect to ="/"/>
                ):(
            <Login onLogin={this.onLogin}/>
                )
            )}

          />
          <Route exact 
            path ="/new" 
            render = {() =>(
              this.state.isAuthenticated?(
              <PostForm 
              addNewPost={this.addNewPost} 
              post ={{
                key:null,
                slug:"",
                title:"",
                content:"",
              }}
              />
              ):(
                <Redirect to="/login" />
              )
            )}
          />

          <Route 
            path="/edit/:postSlug"
            render = {props =>{
                const post = this.state.posts.find(
                  post =>post.slug === props.match.params.postSlug
                );
                if(post && this.state.isAuthenticated){
                  return <PostForm 
                  updatePost = {this.updatePost}
                  post={post} />
                }
                else if(post && !this.state.isAuthenticated){
                  return <Redirect to ="/login" />
                }
                else{
                  return <Redirect to ="/" />
                }
            }}
          />
          <Route 
            component={NotFound}
          />
        </Switch>
        </Router>
      </div>
    )
  }
}
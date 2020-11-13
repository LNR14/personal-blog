import React from  "react";
import  {Link} from "react-router-dom"

const Posts = ({posts,deletePost,isAuthenticated}) => (
    <div>
    <article className="posts container">
        <h1>Posts</h1>
        <ul>
        {posts.length < 1 && (
            <li key="empty"> No Posts yet  </li>
        )}
        {posts.map(post =>(
            <li key={post.id}>
                <h2> <Link to={`/post/${post.slug}`}>{post.title} </Link></h2>
                {isAuthenticated && (
                <p> 
                    <Link to={`/edit/${post.slug}`} >Edit</Link> | 
                    <button className="linkLike" onClick={()=> deletePost(post)}>Delete</button>
                </p>
                )}
            </li>
        ))}
        </ul>
    </article>
    </div>
)


export default Posts
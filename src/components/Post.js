import React from "react"
import {QuillDeltaToHtmlConverter} from "quill-delta-to-html"
import { Quill } from "react-quill"


const Post = ({post}) =>{
    const converter = new QuillDeltaToHtmlConverter(post.content.ops,{})
    const contetHTML = converter.convert();
    return(
    <div>
        <article className="post container">
            <h1>{post.title}</h1>
            <div className="content"
            dangerouslySetInnerHTML={{
                __html:contetHTML
            }} />
        </article>
    </div>
    );
};
export default Post
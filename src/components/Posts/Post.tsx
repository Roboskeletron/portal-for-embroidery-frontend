import type {PostForListDto} from "../../types/api-types.ts";
import {NavLink} from "react-router-dom";
import {useAuthStore} from "../../store/AuthStore.ts";
import heart from "../../assets/heart.svg";
import heartFill from "../../assets/heart-fill.svg";

function Post({post}: {post: PostForListDto}) {
    const { isAuthenticated } = useAuthStore();

    const textStyle = {
        // color: '#ffd200',
        color: '#6F0AAA',
    };

    const onLikeClicked = () =>{

    }

    const onDislikeClicked = () =>{

    }

    const onDeleteClicked = () =>{

    }

    return (
        <div className="col">
            <div className="card h-100">
                <img src={`data:image/jpeg;base64,${post.designBase64StringImage}`}
                     className="card-img-top"
                     alt="..."
                     style={{ height: "200px", objectFit: "contain" }}
                />
                <div className="card-body">
                    <h5 className="card-title">{post.designName}</h5>
                    <p className="card-text">{post.description}</p>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-8">
                            <NavLink to={`/designs/${post.id}`} className="card-link link-success">More</NavLink>
                            <a className="card-link link-danger" href="javascript: undefined;"
                               onClick={onDeleteClicked}>Delete</a>
                        </div>
                        <div className="col-4 text-end">
                            {/*disabled={post.isLikingInProgress.some(c => id === c.id)}*/}
                            {isAuthenticated
                                ? post.liked
                                    ? <img src={heartFill} onClick={onDislikeClicked} alt={"Unlike"}/>
                                    : <img src={heart} onClick={onLikeClicked} alt={"Like"}/>
                                : <img src={heart} alt={"Like"}/>}
                            <span className="px-2" style={textStyle}>{post.countLikes}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
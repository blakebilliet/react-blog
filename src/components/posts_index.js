import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from "../actions";
import {Link} from 'react-router-dom';
import _ from 'lodash';


class PostIndex extends Component {
    componentDidMount() {
        this.props.fetchPosts();
    }

    renderPosts() {
        return _.map(this.props.posts, post => {
            console.log(post);
            return (

                <Link className={'list-group-item list-group-item-action'} to={`/posts/${post.id}`} key={post.id}>
                    {post.title}
                </Link>

            );
        });
    }


    render() {

        return (
            <div>
                <div className={'text-xs-right'}>
                    <Link className={'btn btn-primary'} to={'/posts/new'}>
                        New Post
                    </Link>
                </div>
                <h3>Posts</h3>
                <ul className={"list-group"}>
                    {this.renderPosts()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {posts: state.posts}
}

export default connect(mapStateToProps, {fetchPosts})(PostIndex);


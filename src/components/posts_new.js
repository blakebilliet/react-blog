import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import { Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions';

class PostsNew extends Component {


    renderField(field) {
        const {meta: {touched, error}} = field;

        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className={'form-control'}
                    type={"text"}
                    {...field.input}
                />
                <div className={"text-help"}>
                    {touched ? error : ""}
                </div>
            </div>
        )
            ;
    }

    onSubmit(values) {

        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const {handleSubmit} = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    name={'title'}
                    component={this.renderField}
                    label="Title"
                />
                <Field
                    name={'categories'}
                    component={this.renderField}
                    label={"Categories"}
                />
                <Field
                    name={'content'}
                    component={this.renderField}
                    label={"Post Content"}
                />
                <button type={'submit'} className={'btn btn-primary'}>Submit</button>
                <Link to={"/"} className={'btn btn-danger'}>Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    // validate the inputs from 'values'
    if (!values.title) {
        errors.title = "You must enter a title for this post.";
    }

    if (!values.categories) {
        errors.categories = "Enter at least one category";
    }

    if (!values.content) {
        errors.content = "Your blog post is empty. Please add some content.";
    }

    // If errors is empty, the form is fine to submit.
    // If errors contains *any* properties, then something is wrong.
    return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(
    connect(null, {createPost})(PostsNew)
);
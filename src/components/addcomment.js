import React, { Component } from 'react'

export class addcomment extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      text: '',
    }
  }

  handleInputChange = (event) => {
    const { value, name } = event.target
    this.setState({
      [name]: value,
    })
  }

  onSubmit = (event) => {
    //event.preventdefault();
    return fetch(
      process.env.REACT_APP_baseAPIURL +
        `/api/comments/addorupdate/${this.props.id}`,
      {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': `${localStorage.getItem('token')}`
        },
      }
    )
      .then((res) => {
        if (res.status === 200) {
          window.location.reload(false)
          //this.props.history.push('/')
        } else {
          console.log(res)
          const error = new Error(res.error)
          throw error
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  render() {
    return (
      <div>
        <h4>Add new comments</h4>
        <div className='row'>
          <form
            className='col s12'
            id='addBlog-htmlForm'
            onSubmit={this.onSubmit}
          >
            <div className='row'>
              <div className='input-field col s12'>
                <input
                  name='name'
                  id='name'
                  type='text'
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  required
                />
                <label htmlFor='name' className='active'>
                  Title
                </label>
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12'>
                <textarea
                  name='text'
                  id='text'
                  type='textarea'
                  className='materialize-textarea'
                  value={this.state.text}
                  onChange={this.handleInputChange}
                  required
                ></textarea>
                <label htmlFor='text' className='active'>
                  Description
                </label>
              </div>
            </div>
            <button
              className='btn waves-effect waves-light'
              type='submit'
              name='action'
            >
              Submit
              <i className='material-icons right'>send</i>
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default addcomment

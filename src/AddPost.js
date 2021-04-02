import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

export default class AddPost extends Component {
  state = {
    validated: false,
    UserId: "",
    Title: "",
    Body: "",
  };

  static getDerivedStateFromProps(props, state) {
    return {UserId: props.userID };
  }

  handleOnChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } 
    else {
      this.setState({
        validated: true,
      });
      this.props.handleAddPost(this.state);
    }
  };

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Form validated={this.state.validated} onSubmit={this.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>New Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Row>
              <Form.Group as={Col} md="12" lg="12" controlId="Title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="Title"
                  placeholder="Post Title"
                  value={this.state.Title}
                  onChange={(e) => this.handleOnChange(e)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please provide a title.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="12" lg="12" controlId="Body">
                <Form.Label>Body</Form.Label>
                <Form.Control
                  required
                  name="Body"
                  placeholder="Post Body"
                  value={this.state.Body}
                  onChange={(e) => this.handleOnChange(e)}
                  as="textarea"
                  rows={3}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

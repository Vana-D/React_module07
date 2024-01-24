import React from 'react'
import { Button, Card, Container, Row, Col, Alert } from 'react-bootstrap'

export default class EmployeeEdit extends React.Component {
    constructor() {
        super()
        this.state = { 
            employee: [],
            alertVisible: false,
            alertColor: 'success',
            alertMessage: '',
         }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        const id = window.location.pathname.split('/')[2]
        fetch(`/api/employees/${id}`)
        .then(response => response.json())
        .then(data => {
            data.employee.dateHired = new Date(data.employee.dateHired)
            this.setState({ employee: data.employee })
        })
        .catch(err => {console.log(err)})
    }

    handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.employeeUpdate;
        let id = form.id.value;
        let name = form.name.value;
        let extension = form.extension.value;
        let email = form.email.value;
        let title = form.title.value;
        let currentlyEmployed = form.currentlyEmployed.checked;

        let url = `/api/employees/${id}`
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
                "name": name,
                "extension": extension,
                "email": email,
                "title": title,
                "currentlyEmployed": currentlyEmployed
            }),
        })
        .then(response => response.json())
        .then(data => {
            this.setState({
                alertVisible: true,
                alertMessage: data.msg,
            })
        })
    }

    render() {
        return (
            <Card>
			<Card.Header as="h5"> Edit Employee: {this.state.employee.name} </Card.Header>
			<Card.Body>
				<Card.Text as="div">
                    <Container fluid>
                        <form name="employeeUpdate" onSubmit={this.handleSubmit}>
                            <Row className="mb-1">
                                <Col md={2}>ID:</Col>
                                <Col md="auto"><input type="text" name="id" readOnly="readOnly" defaultValue={this.state.employee._id} /></Col>
                            </Row>    
                            <Row className="mb-1">
                                <Col md={2}>Name:</Col>
                                <Col md="auto"><input type="text" name="name" defaultValue={this.state.employee.name} /> </Col>
                            </Row>
                            <Row className="mb-1">
                                <Col md={2}>Extension:</Col>
                                <Col md="auto"><input type="text" name="extension" defaultValue={this.state.employee.extension} /></Col>
                            </Row>
                            <Row className="mb-1">
                                <Col md={2}>Email:</Col>
                                <Col md="auto"> <input type="text" name="email" defaultValue={this.state.employee.email} /></Col>
                            </Row>
                            <Row className="mb-1">  
                                <Col md={2}>Title:</Col>
                                <Col md="auto"><input type="text" name="title" defaultValue={this.state.employee.title} /></Col>
                            </Row>
                            <Row className="mb-1">
                                <Col md={2}>Date Hired:</Col>
                                <Col md="auto"><input type="text" name="dateHired" readOnly="readOnly" defaultValue={this.state.employee.dateHired} /> </Col>
                            </Row>
                            <Row className="mb-1">
                                <Col md={2}>Currently Employed?</Col>
                                <Col md="auto"><input type="checkbox" name="currentlyEmployed" defaultChecked={this.state.employee.currentlyEmployed} /> </Col>
                            </Row>
                            <Button type="submit" variant="primary" size="sm" className="my-3">Update Employee</Button>
                            <Alert 
                                    variant={this.state.alertColor} 
                                    show={this.state.alertVisible} 
                                    onClose={() => this.setState({alertVisible: false})} 
                                    dismissible> {this.state.alertMessage}
                            </Alert>
                        </form>
                    </Container>
            </Card.Text>
            </Card.Body>
        </Card>
        )
    }
}
//import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
//import { Link } from 'react-router-dom';
import logo from '../assets/dentist.jpeg';
import Popup from './AddTreatmentPopup';

function AddTreatmentCard({data}){
    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={logo} />
                <Card.Body>
                    <Card.Title>Add New Treatment</Card.Title>
                    <Card.Text>
                        <a href="#">Read more!</a>
                    </Card.Text>
                    
                    <Popup data={"Add New Treatment"}/>
                </Card.Body>
            </Card>
        </>
    )
}

export default AddTreatmentCard;

/**
 * <Button variant="primary">Book Appointment</Button>
 */
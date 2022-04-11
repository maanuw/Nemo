//import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
//import { Link } from 'react-router-dom';
import logo from '../assets/dentist.jpeg';
import Popup from './TreatmentPopup';

function TreatmentCard({data}){
    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={logo} />
                <Card.Body>
                    <Card.Title>{data.treatment_name}</Card.Title>
                    <Card.Text>
                        <a href={data.more_link}>Read more!</a>
                    </Card.Text>
                    
                    <Popup data={data.treatment_name}/>
                </Card.Body>
            </Card>
        </>
    )
}

export default TreatmentCard;

/**
 * <Button variant="primary">Book Appointment</Button>
 */
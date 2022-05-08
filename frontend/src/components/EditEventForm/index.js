import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getEvents, editEvent } from '../../store/events';
import {csrfFetch} from '../../store/csrf';
import './editEventForm.css';

function EditEventForm(state) {
    const dispatch = useDispatch();
    let today = new Date();

    const [name, setName] = useState('');
    const [body, setBody] = useState('');
    const [date, setDate] = useState(today);
    const [imgUrl, setImgUrl] = useState('');
    const [errors, setErrors] = useState([]);

    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);


    const {eventId} = useParams();
    const event = useSelector(state => state.events[eventId])
    console.log('EVENT: ',event)

    useEffect(() => {
        const errors = [];

        // console.log('date:', date, '--- today:', today);

        if (!name) errors.push('Title is required');
        if (!body) errors.push('Body is required');
        if (date < today) errors.push('Date must be in the future');

        setErrors(errors);
    }, [name, body, date]);

    const handleSubmit = async(e) => {

        e.preventDefault();

        const user_id = sessionUser.id;

        // console.log(user_id)
        const eventData = {id: eventId, user_id, imgUrl, name, date, body, attending: 0};
        // const updateEvent = csrfFetch(`/api/events/${eventId}`, {
        //     method: 'PUT',
        //     body: JSON.stringify(event),
        // })

        dispatch(editEvent(eventData)).then(()=>
            history.push(`/api/events/${eventId}`)
        )
    }


    return (
        <div>
        <ul id='errors'>
            {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
        <form id='eventForm' onSubmit={handleSubmit}>
            <label htmlFor='image'>ImageURL:
                <input type='text' name='image' placeholder={event?.imgUrl} onChange={e => setImgUrl(e.target.value)}/>
            </label>
            <label htmlFor='title'>Event Name:
                <input type="text" name="title" placeholder={event?.name} onChange={e => setName(e.target.value)}/>
            </label>
            <label htmlFor='date'>Date:
                <input type="date" name="date" onChange={e => setDate(e.target.value)}/>
            </label>
            <label htmlFor='body'>Body:
                <textarea name="body" placeholder={event?.body} onChange={e => setBody(e.target.value)}/>
            </label>
            <button type='submit' disabled={errors.length === 0 ? false : true}>Submit</button>
        </form>
    </div>
    )
}

export default EditEventForm;

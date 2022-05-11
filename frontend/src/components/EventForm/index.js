import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import {csrfFetch} from '../../store/csrf';
import './eventForm.css'

function EventForm () {
    let today = new Date();

    const [name, setName] = useState('');
    const [body, setBody] = useState('');
    const [date, setDate] = useState(today);
    const [time, setTime] = useState('12:00');
    const [capacity, setCapacity] = useState(0);
    const [imgUrl, setImgUrl] = useState('');
    const [errors, setErrors] = useState([]);

    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const {createEvent} = require("../../store/events.js");

    useEffect(() => {
        const errors = [];

        // console.log('date:', date, '--- today:', today);
        if (!name) errors.push('Title is required');
        if (!body) errors.push('Body is required');
        if (date < today) errors.push('Date must be in the future');
        if (capacity < 1) errors.push('capacity is required');


        setErrors(errors);
    }, [name, body, date]);

    const handleSubmit = async(e) => {

        e.preventDefault();

        const user_id = sessionUser.id;

        const event = { user_id, imgUrl, name, date, time, capacity, body, attending: 0};
        dispatch(createEvent(event)).then(() => {
            history.push('/')
        });
    }

    return (
    <div id='event-form-card'>
        <ul id='errors'>
            {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
        <form id='eventForm' onSubmit={handleSubmit}>
            <label htmlFor='image'>ImageURL:
                <input type='text' name='image' onChange={e => setImgUrl(e.target.value)}/>
            </label>
            <label htmlFor='title'>Event Name:
                <input type="text" name="title" onChange={e => setName(e.target.value)}/>
            </label>
            <label htmlFor='date'>Date:
                <input type="date" name="date" onChange={e => setDate(e.target.value)}/>
            </label>
            <label htmlFor='time'>Time:
                <input type="time" name="time" onChange={e => setTime(e.target.value)}/>
            </label>
            <label htmlFor='capacity'>Capacity:
                <input type="number" name="capacity" onChange={e => setCapacity(e.target.value)}/>
            </label>
            <label htmlFor='body'>Body:
                <textarea name="body" onChange={e => setBody(e.target.value)}/>
            </label>
            <button type='submit' disabled={errors.length === 0 ? false : true}>Submit</button>
        </form>
    </div>
    )
}

export default EventForm;

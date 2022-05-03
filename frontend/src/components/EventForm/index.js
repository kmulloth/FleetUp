import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import {csrfFetch} from '../../store/csrf';

function EventForm () {
    let today = new Date();

    const [name, setName] = useState('');
    const [body, setBody] = useState('');
    const [date, setDate] = useState(today);
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

        setErrors(errors);
    }, [name, body, date]);

    const handleSubmit = async(e) => {

        e.preventDefault();

        const user_id = sessionUser.id;

        // console.log(user_id)
        const event = { user_id, name, date, body, attending: 0};
        dispatch(createEvent(event)).then(() => {
            history.push('/')
        });
    }

    return (
    <div>
        <ul id='errors'>
            {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
        <form onSubmit={handleSubmit}>
            <label htmlFor='title'>Event Name:</label>
                <input type="text" name="title" onChange={e => setName(e.target.value)}/>
            <label htmlFor='date'>Date:</label>
                <input type="date" name="date" onChange={e => setDate(e.target.value)}/>
            <label htmlFor='body'>Body:</label>
                <textarea name="body" onChange={e => setBody(e.target.value)}/>
            <button type='submit' disabled={errors.length === 0 ? false : true}>Submit</button>
        </form>
    </div>
    )
}

export default EventForm;

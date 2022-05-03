import { getEvents } from '../../store/events.js';

function eventCard({event}) {
    // const sessionUser = useSelector(state => state.session.user);
    // const events = useSelector(state => state.events.events);

    return (
        <div >
            <p>{event.name}</p>
        </div>
    )
}

export default eventCard;

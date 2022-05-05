import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getGroups } from '../../store/groups';

import './groups.css';

function Group() {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const groups = useSelector(state => state.groups.groups);

    useEffect(() => {
        dispatch(getGroups());
    }, [dispatch]);

    return (
        <div className="groups">
            <h1>Groups</h1>
            <ul className="groups-list">
                {groups.map(group => <li key={group.id}>
                    <h3>{group.title}</h3>
                    <p>{group.description}</p>
                    </li>)}
            </ul>
        </div>
    )
}

export default Group;

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/groups";
import './groupForm.css';

function GroupForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const user_id = sessionUser.id;

        const group = { user_id, title, description };

        dispatch(sessionActions.createGroup(group)).then(() => {
            history.push("/");
        });
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>
                Title
                <input type="text" onChange={(e) => setTitle(e.target.value)} required />
            </label>
            <label>
                Description
                <input type="text" onChange={(e) => setDescription(e.target.value)} required />
            </label>
            <button type="submit">Submit</button>
        </form>
    )
}

export default GroupForm;

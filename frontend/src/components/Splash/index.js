import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './splash.css'

function Splash() {
    return (
        <div id='splash'>
            <div id='splash-content'>
                <h1>FleetUp</h1>
                <p>Find Your Crew. Find Your Adventure</p>
                <div id='buttons'>
                    <LoginFormModal />
                    <SignupFormModal />
                </div>
            </div>
        </div>
    )
}

export default Splash;

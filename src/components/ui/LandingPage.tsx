import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const styles = {
    container: {
        backgroundImage: `url(${require('../../SWPic.jpg')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
};

const LandingPage = () => {
    return (
        <TransitionGroup>
            <CSSTransition classNames="page" timeout={300}>
                <div style={styles.container}>
                    <a href="/onboarding" className="buttonContainer">
                        <button className="button">Open Book</button>
                    </a>
                </div>
            </CSSTransition>
        </TransitionGroup>
    );
};

export default LandingPage;

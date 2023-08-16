
import { Fragment } from 'react';
import './navigation.styles.scss';
import {ReactComponent as CrwnLogo} from '../../assets/logo.svg';

import {Link, Outlet} from 'react-router-dom';

const Navigation = () => {
    return (
        <Fragment>
            <header className='navigation'>
                <div className='navigation-logo-container'>
                    <Link to="/" className='navigation-logo'>
                        <CrwnLogo />
                    </Link>
                </div>
                <nav className='navigation-links-container'>
                    <Link to='/shop' className='navigation-link'>shop</Link>
                    <Link to='/contacts' className='navigation-link'>contacts</Link>
                    <Link to='/authentication' className='navigation-link'>sign-in</Link>
                </nav>
            </header>
            <Outlet/>
        </Fragment>
    );
}

export default Navigation;

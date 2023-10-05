import { NavLink } from 'react-router-dom';
import { AppContext } from '../App';
import { useContext } from 'react';

function Footer() {
    const context = useContext(AppContext);
    return (
        <>
            <div
                className='d-flex'
                style={{ justifyContent: 'space-evenly' }}
            >
                <NavLink
                    to={'/about'}
                    className='nav-link'
                >
                    <button className='btn'>
                        <i className='bi bi-info-circle-fill'></i>
                        <div>About</div>
                    </button>
                </NavLink>

                {context.user && (
                    <NavLink
                        to={'/favcards'}
                        className='nav-link'
                    >
                        <button className='btn'>
                            <i className='class="bi bi-heart'></i>
                            <div>Favorites</div>
                        </button>
                    </NavLink>
                )}
                {context.user?.isBiz && (
                    <NavLink
                        to={'/mycards'}
                        className='nav-link'
                    >
                        <button className='btn'>
                            <i className='bi bi-credit-card-2-front'></i>
                            <div>My Cards</div>
                        </button>
                    </NavLink>
                )}
            </div>
        </>
    );
}

export default Footer;

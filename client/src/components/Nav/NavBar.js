import RingLoader from 'react-spinners/RingLoader';
import { useState } from 'react'
import { NavLink, useNavigate } from'react-router-dom'
import { Icon } from 'semantic-ui-react'
import { useLogoutUserMutation } from '../../app/services/authAPI';

const NavBar = ({ currentUser, setCurrentUser }) => {
    const [ activeItem, setActiveItem ] = useState('home');
    const [ logoutUser, { isLoading } ] = useLogoutUserMutation();
    const navigate = useNavigate();
    
    const handleItemClick = (e) => {
        setActiveItem(e.target.name)
    };

    const handleLogout = () => {
        logoutUser()
        setCurrentUser(null)
        navigate('/')
    }

    return (
        <div>
            <RingLoader color={'#F5A623'} loading={isLoading}/>
            <div className="ui pointing secondary menu">
                <div className="header item">🐼</div>
                    <NavLink 
                        className="item" 
                        to="/"
                        name='home'
                        active={activeItem === 'home'}
                        onClick={handleItemClick}
                    >
                    Home</NavLink>
                    <NavLink 
                        className="item" 
                        to="/about"
                        name='about'
                        active={activeItem === 'about'}
                        onClick={handleItemClick}
                    >
                    About</NavLink>
                    {currentUser ? <>
                    <NavLink 
                        className="item" 
                        to="/properties"
                        name='property'
                        active={activeItem === 'property'}
                        onClick={handleItemClick}
                    >Property</NavLink>
                    <NavLink 
                        className="item" 
                        to="/expenses"
                        name='expenses'
                        active={activeItem === 'expenses'}
                        onClick={handleItemClick}
                    >
                    Expense </NavLink>
                    </> : null}
                <div className="right menu">
                    { currentUser ? <>
                        <NavLink 
                        className="item" 
                        to="/profile"
                        name='profile'
                        active={activeItem === 'profile'}
                        onClick={handleItemClick}
                    > <Icon name='user circle outline'/></NavLink>
                    </> : null }
                    <NavLink 
                        className="item" 
                        to="/login"
                        name='login'
                        active={activeItem === 'login'}
                        onClick={handleItemClick}
                    >{ currentUser ? `Hi, ${ currentUser.username }!  🎋` : "Login" }</NavLink>
                    { currentUser ? 
                        <Icon 
                            name='sign out' 
                            size='large' 
                            inverted color='black' 
                            onClick={handleLogout}
                            style={{ marginTop: '8px'}}
                        ></Icon> : null }
                </div>
            </div>
        </div>
    )
}

export default NavBar
import { useState } from 'react'
import { NavLink } from'react-router-dom'
import { Icon } from 'semantic-ui-react'

const NavBar = ({ currentUser, handleLogout }) => {
    const [ activeItem, setActiveItem ] = useState('home');
    
    const handleItemClick = (e) => {
        setActiveItem(e.target.name)
    };

    return (
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
                > 👤 </NavLink>
                {/* icon name 'user circle (outline) */}
                </> : null }
                <NavLink 
                    className="item" 
                    to="/login"
                    name='login'
                    active={activeItem === 'login'}
                    onClick={handleItemClick}
                >{ currentUser ? `Hi, ${ currentUser.username }!  🎋` : "Login" }</NavLink>
                { currentUser? <Icon name='sign out' size='large' inverted color='black' onClick={handleLogout}></Icon> : null}
            </div>
        </div>
    )
}

export default NavBar
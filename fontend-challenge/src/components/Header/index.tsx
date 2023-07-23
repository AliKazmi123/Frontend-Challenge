import React, {FC} from 'react';
import './header.css';
import logo from '../../assets/images/react.png'

const Header: FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        {/* Add your logo image or text here */}
        <img src={logo} alt="Logo" />
        <h1>Frontend Coding Challenge</h1>
      </div>
    </header>
  );
};

export default Header;

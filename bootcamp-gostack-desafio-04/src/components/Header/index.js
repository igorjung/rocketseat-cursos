import React from 'react';

import './index.css';

import facebookLogo from '../../assets/facebookLogo.png'
import facebookAvatar from '../../assets/facebookAvatar.png'

function Header () {
  return (
    <header>
      <img height="60px" src={facebookLogo} alt="Facebook logo"/>
      <div>
        Meu perfil
        <img height="25px" src={facebookAvatar} alt="avatar"/>
      </div>
    </header>
  )
}

export default Header;
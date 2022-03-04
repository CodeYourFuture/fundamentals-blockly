import React, { useState } from 'react';
import "./Header.scss";

const Header = () => {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => setOpen(!open);


   return( <header class="c-layout__header c-header">
        <h1 className="c-header__title">CYF Blocks</h1>
        <button class="c-header__button c-button" onClick={toggleMenu} open={open}>
            <span class="c-button__text">Menu</span>
        </button>
    </header>)
};
export default Header;
import React, { useState } from 'react';
import Button from "../../Button/Button";
import "./Header.scss";

const Header = () => {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => setOpen(!open);


   return( <header className="c-layout__header c-header">
       <h1 className="c-header__title">&lt;CYF&gt; Blocks</h1>
       <Button context="c-header__text"  text='Text' action={toggleMenu} />
       <Button context="c-header__output" text='Output' action={toggleMenu} />
       <Button context="c-header__menu"  text='Menu' action={toggleMenu} />
    </header>)
};
export default Header;
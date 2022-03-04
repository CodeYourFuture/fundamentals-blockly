import React, { useState } from 'react';
import "./Menu.scss";


// I've put dummy text in assuming you have planned to extract these links and titles from the ExerciseIndex?
const Menu = () => {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => setOpen(!open);
    return (
        <nav className="c-layout__menu c-menu" aria-label="Main Menu.">
            <div className="c-menu__wrapper">
                <h3 className="c-menu__heading">Building Blocks</h3>
                <ol className="c-menu__list">
                    {/* Link must both load this exercise and manage focus to the text */}
                    <li className="c-menu__item"><a className="c-menu__link" href="/">Dummy</a></li>
                    <li className="c-menu__item"><a className="c-menu__link" href="/">Dummy</a></li>
                    <li className="c-menu__item"><a className="c-menu__link" href="/">Dummy</a></li>
                    <li className="c-menu__item"><a className="c-menu__link" href="/">Dummy</a></li>
                    <li className="c-menu__item"><a className="c-menu__link" href="/">Dummy</a></li>
                </ol>
                <h3 className="c-menu__heading">Arrays</h3>
                <ol className="c-menu__list">
                    {/* Link must both load this exercise and manage focus to the text */}
                    <li className="c-menu__item"><a className="c-menu__link" href="/">Dummy</a></li>
                    <li className="c-menu__item"><a className="c-menu__link" href="/">Dummy</a></li>
                    <li className="c-menu__item"><a className="c-menu__link" href="/">Dummy</a></li>
                    <li className="c-menu__item"><a className="c-menu__link" href="/">Dummy</a></li>
                    <li className="c-menu__item"><a className="c-menu__link" href="/">Dummy</a></li>
                </ol>
                <h3 className="c-menu__heading">Projects</h3>
                <ol className="c-menu__list">
                    {/* Link must both load this exercise and manage focus to the text */}
                    <li className="c-menu__item"><a className="c-menu__link" href="/">Dummy</a></li>
                    <li className="c-menu__item"><a className="c-menu__link" href="/">Dummy</a></li>
                    <li className="c-menu__item"><a className="c-menu__link" href="/">Dummy</a></li>
                    <li className="c-menu__item"><a className="c-menu__link" href="/">Dummy</a></li>
                    <li className="c-menu__item"><a className="c-menu__link" href="/">Dummy</a></li>
                </ol>
            </div>
        </nav>
    )
};

export default Menu;
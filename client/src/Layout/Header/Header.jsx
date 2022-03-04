import "./Header.scss";

const Header = () => (
    <header class="c-layout__header c-header">
        <h1 className="c-header__title">CYF Blocks</h1>
        <button class="c-header__button c-button">
            <span class="c-button__text">Menu</span>
        </button>
    </header>
);
export default Header;
import "./Button.scss";
// encourage proper use of link for link and button for action
const Button = ({ context, styleModifier, action, text, icon, link }) => {
    if (!action && !link)return null;
    return (
        <>
            {link
                ? <a className={`${context} c-button c-button--${styleModifier}`}
                    href={link}>
                    <span class="c-button__text">
                        {text}
                    </span>
                     {icon ? <span className={`c-button__icon c-button__icon--${icon}`}></span> : ``}
                </a>
                : <button className={`${context} c-button c-button--${styleModifier}`} onClick={action} >
                    <span class="c-button__text">
                        {text}
                    </span>
                    {icon ? <span className={`c-button__icon c-button__icon--${icon}`}></span> : ``}
                </button>
            }
        </>
    );
}
export default Button;


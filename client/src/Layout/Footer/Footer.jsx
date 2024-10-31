import "./Footer.scss";
import { ReactComponent as Logo } from "../../svgs/Logo.svg";

const Footer = () => (
  <footer className="c-layout__footer c-footer">
    <h3 className="c-footer__title">
      <Logo width="180px" />
      <span class="invisible">Code Your Future</span>
    </h3>
  </footer>
);
export default Footer;

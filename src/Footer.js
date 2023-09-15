import gitLogo from "./assets/git_logo.png"

const Footer = () => {
    return (
        <div className="footer">
            <a href="https://github.com/SlayerOfShadow/"><img src={gitLogo} alt="" /></a>
            <h2>Created by Antoine Leblond</h2>
        </div>
    );
}

export default Footer;
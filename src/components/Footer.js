import gitLogo from "../assets/git_logo.png"

const Footer = () => {
    return (
        <div className="footer">
            <a href="https://github.com/SlayerOfShadow/"><img src={gitLogo} alt="" /></a>
            <p>Created by Antoine Leblond</p>
        </div>
    );
}

export default Footer;
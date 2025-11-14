import './header.css';

export default function Header() {
    return (
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitleSm">Alpi's Coding Blog</span>
                <button className="headerButton">Read More</button>
                
            </div>
            <img className="headerImg" src="https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg" alt=""/>
        </div>
    );
}
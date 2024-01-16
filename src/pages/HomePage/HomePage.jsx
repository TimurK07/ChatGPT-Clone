import './HomePage.css'; 
import chatgpt_icon from  '../../assets/chatgpt-icon.png';
import santa_icon from  '../../assets/santa-icon.png';
import { NavLink } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
    <div class="desktop">
        <div class="info">
            <div class="title">Desktop is boring</div>
            <div class="subtitle">Open on your mobile!</div>
        </div>
    </div>
    <div className='mobile'>
      <header className="header">
        <div className="title">New chat</div>
      </header>

        <NavLink to="/chatgpt">
        <section className="section">
          <div className="section-choose">
            <img className="icon" src={chatgpt_icon} alt="chatgpt-icon" />
            <div className="choose-info">
              <div className="choose-title">
                Chat GPT
              </div>
              <div className="choose-subtitle">
                Default ChatGPT 3.5 model
              </div>
            </div>
          </div>
        </section>
        </NavLink>

        <NavLink to="/santapage">
        <section className="section">
          <div className="section-choose">
            <img className="icon" src={santa_icon} alt="santa-icon" />
            <div className="choose-info">
              <div className="choose-title">
                Santa GPT
              </div>
              <div className="choose-subtitle">
                Santa Claus now is available!
              </div>
            </div>
          </div>
        </section>
        </NavLink>
    </div>
    </>
    
    
  );
};

export default HomePage;

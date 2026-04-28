import LineReveal from './LineReveal';

function Footer() {
  return(
    <footer className='footer'>
      <div className='footer_inner'>
        <div className='footer_section'>
          <h2>RESUME</h2>
          <div className='footer_item'>
            <lord-icon src='https://cdn.lordicon.com/ogkplaef.json' trigger='loop' delay='1000' colors='primary:#ffffff'></lord-icon>
            <a href='#'>DOWNLOAD</a>
          </div>
        </div>

        <div className='footer_section'>
          <h2>CONTACT</h2>
          <div className='footer_list'>
            <div className='footer_item'>
              <lord-icon src='https://cdn.lordicon.com/ehfubvwr.json' trigger='loop' delay='1500' colors='primary:#ffffff' style={{ width: '30px', height: '30px' }}></lord-icon>
              <a href='mailto:enrlvy1022@naver.com'>enrlvy1022@naver.com</a>
            </div>

            <div className='footer_item'>
              <lord-icon src='https://cdn.lordicon.com/tftaqjwp.json' trigger='loop' delay='1500' colors='primary:#ffffff' style={{ width: '30px', height: '30px' }}></lord-icon>
              <a href='tel:01044059661'>010-4405-9661</a>
            </div>
          </div>
        </div>

        <LineReveal direction='horizontal' className='event_right_line' />
      </div>

      <div className='footer_copyright'>
        <p>Copyright 2026, Kee Pye Doo All rights reserved.</p>
        <LineReveal direction='horizontal' className='event_right_line' />
      </div>
    </footer>
  );
}

export default Footer;

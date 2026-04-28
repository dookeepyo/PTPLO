import { useEffect, useState } from 'react';

import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

import './styles/main.css';

import Profile from './components/profile';
import Footer from './components/Footer';
import About from './components/About';
import Portfolio from './components/Portfolio';
import LineReveal from './components/LineReveal';
import { portfolioSections } from './data/portfolioData';

function App() {
  const [particlesReady, setParticlesReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setParticlesReady(true);
    });
  }, []);

  return (
    <>
      <section className='main'>
        <div className='main_left'>
          <Profile/>
          <Footer/>
          <LineReveal direction='vertical' className='event_bottom_line' />
        </div>

        <div className='main_right'>
          <div className='first'>
            <lord-icon src='https://cdn.lordicon.com/zlyxhzar.json' trigger='loop' delay='2000' colors='primary:#ffffff' style={{ width: '30px', height: '50px' }}></lord-icon>
            <lord-icon src='https://cdn.lordicon.com/xylbqpho.json' trigger='loop' delay='2000' colors='primary:#ffffff' style={{ width: '30px', height: '50px' }}></lord-icon>
            <lord-icon src='https://cdn.lordicon.com/zvllgyec.json' trigger='loop' delay='2000' colors='primary:#ffffff' style={{ width: '30px', height: '50px' }}></lord-icon>
            <lord-icon src='https://cdn.lordicon.com/rbtjfgoz.json' trigger='loop' delay='2000' colors='primary:#ffffff' style={{ width: '30px', height: '50px' }}></lord-icon>
          </div>
          <About/>
          <div className='third'>
            {portfolioSections.map((section) => (
              <Portfolio
                key={section.id}
                sectionId={section.id}
                title={section.title}
                items={section.items}
              />
            ))}
          </div>
        </div>
      </section>

      {particlesReady && (
        <Particles
          id='particles-js'
          options={{
            fullScreen: {
              enable: true,
              zIndex: 0,
            },
            particles: {
              number: {
                value: 50,
              },
              color: {
                value: ['#ffffff', '#cfdfff', '#aabfff'],
              },
              shape: {
                type: 'circle',
              },
              opacity: {
                value: {
                  min: 0.2,
                  max: 0.8,
                },
                animation: {
                  enable: true,
                  speed: 0.4,
                },
              },
              size: {
                value: {
                  min: 0.5,
                  max: 3,
                },
                animation: {
                  enable: true,
                  speed: 1,
                },
              },
              move: {
                enable: true,
                speed: 0.2,
                random: true,
                outModes: {
                  default: 'out',
                },
              },
              links: {
                enable: false,
              },
            },
            interactivity: {
              events: {
                onHover: {
                  enable: false,
                },
                onClick: {
                  enable: false,
                },
                resize: true,
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </>
  );
}

export default App;

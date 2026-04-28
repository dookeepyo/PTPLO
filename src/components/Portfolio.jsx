import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import PortfolioCard from './PortfolioCard';
import LineReveal from './LineReveal';

function Portfolio({ sectionId, title, items }) {
  const prevClass = `portfolio_prev_${sectionId}`;
  const nextClass = `portfolio_next_${sectionId}`;

  return (
    <div className='portfolio'>
      <div className='portfolio_header'>
        <h1>{title}</h1>
        <div className='portfolio_nav'>
          <div className={`portfolio_prev ${prevClass}`}>
            <lord-icon src='https://cdn.lordicon.com/xdakhdsq.json' trigger='loop-on-hover' delay='1000' colors='primary:#ffffff' style={{ width: '50px', height: '50px', transform: 'rotate(-90deg)' }}></lord-icon>
          </div>
          <div className={`portfolio_next ${nextClass}`}>
            <lord-icon src='https://cdn.lordicon.com/xdakhdsq.json' trigger='loop-on-hover' delay='300' colors='primary:#ffffff' style={{ width: '50px', height: '50px', transform: 'rotate(90deg)' }}></lord-icon>
          </div>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: `.${prevClass}`,
          nextEl: `.${nextClass}`,
        }}
        slidesPerView={4}
        spaceBetween={40}
        className='portfolio_swiper'
      >
        {items.map((item) => (
          <SwiperSlide
            key={`${sectionId}-${item.title}`}
            tag='a'
            className='portfolio_item'
            href={item.link}
            target='_blank'
            rel='noreferrer'
          >
            <PortfolioCard
              title={item.title}
              image={item.image}
              alt={item.alt}
              type={item.type}
              desc={item.desc}
              contribution={item.contribution}
              period={item.period}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <LineReveal direction='horizontal' className='event_right_line' />
    </div>
  );
}

export default Portfolio;

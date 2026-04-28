import { useEffect, useRef, useState } from 'react';

function Profile() {
  const texts = [
    '웹 퍼블리싱',
    '인터랙션 구현',
    '모션 개발',
    '반응형 웹 구현',
    '사용자 경험 개선',
    'AI 활용 개발',
  ];

  const [displayText, setDisplayText] = useState('');
  const textIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);

  useEffect(() => {
    let timerId;

    const typeEffect = () => {
      const currentText = texts[textIndexRef.current];

      if (isDeletingRef.current) {
        charIndexRef.current -= 1;
      } else {
        charIndexRef.current += 1;
      }

      setDisplayText(currentText.substring(0, charIndexRef.current));

      let speed = isDeletingRef.current ? 80 : 160;

      if (!isDeletingRef.current && charIndexRef.current === currentText.length) {
        speed = 1200;
        isDeletingRef.current = true;
      } else if (isDeletingRef.current && charIndexRef.current === 0) {
        isDeletingRef.current = false;
        textIndexRef.current = (textIndexRef.current + 1) % texts.length;
        speed = 400;
      }

      timerId = setTimeout(typeEffect, speed);
    };

    timerId = setTimeout(typeEffect, 300);

    return () => clearTimeout(timerId);
  }, []);

  return (
    <div className='profile'>
      <div className='profile-image'></div>

      <div className='profile-desc'>
        <h3>안녕하세요!</h3>
        <h4>{displayText}</h4>
        <p>
          #HTML #CSS #SCSS #JAVASCRIPT #JQUERY
          #REACT #AI
          #RESPONSIVE #CROSSBROWSING #WEBACCESSIBILITY
          #FETCH #API #GIT #GITHUB
          #PHOTOSHOP #ILLUSTRATOR #FIGMA
        </p>
      </div>
    </div>
  );
}

export default Profile;

import LineReveal from './LineReveal';

function About(){
    return (
        <div className='second'>
            <h1>ABOUT</h1>
            <div className='about_items'>
              <div className='about_item'>
                <lord-icon src='https://cdn.lordicon.com/hbvyhtse.json' trigger='loop' colors='primary:#ffffff' delay='1000' style={{ width: '50px', height: '50px' }}></lord-icon>
                <p>
                    어디서든 적응을 잘 하고, 변화에 유연하게 적응하며 꾸준히 성장하는 <b>퍼블리셔 두기표</b>입니다. <br/>
                    단순히 화면을 만드는 것이 아니라, 사용자의 경험을 함께 고민하며 <br/>
                    자연스러운 인터랙션으로 더 좋은 사용성을 만들고자 합니다.
                </p>
              </div>

              <div className='about_item'>
                <lord-icon src='https://cdn.lordicon.com/hpmjntem.json' trigger='loop' colors='primary:#ffffff' delay='1000' style={{ width: '50px', height: '50px' }} ></lord-icon>
                <p>
                  디자인 에이전시에서 다양한 프로젝트를 경험하며 퍼블리싱 역량을 쌓았고, <br/>
                  이후 솔루션 회사에서 개발자들과의 원활한 소통을 바탕으로 유지보수와 페이지 추가, 스크립트 구현 등을 통해 협업을 이어왔습니다. <br/>
                  단순한 퍼블리싱을 넘어, 개발이 수월하게 이어질 수 있도록 구조와 흐름을 고려하며 작업해왔으며 <br/>
                  AI를 활용한 업무 자동화에도 관심을 가지고, 어떻게 하면 더 효율적으로 활용할 수 있을지 지속적으로 고민하고 있습니다. <br/>
                  앞으로는 이러한 경험을 바탕으로 프론트엔드 개발자로 성장하는 것을 목표로 하고 있습니다.
                </p>
              </div>

              <div className='about_item'>
                <lord-icon src='https://cdn.lordicon.com/svpxtchp.json' trigger='loop' delay='1000' colors='primary:#ffffff' style={{ width: '50px', height: '50px' }} ></lord-icon>
                <ul>
                  <li>2025.11 - 현재 TheThe Intelliworks 퍼블리셔</li>
                  <li>2023.01 - 2025.03 TheThe C&C 퍼블리셔</li>
                  <li>2022.08 - 2022.12 49week 퍼블리셔</li>
                  <li>2021.07 - 2022.07 UI/UX 웹퍼블리셔 과정 수료</li>
                  <li>2020.11 - 2021.07 실무 경험 및 프로젝트 참여</li>
                </ul>
              </div>
            </div>

            <LineReveal direction='horizontal' className='event_left_line' />
          </div>
    );
}

export default About;

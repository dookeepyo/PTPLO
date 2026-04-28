function PortfolioCard({ title, image, alt, type, desc, contribution, period }) {
  return (
    <>
      <img src={image} alt={alt} />

      <div className='portfolio_infor'>
        <h1>{title}</h1>
        <span className='portfolio_line'></span>

        <div className='portfolio_txtbox'>
          {type === 'desc' ? (
            <div className='portfolio_txt2'>
              <h2>주요 작업</h2>
              <p>{desc}</p>
            </div>
          ) : (
            <>
              <div className='portfolio_txt'>
                <h2>작업 기여도</h2>
                <p>{contribution}</p>
              </div>

              <div className='portfolio_txt'>
                <h2>작업 기간</h2>
                <p>{period}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default PortfolioCard;

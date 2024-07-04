import bg from '../assets/images/bg1.jpg';


const Landing = () => {
    return (
        <div>
        <div className="hero min-h-screen" style={{ backgroundImage: `url(${bg})`, backgroundAlt: "Background Image" }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-lg absolute inset-10 flex justify-center">
            <div className="text-white">
              <h1 className="mb-6 text-6xl font-bold">Goody Guddy Image Repository</h1>
              <ul className="text-xl space-y-2 text-center font-light">
                <li>Collaborative image sharing platform</li>
                <li>All the registered members can upload images</li>
                <li>Integrated machine learning model can assist to detect faces</li>
              </ul>
              <br />
            </div>
          </div>
        </div>
      </div>
        </div>
    );
};

export default Landing;
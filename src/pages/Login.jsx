import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../assets/images/bg1.jpg';
import userData from '../data/user_data.json';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = userData.find(user => user.userEmail === email && user.password === password);
    if (user) {
      navigate('/dashboard');
    } else {
      setModalOpen(true);
    }
  };

  useEffect(() => {
    const modal = document.getElementById('credentials_err');



    const closeModal = () => {
      document.body.classList.remove('no-scroll');
      setModalOpen(false);
    };

    if (modal) {
      if (modalOpen) {
        modal.showModal();
      } else {
        modal.close();
      }

      modal.addEventListener('close', closeModal);
    }

    return () => {
      if (modal) {
        modal.removeEventListener('close', closeModal);
      }
    };
  }, [modalOpen]);

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white">Login</h1>
          <p className="py-6 text-white"></p>
        </div>
        <div className="card w-full max-w-sm bg-base-100 bg-opacity-40 backdrop-blur-sm shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">Login</button>
            </div>
          </form>
          <div className="form-control mt-4">
            <button
              type="button"
              className="btn btn-secondary w-full"
              onClick={() => navigate('/signup')}
            >
              Create New
            </button>
          </div>
        </div>
      </div>
      <dialog id="credentials_err" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Login Failed!</h3>
          <p className="py-4">Invalid email or password. Please try again.</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={() => setModalOpen(false)}>Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Login;

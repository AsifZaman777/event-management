import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../assets/images/bg1.jpg';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newUser = { username, email, password };

    try {
      const response = await fetch('http://localhost:3001/api/saveUserData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Failed to save user data');
      }

      setModalOpen(true);
    } catch (error) {
      console.error('Error saving user data:', error);
      // Handle error scenario (show error message, retry, etc.)
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    navigate('/'); // Navigate to login page after successful registration
  };

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
          <h1 className="text-5xl font-bold text-white">Sign Up</h1>
        </div>
        <div className="card w-full max-w-sm bg-base-100 bg-opacity-40 backdrop-blur-sm shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="username"
                className="input input-bordered"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
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
              <button type="submit" className="btn btn-primary w-full">Sign Up</button>
            </div>
          </form>
        </div>
      </div>

      <dialog id="register_success" className="modal" open={modalOpen}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Registration Successful!</h3>
          <p className="py-4">Your account has been created successfully.</p>
          <div className="modal-action">
            <button className="btn" onClick={handleModalClose}>Close</button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SignUp;

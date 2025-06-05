import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login, checkSession } from '../services/api';

const LoginPage = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = credentials;

    if (!username || !password) {
      setError('사용자 이름과 비밀번호를 입력해주세요.');
      return;
    }

    try {
      console.log('로그인 요청:', { username, password });
      await login({ username, password });
      await checkSession(); // 세션 확인
      onLogin({ username });
      navigate('/');
    } catch (err) {
      console.error('로그인 오류:', err.status, err.error);
      setError(err.error || '로그인에 실패했습니다. 사용자 이름 또는 비밀번호를 확인하세요.');
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-lg mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">로그인</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="사용자 이름"
          value={credentials.username}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={credentials.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          로그인
        </button>
      </form>
      <p className="mt-4 text-center">
        계정이 없으신가요?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          회원가입
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
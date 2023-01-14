import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { userApi } from '../redux/api/userApi';

const Layout = () => {
  const [cookies] = useCookies(['logged_in']);
  const logged_in = cookies.logged_in;
  const { data: user } = userApi.endpoints.getMe.useQuery(null, {
    skip: !logged_in,
  });

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;

import P from 'prop-types';
import { Footer } from 'components/Footer';
import { Menu } from 'components/Menu';
import { useAuthVar } from 'graphql/reactive-var/auth';
import { useApolloClient } from '@apollo/client';
import { logout } from 'utils/logout';

export const Main = ({ children }) => {
  const authVar = useAuthVar();

  // hook do apollo para pegar o client que vem do meu provider
  const client = useApolloClient();

  const handleLogout = async (e) => {
    e.preventDefault();

    if (!authVar.userName) return;

    await logout(client, authVar.userName, () => {
      window.location.href = '/login';
    });
  };

  return (
    <>
      <Menu authVar={authVar} handleLogout={handleLogout} />
      {children}
      <Footer />
    </>
  );
};

Main.propTypes = {
  children: P.node,
};

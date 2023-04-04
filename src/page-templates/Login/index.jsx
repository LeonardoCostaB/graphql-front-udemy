import { useMutation } from '@apollo/client';
import { AuthForm } from 'components/AuthForm';
// import { DefaultError } from 'components/DefaultError';
import { Loading } from 'components/Loading';
import { GQL_LOGIN } from 'graphql/mutations/auth';
import { authDataManager } from 'graphql/reactive-var/auth';
import { loginFormVar } from 'graphql/reactive-var/login-form';
import { Helmet } from 'react-helmet';

export const Login = () => {
  loginFormVar.use();

  const [login, { loading, data, error }] = useMutation(GQL_LOGIN, {
    onError() {},
    onCompleted(data) {
      authDataManager.setVar(
        loginFormVar.get().userName,
        data.login.userId,
        true,
      );
      window.location.href = '/';
    },
  });

  const handleLogin = async (e) => {
    console.log('laoding-function', loading);

    e.preventDefault();

    const form = e.target;
    const usernameInput = form.username;
    const passwordInput = form.password;

    const variables = {
      userName: usernameInput.value,
      password: passwordInput.value,
    };

    loginFormVar.set({ ...variables });

    await login({
      variables: {
        data: variables,
      },
    });

    console.log(data);
  };

  if (loading) return <Loading loading={loading} />;
  return (
    <>
      <Helmet title="Login - GraphQL + Apollo-Client - Otávio Miranda" />

      <AuthForm
        handleLogin={handleLogin}
        formDisabled={loading}
        formError={error?.message}
      />
    </>
  );
};

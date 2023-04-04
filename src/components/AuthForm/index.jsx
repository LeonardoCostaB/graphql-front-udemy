import { Login, Password, Person } from '@styled-icons/material-outlined';

import * as Styled from './styles';
import { FormButton } from 'components/FormButton';
import { FormErrorMessage } from 'components/FormErrorMessage';
import { FormInput } from 'components/FormInput';
import P from 'prop-types';
import { Loading } from 'components/Loading';
import { DefaultContainer } from '../DefaultContainer';
import { loginFormVar } from 'graphql/reactive-var/login-form';
import { useAuthVar } from 'graphql/reactive-var/auth';
import { Link } from 'react-router-dom';

const fakeCallback = (v) => v;

export const AuthForm = ({
  savedUserName = '',
  loading = false,
  formError = '',
  handleLogin = fakeCallback,
  setUserName = fakeCallback,
  setPassword = fakeCallback,
  formDisabled = true,
}) => {
  const authVar = useAuthVar();

  if (authVar.isLoggedIn) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        Você já está logado, volte para <Link to={'/'}>home</Link>
      </div>
    );
  }
  return (
    <DefaultContainer>
      <Styled.HeadingStyles>
        Login {!!savedUserName && `(${savedUserName})`}
      </Styled.HeadingStyles>

      <form onSubmit={handleLogin}>
        <FormInput
          label="username"
          id="username"
          placeholder="Type your username"
          icon={<Person />}
          changeFn={(v) => setUserName(v)}
          disabled={loading}
          textValue={loginFormVar.get()?.userName}
        />
        <FormInput
          label="password"
          id="password"
          placeholder="Type your password"
          icon={<Password />}
          changeFn={(v) => setPassword(v)}
          disabled={loading}
          type="password"
          textValue={loginFormVar.get()?.password}
        />

        {!!formError && <FormErrorMessage>{formError}</FormErrorMessage>}

        <Styled.ButtonsContainer>
          <FormButton
            type="submit"
            icon={<Login />}
            disabled={formDisabled || loading}
          >
            Sign-in
          </FormButton>
          <span className="or-text">or</span>
          <Styled.RegisterLink to="/register">Register</Styled.RegisterLink>
        </Styled.ButtonsContainer>
      </form>

      <Loading loading={loading} />
    </DefaultContainer>
  );
};

AuthForm.propTypes = {
  savedUserName: P.string,
  loading: P.bool,
  handleLogin: P.func,
  setUserName: P.func,
  setPassword: P.func,
  formError: P.string,
  formDisabled: P.bool,
  formData: P.shape({
    userName: P.string,
    password: P.string,
  }).isRequired,
};

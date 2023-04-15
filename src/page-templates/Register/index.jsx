import { useApolloClient, useLazyQuery, useMutation } from '@apollo/client';
import { RegisterForm } from 'components/RegisterForm';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { GQL_GET_USER } from 'graphql/queries/user';
import { useEffect } from 'react';
import { useAuthVar } from 'graphql/reactive-var/auth';
import { useHistory } from 'react-router-dom';
import {
  GQL_CREATE_USER,
  GQL_DELETE_USER,
  GQL_UPDATE_USER,
} from 'graphql/mutations/user';
import { logout } from 'utils/logout';
import { DefaultContainer } from 'components/DefaultContainer';
import { FormButton } from 'components/FormButton';

export const Register = () => {
  const authVar = useAuthVar();
  const history = useHistory();
  const client = useApolloClient();

  const [getUser, userData] = useLazyQuery(GQL_GET_USER, {
    onError: () => {},
  });
  const [createUser, createUserData] = useMutation(GQL_CREATE_USER, {
    onError: () => {},
    onCompleted: () => {
      toast.success('Account created. You can login now.');
      history.push('/login');
    },
  });
  const [deleteUser, deleteUserData] = useMutation(GQL_DELETE_USER, {
    onError: () => {},
    onCompleted: () => {
      logout(client, authVar.userName, () => {
        window.location.href = '/login';
      });
    },
  });
  const [updateUser, updateUserData] = useMutation(GQL_UPDATE_USER, {
    onError: () => {},
    onCompleted: () => {
      logout(client, authVar.userName, () => {
        window.location.href = '/login';
      });
    },
  });

  const handleSubmit = (formData) => {
    if (!authVar.isLoggedIn) return handleCreateUser(formData);

    return handleUpdateUser(formData);
  };

  const handleCreateUser = async (formData) => {
    await createUser({
      variables: {
        data: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          password: formData.password,
          userName: formData.userName,
        },
      },
    });
  };

  const handleUpdateUser = async (formData) => {
    const cleanedFormData = {};

    for (const key in formData) {
      if (formData[key]) {
        cleanedFormData[key] = formData[key];
      }
    }

    await updateUser({
      variables: {
        userId: authVar.userId,
        data: { ...cleanedFormData },
      },
    });
  };

  const handleDelete = async () => {
    const shouldDelete = confirm('Are you sure?');

    if (!shouldDelete) return;

    await deleteUser({
      variables: {
        userId: authVar.userId,
      },
    });
  };

  useEffect(() => {
    if (authVar.isLoggedIn && !userData?.data?.user) {
      getUser({
        variables: {
          userId: authVar.userId,
        },
      });
    }
  }, [authVar, userData.data, getUser]);

  return (
    <>
      <Helmet title="Register - GraphQL + Apollo-Client - Otávio Miranda" />

      <RegisterForm
        handleSubmitCb={handleSubmit}
        authData={userData?.data?.user}
        formError={
          updateUserData?.error?.message ||
          createUserData?.error?.message ||
          deleteUserData?.error?.message ||
          userData?.error?.message
        }
        somethingLoading={
          updateUserData.loading ||
          createUserData.loading ||
          deleteUserData.loading ||
          userData.loading
        }
      />

      {authVar.isLoggedIn && (
        <DefaultContainer>
          <FormButton bgColor="secondary" onClick={handleDelete}>
            Delete account
          </FormButton>
        </DefaultContainer>
      )}
    </>
  );
};

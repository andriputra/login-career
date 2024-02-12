const { ApolloClient, InMemoryCache, gql } = require('@apollo/client');

const client = new ApolloClient({
  uri: 'http://207.148.68.106:2301/query',
  cache: new InMemoryCache()
});

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      refreshToken
      name
      email
      permissions {
        id
      }
    }
  }
`;

async function login(email, password) {
  try {
    if (!email || !password) {
      throw new Error("Email dan password diperlukan.");
    }

    const { data } = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: { email, password }
    });

    const { token, refreshToken, name, email: userEmail, permissions } = data.login;
    console.log('Login berhasil!');
    console.log('Token:', token);
    console.log('Refresh Token:', refreshToken);
    console.log('Nama:', name);
    console.log('Email:', userEmail);
    console.log('Permissions:', permissions);

    await getUsers();
  } catch (error) {
    console.error('Login Failed:', error.message);
  }
}

async function getUsers() {
  // Tambahkan logika untuk mendapatkan pengguna di sini
}

login("superadmin@careerbridge.com", "balakutak");

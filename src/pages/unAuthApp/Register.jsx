import React from 'react';
import { useAsync } from '../../utils/hooks';
import { useAuth } from '../../context/auth-context.jsx';
import CardResgister from '../../components/CardResgister.jsx';

export default function Register() {
  const { isLoading, isError, error, run } = useAsync();
  const { register } = useAuth();

  function handleSubmit(event) {
    event.preventDefault();
    const { username, password } = event.target.elements;
    // la function run a besoin d'une promise pour passer du mode deconecter au mode connecter
    run(
      register({
        username: username.value,
        password: password.value
      })
    );
  }
  if (isLoading)
    return (
      <>
        hey hey <div>kader</div>
      </>
    );
  if (isError)
    return (
      <>
        {error}
        <div>kader</div>
      </>
    );
  return (
    <div className="h-full" style={{ border: '1px solid red', height: '1000 px' }}>
      <CardResgister handleSubmit={handleSubmit} customClass=" justify-center " />

      {/* <form onSubmit={handleSubmit}>
        <label>userName</label>
        <input
          name="username"
          type="text"
          defaultValue="eve.holt@reqres.in"
        ></input>
        <label>password</label>
        <input name="password" type="password"></input>
        <button type="submit">signUp</button>
      </form> */}
    </div>
  );
}

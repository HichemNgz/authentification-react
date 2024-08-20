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
        loading ...... <div> ........loading</div>
      </>
    );
  if (isError)
    return (
      <>
        {error}
        <div>{error}</div>
      </>
    );
  return (
    <div className="h-full">
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

class FakeAuth {
  constructor(setting) {
    this._setting = setting;
  }

  getRegistrationUser = ({ name, email, password }) => {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Eroor ${res.status}`))
  }

  getAuthorizationUser = ({ email, password }) => {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Eroor ${res.status}`))
  }

  checkValidityUser = (jwt) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      }
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Eroor ${res.status}`))
  }
}

const fakeAuth = new FakeAuth();

export default fakeAuth

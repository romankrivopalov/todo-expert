class FakeAuth {
  constructor(setting) {
    this._setting = setting;
  }

  getRegistrationUser = ({ name, email, password }) => {
    if (name && email && password) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ token: 'gqef4l82hn14sejtjoa' })
        }, 600)
      })
    }

    return Promise.reject()
  }

  getAuthorizationUser = ({ email, password }) => {
    if (email === 'example@example.com' && password === '12345678') {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ token: 'gqef4l82hn14sejtjoa' })
        }, 600)
      })
    }

    return Promise.reject()
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

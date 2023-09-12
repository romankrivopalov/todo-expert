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
    if (jwt === 'gqef4l82hn14sejtjoa') {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ token: 'gqef4l82hn14sejtjoa' })
        }, 600)
      })
    }
  }
}

const fakeAuth = new FakeAuth();

export default fakeAuth

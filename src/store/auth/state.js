export default function () {
    return {
        isLoggedIn: localStorage.getItem('isLoggedIn') ? localStorage.getItem('isLoggedIn') : false,
        accessToken: localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null
    }
  }
  
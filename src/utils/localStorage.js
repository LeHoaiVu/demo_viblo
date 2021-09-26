export const USER_TOKEN = {
    get: () => localStorage.getItem('user_token'),
    set: (value) => {
        localStorage.setItem('user_token', `${value}`)
    },
    delete: () => localStorage.removeItem('user_token'),
}

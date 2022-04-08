export default function authHeaderRenewToken() {
    const token = JSON.parse(localStorage.getItem('RefreshToken'));
    if (token) {
        return { "RefreshToken": token };
    } else {
        return {};
    }
}

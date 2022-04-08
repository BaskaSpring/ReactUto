export default function authHeader() {
  const token = JSON.parse(localStorage.getItem('Token'));
  if (token) {
    return { "Token": token };
  } else {
    return {};
  }
}

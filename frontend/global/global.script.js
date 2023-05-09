const logout = () => {
  localStorage.removeItem('dados');
  window.location.href = '../acesso/acesso.html';
}
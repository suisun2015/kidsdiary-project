
const cookie = {
  set({ name, value = '', path = '/', domain = '', expires = '' }) {
    document.cookie = [
      `${name}=${value}`,
      `path=${path}`,
      `domain=${domain}`,
      `expires=${(expires instanceof Date) ? expires.toUTCString() : expires}`
    ].join(';');
  },

  unset(name) {
    cookie.set({ name, expires: new Date(0) });
  },

  get(name) {
    const re = new RegExp(['(?:^|; )',
      name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1'),
      '=([^;]*)'
    ].join(''));
    const matches = document.cookie.match(re);
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
};

export default cookie;

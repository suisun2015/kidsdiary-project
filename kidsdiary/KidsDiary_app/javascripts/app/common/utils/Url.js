

export function mapToUrlParams(im) {
  return '?' + im.map((value, key) => {
      const v = value ? encodeURIComponent(value) : '';
      return `${key}=${v}`;
    }).join('&');
}

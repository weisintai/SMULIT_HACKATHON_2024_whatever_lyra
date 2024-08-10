// Cookie utility functions

/**
 * Sets a cookie with the given name and value.
 * @param name The name of the cookie.
 * @param value The value of the cookie.
 * @param days Optional. The number of days until the cookie expires.
 * @param options Optional. Additional cookie options.
 */
export function setCookie(
  name: string,
  value: string,
  days?: number,
  options: {
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: "strict" | "lax" | "none";
  } = {}
): void {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  const path = options.path ? `; path=${options.path}` : "; path=/";
  const domain = options.domain ? `; domain=${options.domain}` : "";
  const secure = options.secure ? "; secure" : "";
  const sameSite = options.sameSite ? `; samesite=${options.sameSite}` : "";

  document.cookie = `${name}=${encodeURIComponent(value)}${expires}${path}${domain}${secure}${sameSite}`;
}

/**
 * Gets the value of a cookie with the given name.
 * @param name The name of the cookie.
 * @returns The value of the cookie, or null if the cookie doesn't exist.
 */
export function getCookie(name: string): string | null {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
  }
  return null;
}

/**
 * Deletes a cookie with the given name.
 * @param name The name of the cookie to delete.
 * @param options Optional. Additional cookie options.
 */
export function deleteCookie(
  name: string,
  options: {
    path?: string;
    domain?: string;
  } = {}
): void {
  setCookie(name, "", -1, options);
}

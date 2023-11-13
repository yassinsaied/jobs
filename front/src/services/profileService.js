import http from './https';

export const myProfileService = () => http.get('/profiles/me');
export const allProfileService = () => http.get('/profiles');
export const updateManyProfilesService = (profilesToUpdates) => http.put('/profiles', profilesToUpdates);

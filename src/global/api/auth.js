import { setData } from 'global/storage';
export const storeUser = async (data = null) => {
  if (!data) return;
  data.date = new Date().getTime() + (1000 * 60 * 60 * 24);
  setData('User', data);
}

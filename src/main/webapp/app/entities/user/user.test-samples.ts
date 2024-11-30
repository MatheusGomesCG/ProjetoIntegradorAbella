import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 26308,
  login: 'JQN',
};

export const sampleWithPartialData: IUser = {
  id: 31471,
  login: 'W3BQU',
};

export const sampleWithFullData: IUser = {
  id: 18715,
  login: 'vlc',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

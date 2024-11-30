import { IAuthority, NewAuthority } from './authority.model';

export const sampleWithRequiredData: IAuthority = {
  name: '5157a04f-b267-4642-b13a-75f22a3f1c6d',
};

export const sampleWithPartialData: IAuthority = {
  name: 'be2d22e8-94e0-475b-844a-aade8c658f25',
};

export const sampleWithFullData: IAuthority = {
  name: '328398ac-dd8c-4627-b402-80d95dd00933',
};

export const sampleWithNewData: NewAuthority = {
  name: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

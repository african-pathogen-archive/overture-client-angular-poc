import { IStudy } from 'nswag/song/song-service-proxies';

interface ICreateSong extends IStudy {}

const song_inits: ICreateSong = {
  description: '',
  name: '',
  organization: '',
  studyId: '',
  info: undefined,
};

export { ICreateSong, song_inits };

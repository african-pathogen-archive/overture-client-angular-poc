import { JsonNode, Study } from "nswag/song";

interface ICreateSong extends Study {}

const song_inits: ICreateSong = {
  description: '',
  name: '',
  organization: '',
  studyId: '',
  info: {} as JsonNode,
};

export { ICreateSong, song_inits };

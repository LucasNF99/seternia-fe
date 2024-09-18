import * as borsh from '@project-serum/borsh';

export class PlayerInfo {
  name: string;
  position: number;

  constructor(name: string, position: number) {
    this.name = name;
    this.position = position;
  }

  static borshAccountSchema = borsh.struct([
    borsh.u8('initialized'),
    borsh.str('name'),
    borsh.u64('position')
  ]);

  static deserialize(buffer?: Buffer): PlayerInfo | null {
    if (!buffer) {
      return null;
    }

    try {
      const { name, position } = this.borshAccountSchema.decode(buffer);
      return new PlayerInfo(name, position);
    } catch (error) {
      console.log('Deserialization error: ', error);
      return null;
    }
  }

}
import * as borsh from '@project-serum/borsh';

export class PlayerInfo {
  name: string;
  position: string;

  constructor(name: string, position: string) {
    this.name = name;
    this.position = position;
  }

  borshInstructionSchema = borsh.struct([
    borsh.u8('variant'),
    borsh.str('name'),
    borsh.str('position')
  ]);

  static borshAccountSchema = borsh.struct([
    borsh.u8('initialized'),
    borsh.str('name'),
    borsh.str('position')
  ]);

  serialize(): Buffer {
    const buffer = Buffer.alloc(1000);
    this.borshInstructionSchema.encode({ ...this, variant: 0 }, buffer);
    return buffer.subarray(0, this.borshInstructionSchema.getSpan(buffer));
  }

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
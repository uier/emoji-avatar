export interface Avatar {
  id: number;
  emoji: string;
  color: string;
  backgroundColor: string;
  fontSize: number;
  fontWeight: number;
  rotate: number;
}

export type AvatarUI = Omit<Avatar, "id">;

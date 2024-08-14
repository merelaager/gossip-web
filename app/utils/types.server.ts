export type RegisterForm = {
  username: string;
  password: string;
  inviteCode: string;
};

export type LoginForm = {
  username: string;
  password: string;
};

export type SetPasswordForm = {
  userId: string;
  password: string;
};

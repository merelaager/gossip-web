export const validateUsername = (username: string): string | undefined => {
  if (username.length < 4) {
    return "Kasutajanimi peab olema vähemalt 4 tähemärki pikk";
  }
};

export const validatePassword = (password: string): string | undefined => {
  if (password.length < 5) {
    return "Salasõna peab olema vähemal 5 tähemärki pikk";
  }
};

export const validateInviteCode = (inviteCode: string): string | undefined => {
  if (inviteCode.length < 5) {
    return "Kood peab olema vähemal 5 tähemärki pikk";
  }
};

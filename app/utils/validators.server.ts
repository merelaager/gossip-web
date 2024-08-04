export const validateUsername = (username: string): string | undefined => {
  if (username.length < 3) {
    return "Kasutajanimi peab olema vähemalt 3 tähemärki pikk";
  }

  const textEncoder = new TextEncoder();
  if (textEncoder.encode(username).length > 64) {
    return "Kasutajanimi ei tohi olla pikem kui 64 tähemärki";
  }

  if (username.split(" ").length > 1) {
    return "Kasutajanimi ei tohi sisaldada tühikuid";
  }
};

export const validatePassword = (password: string): string | undefined => {
  if (password.length < 5) {
    return "Salasõna peab olema vähemalt 5 tähemärki pikk";
  }

  const textEncoder = new TextEncoder();
  if (textEncoder.encode(password).length > 64) {
    return "Salasõna ei tohi olla pikem kui 64 tähemärki";
  }
};

export const validateInviteCode = (inviteCode: string): string | undefined => {
  if (inviteCode.length < 5) {
    return "Kood peab olema vähemalt 5 tähemärki pikk";
  }
};

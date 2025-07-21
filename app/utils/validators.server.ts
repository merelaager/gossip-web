export const validateUsername = (username: string): string | null => {
  if (username.length < 3) {
    return "Kasutajanimi peab olema vähemalt kolm tähemärki pikk";
  }

  const textEncoder = new TextEncoder();
  if (textEncoder.encode(username).length > 20) {
    return "Kasutajanimi ei tohi olla pikem kui 20 tähemärki";
  }

  if (username.split(" ").length > 1) {
    return "Kasutajanimi ei tohi sisaldada tühikuid";
  }

  if (!/^[a-z0-9._]+$/.test(username)) {
    return "Kasutajanimi tohib sisaldada ainult ladina tähestiku tähti, numbreid, punkte ja allkriipse.";
  }

  return null;
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

export const validatePasswordConfirmation = (
  password: string,
  confirmation: string,
): string | undefined => {
  if (password !== confirmation) {
    return "Salasõna ja kinnitus ei klapi";
  }
};

export const validateInviteCode = (inviteCode: string): string | undefined => {
  if (inviteCode.length < 5) {
    return "Kood peab olema vähemalt 5 tähemärki pikk";
  }
};

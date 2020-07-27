const isValidEmailFormat = (mail: string) => {
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return mail.match(mailformat) ? true : false;
};

const hasWhiteSpace = (s: string) => {
  const format = /^\s+$/;
  return s.match(format) ? true : false;
};

const passwordValid = (s: string) => {
  const format = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  return s.match(format) ? true : false;
};

export const fakeEmailPromise = (param: string) => {
  return new Promise((resolve, reject) => {
    const isValid = isValidEmailFormat(param);
    if (!isValid) {
      throw new Error("la mail inserita non è valida");
    }
    resolve({ code: 200, success: true });
  });
};

export const fakePasswordPromise = (param: string) => {
  return new Promise((resolve, reject) => {
    const whiteSpace = hasWhiteSpace(param);
    const passwordNotValid = passwordValid(param);
    if (whiteSpace || !passwordNotValid) {
      throw new Error(
        "La password deve contenere minimo 8 cifre di cui almeno un carattere maiuscolo e un numero"
      );
    }
    resolve({ code: 200, success: true });
  });
};

export const fakeYearPromise = (param: number) => {
  return new Promise((resolve, reject) => {
    const isValid = isNaN(param);
    if (isValid) {
      throw new Error("Devi inserire un numero ");
    }
    if (param < 1990 || param > 2006) {
      throw new Error("Devi inserire un numero compreso tra 1990 e 2006 ");
    }
    resolve({ code: 200, success: true });
  });
};
const isValidEmailFormat = (mail: string) => {
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return mail.match(mailformat) ? true : false;
};

const hasWhiteSpace = (s: string) => {
  return /\s/g.test(s);
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

export const fakeNamePromise = (param: string) => {
  return new Promise((resolve, reject) => {
    const isValid = hasWhiteSpace(param);
    if (!isValid) {
      throw new Error("Inserire nome e cognome");
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

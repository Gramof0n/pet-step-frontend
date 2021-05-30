/*
  OK OVO JE VRLO BITAN SHIT

  Znaci, kad backend baci greksu pri necemu, ta greska bi trebala bude u formatu 

  error: {field:"", message: ""}

  -field = dje je pukla greska (recimo pri loginu to moze bit username,email,password itd);
  -message = sta god jelte

  Preciznije, na backendu, kad pukne greska treba res jsonovat ovako:

  res.json({error: {field: "PA OVDJE IME FIELDA JELTE", message: "UDRI STA GOD"}})
*/

export const mapError = (error: any) => {
  const map: Record<string, string> = {};

  map[error.field] = error.message;
  console.log(map);

  return map;
};

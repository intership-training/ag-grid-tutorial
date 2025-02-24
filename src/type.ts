export type Info = {
  firstName: string;
  lastName: string;
  gender: Gender;
  country: string;
  age: number;
  salary: number;
};

export enum Gender {
  Male = "Male",
  Female = "Female",
  LGBTQIA = "LGBTQIA+",
}

export type Country = {
  value: string,
  shortValue: string;
}

function getRandomGender(): string {
  const genders = ["Male", "Female", "LGBTQIA+"]
  return genders[Math.floor(Math.random() * genders.length)];
}
function getRandomCountry(): string {
  const countries = ['United States', 'Canada', 'Mexico', 'United Kingdom', 'Germany', 'France', 'Australia'];
  return countries[Math.floor(Math.random() * countries.length)];
}

function getRandomAge(): number {
  return Math.floor(Math.random() * 100);
}

function getRandomSalary(): number {
  return Math.floor(Math.random() * 100000);
}

export function generateData(): any[] {
  const data = [];
  for (let i = 0; i < 100; i++) {
      data.push({
          firstName: `John${i}`,
          lastName: `Smith${i}`,
          gender: getRandomGender(),
          country: getRandomCountry(),
          age: getRandomAge(),
          salary: getRandomSalary(),
      });
  }
  return data;
}
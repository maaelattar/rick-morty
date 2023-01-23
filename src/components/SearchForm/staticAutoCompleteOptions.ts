export const statusOptions = [
  { title: "Alive", value: "alive" },
  { title: "Dead", value: "dead" },
  { title: "Unknown", value: "unknown" },
];

export const speciesOptions = [
  { title: "Human", value: "human" },
  { title: "Alien", value: "alien" },
];
export const genderOptions = [
  { title: "Female", value: "female" },
  { title: "Male", value: "male" },
  { title: "Genderless", value: "genderless" },
  { title: "Unknown", value: "unknown" },
];

export const autoCompleteOptions = [
  { name: "status", placeholder: "Status", options: statusOptions },
  { name: "species", placeholder: "Species", options: speciesOptions },
  { name: "gender", placeholder: "Gender", options: genderOptions },
];

import parameterize from "parameterize";
export function authorPathByName(name: string) {
  return `/authors/${parameterize(name)}`;
}

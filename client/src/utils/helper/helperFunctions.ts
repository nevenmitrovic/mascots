export const defaultValues = <T>(inputs: T[]) => {
  const obj: Record<string, string> = {};
  inputs.forEach((input: any) => {
    obj[input.name] = "";
  });
  return obj;
};

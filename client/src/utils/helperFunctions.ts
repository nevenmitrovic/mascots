export const defaultValues = <T>(inputs: T[]) => {
  const obj: Record<string, string | string[]> = {};
  inputs.forEach((input: any) => {
    if (input.type === "select") {
      obj[input.name] = [];
      return;
    }
    obj[input.name] = "";
  });
  return obj;
};

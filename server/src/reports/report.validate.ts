import * as yup from "yup";

export const reportPatchSchema = yup.object({
  paid: yup.boolean().required(),
});

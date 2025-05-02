import {
  useCreateItem,
  useDeleteItem,
  useEditItem,
  useGetItems,
} from "./global/genericCRUDHooks";

import { queryKeys } from "reactQuery/constants";

import { type Mascot, type MascotDocument } from "types/mascotTypes";

const useMascotActions = () => {
  const data = useGetItems<MascotDocument>([queryKeys.mascots]);
  const createMascot = useCreateItem<Mascot>([queryKeys.mascots]);
  const editMascot = useEditItem<Mascot>([queryKeys.mascots]);
  const deleteMascot = useDeleteItem([queryKeys.mascots]);

  return {
    data,
    createMascot,
    editMascot,
    deleteMascot,
  };
};

export default useMascotActions;

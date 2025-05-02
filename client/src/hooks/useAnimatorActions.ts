import {
  useCreateItem,
  useDeleteItem,
  useEditItem,
  useGetItems,
} from "./global/genericCRUDHooks";

import { queryKeys } from "reactQuery/constants";

import { type Animator, type AnimatorDocument } from "types/animatorsTypes";

const useAnimatorActions = () => {
  const data = useGetItems<AnimatorDocument>([queryKeys.animators]);
  const createAnimator = useCreateItem<Animator>([queryKeys.animators]);
  const editAnimator = useEditItem<Animator>([queryKeys.animators]);
  const deleteAnimator = useDeleteItem([queryKeys.animators]);

  return {
    data,
    createAnimator,
    editAnimator,
    deleteAnimator,
  };
};

export default useAnimatorActions;

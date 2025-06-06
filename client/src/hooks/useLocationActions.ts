import {
  useCreateItem,
  useDeleteItem,
  useEditItem,
  useGetItems,
} from "./global/genericCRUDHooks";

import { queryKeys } from "reactQuery/constants";

import { type Location, type LocationDocument } from "types/locationTypes";

const useLocationActions = () => {
  const data = useGetItems<LocationDocument>([queryKeys.locations]);
  const createLocation = useCreateItem<Location>([queryKeys.locations]);
  const editLocation = useEditItem<Location>([queryKeys.locations]);
  const deleteLocation = useDeleteItem([queryKeys.locations]);

  return {
    data,
    createLocation,
    editLocation,
    deleteLocation,
  };
};

export default useLocationActions;

import { FormInputConfig } from "types/formTypes";
import useLocationActions from "./useLocationActions";
import useMascotActions from "./useMascotActions";
import useAnimatorActions from "./useAnimatorActions";
import { mapSelectedData, mapSelectLocationData } from "utils/helperFunctions";

const useEventFormInputs = () => {
  const { data: locationData = [] } = useLocationActions();
  const { data: animatorData = [] } = useAnimatorActions();
  const { data: mascotData = [] } = useMascotActions();

  const formatedAniData =
    animatorData.length > 0 ? mapSelectedData(animatorData) : [];
  const formatedMasData =
    mascotData.length > 0 ? mapSelectedData(mascotData) : [];
  const formatedLocData =
    locationData.length > 0 ? mapSelectLocationData(locationData) : [];

  const eventFormInputs: FormInputConfig<any>[] = [
    {
      name: "date",
      label: "Datum događaja",
      type: "picker",
      sx: { mb: "2rem" },
    },
    {
      name: "time",
      label: "Vreme događaja",
      type: "picker",
      sx: { mb: "2rem" },
    },
    {
      name: "title",
      label: "Naziv događaja",
      type: "text",
      sx: { mb: "2rem" },
    },
    {
      name: "location",
      label: "Lokacija",
      type: "select",
      sx: { mb: "2rem" },
      options: formatedLocData,
    },
    {
      name: "customLocationAddress",
      label: "Adresa Lokacije",
      type: "text",
      sx: { mb: "2rem", display: `none` },
    },
    {
      name: "customLocationLink",
      label: "Google maps link Lokacije",
      type: "text",
      sx: { mb: "2rem", display: `none` },
    },
    {
      name: "mascots",
      label: "Maskote",
      type: "select",
      sx: { mb: "2rem" },
      options: formatedMasData,
    },
    {
      name: "animators",
      label: "Animatori",
      type: "select",
      sx: { mb: "2rem" },
      options: formatedAniData,
    },
    {
      name: "price",
      label: "Cena",
      type: "text",
      sx: { mb: "2rem" },
    },
    {
      name: "name",
      label: "Ime organizatora",
      type: "text",
      sx: { mb: "2rem" },
    },
    {
      name: "phone",
      label: "Telefon",
      type: "number",
      sx: { mb: "2rem" },
    },
    {
      name: "social",
      label: "Način dogovora",
      type: "select",
      sx: { mb: "2rem" },
      options: [
        { value: "facebook", label: "Facebook" },
        { value: "instagram", label: "Instagram" },
        { value: "viber", label: "Viber" },
        { value: "whatsapp", label: "Whats app" },
      ],
    },
  ];
  return eventFormInputs;
};

export default useEventFormInputs;

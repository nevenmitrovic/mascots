import {
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Divider,
  Card,
} from "@mui/material";
import LocationPinIcon from "@mui/icons-material/LocationPin";

import EventCardHeader from "./EventCardHeader";
import EventContentField from "./EventContentField";

import { Link } from "react-router";

import { type EventCardProps, type IEvent } from "types/eventTypes";

import useEventActions from "hooks/useEventActions";

import { formatPrice, getMonthYearDetails } from "utils/helperFunctions";

import dayjs from "dayjs";

const EventCard = ({ id }: EventCardProps) => {
  //getting event
  const { data, partialEditEvent } = useEventActions();
  const specificEvent: IEvent | undefined = data.find(
    (event) => event._id === id
  );

  if (!specificEvent) {
    return <Typography>There is no event to display</Typography>;
  }

  //format date
  const { date, time } = getMonthYearDetails(dayjs(specificEvent.date));
  //format price
  const price = formatPrice(specificEvent.price);

  return (
    <Card sx={{ minWidth: "350px" }}>
      <EventCardHeader title={specificEvent.title} id={specificEvent._id} />
      <Divider />
      <CardContent
        sx={{
          color: "var(--color-primary)",
          margin: 0,
          padding: "0 1rem",
        }}
      >
        <Box
          sx={{
            margin: "0.5rem 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
          component={"div"}
        >
          <EventContentField label="Datum" value={date} sx={{ width: "50%" }} />
          <Divider orientation="vertical" flexItem />
          <EventContentField
            label="Vreme"
            value={time}
            sx={{ width: "50%", marginLeft: "1rem" }}
          />
        </Box>
        <Divider />
        <Box
          sx={{
            margin: "0.5rem 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
          component={"div"}
        >
          <EventContentField
            label="Organizator"
            value={specificEvent.organizer.name}
            sx={{ width: "50%" }}
          />
          <EventContentField
            label="telefon"
            value={specificEvent.organizer.phone}
            sx={{ width: "50%", marginLeft: "1rem" }}
          />
        </Box>
        <Divider />
        <EventContentField
          label="Lokacija"
          value={
            <>
              {specificEvent.location.address}
              <Link
                to={specificEvent.location.link}
                target="_blank"
                style={{
                  color: "var(--color-secondary)",
                  fontWeight: "bold",
                }}
              >
                <LocationPinIcon />
              </Link>
            </>
          }
        />
        <Divider />
        <EventContentField
          label={specificEvent.animators.length > 1 ? "Animatori" : "Animator"}
          value={specificEvent.animators.map((a) => a.username).join(", ")}
        />
        <Divider />
        <EventContentField
          label={specificEvent.mascots.length > 1 ? "Maskote" : "Maskota"}
          value={specificEvent.mascots.map((a) => a.name).join(", ")}
        />
        <Divider />
        <EventContentField label="cena" value={price} />
        <Divider />
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginRight: "1rem",
        }}
      >
        <Button
          size="small"
          variant="outlined"
          sx={{ color: "var(--color-primary)", margin: "0.5rem" }}
          disabled={specificEvent.confirmed !== "pending"}
          onClick={() => partialEditEvent({ data: "confirmed", id })}
        >
          Potvrdi
        </Button>
        <Button
          size="small"
          variant="outlined"
          sx={{ color: "var(--color-primary)" }}
          disabled={specificEvent.confirmed !== "pending"}
          onClick={() => partialEditEvent({ data: "rejected", id })}
        >
          Otkaži
        </Button>
        <Button
          size="small"
          variant="outlined"
          sx={{ color: "var(--color-primary)" }}
          disabled={specificEvent.collector.length > 0}
          onClick={() =>
            partialEditEvent({ data: ["6814b85276bf4fd4d785d8ef"], id })
          }
        >
          Prikupio novac
        </Button>
      </CardActions>
    </Card>
  );
};

export default EventCard;

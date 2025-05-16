import { useContext, useEffect } from "react";
import { Link } from "react-router";
import {
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";

import { type EventCardProps, type IEvent } from "types/eventTypes";

import { EventCardDialogContext } from "../../contexts/EventCardDialogContext";
import useEventActions from "hooks/useEventActions";

const EventCard = ({ id }: EventCardProps) => {
  // mock data
  const { data } = useEventActions();
  const specificEvent: IEvent | undefined = data.find(
    (event) => event._id === id
  );
  console.log(specificEvent?.mascots)
    console.log(typeof specificEvent?.mascots)

  if (!specificEvent) {
    return <Typography>There is no event to display</Typography>;
  }
  return (
    <>
      <CardContent
        sx={{
          padding: "1rem",
          backgroundColor: "var(--color-accent)",
          color: "var(--color-primary)",
        }}
      >
        <Typography gutterBottom sx={{ fontSize: 24, fontWeight: "bold" }}>
          {specificEvent.title}
        </Typography>
        <Box sx={{ mb: 1 }} component={"div"}>
          <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
            Datum i vreme:
          </Typography>
          <Typography sx={{ fontSize: 18 }}>
            {Intl.DateTimeFormat("sr-RS", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }).format(new Date(specificEvent.date))}
          </Typography>
          <Typography sx={{ fontSize: 18 }}>{specificEvent.time}</Typography>
        </Box>
        <Box sx={{ mb: 1 }} component={"div"}>
          <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
            Lokacija:
          </Typography>
          <Typography sx={{ fontSize: 18 }}>
            {specificEvent.location.address}
          </Typography>
          <Link
            to={specificEvent.location.link}
            target="_blank"
            style={{
              textDecoration: "none",
              color: "var(--color-secondary)",
              fontWeight: "bold",
            }}
          >
            Google Maps Link
          </Link>
        </Box>
        <Box sx={{ mb: 1 }} component={"div"}>
          <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
            Maskote:
          </Typography>
          {specificEvent.mascots.map((mascot) => {
            console.log(mascot);
            return (
              <Typography key={mascot.name} sx={{ fontSize: 18 }}>
                {mascot}
              </Typography>
            );
          })}
        </Box>
        <Box sx={{ mb: 1 }} component={"div"}>
          <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
            Animatori:
          </Typography>
          {specificEvent.animators.map((animator) => (
            <Typography key={animator} sx={{ fontSize: 18 }}>
              {animator}
            </Typography>
          ))}
        </Box>
        <Box sx={{ mb: 1 }} component={"div"}>
          <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
            Cena:
          </Typography>
          <Typography sx={{ fontSize: 18 }}>
            {Intl.NumberFormat("sr-RS", {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: 0,
            }).format(Number(specificEvent.price))}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" sx={{ color: "var(--color-primary)" }}>
          Potvrdi
        </Button>
        <Button size="small" sx={{ color: "var(--color-primary)" }}>
          Otkazi
        </Button>
        <Button size="small" sx={{ color: "var(--color-primary)" }}>
          Prikupio novac
        </Button>
      </CardActions>
    </>
  );
};

export default EventCard;

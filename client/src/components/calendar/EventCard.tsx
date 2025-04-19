import { useContext } from "react";
import { Link } from "react-router";
import {
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";

import { IEvent } from "../../types/eventTypes";
import { EventCardProps } from "../../types/eventTypes";

import { EventCardDialogContext } from "../../contexts/EventCardDialogContext";

const EventCard = ({ id }: EventCardProps) => {
  const { toggleEventCardTuple } = useContext(EventCardDialogContext);

  if (!id) toggleEventCardTuple(null);

  // mock data
  const event: IEvent = {
    _id: "652f3c8e9f1b2a001c8e4d1a",
    title: "Birthday Party - Marko",
    date: "2025-04-10",
    time: "17:30",
    location: [
      {
        address: "Hotel Slavija",
        location: "https://maps.app.goo.gl/crzt24379aAXrSAc6",
      },
    ],
    maskotas: ["Mickey Mouse", "SpongeBob"],
    animators: ["Ana", "Milan"],
    price: "150",
    confirmed: "y",
    collector: "Milan",
  };

  return (
    <>
      <CardContent
        sx={{ padding: "1rem", backgroundColor: "--color-background" }}
      >
        <Typography gutterBottom sx={{ fontSize: 24 }}>
          {event.title}
        </Typography>
        <Box sx={{ mb: 2 }} component={"div"}>
          <Typography sx={{ fontSize: 20, mb: 1 }}>Datum:</Typography>
          <Typography sx={{ fontSize: 18 }}>
            {Intl.DateTimeFormat("sr-RS", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }).format(new Date(event.date))}
          </Typography>
          <Typography sx={{ fontSize: 16 }}>{event.time}</Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: 20, mb: 1 }}>Lokacija:</Typography>
          <Typography sx={{ fontSize: 18 }}>
            {event.location[0].address}
          </Typography>
          <Link
            to={event.location[0].location}
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            Google Maps Link
          </Link>
        </Box>

        {/* TODO */}
        <Typography sx={{ fontSize: 16 }}>
          {event.maskotas[0]}
          {event.maskotas[1]}
        </Typography>
        <Typography sx={{ fontSize: 16 }}>
          {event.animators[0]}
          {event.animators[1]}
        </Typography>
        <Typography sx={{ fontSize: 16 }}>{event.price}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Potvrdi</Button>
        <Button size="small">Otkazi</Button>
        <Button size="small">Prikupio novac</Button>
      </CardActions>
    </>
  );
};

export default EventCard;

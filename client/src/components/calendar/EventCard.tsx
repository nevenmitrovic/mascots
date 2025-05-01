import { useContext, useEffect } from "react";
import { Link } from "react-router";
import {
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";

import {type EventCardProps, type IEvent } from "types/eventTypes";

import { EventCardDialogContext } from "../../contexts/EventCardDialogContext";

const EventCard = ({ id }: EventCardProps) => {
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
        sx={{
          padding: "1rem",
          backgroundColor: "var(--color-accent)",
          color: "var(--color-primary)",
        }}
      >
        <Typography gutterBottom sx={{ fontSize: 24, fontWeight: "bold" }}>
          {event.title}
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
            }).format(new Date(event.date))}
          </Typography>
          <Typography sx={{ fontSize: 18 }}>{event.time}</Typography>
        </Box>
        <Box sx={{ mb: 1 }} component={"div"}>
          <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
            Lokacija:
          </Typography>
          <Typography sx={{ fontSize: 18 }}>
            {event.location[0].address}
          </Typography>
          <Link
            to={event.location[0].location}
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
          {event.maskotas.map((macota) => (
            <Typography key={macota} sx={{ fontSize: 18 }}>
              {macota}
            </Typography>
          ))}
        </Box>
        <Box sx={{ mb: 1 }} component={"div"}>
          <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
            Animatori:
          </Typography>
          {event.animators.map((animator) => (
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
            }).format(Number(event.price))}
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

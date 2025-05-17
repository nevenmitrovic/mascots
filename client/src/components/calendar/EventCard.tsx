import {
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Divider,
  Card,
  CardHeader,
  IconButton,
  Menu,
  type MenuProps,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { Link } from "react-router";

import { type EventCardProps, type IEvent } from "types/eventTypes";

import useEventActions from "hooks/useEventActions";
import { getMonthYearDetails } from "utils/helperFunctions";
import dayjs from "dayjs";
import { useToggle } from "hooks/global/useToggle";
import { useState } from "react";

const ActionMenu = (props: MenuProps) => {
  return (
    <Menu
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  );
};

const EventCard = ({ id }: EventCardProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>();
  const [value, toggle] = useToggle(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    toggle();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    toggle()
    setAnchorEl(null);
  };

  // mock data
  const { data } = useEventActions();
  const specificEvent: IEvent | undefined = data.find(
    (event) => event._id === id
  );
  const { date, time } = getMonthYearDetails(dayjs(specificEvent?.date));
  if (!specificEvent) {
    return <Typography>There is no event to display</Typography>;
  }
  return (
    <Card>
      <CardHeader
        title={
          <Typography gutterBottom sx={{ fontSize: 24, fontWeight: "bold" }}>
            {specificEvent.title}
          </Typography>
        }
        action={
          <IconButton
            id="demo-customized-button"
            aria-controls={value ? "demo-customized-menu" : undefined}
            aria-expanded={value ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
        }
      />
      <ActionMenu
        id="demo-customized-menu"
        anchorEl={anchorEl}
        open={value}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disableRipple>
          <IconButton>
            <EditIcon color="primary" /> Promeni
          </IconButton>
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <IconButton>
            <DeleteIcon color="error" /> Obrisi
          </IconButton>
        </MenuItem>
      </ActionMenu>
      <Divider />
      <CardContent
        sx={{
          padding: "1rem",
          color: "var(--color-primary)",
        }}
      >
        <Box
          sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}
          component={"div"}
        >
          <Typography sx={{ fontSize: 20, fontWeight: "500" }}>
            Datum: {date}
          </Typography>
          <Typography sx={{ fontSize: 20 }}>Vreme: {time}</Typography>
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
              color: "var(--color-secondary)",
              fontWeight: "bold",
            }}
          >
            Otvori na mapi
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
                {mascot.name}
              </Typography>
            );
          })}
        </Box>
        <Box sx={{ mb: 1 }} component={"div"}>
          <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
            Animatori:
          </Typography>
          {specificEvent.animators.map((animator) => (
            <Typography key={animator.username} sx={{ fontSize: 18 }}>
              {animator.username}
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
    </Card>
  );
};

export default EventCard;

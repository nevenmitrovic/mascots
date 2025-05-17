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
import LocationPinIcon from "@mui/icons-material/LocationPin";

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
    toggle();
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
    <Card sx={{ width: "400px" }}>
      <CardHeader
      sx={{margin:"0", paddingBottom:"0.5rem"}}
        title={
          <Typography gutterBottom sx={{ fontSize: 24, fontWeight: "bold" }}>
            {specificEvent.title}
          </Typography>
        }
        action={
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        }
      />
      <ActionMenu
        anchorEl={anchorEl}
        open={value}
        onClose={handleClose}
        sx={{ display: "flex" }}
      >
        <MenuItem onClick={handleClose} sx={{ padding: 0, margin: 0 }}>
          <IconButton>
            <EditIcon color="primary" />
          </IconButton>
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ padding: 0, margin: 0 }}>
          <IconButton>
            <DeleteIcon color="error" />
          </IconButton>
        </MenuItem>
      </ActionMenu>
      <Divider />
      <CardContent
        sx={{
          color: "var(--color-primary)",
          margin: 0,
          padding:'0.5rem 1rem'
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
          <Box sx={{ width: "50%" }}>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              Datum:
            </Typography>
            <Typography
              variant="h5"
              component="div"
              sx={{ fontSize: 20, fontWeight: "500" }}
            >
              {date}
            </Typography>
          </Box>

          <Divider orientation="vertical" flexItem />
          <Box sx={{ width: "50%", marginLeft: "1rem" }}>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              Vreme:
            </Typography>
            <Typography
              variant="h5"
              component="div"
              sx={{ fontSize: 20, fontWeight: "500" }}
            >
              {time}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ margin: "0.5rem 0" }}>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            Lokacija:
          </Typography>
          <Typography
            variant="h5"
            component="div"
            sx={{ fontSize: 20, fontWeight: "500" }}
          >
            {specificEvent.location.address}{" "}
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
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ margin: "0.5rem 0" }}>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            Maskote:
          </Typography>
          {specificEvent.mascots.map((mascot) => {
            return (
              <Box sx={{ display: "flex" }}>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontSize: 20,
                    fontWeight: "500",
                    marginRight: "0.5rem",
                  }}
                >
                  {mascot.name}
                </Typography>{" "}
                <Divider orientation="vertical" flexItem />
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ fontSize: 20, fontWeight: "500", marginLeft: "0.5rem" }}
                >
                  {mascot.name}
                </Typography>
              </Box>
            );
          })}
        </Box>
        <Divider />
        <Box sx={{ margin: "0.5rem 0" }}>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            Animatori:
          </Typography>
          {specificEvent.animators.map((animator) => {
            return (
              <Box sx={{ display: "flex" }}>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontSize: 20,
                    fontWeight: "500",
                    marginRight: "0.5rem",
                  }}
                >
                  {animator.username}
                </Typography>
                <Divider orientation="vertical" flexItem />
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ fontSize: 20, fontWeight: "500", marginLeft: "0.5rem" }}
                >
                  {animator.username}
                </Typography>
              </Box>
            );
          })}
        </Box>
        <Divider />
        <Box sx={{ margin: "0.5rem 0" }}>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
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
        <Divider />
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-around" }}>
        <Button
          size="small"
          variant="outlined"
          sx={{ color: "var(--color-primary)", margin: "0.5rem" }}
          disabled={specificEvent.confirmed !== "pending"}
        >
          Potvrdi
        </Button>
        <Button
          size="small"
          variant="outlined"
          sx={{ color: "var(--color-primary)" }}
          disabled={specificEvent.confirmed !== "pending"}
        >
          Otkaži
        </Button>
        <Button
          size="small"
          variant="outlined"
          sx={{ color: "var(--color-primary)" }}
          disabled={specificEvent.collector.length > 0}
        >
          Prikupio novac
        </Button>
      </CardActions>
    </Card>
  );
};

export default EventCard;

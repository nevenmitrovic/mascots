import {
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useToggle } from "hooks/global/useToggle";
import { useContext, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useItemToDelete from "hooks/global/useItemToDelete";
import useEventActions from "hooks/useEventActions";
import DeleteConfirmationDialog from "components/global/DeleteConfirmationDialog";
import { EventCardDialogContext } from "contexts/EventCardDialogContext";
import { CalendarFormDialogContext } from "contexts/CalendarFormDialogContext";
import { FormDataContext } from "contexts/FormDataContext";
import { eventFormInputs, IEvent } from "types/eventTypes";
import useMascotActions from "hooks/useMascotActions";
import { formatDataForEdit } from "utils/helperFunctions";
import useItemToEdit from "hooks/global/useItemToEdit";

const EventCardHeader = ({ title, id }: { title: string; id: string }) => {
  //admin action menu select
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>();
  const [value, toggle] = useToggle(false);
  //setting up an element from which select menu will appear and open the same
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    toggle();
    setAnchorEl(event.currentTarget);
  };
  //closing and removing the anchor element from state
  const handleClose = () => {
    toggle();
    setAnchorEl(null);
  };
  const { data, deleteEvent } = useEventActions();

  //closing eventCard from from header
  const { open, toggleDialog } = useContext(CalendarFormDialogContext);
  const { toggleEventCardTuple } = useContext(EventCardDialogContext);
  const { setFormData } = useContext(FormDataContext);

  const specificEvent: IEvent | undefined = data.find(
    (event) => event._id === id
  );
  if (!specificEvent) {
    return;
  }
  const handleEditEvent = () => {
    // const { data: mascotData = [] } = useMascotActions();
    // const mascotsUsed = mascotData.filter(
    //   (mascot) => mascot.name === specificEvent?.mascots.name
    // );
    const eventForEdit = formatDataForEdit(specificEvent);
    setFormData(eventForEdit);
    toggleDialog();
  };

  //implementing delete dialog hook
  const { deleteId, setDelete, deleteDialog, handleDeleteDialogClose } =
    useItemToDelete();
  //confirm delete and close all the dialogs
  const handleConfirmDelete = () => {
    deleteEvent(deleteId);
    handleDeleteDialogClose();
    handleClose();
    toggleEventCardTuple(null);
  };
  return (
    <>
      <CardHeader
        sx={{ margin: "0", paddingBottom: "0.5rem" }}
        title={
          <Typography
            gutterBottom
            sx={{
              fontSize: 24,
              textTransform: "capitalize",
              fontWeight: "bold",
            }}
          >
            {title}
          </Typography>
        }
        action={
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        }
      />
      <Menu
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorEl={anchorEl}
        open={value}
        onClose={handleClose}
        sx={{ display: "flex" }}
      >
        <MenuItem onClick={handleEditEvent} sx={{ padding: 0, margin: 0 }}>
          <IconButton>
            <EditIcon color="primary" />
          </IconButton>
        </MenuItem>
        <MenuItem onClick={() => setDelete(id)} sx={{ padding: 0, margin: 0 }}>
          <IconButton>
            <DeleteIcon color="error" />
          </IconButton>
        </MenuItem>
      </Menu>
      <DeleteConfirmationDialog
        message="Da li ste sigurni da želite da obrišete ovaj event?"
        open={deleteDialog}
        onClose={handleDeleteDialogClose}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default EventCardHeader;

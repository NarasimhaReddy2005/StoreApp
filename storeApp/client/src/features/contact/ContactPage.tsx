import { Button, ButtonGroup, Typography } from "@mui/material";
import { decrement, increment } from "./counterReducer";
import { useAppDispatch, useAppSelector } from "../../app/store/store";

export default function ContactPage() {
  const {data} = useAppSelector(state => state.counter);
  const dispatch = useAppDispatch();
  return (
    <>
      <Typography variant="h2">Content page</Typography>
      <Typography variant="body1">The data is: {data}</Typography>
      <ButtonGroup>
        <Button onClick={() => dispatch(increment(1))} color="secondary">
          Increment
        </Button>
        <Button onClick={() => dispatch(decrement(1))} color="warning">
          Decrement
        </Button>
      </ButtonGroup>
    </>
  );
}

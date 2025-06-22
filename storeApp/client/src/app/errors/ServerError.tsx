import { Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const ServerError = () => {
  const { state } = useLocation();

  return (
    <Paper>
      {state.error ? (
        <>
          <Typography
            gutterBottom
            variant="h3"
            sx={{ pl: 4, pr: 4, pt: 4 }}
            color="secondary"
          >
            {state.error.title}
          </Typography>

          <Divider sx={{ mx: 4, mb: 2 }} />

          <Typography variant="body1" sx={{ px: 4, pb: 4 }}>
            {state.error.detail}
          </Typography>
        </>
      ) : (
        <Typography variant="h5" gutterBottom>
          Server error
        </Typography>
      )}
    </Paper>
  );
};

export default ServerError;

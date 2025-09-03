import { Box, Pagination, Typography } from "@mui/material";
import type { Pagination as PaginationType } from "../../Models/pagination";
import { styled } from "@mui/material/styles";

const CustomPagination = styled(Pagination)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";

  // Define your custom accent color once
  const accent = "#8cff00ff";
  const accentHover = "#70c000ff";

  return {
    "& .MuiPaginationItem-root": {
      color: isDark ? accent : theme.palette.text.primary,
      borderColor: isDark ? accent : theme.palette.divider,
      transition: "all 0.2s ease-in-out",

      "&.Mui-selected": {
        backgroundColor: isDark ? accent : theme.palette.primary.main,
        color: isDark ? theme.palette.common.black : theme.palette.common.white,
        fontWeight: 600,
      },

      "&:hover": {
        backgroundColor: isDark ? accentHover : theme.palette.primary.light,
        color: isDark ? theme.palette.common.black : theme.palette.common.white,
      },
    },
  };
});

type Props = {
  metadata: PaginationType;
  onPageChange: (page: number) => void;
};

export default function AppPagination({ metadata, onPageChange }: Props) {
  const { currentPage, totalPages, pageSize, totalCount } = metadata;
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalCount);
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      marginTop={3}
    >
      <Typography>
        Displaying {startItem} - {endItem} of {totalCount} items
      </Typography>
      <CustomPagination
        size="large"
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
        variant="outlined"
        shape="rounded"
      />
    </Box>
  );
}

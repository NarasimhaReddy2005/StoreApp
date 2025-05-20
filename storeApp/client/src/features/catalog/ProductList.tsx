import { Box } from "@mui/material";
import type { Product } from "../../app/Models/product";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
};
export default function ProductList({ products }: Props) {
  return (
    <Box // a div like tag used by mui
      sx={{
        display: "flex",
        flexWrap: "wrap", // If didn't fit into single row just keep them down
        gap: 3, // 3*8px = 24px
        justifyContent: "center",
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Box>
  );
}

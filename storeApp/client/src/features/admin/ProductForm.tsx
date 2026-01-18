import { useForm, type FieldValues } from "react-hook-form";
import {
  createProductSchema,
  type CreateProductSchema,
} from "../../lib/schemas/createProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import AppTextInput from "../../app/shared/components/AppTextInput";
import { useFetchFiltersQuery } from "../catalog/catalogAPI";
import AppSelectInput from "../../app/shared/components/AppSelectInput";
import AppDropzone from "../../app/shared/components/AppDropzone";
import type { Product } from "../../app/Models/product";
import { useEffect } from "react";
import { useCreateProductMutation, useUpdateProductMutation } from "./adminApi";
import { handleApiError } from "../../lib/util";

export type FileWithPreview = File & {
  preview: string;
};
type Props = {
  refetch: () => void;
  setEditMode: (value: boolean) => void;
  product: Product | null;
  setSelectedProduct: (value: Product | null) => void;
};
export const ProductForm = ({
  setEditMode,
  product,
  refetch,
  setSelectedProduct,
}: Props) => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { isSubmitting },
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(createProductSchema),
  });
  const watchFile = watch("file");
  const { data } = useFetchFiltersQuery();
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  useEffect(() => {
    if (product) reset(product);

    return () => {
      if (watchFile)
        URL.revokeObjectURL((watchFile as FileWithPreview).preview);
    };
  }, [product, reset, watchFile]);

  const createFormData = (items: FieldValues) => {
    const formData = new FormData();
    for (const key in items) {
      formData.append(key, items[key]);
    }
    return formData;
  };

  const onSubmit = async (data: CreateProductSchema) => {
    try {
      const formData = createFormData(data);

      if (watchFile) formData.append("file", watchFile);

      if (product)
        await updateProduct({ id: product.id, data: formData }).unwrap();
      else await createProduct(formData).unwrap();
      setEditMode(false);
      setSelectedProduct(null);
      refetch();
    } catch (error) {
      console.log(error);
      handleApiError<CreateProductSchema>(error, setError, [
        "brand",
        "description",
        "file",
        "name",
        "pictureUrl",
        "price",
        "quantityInStock",
        "type",
      ]);
    }
  };
  return (
    <Box component={Paper} sx={{ p: 4, maxWidth: "lg", mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Product details
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid size={12}>
            <AppTextInput control={control} name="name" label="product name" />
          </Grid>
          <Grid size={6}>
            {data?.brands && (
              <AppSelectInput
                control={control}
                name="brand"
                label="Brand"
                items={data.brands}
              />
            )}
          </Grid>
          <Grid size={6}>
            {data?.types && (
              <AppSelectInput
                control={control}
                name="type"
                label="Type"
                items={data.types}
              />
            )}
          </Grid>
          <Grid size={6}>
            <AppTextInput
              type="number"
              control={control}
              name="price"
              label="Price in cents"
            />
          </Grid>
          <Grid size={6}>
            <AppTextInput
              type="number"
              control={control}
              name="quantityInStock"
              label="Quantity in Stock "
            />
          </Grid>
          <Grid size={12}>
            <AppTextInput
              control={control}
              multiline
              rows={4}
              name="description"
              label="Description"
            />
          </Grid>
          <Grid
            size={12}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <AppDropzone name="file" control={control} />
            {watchFile && watchFile ? (
              <img
                src={(watchFile as FileWithPreview).preview}
                alt="preview of image"
                style={{ maxHeight: 200 }}
              />
            ) : (
              <img
                src={product?.pictureUrl}
                alt="preview of image"
                style={{ maxHeight: 200 }}
              />
            )}
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
          <Button
            onClick={() => setEditMode(false)}
            variant="contained"
            color="inherit"
          >
            Cancel
          </Button>
          <Button
            loading={isSubmitting}
            variant="contained"
            color="success"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

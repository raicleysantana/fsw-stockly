import { z } from "zod";

export const upsertProductSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1, {
    message: "Nome do produto é obrigatório",
  }),
  price: z.number({ message: "O preço do produto é obrigatório." }).min(0.01, {
    message: "O preço do produto é obrigatório.",
  }),
  stock: z.coerce
    .number()
    .int()
    .min(0, { message: "A quantidade em estoque é obrigatória." }),
});

export type UpsertProductSchema = z.infer<typeof upsertProductSchema>;

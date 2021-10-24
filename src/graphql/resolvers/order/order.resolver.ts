import { ItemModel } from "../../../domain/Item/Item";
import { Item } from "../../../generated/graphql";
import {
  getFromProductImageUrlMap,
  isInProductImageUrlMap,
  scrapeProductUrl,
  setToProductImageUrlMap,
} from "../../../utils";

export default {
  Query: {
    GetCurrentOrder: () => {},
  },
  Mutation: {
    AddOrderItem: async (_: any, { name, productUrl }: Item) => {
      const hasImageInMemory = isInProductImageUrlMap(productUrl);

      let productImageUrl: string;

      if (hasImageInMemory) {
        productImageUrl = getFromProductImageUrlMap(productUrl);

        const doc = await ItemModel.create({
          name,
          productUrl,
          productImageUrl,
        });
        return doc;
      } else {
        const image = await scrapeProductUrl(productUrl);
        if (image) {
          productImageUrl = image;

          const doc = await ItemModel.create({
            name,
            productUrl,
            productImageUrl,
          });

          setToProductImageUrlMap(productUrl, productImageUrl);

          return doc;
        }
      }
    },
  },
};

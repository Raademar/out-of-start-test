import { scrapeProductUrl } from "../../../utils";

export default {
  Query: {
    GetItem: () => {},
  },
  Mutation: {
    AddItem: async (_: any, { productUrl }: { productUrl: string }) => {
      const productImageUrl = await scrapeProductUrl(productUrl);
      console.log(productImageUrl);
      return true;
    },
  },
};

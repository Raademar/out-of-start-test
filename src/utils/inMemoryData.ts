import { ItemModel } from "../domain/Item/Item";

type ProductImageUrlItem = {
  productUrl: string;
  productImageUrl: string;
};

const productImageUrlMap = new Map<string, string>();

export function isInProductImageUrlMap(productUrl: string) {
  return productImageUrlMap.has(productUrl);
}

export function getFromProductImageUrlMap(productUrl: string) {
  return productImageUrlMap.get(productUrl) as string;
}

export function setToProductImageUrlMap(
  productUrl: string,
  productImageUrl: string
) {
  productImageUrlMap.set(productUrl, productImageUrl);
}

export function getLengthOfProductImageUrlMap() {
  return productImageUrlMap.size;
}

function initProductImageUrlMemory(itemsToInit: ProductImageUrlItem[]) {
  itemsToInit.forEach((productImageUrlItem) => {
    const { productUrl, productImageUrl } = productImageUrlItem;

    setToProductImageUrlMap(productUrl, productImageUrl);
  });
}

export async function fetchAndRunInitOfProductImageUrlMemory() {
  const productItems = await ItemModel.find({
    productImageUrl: { $exists: true },
  });
  const productUrlAndImageUrl = productItems.map((productItem) => {
    const { productUrl, productImageUrl } = productItem as ProductImageUrlItem;
    return { productUrl, productImageUrl };
  });
  initProductImageUrlMemory(productUrlAndImageUrl);
}

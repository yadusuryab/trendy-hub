import { client } from "@/sanityClient";

// Fetch all products (shoes)


export async function getShoesPaginated(
  page: number,
  limit: number,
  categorySlug?: string
): Promise<any[]> {
  const start = (page - 1) * limit;
  const end = page * limit;

  const fields = `
    _id,
    name,
    category->{name, slug},
    material,
    waterResistance,
    movementType,
    caseSize,
    images[]{asset->{url}},
    price,
    offerPrice,
    description,
    soldOut
  `;

  const base = categorySlug
    ? `*[_type == "product" && defined(category) && category->slug.current == $slug]`
    : `*[_type == "product"]`;

  const query = `${base} | order(_createdAt desc) [${start}...${end}] {${fields}}`;

  try {
    const products = await client.fetch(query, { slug: categorySlug });
    return Array.isArray(products) ? products : [];
  } catch (e) {
    console.error("Sanity fetch failed:", e);
    return [];
  }
}



// Fetch a single product (shoe) by ID
export const getShoeById = async (id: string): Promise<any | undefined> => {
  const query = `*[_type == "product" && _id == $id] {
    _id,
    name,
    category -> {
      name,
      slug
    },
    material,
    waterResistance,
    movementType,
    caseSize,
    images[] {
      asset -> {
        url
      }
    },
    price,
    offerPrice,
    description,
    soldOut // Add soldOut field
  }`;

  try {
    const product = await client.fetch(query, { id });
    if (product.length === 0) {
      console.warn(`No product found for ID: ${id}`);
      return undefined;
    }
    return product[0];
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return undefined;
  }
};

// Search for products (shoes) by keyword
export const searchShoes = async (keyword: string): Promise<any[] | undefined> => {
  const query = `*[_type == "product" && (
    name match $keyword || 
    material match $keyword || 
    waterResistance match $keyword || 
    movementType match $keyword
  )] {
    _id,
    name,
    category -> {
      name,
      slug
    },
    material,
    waterResistance,
    movementType,
    caseSize,
    images[] {
      asset -> {
        url
      }
    },
    price,
    offerPrice,
    description,
    soldOut // Add soldOut field
  }`;

  try {
    const products = await client.fetch(query, { keyword: `*${keyword}*` });
    return products;
  } catch (error) {
    console.error("Error searching products:", error);
    return undefined;
  }
};

// Add a product (shoe) to the cart
export const addToCart = (product: any) => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  if (!cart.some((item: any) => item._id === product._id)) {
    const updatedCart = [...cart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }
};

// Fetch all categories
export const getAllCategories = async (): Promise<any[] | undefined> => {
  const query = `*[_type == "category"] {
    _id,
    name,
    slug
  }`;

  try {
    const categories = await client.fetch(query);
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return undefined;
  }
};

// Fetch products by category slug
export const getProductsByCategory = async (categorySlug: string): Promise<any[] | undefined> => {
  const query = `*[_type == "product" && category->slug.current == $categorySlug] {
    _id,
    name,
    category -> {
      name,
      slug
    },
    material,
    waterResistance,
    movementType,
    caseSize,
    images[] {
      asset -> {
        url
      }
    },
    price,
    offerPrice,
    description,
    soldOut // Add soldOut field
  }`;

  try {
    const products = await client.fetch(query, { categorySlug });
    return products;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return undefined;
  }
};
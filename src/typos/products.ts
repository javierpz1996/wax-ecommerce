export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageSrc: string;
  badge?: string;
};

export type ProductSection = {
  id: string;
  title: string;
  description?: string;
  products: Product[];
};

export const productSections: ProductSection[] = [
  {
    id: "novedades",
    title: "Novedades",
    description: "Lo último que llegó (demo).",
    products: [
      {
        id: "p-1",
        name: "Jeeter Juice 0.5G",
        description: "Cartucho desechable con extracto de alta potencia.",
        price: 1000.00,
        imageSrc: "/images/producto1.jpg",
        badge: "Nuevo",
      },
      {
        id: "p-2",
        name: "Jeeter Juice 0.5G",
        description: "Sabor intenso y tiradas suaves para uso diario.",
        price: 1000.00,
        imageSrc: "/images/producto1.jpg",
      },
      {
        id: "p-3",
        name: "Jeeter Juice 0.5G",
        description: "Versión clásica, ideal para quienes recién empiezan.",
        price: 1000.00,
        imageSrc: "/images/producto1.jpg",
      },
      {
        id: "p-4",
        name: "Jeeter Juice 0.5G",
        description: "Edición destacada con mejor rendimiento de batería.",
        price: 1000.00,
        imageSrc: "/images/producto1.jpg",
        badge: "Top",
      },
      {
        id: "p-5",
        name: "Jeeter Juice 0.5G",
        description: "Opción equilibrada entre precio y calidad.",
        price: 1000.00,
        imageSrc: "/images/producto1.jpg",
      },
    ],
  },
  {
    id: "destacados",
    title: "Destacados",
    description: "Selección rápida de productos recomendados.",
    products: [
      {
        id: "p-6",
        name: "Jeeter Juice 0.5G",
        description: "Presentación especial con stock limitado.",
        price: 1000.00,
        imageSrc: "/images/producto2.png",
        badge: "Oferta",
      },
      {
        id: "p-7",
        name: "Jeeter Juice 0.5G",
        description: "Combo ideal para compartir entre amigos.",
        price: 1000.00,
        imageSrc: "/images/producto2.png",
      },
      {
        id: "p-8",
        name: "Jeeter Juice 0.5G",
        description: "Perfil de sabor más suave y aromático.",
        price: 1000.00,
        imageSrc: "/images/producto2.png",
      },
      {
        id: "p-9",
        name: "Jeeter Juice 0.5G",
        description: "Formato práctico para llevar a cualquier lado.",
        price: 1000.00,
        imageSrc: "/images/producto2.png",
      },
    ],
  },
];



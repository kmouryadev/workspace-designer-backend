export type CatalogSeedItem = {
  id: string;
  category: string;
  name: string;
  spec: string;
  priceK: number;
  maxQuantity: number;
};

export const CATALOG_SEED: CatalogSeedItem[] = [
  // Desks
  { id: "desk-std", category: "desk", name: "Standing Desk Pro", spec: "Height adjustable, 120 x 70 cm", priceK: 450, maxQuantity: 1 },
  { id: "desk-classic", category: "desk", name: "Classic Desk", spec: "Simple and sturdy, 140 x 70 cm", priceK: 300, maxQuantity: 1 },
  { id: "desk-corner", category: "desk", name: "L-Shaped Desk", spec: "Space-efficient, 120 x 120 cm", priceK: 500, maxQuantity: 1 },
  { id: "desk-budget", category: "desk", name: "Budget Desk", spec: "Simple, 100 x 60 cm", priceK: 220, maxQuantity: 1 },
  { id: "desk-glass", category: "desk", name: "Glass Top Desk", spec: "Modern, 130 x 70 cm", priceK: 480, maxQuantity: 1 },
  { id: "desk-exec", category: "desk", name: "Executive Desk", spec: "Premium, 150 x 75 cm", priceK: 550, maxQuantity: 1 },

  // Chairs
  { id: "chair-ergo", category: "chair", name: "Ergonomic Chair", spec: "Breathable mesh, adjustable", priceK: 350, maxQuantity: 1 },
  { id: "chair-exec", category: "chair", name: "Executive Chair", spec: "Premium comfort, leather", priceK: 400, maxQuantity: 1 },
  { id: "chair-task", category: "chair", name: "Task Chair", spec: "Lightweight, armless", priceK: 220, maxQuantity: 1 },
  { id: "chair-mesh", category: "chair", name: "Mesh Chair", spec: "Breathable, budget-friendly", priceK: 180, maxQuantity: 1 },
  { id: "chair-gaming", category: "chair", name: "Gaming Chair", spec: "High back, extra padding", priceK: 380, maxQuantity: 1 },
  { id: "chair-stool", category: "chair", name: "Standing Stool", spec: "Perches, for standing desks", priceK: 150, maxQuantity: 1 },

  // Monitors
  { id: "m27", category: "monitor", name: "27\" 4K Monitor", spec: "Up to 3 on one desk", priceK: 300, maxQuantity: 3 },
  { id: "m29", category: "monitor", name: "29\" UWQHD Monitor", spec: "Up to 3 on one desk", priceK: 350, maxQuantity: 3 },
  { id: "m24", category: "monitor", name: "24\" Full HD", spec: "Up to 3 on one desk", priceK: 200, maxQuantity: 3 },
  { id: "m22", category: "monitor", name: "22\" HD Monitor", spec: "Up to 3 on one desk", priceK: 150, maxQuantity: 3 },
  { id: "m20", category: "monitor", name: "20\" HD Monitor", spec: "Up to 3 on one desk", priceK: 120, maxQuantity: 3 },
  { id: "mw", category: "monitor", name: "Ultrawide 34\"", spec: "Takes the whole desk", priceK: 450, maxQuantity: 1 },

  // Lighting
  { id: "l-desk", category: "lighting", name: "Desk Lamp", spec: "Arm lamp, warm LED", priceK: 100, maxQuantity: 1 },
  { id: "l-led", category: "lighting", name: "LED Light Bar", spec: "Mounted above the monitors", priceK: 120, maxQuantity: 1 },
  { id: "l-floor", category: "lighting", name: "Floor Lamp", spec: "Stands left of the desk", priceK: 150, maxQuantity: 1 },
  { id: "l-pendant", category: "lighting", name: "Pendant Light", spec: "Hangs from the ceiling", priceK: 130, maxQuantity: 1 },
  { id: "l-ring", category: "lighting", name: "Ring Light", spec: "Stands beside the desk", priceK: 90, maxQuantity: 1 },
  { id: "l-wall", category: "lighting", name: "Wall Sconce", spec: "Mounts to the wall", priceK: 110, maxQuantity: 1 },

  // Plants
  { id: "p-small", category: "plant", name: "Small Plant", spec: "Sits on the desk", priceK: 60, maxQuantity: 1 },
  { id: "p-large", category: "plant", name: "Large Plant", spec: "Stands right of the desk", priceK: 100, maxQuantity: 1 },
  { id: "p-hang", category: "plant", name: "Hanging Plant", spec: "Hangs from the wall", priceK: 80, maxQuantity: 1 },
  { id: "p-succulent", category: "plant", name: "Succulent Trio", spec: "Sits on a shelf", priceK: 45, maxQuantity: 1 },
  { id: "p-cactus", category: "plant", name: "Cactus", spec: "Low maintenance", priceK: 50, maxQuantity: 1 },
  { id: "p-fern", category: "plant", name: "Fern", spec: "Adds texture to a corner", priceK: 70, maxQuantity: 1 },

  // Lifestyle extras
  { id: "coffee-espresso", category: "coffee", name: "Espresso Machine", spec: "Single group, with grinder", priceK: 180, maxQuantity: 1 },
  { id: "surf-short", category: "surfboard", name: "Shortboard", spec: "6'2\", with leash", priceK: 90, maxQuantity: 1 },
  { id: "moto-scooter", category: "motorcycle", name: "Scooter Rental", spec: "Automatic, with helmet", priceK: 650, maxQuantity: 1 },
  { id: "relax-beanbag", category: "relax", name: "Bean Bag", spec: "Large, indoor or outdoor", priceK: 70, maxQuantity: 1 },
];

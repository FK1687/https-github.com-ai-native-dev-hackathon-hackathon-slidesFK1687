import type {
  Product,
  ProductCategory,
  ApplicationType,
  AdhesiveType,
  SubstrateType,
  EnvironmentType,
  CertificationType,
  FilterConfiguration,
  OptionsData,
} from '@/types';

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  packaging: 'Packaging',
  automotive: 'Automotive',
  electronics: 'Electronics',
  construction: 'Construction',
  medical: 'Medical',
  aerospace: 'Aerospace',
  marine: 'Marine',
  signage: 'Signage & Graphics',
  hvac: 'HVAC',
  general: 'General Purpose',
};

const APPLICATION_LABELS: Record<ApplicationType, string> = {
  bonding: 'Bonding', mounting: 'Mounting', splicing: 'Splicing',
  masking: 'Masking', sealing: 'Sealing', insulating: 'Insulating',
  damping: 'Damping', protecting: 'Protecting', bundling: 'Bundling',
  labeling: 'Labeling', laminating: 'Laminating', reinforcing: 'Reinforcing',
  shielding: 'Shielding', wrapping: 'Wrapping',
};

const ADHESIVE_LABELS: Record<AdhesiveType, string> = {
  acrylic: 'Acrylic', rubber: 'Natural Rubber', silicone: 'Silicone',
  'hot-melt': 'Hot Melt', 'water-based': 'Water-Based', 'solvent-based': 'Solvent-Based',
  'uv-curable': 'UV Curable', 'pressure-sensitive': 'Pressure Sensitive',
  thermoplastic: 'Thermoplastic', thermoset: 'Thermoset', epoxy: 'Epoxy',
  polyurethane: 'Polyurethane',
};

const SUBSTRATE_LABELS: Record<SubstrateType, string> = {
  metal: 'Metal', glass: 'Glass', plastic: 'Plastic', wood: 'Wood',
  paper: 'Paper', fabric: 'Fabric', foam: 'Foam', rubber: 'Rubber',
  ceramic: 'Ceramic', concrete: 'Concrete', composite: 'Composite',
  painted: 'Painted Surface', 'powder-coated': 'Powder Coated', 'lse-plastic': 'LSE Plastic',
};

const ENVIRONMENT_LABELS: Record<EnvironmentType, string> = {
  indoor: 'Indoor', outdoor: 'Outdoor', 'high-temp': 'High Temperature',
  'low-temp': 'Low Temperature', cleanroom: 'Cleanroom',
};

const CERTIFICATION_LABELS: Record<CertificationType, string> = {
  REACH: 'REACH', RoHS: 'RoHS', UL: 'UL', FDA: 'FDA',
  'ISO-9001': 'ISO 9001', 'ISO-10993': 'ISO 10993',
  'IATF-16949': 'IATF 16949', 'MIL-SPEC': 'MIL-SPEC',
  'EN-45545': 'EN 45545', ASTM: 'ASTM',
};

const CATEGORIES: ProductCategory[] = Object.keys(CATEGORY_LABELS) as ProductCategory[];
const APPLICATIONS: ApplicationType[] = Object.keys(APPLICATION_LABELS) as ApplicationType[];
const ADHESIVE_TYPES: AdhesiveType[] = Object.keys(ADHESIVE_LABELS) as AdhesiveType[];
const SUBSTRATES: SubstrateType[] = Object.keys(SUBSTRATE_LABELS) as SubstrateType[];
const ENVIRONMENTS: EnvironmentType[] = Object.keys(ENVIRONMENT_LABELS) as EnvironmentType[];
const CERTIFICATIONS: CertificationType[] = Object.keys(CERTIFICATION_LABELS) as CertificationType[];

const MATERIALS = [
  'Bi-axially Oriented Polypropylene', 'Polyester (PET)', 'Glass Cloth',
  'Aluminum Foil', 'Copper Foil', 'Polyimide (Kapton)', 'PVC',
  'Polyethylene Foam', 'Acrylic Foam', 'Non-woven Tissue', 'Crepe Paper',
  'Cloth (Cotton)', 'UHMW Polyethylene', 'PTFE', 'Silicone Rubber',
];

const COLORS = ['Clear', 'White', 'Black', 'Silver', 'Yellow', 'Red', 'Green', 'Blue', 'Gray', 'Tan'];

function seededRandom(seed: number): () => number {
  let s = seed;
  return (): number => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function pick<T>(arr: readonly T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)]!;
}

function pickN<T>(arr: readonly T[], min: number, max: number, rand: () => number): T[] {
  const count = min + Math.floor(rand() * (max - min + 1));
  const shuffled = [...arr].sort(() => rand() - 0.5);
  return shuffled.slice(0, count);
}

export function generateProducts(count: number = 796): Product[] {
  const rand = seededRandom(42);
  const products: Product[] = [];

  for (let i = 0; i < count; i++) {
    const category = CATEGORIES[i % CATEGORIES.length]!;
    const catIndex = Math.floor(i / CATEGORIES.length);
    const material = pick(MATERIALS, rand);
    const adhesiveType = pick(ADHESIVE_TYPES, rand);
    const tempMin = -70 + Math.floor(rand() * 100);
    const tempMax = tempMin + 50 + Math.floor(rand() * 280);
    const adhesion = Math.round((rand() * 14 + 0.5) * 10) / 10;

    const product: Product = {
      id: `kleb-${String(i + 1).padStart(4, '0')}`,
      name: `KLEB ${CATEGORY_LABELS[category].split(' ')[0]} ${material.split(' ')[0]} ${String(catIndex + 1).padStart(2, '0')}`,
      sku: `KLB-${category.substring(0, 3).toUpperCase()}-${String(i + 1).padStart(4, '0')}`,
      category,
      application: pickN(APPLICATIONS, 1, 4, rand),
      material,
      adhesiveType,
      description: `High-performance ${ADHESIVE_LABELS[adhesiveType].toLowerCase()} adhesive tape designed for ${CATEGORY_LABELS[category].toLowerCase()} applications. Manufactured with ${material.toLowerCase()} backing for superior ${pick(['durability', 'flexibility', 'conformability', 'temperature resistance', 'chemical resistance'], rand)}.`,
      shortDescription: `${ADHESIVE_LABELS[adhesiveType]} adhesive on ${material.toLowerCase()} for ${CATEGORY_LABELS[category].toLowerCase()}.`,
      properties: {
        uvResistance: rand() > 0.5,
        waterResistance: rand() > 0.4,
        solventResistance: rand() > 0.6,
        foodSafe: category === 'medical' || rand() > 0.8,
        flameRetardant: rand() > 0.7,
        antistatic: category === 'electronics' || rand() > 0.85,
        transparentBond: material.includes('Polypropylene') || rand() > 0.75,
        removable: rand() > 0.8,
        adhesionStrength: adhesion,
        temperatureMin: tempMin,
        temperatureMax: Math.min(tempMax, 260),
      },
      availableWidths: pickN([6, 9, 12, 19, 25, 38, 50, 75, 100], 2, 5, rand).sort((a, b) => a - b),
      availableLengths: pickN([3, 5, 11, 25, 33, 50, 66], 2, 4, rand).sort((a, b) => a - b),
      color: pick(COLORS, rand),
      substrate: pickN(SUBSTRATES, 2, 5, rand),
      environment: pick(ENVIRONMENTS, rand),
      certification: pickN(CERTIFICATIONS, 1, 4, rand),
      shelfLife: pick([12, 18, 24, 36], rand),
      tags: pickN([
        'structural', 'high-temp', 'clear-bond', 'lse', 'conformable',
        'ultra-thin', 'heavy-duty', 'removable', 'permanent', 'double-sided',
        'single-sided', 'transfer', 'foam', 'film', 'cloth',
      ], 2, 4, rand),
    };
    products.push(product);
  }

  return products;
}

export function generateOptions(): OptionsData {
  return {
    categoryLabels: CATEGORY_LABELS,
    applicationLabels: APPLICATION_LABELS,
    adhesiveLabels: ADHESIVE_LABELS,
    substrateLabels: SUBSTRATE_LABELS,
    environmentLabels: ENVIRONMENT_LABELS,
    certificationLabels: CERTIFICATION_LABELS,
  };
}

export function generateFilters(): FilterConfiguration {
  return {
    categories: CATEGORIES,
    applications: APPLICATIONS,
    adhesiveTypes: ADHESIVE_TYPES,
    substrates: SUBSTRATES,
    environments: ENVIRONMENTS,
    certifications: CERTIFICATIONS,
    properties: [
      'uvResistance', 'waterResistance', 'solventResistance', 'foodSafe',
      'flameRetardant', 'antistatic', 'transparentBond', 'removable',
    ],
    temperatureRange: { min: -70, max: 260 },
    adhesionRange: { min: 0, max: 15 },
  };
}

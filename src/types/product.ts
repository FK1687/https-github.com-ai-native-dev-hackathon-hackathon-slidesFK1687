// Product categories
export type ProductCategory =
  | 'packaging'
  | 'automotive'
  | 'electronics'
  | 'construction'
  | 'medical'
  | 'aerospace'
  | 'marine'
  | 'signage'
  | 'hvac'
  | 'general';

// Application types
export type ApplicationType =
  | 'bonding'
  | 'mounting'
  | 'splicing'
  | 'masking'
  | 'sealing'
  | 'insulating'
  | 'damping'
  | 'protecting'
  | 'bundling'
  | 'labeling'
  | 'laminating'
  | 'reinforcing'
  | 'shielding'
  | 'wrapping';

// Adhesive types
export type AdhesiveType =
  | 'acrylic'
  | 'rubber'
  | 'silicone'
  | 'hot-melt'
  | 'water-based'
  | 'solvent-based'
  | 'uv-curable'
  | 'pressure-sensitive'
  | 'thermoplastic'
  | 'thermoset'
  | 'epoxy'
  | 'polyurethane';

// Substrate types
export type SubstrateType =
  | 'metal'
  | 'glass'
  | 'plastic'
  | 'wood'
  | 'paper'
  | 'fabric'
  | 'foam'
  | 'rubber'
  | 'ceramic'
  | 'concrete'
  | 'composite'
  | 'painted'
  | 'powder-coated'
  | 'lse-plastic';

// Environment types
export type EnvironmentType =
  | 'indoor'
  | 'outdoor'
  | 'high-temp'
  | 'low-temp'
  | 'cleanroom';

// Certification types
export type CertificationType =
  | 'REACH'
  | 'RoHS'
  | 'UL'
  | 'FDA'
  | 'ISO-9001'
  | 'ISO-10993'
  | 'IATF-16949'
  | 'MIL-SPEC'
  | 'EN-45545'
  | 'ASTM';

export interface ProductProperties {
  uvResistance: boolean;
  waterResistance: boolean;
  solventResistance: boolean;
  foodSafe: boolean;
  flameRetardant: boolean;
  antistatic: boolean;
  transparentBond: boolean;
  removable: boolean;
  adhesionStrength: number; // N/25mm
  temperatureMin: number;   // °C
  temperatureMax: number;   // °C
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: ProductCategory;
  application: ApplicationType[];
  material: string;
  adhesiveType: AdhesiveType;
  description: string;
  shortDescription: string;
  properties: ProductProperties;
  availableWidths: number[];
  availableLengths: number[];
  color: string;
  substrate: SubstrateType[];
  environment: EnvironmentType;
  certification: CertificationType[];
  shelfLife: number;
  tags: string[];
}

export interface FilterConfiguration {
  categories: ProductCategory[];
  applications: ApplicationType[];
  adhesiveTypes: AdhesiveType[];
  substrates: SubstrateType[];
  environments: EnvironmentType[];
  certifications: CertificationType[];
  properties: (keyof Pick<ProductProperties,
    'uvResistance' | 'waterResistance' | 'solventResistance' |
    'foodSafe' | 'flameRetardant' | 'antistatic' |
    'transparentBond' | 'removable'
  >)[];
  temperatureRange: { min: number; max: number };
  adhesionRange: { min: number; max: number };
}

export interface OptionsData {
  categoryLabels: Record<string, string>;
  applicationLabels: Record<string, string>;
  adhesiveLabels: Record<string, string>;
  substrateLabels: Record<string, string>;
  environmentLabels: Record<string, string>;
  certificationLabels: Record<string, string>;
}

export type SortOption = 'name' | 'adhesion-asc' | 'adhesion-desc' | 'temp-range';
export type ViewMode = 'grid' | 'list' | 'table';

import type { Product, ProductCategory, ApplicationType, AdhesiveType, SubstrateType, EnvironmentType, CertificationType, ProductProperties, SortOption } from '@/types';

interface FilterParams {
  search: string;
  categories: ProductCategory[];
  applications: ApplicationType[];
  tempRange: [number, number];
  adhesionRange: [number, number];
  properties: (keyof Pick<ProductProperties,
    'uvResistance' | 'waterResistance' | 'solventResistance' |
    'foodSafe' | 'flameRetardant' | 'antistatic' |
    'transparentBond' | 'removable'
  >)[];
  adhesiveTypes: AdhesiveType[];
  substrates: SubstrateType[];
  environments: EnvironmentType[];
  certifications: CertificationType[];
}

export function filterProducts(products: Product[], params: FilterParams): Product[] {
  return products.filter((product) => {
    // Text search
    if (params.search) {
      const q = params.search.toLowerCase();
      const searchable = [
        product.name, product.sku, product.description,
        product.material, ...product.tags,
      ].join(' ').toLowerCase();
      if (!searchable.includes(q)) return false;
    }

    // Category (OR)
    if (params.categories.length > 0 && !params.categories.includes(product.category)) {
      return false;
    }

    // Application (OR)
    if (params.applications.length > 0 && !params.applications.some((a) => product.application.includes(a))) {
      return false;
    }

    // Temperature range (overlap)
    if (product.properties.temperatureMax < params.tempRange[0] ||
        product.properties.temperatureMin > params.tempRange[1]) {
      return false;
    }

    // Adhesion range (containment)
    if (product.properties.adhesionStrength < params.adhesionRange[0] ||
        product.properties.adhesionStrength > params.adhesionRange[1]) {
      return false;
    }

    // Properties (AND)
    for (const prop of params.properties) {
      if (!product.properties[prop]) return false;
    }

    // Adhesive type (OR)
    if (params.adhesiveTypes.length > 0 && !params.adhesiveTypes.includes(product.adhesiveType)) {
      return false;
    }

    // Substrate (OR)
    if (params.substrates.length > 0 && !params.substrates.some((s) => product.substrate.includes(s))) {
      return false;
    }

    // Environment (OR)
    if (params.environments.length > 0 && !params.environments.includes(product.environment)) {
      return false;
    }

    // Certification (OR)
    if (params.certifications.length > 0 && !params.certifications.some((c) => product.certification.includes(c))) {
      return false;
    }

    return true;
  });
}

export function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  const sorted = [...products];
  switch (sortBy) {
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'adhesion-asc':
      return sorted.sort((a, b) => a.properties.adhesionStrength - b.properties.adhesionStrength);
    case 'adhesion-desc':
      return sorted.sort((a, b) => b.properties.adhesionStrength - a.properties.adhesionStrength);
    case 'temp-range':
      return sorted.sort((a, b) =>
        (b.properties.temperatureMax - b.properties.temperatureMin) -
        (a.properties.temperatureMax - a.properties.temperatureMin)
      );
    default:
      return sorted;
  }
}

import { Movie, Screening } from 'src/schemas';

export function getIncludedModels(includes: string): any[] {
  const includedModels: any[] = [];

  const includedModelNames = includes.split(',');

  for (const modelName of includedModelNames) {
    switch (modelName) {
      case 'movies':
        includedModels.push(Movie);
        break;
      case 'screenings':
        includedModels.push(Screening);
      default:
        // Ignore unknown model names
        break;
    }
  }

  return includedModels;
}

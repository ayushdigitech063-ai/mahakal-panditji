import { TravelService } from '../types';
import { STATIC_TRAVEL_SERVICES, TRAVEL_ROUTES } from '../data/travel';

export const travelService = {
  async getTravelServices(): Promise<TravelService[]> {
    // API-ready architecture: Static fallback for now
    return Promise.resolve(STATIC_TRAVEL_SERVICES.filter((t) => t.isActive));
  },

  async getTravelRoutes() {
    return Promise.resolve(TRAVEL_ROUTES);
  },
};

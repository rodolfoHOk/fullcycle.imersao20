import { DirectionsResponseData } from '@googlemaps/google-maps-services-js';

export type DirectionsRequest = {
  origin: {
    place_id: string;
    location: {
      lat: number;
      lng: number;
    };
  };
  destination: {
    place_id: string;
    location: {
      lat: number;
      lng: number;
    };
  };
  mode: string;
};

export type DirectionsData = DirectionsResponseData & {
  request: DirectionsRequest;
};

export type RouteModel = {
  id: string;
  name: string;
  source: { name: string; location: { lat: number; lng: number } };
  destination: { name: string; location: { lat: number; lng: number } };
  distance: number;
  duration: number;
  directions: DirectionsResponseData & { request: DirectionsRequest };
  created_at: Date;
  updated_at: Date;
};

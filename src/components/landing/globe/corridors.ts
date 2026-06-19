export type City = {
  name: string;
  lat: number;
  lng: number;
};

export type Corridor = {
  from: City;
  to: City;
  tone?: "primary" | "secondary" | "quiet";
  active?: boolean;
};

export const cities = {
  singapore: { name: "Singapore", lat: 1.3521, lng: 103.8198 },
  london: { name: "London", lat: 51.5074, lng: -0.1278 },
  newYork: { name: "New York", lat: 40.7128, lng: -74.006 },
  hongKong: { name: "Hong Kong", lat: 22.3193, lng: 114.1694 },
  tokyo: { name: "Tokyo", lat: 35.6762, lng: 139.6503 },
  mumbai: { name: "Mumbai", lat: 19.076, lng: 72.8777 },
  sydney: { name: "Sydney", lat: -33.8688, lng: 151.2093 },
  jakarta: { name: "Jakarta", lat: -6.2088, lng: 106.8456 },
  sanFrancisco: { name: "San Francisco", lat: 37.7749, lng: -122.4194 },
  frankfurt: { name: "Frankfurt", lat: 50.1109, lng: 8.6821 },
  dubai: { name: "Dubai", lat: 25.2048, lng: 55.2708 },
  manila: { name: "Manila", lat: 14.5995, lng: 120.9842 },
} as const satisfies Record<string, City>;

export const corridors: Corridor[] = [
  { from: cities.singapore, to: cities.london, tone: "primary", active: true },
  { from: cities.singapore, to: cities.hongKong, tone: "secondary" },
  { from: cities.singapore, to: cities.tokyo, tone: "secondary" },
  { from: cities.singapore, to: cities.mumbai, tone: "quiet" },
  { from: cities.singapore, to: cities.sydney, tone: "quiet" },
];

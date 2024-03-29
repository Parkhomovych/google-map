export type Location = {
    lat: number
    lng: number
}
export interface Mark {
    id: string
    timestamp: Date
    location: Location
}
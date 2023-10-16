export interface ReservationResponse {
    reservationId:      number;
    guestId:            number;
    guestName:          string;
    roomId:             number;
    roomName:           string;
    reservationInDate:  Date;
    reservationOutDate: null;
    reservationStatus:  string;
}

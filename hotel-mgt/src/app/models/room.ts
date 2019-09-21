export interface IRoom {
    roomNo: number;
    roomPrice: number;
    roomType : string;
    id?: string;
}

export interface IRoomGuest{
    guestName: string;
    roomNo: number;
    status: string;
    checkInTime: string;
    checkOutTime: string;
}

export interface IGuest {
    name: string;
    phone: number;
    email: string;
    paymentType: string;
    roomNo: number;
    roomType: string;
    checkInTime: Date;
    checkOutTime: Date;
    roomID: string;
    amountLeft: number
}

export interface IGuestOrder{

}
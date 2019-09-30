export interface Report {
    
}

export interface IReceptionReport{
    reports: [
        {
            date: string,
            guestName: string,
            items: [
                {
                    itemName: string,
                    itemPrice: number,
                    itemQuantity: number
                }
            ],
            reportType: string,
            totalPrice: number
        }
    ]
}

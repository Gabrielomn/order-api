import { Injectable } from '@nestjs/common';
import { PaymentInfoDTO } from './dto/payment-info.dto';
import { PaymentStatus } from './types/payment-status';
@Injectable()
export class PaymentService {

    constructor(){}

    public async pay(paymentData: PaymentInfoDTO, value: number): Promise<PaymentStatus>{
        this.validate(paymentData);
        return this.getResult(paymentData, value)
    }

    public validate(paymentData: PaymentInfoDTO): void{
        return;
    }


    public async getResult(paymentData: PaymentInfoDTO, value: number): Promise<PaymentStatus>{
        await this.oneSecond();

        if(this.fails(paymentData)){
            return {
                status:false,
                message:"Payment was refused"
            }
        }

        return {
            status: true,
            message: "Payment was a sucess"
        }
    }


    public async oneSecond(){
        setTimeout(() => {
            return Promise.resolve()
        }, 1000)
    }

    public fails(paymentData: PaymentInfoDTO): boolean{
        const failingCreditCards = ['1111-2222-3333-4444', '2222-2222-3333-4444', '3333-2222-3333-4444', '4444-2222-3333-4444']
        return failingCreditCards.includes(paymentData.creditCard);
    }

}

import { Injectable } from '@nestjs/common';
import { assessFraud, type FraudAssessment, type FraudInput } from '@secure-attendance/security';

@Injectable()
export class FraudService {
  assess(input: FraudInput): FraudAssessment {
    return assessFraud(input);
  }
}

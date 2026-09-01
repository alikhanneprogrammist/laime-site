import type { CaseStudy } from '../../types';
import { guestComplex247 } from './guest-complex-247';
import { autoServiceNetwork } from './auto-service-network';
import { medicalClinic } from './medical-clinic';
import { logisticsCompany } from './logistics-company';
import { outdoorAdsOperator } from './outdoor-ads-operator';
import { educationCenter } from './education-center';
import { billiardClub } from './billiard-club';

/** Порядок = порядок вывода в списке кейсов; первые три — превью на главной. */
export const cases: CaseStudy[] = [
  guestComplex247,
  autoServiceNetwork,
  medicalClinic,
  billiardClub,
  logisticsCompany,
  outdoorAdsOperator,
  educationCenter,
];

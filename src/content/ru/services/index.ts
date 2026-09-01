import type { Service } from '../../types';
import { brand } from './brand';
import { smm } from './smm';
import { ads } from './ads';
import { dev } from './dev';
import { crm } from './crm';

export const services: Service[] = [brand, smm, ads, dev, crm];

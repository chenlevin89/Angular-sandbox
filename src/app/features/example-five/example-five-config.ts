import {PipeTransform} from '@angular/core';
import {TitleCasePipe, DatePipe, DecimalPipe, UpperCasePipe, CurrencyPipe} from '@angular/common';

export interface DynamicData {
  id: number;
  text: string | Date | number;
  pipe?: PipeTransform;
  pipeParam?: any;
}

export const dynamicPipeData: DynamicData[] = [
  {
    id: 1,
    text: 'title case',
    pipe:  new TitleCasePipe()
  },
  {
    id: 2,
    text: new Date(),
    pipe: new DatePipe('en-US'),
    pipeParam: 'fullDate'
  },
  {
    id: 3,
    text: 'upper case',
    pipe: new UpperCasePipe()
  },
  {
    id: 4,
    text: 'No pipe'
  },
  {
    id: 5,
    text: null,
    pipe: new CurrencyPipe('en-US')
  },
  {
    id: 6,
    text: undefined,
    pipe: new DecimalPipe('en-US')
  },
];

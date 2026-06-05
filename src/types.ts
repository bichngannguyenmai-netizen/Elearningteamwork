/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type DISCType = 'D' | 'I' | 'S' | 'C';

export interface DISCQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    type: DISCType;
    explanation: string;
  }[];
}

export interface TeamStageQuestion {
  id: number;
  statement: string;
  options: {
    score: number; // 1 to 5
    text: string;
  }[];
}

export interface HandoutItem {
  id: string;
  title: string;
  category: 'Tài liệu học tập' | 'Công cụ bổ trợ' | 'Biểu mẫu thực hành';
  description: string;
  downloadUrl?: string;
  isCustom?: boolean;
}

export interface TeamStageResult {
  stage: string;
  score: number;
  description: string;
  characteristics: string[];
  recommendations: string[];
}

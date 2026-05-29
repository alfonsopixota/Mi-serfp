/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum FpLevel {
  GRADO_MEDIO = "Grado Medio",
  GRADO_SUPERIOR = "Grado Superior"
}

export interface FpCycle {
  id: string; // e.g. "dam"
  code: string; // e.g. "DAM"
  name: string; // e.g. "Desarrollo de Aplicaciones Multiplataforma"
  familyId: string; // e.g. "informatica"
  familyName: string; // e.g. "Informática y Comunicaciones"
  level: FpLevel;
  durationHours: number;
  employabilityRate: number; // e.g. 92%
  avgStartingSalary: number; // e.g. 17500
  satisfactionRate: number; // e.g. 8.5/10
  difficultyScore: number; // out of 10
  keySubjects: string[];
  description: string;
  myths: Array<{ myth: string; reality: string }>;
  unspokenTruths: string[]; // "Lo que nadie te cuenta"
  careerOutlets: string[];
  suitabilityQuizPoints: string[]; // Ideal si te gusta...
  isPopular: boolean;
}

export interface Testimonial {
  id: string;
  studentName: string;
  age: number;
  gender: "Masculino" | "Femenino" | "Otro";
  cycleCode: string; // e.g. "DAW"
  cycleName: string; // e.g. "Desarrollo de Aplicaciones Web"
  familyId: string;
  centerName: string;
  city: string;
  fpLevel: FpLevel;
  isDual: boolean;
  rating: number; // 1 to 5
  content: string;
  theTruth: string; // La verdad del día a día (lo que no venden los folletos)
  foundJobMonths: number; // e.g. 2 months
  startingSalary: number; // actual starting salary
  likes: number;
  isCustom: boolean; // if ingested by user
  approved: boolean; // in general
  createdAt: string;
}

export interface Article {
  id: string;
  title: string;
  category: "Consejos" | "Mitos vs Realidad" | "Empleabilidad" | "actualidad";
  author: string;
  summary: string;
  content: string;
  publishedAt: string;
  readTime: string;
  commentsCount: number;
  isCustom?: boolean;
}

export interface CommunityQuestion {
  id: string;
  author: string;
  cycleOfInterest?: string;
  title: string;
  content: string;
  category: string;
  answers: Array<{
    id: string;
    author: string;
    role: "alumno" | "profesional" | "orientador" | "comunidad";
    content: string;
    likes: number;
    createdAt: string;
  }>;
  likes: number;
  createdAt: string;
}

export interface ChecklistItem {
  id: string;
  task: string;
  category: "Requisitos" | "Matriculación" | "Primeros Días" | "Dual" | "Consejos Practicos";
  description: string;
  completed: boolean;
}

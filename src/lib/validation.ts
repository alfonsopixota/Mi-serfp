import { ChecklistItem, FpCycle, FpLevel, Testimonial } from "../types";

const FP_LEVEL_VALUES = new Set<string>(Object.values(FpLevel));
const CHECKLIST_CATEGORIES = new Set([
  "Requisitos",
  "Matriculación",
  "Primeros Días",
  "Dual",
  "Consejos Practicos",
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isString);
}

function isMythArray(value: unknown): value is Array<{ myth: string; reality: string }> {
  return (
    Array.isArray(value) &&
    value.every(
      (entry) =>
        isRecord(entry) &&
        isString(entry.myth) &&
        isString(entry.reality)
    )
  );
}

export function isValidCycle(value: unknown): value is FpCycle {
  return (
    isRecord(value) &&
    isString(value.id) &&
    isString(value.code) &&
    isString(value.name) &&
    isString(value.familyId) &&
    isString(value.familyName) &&
    isString(value.level) &&
    FP_LEVEL_VALUES.has(value.level) &&
    isNumber(value.durationHours) &&
    isNumber(value.employabilityRate) &&
    isNumber(value.avgStartingSalary) &&
    isNumber(value.satisfactionRate) &&
    isNumber(value.difficultyScore) &&
    isStringArray(value.keySubjects) &&
    isString(value.description) &&
    isMythArray(value.myths) &&
    isStringArray(value.unspokenTruths) &&
    isStringArray(value.careerOutlets) &&
    isStringArray(value.suitabilityQuizPoints) &&
    isBoolean(value.isPopular)
  );
}

export function isValidTestimonial(value: unknown): value is Testimonial {
  return (
    isRecord(value) &&
    isString(value.id) &&
    isString(value.studentName) &&
    isNumber(value.age) &&
    isString(value.gender) &&
    (value.gender === "Masculino" ||
      value.gender === "Femenino" ||
      value.gender === "Otro") &&
    isString(value.cycleCode) &&
    isString(value.cycleName) &&
    isString(value.familyId) &&
    isString(value.centerName) &&
    isString(value.city) &&
    isString(value.fpLevel) &&
    FP_LEVEL_VALUES.has(value.fpLevel) &&
    isBoolean(value.isDual) &&
    isNumber(value.rating) &&
    isString(value.content) &&
    isString(value.theTruth) &&
    isNumber(value.foundJobMonths) &&
    isNumber(value.startingSalary) &&
    isNumber(value.likes) &&
    isBoolean(value.isCustom) &&
    isBoolean(value.approved) &&
    isString(value.createdAt)
  );
}

export function isValidChecklistItem(value: unknown): value is ChecklistItem {
  return (
    isRecord(value) &&
    isString(value.id) &&
    isString(value.task) &&
    isString(value.category) &&
    CHECKLIST_CATEGORIES.has(value.category) &&
    isString(value.description) &&
    isBoolean(value.completed)
  );
}

export function isValidCycleArray(value: unknown): value is FpCycle[] {
  return Array.isArray(value) && value.every(isValidCycle);
}

export function isValidTestimonialArray(value: unknown): value is Testimonial[] {
  return Array.isArray(value) && value.every(isValidTestimonial);
}

export function isValidChecklistArray(value: unknown): value is ChecklistItem[] {
  return Array.isArray(value) && value.every(isValidChecklistItem);
}

export function normalizeBackupPayload(
  value: unknown,
): { cycles: FpCycle[]; testimonials: Testimonial[] } | null {
  if (!isRecord(value)) {
    return null;
  }

  if (!isValidCycleArray(value.cycles) || !isValidTestimonialArray(value.testimonials)) {
    return null;
  }

  return {
    cycles: value.cycles,
    testimonials: value.testimonials,
  };
}

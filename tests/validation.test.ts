import assert from "node:assert/strict";
import test from "node:test";

import { PRELOADED_CHECKLISTS, PRELOADED_CYCLES, PRELOADED_TESTIMONIALS } from "../src/data";
import {
  isValidChecklistArray,
  isValidCycleArray,
  isValidTestimonialArray,
  normalizeBackupPayload,
} from "../src/lib/validation";

test("preloaded catalog data matches the validation schema", () => {
  assert.equal(isValidCycleArray(PRELOADED_CYCLES), true);
  assert.equal(isValidTestimonialArray(PRELOADED_TESTIMONIALS), true);
  assert.equal(isValidChecklistArray(PRELOADED_CHECKLISTS), true);
});

test("normalizeBackupPayload rejects malformed payloads", () => {
  assert.equal(
    normalizeBackupPayload({
      cycles: PRELOADED_CYCLES,
      testimonials: [{ bad: true }],
    }),
    null,
  );
});

test("normalizeBackupPayload accepts a valid payload", () => {
  const payload = normalizeBackupPayload({
    cycles: PRELOADED_CYCLES,
    testimonials: PRELOADED_TESTIMONIALS,
  });

  assert.ok(payload);
  assert.equal(payload?.cycles.length, PRELOADED_CYCLES.length);
  assert.equal(payload?.testimonials.length, PRELOADED_TESTIMONIALS.length);
});

/**
 * Registry of all code-authored sequences. Add new campaign/automation files
 * here; `campaigns:sync` upserts everything in this array into the database.
 */

import type { SequenceDef } from "@/lib/campaigns/define";
import { cat3AssessmentOffer } from "@/lib/campaigns/definitions/cat3-assessment-offer";
import { clientOnboarding } from "@/lib/campaigns/definitions/client-onboarding";

export const sequenceDefinitions: SequenceDef[] = [
  cat3AssessmentOffer,
  clientOnboarding,
];

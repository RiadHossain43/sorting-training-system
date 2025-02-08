import { useModals } from "@/modules/sorting-department/composables/useModals";
import { describe, it, expect, beforeEach } from "vitest";

describe("useModals", () => {
  let modals: ReturnType<typeof useModals>;

  beforeEach(() => {
    modals = useModals();
  });

  it("should initialize with both modals hidden", () => {
    expect(modals.isSetupModalVisible.value).toBe(false);
    expect(modals.isScoreModalVisible.value).toBe(false);
  });

  it("should open the setup modal", () => {
    modals.openSetupModal();
    expect(modals.isSetupModalVisible.value).toBe(true);
  });

  it("should close the setup modal", () => {
    modals.openSetupModal(); 
    modals.closeSetupModal();
    expect(modals.isSetupModalVisible.value).toBe(false);
  });

  it("should show the score modal", () => {
    modals.showScoreModal();
    expect(modals.isScoreModalVisible.value).toBe(true);
  });

  it("should close the score modal", () => {
    modals.showScoreModal(); 
    modals.closeScoreModal();
    expect(modals.isScoreModalVisible.value).toBe(false);
  });
});

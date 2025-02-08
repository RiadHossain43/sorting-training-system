import { ref, type Ref } from "vue";

export interface ModalsComposableUtils {
  isSetupModalVisible: Ref<boolean>;
  isScoreModalVisible: Ref<boolean>;
  openSetupModal: Function;
  closeSetupModal: Function;
  showScoreModal: Function;
  closeScoreModal: Function;
}
export function useModals(): ModalsComposableUtils {
  const isSetupModalVisible = ref(false);
  const isScoreModalVisible = ref(false);

  const openSetupModal = () => {
    isSetupModalVisible.value = true;
  };

  const closeSetupModal = () => {
    isSetupModalVisible.value = false;
  };

  const showScoreModal = () => {
    isScoreModalVisible.value = true;
  };

  const closeScoreModal = () => {
    isScoreModalVisible.value = false;
  };

  return {
    isSetupModalVisible,
    isScoreModalVisible,
    openSetupModal,
    closeSetupModal,
    showScoreModal,
    closeScoreModal,
  };
}

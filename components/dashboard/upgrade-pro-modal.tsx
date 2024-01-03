"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import SubscriptionButton from "../subscription-button";
import { useProStore } from "@/stores/pro-store";

interface UpgradeProModalProps {
  isProPlan?: boolean;
}

const UpgradeProModal: React.FC<UpgradeProModalProps> = ({ isProPlan }) => {
  const { isOpen, handleCloseProModal } = useProStore();

  return (
    <div>
      <Dialog open={isOpen}>
        <DialogContent onClose={handleCloseProModal} showOverlay>
          <SubscriptionButton isPro={isProPlan} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpgradeProModal;

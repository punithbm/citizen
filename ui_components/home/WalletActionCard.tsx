import { WalletActions, WalletCard } from ".";

export default function WalletActionCard() {
  return (
    <div className="bg-secondary-100 p-2 rounded-3xl pb-5 mb-6">
      <div className="mb-5">
        <WalletCard />
      </div>
      <WalletActions />
    </div>
  );
}

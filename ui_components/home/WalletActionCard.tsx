import { WalletActions, WalletCard } from ".";

export default function WalletActionCard(props: any) {
  const { setStep, aadharStatus, tokenBalance } = props;
  return (
    <div className="bg-secondary-100 p-2 rounded-3xl pb-5 mb-6">
      <div className="mb-5">
        <WalletCard tokenBalance={tokenBalance} />
      </div>
      <WalletActions setStep={setStep} aadharStatus={aadharStatus} />
    </div>
  );
}

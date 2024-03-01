import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/components/ui/fonts';

export default function CertifyLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <p className="text-[44px]">Certify</p>
    </div>
  );
}

import { StrictPropsWithChildren } from '@/types';
import ModalWrapper from './ModalWrapper';

export default function Popup({ children }: StrictPropsWithChildren) {
  return (
    <ModalWrapper>
      <section className="flex w-280 flex-col items-center rounded-16 bg-white px-16 py-12">
        {children}
      </section>
    </ModalWrapper>
  );
}

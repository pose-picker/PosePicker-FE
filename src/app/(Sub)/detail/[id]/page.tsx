import { QueryAsyncBoundary } from '@suspensive/react-query';
import { Metadata, ResolvingMetadata } from 'next';

import DetailHeader from './components/DetailHeader';
import DetailSection from './components/DetailSection';
import { getPoseDetail } from '@/apis';
import { RejectedFallback } from '@/components/ErrorBoundary';
import { Loading } from '@/components/Loading';
import { PageAnimation } from '@/components/PageAnimation';
import { HydrationProvider } from '@/components/Provider/HydrationProvider';

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = parseInt(params.id);
  const {
    poseInfo: { peopleCount, frameCount, tagAttributes },
  } = await getPoseDetail(id);
  const description = `${tagAttributes},${frameCount}컷,${peopleCount}인 포즈추천`;
  const defaultOgTitle = (await parent).openGraph?.title;

  return {
    description,
    openGraph: {
      title: defaultOgTitle,
      description: '이 포즈는 어때요?',
    },
  };
}

export default function DetailPage({ params }: { params: { id: number } }) {
  const { id } = params;

  return (
    <div>
      <DetailHeader />
      <QueryAsyncBoundary
        rejectedFallback={RejectedFallback}
        pendingFallback={<Loading className="h-[calc(100dvh-400px)]" />}
      >
        <PageAnimation>
          <HydrationProvider queryKey={['poseId', id]} queryFn={() => getPoseDetail(id)}>
            <DetailSection poseId={id} />
          </HydrationProvider>
        </PageAnimation>
      </QueryAsyncBoundary>
    </div>
  );
}

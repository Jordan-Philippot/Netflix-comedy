import { useResume } from "hooks/useResume";

// --------------
// Components
// --------------
import Loader from "components/ui/Loader";
import Carousel from "./Carousel";
import { startTransition, useDeferredValue } from "react";

export default function CarouselResume() {
  const { userResumeList, isLoading: isResumeLoading } = useResume();
  const deferredUserResumeList = useDeferredValue(userResumeList);

  return (
    <>
      {isResumeLoading ? (
        <Loader />
      ) : (
        deferredUserResumeList?.resumes &&
        startTransition(() => {
          deferredUserResumeList.resumes.length > 0 && (
            <Carousel resumes={deferredUserResumeList.resumes} />
          );
        })
      )}
      {isResumeLoading ? (
        <Loader />
      ) : (
        deferredUserResumeList?.watchAgain &&
        startTransition(() => {
          deferredUserResumeList.watchAgain.length > 0 && (
            <Carousel resumes={deferredUserResumeList.watchAgain} />
          );
        })
      )}
    </>
  );
}

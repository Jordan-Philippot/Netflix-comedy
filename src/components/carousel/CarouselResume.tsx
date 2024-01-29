import { useResume } from "hooks/useResume";

// --------------
// Components
// --------------
import Loader from "components/ui/Loader";
import Carousel from "./Carousel";
import { useDeferredValue } from "react";

export default function CarouselResume() {
  const { userResumeList, isLoading: isResumeLoading } = useResume();
  const deferredUserResumeList = useDeferredValue(userResumeList);

  return (
    <>
      {isResumeLoading ? (
        <Loader />
      ) : (
        deferredUserResumeList?.resumes &&
        deferredUserResumeList.resumes.length > 0 && (
          <Carousel resumes={deferredUserResumeList.resumes} />
        )
      )}
      {isResumeLoading ? (
        <Loader />
      ) : (
        deferredUserResumeList?.watchAgain &&
        deferredUserResumeList.watchAgain.length > 0 && (
          <Carousel resumes={deferredUserResumeList.watchAgain} />
        )
      )}
    </>
  );
}

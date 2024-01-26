import { useResume } from "hooks/useResume";

// --------------
// Components
// --------------
import Loader from "components/ui/Loader";
import Carousel from "./Carousel";

export default function CarouselResume() {
  const { userResumeList, isLoading: isResumeLoading } = useResume();

  return (
    <>
      {isResumeLoading ? (
        <Loader />
      ) : (
        userResumeList?.resumes &&
        userResumeList.resumes.length > 0 && (
          <Carousel resumes={userResumeList.resumes} />
        )
      )}
      {isResumeLoading ? (
        <Loader />
      ) : (
        userResumeList?.watchAgain &&
        userResumeList.watchAgain.length > 0 && (
          <Carousel resumes={userResumeList.watchAgain} />
        )
      )}
    </>
  );
}

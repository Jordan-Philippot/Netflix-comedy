import { getAuthenticationConfig } from "./app";
import { ResumeType } from "./resume.type";

const BASE_URL = process.env.REACT_APP_API_URL_SYMFONY;

export const getUserResumeList = async (): Promise<ResumeType[]> => {
  const response = await fetch(
    `${BASE_URL}auth/resume/list`,
    getAuthenticationConfig()
  );
  const data = await response.json();
  return data.resumes;
};

export const addResume = async (
  videoId: string,
  resumeTime: number
): Promise<{ resumeAdded: boolean }> => {
  console.log(JSON.stringify({ videoId, resumeTime }))
  const response = await fetch(`${BASE_URL}auth/resume/add`, {
    ...getAuthenticationConfig(),
    method: "POST",
    body: JSON.stringify({ videoId, resumeTime }),
  });
  const data = await response.json();
  console.log(data)
  return data.resumeAdded;
};

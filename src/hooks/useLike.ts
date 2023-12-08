import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import useMessage from "hooks/useMessage";
import { addLike, getUserLikeList, removeLike } from "api/like";
import { LikeType, LikeTypeType } from "api/like.type";
import { useAuth } from "./useAuth";

interface LikeHook {
  userLikeList: LikeType[] | undefined;
  addLike: (videoId: string, type: LikeTypeType) => void;
  removeLike: (videoId: string) => void;
  findUserLike: (videoId: string, setIsLiked: (bool: boolean) => void) => void;
}

export function useLike(): LikeHook {
  const queryClient = useQueryClient();
  const { sendInformation, sendError } = useMessage();

  const { data } = useQuery({
    queryKey: ["userLikeList"],
    queryFn: () => getUserLikeList(),
  });

  const { user } = useAuth();

  const mutationUserLike = useMutation({
    mutationFn: getUserLikeList,
    mutationKey: ["userLikeList"],
    onSuccess: async () => {
      if (user) {
        await queryClient.invalidateQueries({ queryKey: ["userLikeList"] });
        const initialDataQuery = await queryClient.getQueryData([
          "userLikeList",
        ]);
        await queryClient.setQueryData(["userLikeList"], initialDataQuery);
      }
    },
    onError: () => {
      queryClient.removeQueries({ queryKey: ["userLikeList"] });
    },
  });

  const handleAddLike = async (videoId: string, type: LikeTypeType) => {
    try {
      const response = await addLike(videoId, type);
      if (response) {
        sendInformation("Ajouté à votre liste");
        mutationUserLike.mutate();
      }
    } catch (error) {
      sendError("Erreur lors de l'enregistrement");
    }
  };

  const handleRemove = async (videoId: string) => {
    try {
      const response = await removeLike(videoId);
      if (response) {
        sendInformation("Supprimé de votre liste");
        mutationUserLike.mutate();
      }
    } catch (error) {
      sendError("Erreur lors de la suppression");
    }
  };
  function findUserLike(videoId: string, setIsLiked: (bool: boolean) => void) {
    if (data) {
      if (data.find((like) => like?.video.videoId === videoId)) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    }
  }

  return {
    userLikeList: data,
    addLike: handleAddLike,
    removeLike: handleRemove,
    findUserLike: findUserLike,
  };
}
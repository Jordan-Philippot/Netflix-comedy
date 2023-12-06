import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import useMessage from "hooks/useMessage";
import { addLike, getUserLikeList, removeLike } from "api/like";
import { LikeType, LikeTypeType } from "api/like.type";

interface LikeHook {
  userLikeList: LikeType[] | undefined;
  addLike: (videoId: string, type: LikeTypeType) => void;
  removeLike: (videoId: string) => void;
}

export function useLike(): LikeHook {
  const queryClient = useQueryClient();
  const { sendInformation, sendError } = useMessage();

  const { data } = useQuery({
    queryKey: ["userLikeList"],
    queryFn: () => getUserLikeList(),
  });

  const mutationUserLike = useMutation({
    mutationFn: getUserLikeList,
    mutationKey: ["userLikeList"],
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["userLikeList"] });
      const initialDataQuery = await queryClient.getQueryData(["userLikeList"]);
      await queryClient.setQueryData(["userLikeList"], initialDataQuery);
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

  return {
    userLikeList: data,
    addLike: handleAddLike,
    removeLike: handleRemove,
  };
}

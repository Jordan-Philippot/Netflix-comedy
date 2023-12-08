import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import useMessage from "hooks/useMessage";
import { addFavorite, getUserFavoriteList, removeFavorite } from "api/favorite";
import { FavoriteType } from "api/favorite.type";
import { useAuth } from "./useAuth";

interface FavoriteHook {
  userFavorites: FavoriteType[] | undefined;
  addFavorite: (videoId: string) => void;
  removeFavorite: (videoId: string) => void;
  findUserFavorite: (
    videoId: string,
    setIsFavorite: (bool: boolean) => void
  ) => void;
}

export function useFavorite(): FavoriteHook {
  const queryClient = useQueryClient();
  const { sendInformation, sendError } = useMessage();

  const { user } = useAuth();

  const { data } = useQuery({
    queryKey: ["userFavorites"],
    queryFn: () => getUserFavoriteList(),
  });

  const mutationUserFavorite = useMutation({
    mutationFn: getUserFavoriteList,
    mutationKey: ["userFavorites"],
    onSuccess: async () => {
      if (user) {
        await queryClient.invalidateQueries({ queryKey: ["userFavorites"] });
        const initialDataQuery = await queryClient.getQueryData([
          "userFavorites",
        ]);
        await queryClient.setQueryData(["userFavorites"], initialDataQuery);
      }
    },
    onError: () => {
      queryClient.removeQueries({ queryKey: ["userFavorites"] });
    },
  });

  const handleAddFavorite = async (videoId: string) => {
    try {
      const response = await addFavorite(videoId);
      if (response) {
        sendInformation("Ajouté à vos favoris");
        mutationUserFavorite.mutate();
      }
    } catch (error) {
      sendError("Erreur lors de l'enregistrement");
    }
  };

  const handleRemove = async (videoId: string) => {
    try {
      const response = await removeFavorite(videoId);
      if (response) {
        sendInformation("Supprimé de vos favoris");
        mutationUserFavorite.mutate();
      }
    } catch (error) {
      sendError("Erreur lors de la suppression");
    }
  };

  function findUserFavorite(
    videoId: string,
    setIsFavorite: (bool: boolean) => void
  ) {
    if (data) {
      if (data.find((favorite) => favorite?.video.videoId === videoId)) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
  }
  
  return {
    userFavorites: data,
    addFavorite: handleAddFavorite,
    removeFavorite: handleRemove,
    findUserFavorite: findUserFavorite,
  };
}

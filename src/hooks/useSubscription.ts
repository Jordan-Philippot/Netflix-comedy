import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import useMessage from "hooks/useMessage";
import { SubscriptionType } from "api/subscription.type";
import {
  addSubscription,
  removeSubscription,
  getUserSubscriptions,
} from "api/subscription";

interface SubscriptionHook {
  userSubscriptions: SubscriptionType[] | undefined;
  addSubscription: (channelId: string) => void;
  removeSubscription: (channelId: string) => void;
}

export function useSubscription(): SubscriptionHook {
  const queryClient = useQueryClient();
  const { sendInformation, sendError } = useMessage();

  const { data } = useQuery({
    queryKey: ["userSubscriptions"],
    queryFn: () => getUserSubscriptions(),
  });

  const mutationUserSubscription = useMutation({
    mutationFn: getUserSubscriptions,
    mutationKey: ["userSubscriptions"],
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["userSubscriptions"] });
      const initialDataQuery = await queryClient.getQueryData([
        "userSubscriptions",
      ]);
      await queryClient.setQueryData(["userSubscriptions"], initialDataQuery);
    },
    onError: () => {
      queryClient.removeQueries({ queryKey: ["userSubscriptions"] });
    },
  });

  const handleAddSubscription = async (channelId: string) => {
    try {
      const response = await addSubscription(channelId);
      if (response) {
        sendInformation("Ajouté à vos abonnements");
        mutationUserSubscription.mutate();
      }
    } catch (error) {
      sendError("Erreur lors de l'enregistrement");
    }
  };

  const handleRemove = async (channelId: string) => {
    try {
      const response = await removeSubscription(channelId);
      if (response) {
        sendInformation("Supprimé de votre liste");
        mutationUserSubscription.mutate();
      }
    } catch (error) {
      sendError("Erreur lors de la suppression");
    }
  };

  return {
    userSubscriptions: data,
    addSubscription: handleAddSubscription,
    removeSubscription: handleRemove,
  };
}

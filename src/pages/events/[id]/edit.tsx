import { CreateEventForm } from "@/features/create-event";
import { EditEventSchema, trpc } from "@/shared/api";
import { useRouter } from "next/router";

export default function EditEvent() {
  const router = useRouter();

  const { data, isLoading } = trpc.event.findUnique.useQuery({
    id: Number(router.query.id),
  });

  const { mutate } = trpc.event.edit.useMutation({
    onSuccess: ({ id }) => {
      router.push(`/events/${id}`);
    },
  });

  const handleSubmit = (formData: EditEventSchema) => {
    mutate({ ...formData, id: data.id });
  };

  if (isLoading) {
    return "Loading...";
  }

  return <CreateEventForm onSubmit={handleSubmit} initialData={data} />;
}

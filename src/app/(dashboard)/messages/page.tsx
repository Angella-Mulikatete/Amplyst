import { PageHeader } from "@/components/shared/PageHeader";
import { MessagingInterfacePlaceholder } from "@/components/dashboard/MessagingInterfacePlaceholder";

export default function MessagesPage() {
  return (
    <div className="h-full flex flex-col">
      <PageHeader
        title="In-App Messaging"
        description="Communicate directly with collaborators and manage your conversations."
      />
      <div className="flex-grow">
        <MessagingInterfacePlaceholder />
      </div>
    </div>
  );
}

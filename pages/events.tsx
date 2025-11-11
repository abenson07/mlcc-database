import AdminLayout from "@/components/layout/AdminLayout";
import Topbar from "@/components/common/Topbar";
import EventsPlaceholder from "@/components/events/EventsPlaceholder";

const EventsPage = () => (
  <AdminLayout
    header={
      <Topbar
        title="Events"
        ctaLabel="Create event"
        onAdd={() => {
          // TODO: Integrate event creation workflow.
        }}
        searchPlaceholder="Search events (coming soon)"
      />
    }
  >
    <EventsPlaceholder />
  </AdminLayout>
);

export default EventsPage;


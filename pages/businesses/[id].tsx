import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import AdminLayout from "@/components/layout/AdminLayout";
import Button from "@/components/common/Button";
import BusinessDetail from "@/components/businesses/BusinessDetail";
import { Business, businesses, getBusinessById } from "@/data/businesses";

type BusinessDetailPageProps = {
  business: Business;
};

const BusinessDetailPage = ({ business }: BusinessDetailPageProps) => (
  <AdminLayout
    header={
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Link
            href="/businesses"
            className="text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            ← Back to businesses
          </Link>
          <h1 className="mt-2 text-2xl font-semibold text-neutral-900">
            {business.companyName}
          </h1>
          <p className="text-sm text-neutral-500">
            Detailed profile and sponsorship activity
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            size="md"
            onClick={() => {
              // TODO: Attach export to PDF functionality.
              console.info("export business profile", business.id);
            }}
          >
            Export Profile
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              // TODO: Hook into sponsor renewal workflow.
              console.info("renew sponsorship", business.id);
            }}
          >
            Renew Sponsorship
          </Button>
        </div>
      </div>
    }
  >
    <BusinessDetail business={business} />
  </AdminLayout>
);

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = businesses.map((business) => ({
    params: { id: business.id }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<
  BusinessDetailPageProps,
  { id: string }
> = async ({ params }) => {
  const businessId = params?.id;
  const business = businessId ? getBusinessById(businessId) : null;

  if (!business) {
    return { notFound: true };
  }

  return {
    props: {
      business
    }
  };
};

export default BusinessDetailPage;


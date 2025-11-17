import { useState, useEffect } from "react";
import Button from "@/components/common/Button";
import { Person } from "@/data/people";

type PersonDetailCardProps = {
  person: Person;
  onClose: () => void;
};

const PersonDetailCard = ({ person, onClose }: PersonDetailCardProps) => {
  const householdMembers = person.householdId ? [] : []; // TODO: Fetch household members

  // Form state
  const [formData, setFormData] = useState({
    name: person.name,
    address: person.address,
    email: person.email
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Check for unsaved changes
  useEffect(() => {
    const hasChanges =
      formData.name !== person.name ||
      formData.address !== person.address ||
      formData.email !== person.email;
    setHasUnsavedChanges(hasChanges);
  }, [formData, person]);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // TODO: Save to database
    console.log("Saving person data:", formData);
    setHasUnsavedChanges(false);
    // After saving, you might want to update the person prop or refresh data
  };

  const handleClose = () => {
    if (hasUnsavedChanges) {
      const confirmed = window.confirm(
        "You have unsaved changes. Are you sure you want to close without saving?"
      );
      if (!confirmed) {
        return;
      }
    }
    onClose();
  };

  return (
    <div className="flex h-fit flex-col rounded-lg border border-primary-300 bg-cream-100 p-6 shadow-sm">
      {/* Name Section */}
      <div className="mb-6 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-primary-800">Name</h3>
          <button
            type="button"
            onClick={handleClose}
            className="text-sm text-neutral-600 hover:text-primary-800"
          >
            ✕
          </button>
        </div>
        <div className="space-y-2">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="w-full rounded border border-primary-300 bg-cream-100 px-3 py-2 text-sm text-neutral-700 focus:border-primary-700 focus:outline-none focus:ring-1 focus:ring-primary-700"
          />
          <input
            type="text"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            className="w-full rounded border border-primary-300 bg-cream-100 px-3 py-2 text-sm text-neutral-700 focus:border-primary-700 focus:outline-none focus:ring-1 focus:ring-primary-700"
          />
        </div>
      </div>

      {/* Contact Section */}
      <div className="mb-6 space-y-3">
        <h3 className="text-base font-semibold text-primary-800">Contact</h3>
        <div className="space-y-2">
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="w-full rounded border border-primary-300 bg-cream-100 px-3 py-2 text-sm text-neutral-700 focus:border-primary-700 focus:outline-none focus:ring-1 focus:ring-primary-700"
          />
        </div>
      </div>

      {/* Household Section */}
      {person.householdId && (
        <div className="mb-6 space-y-3">
          <h3 className="text-base font-semibold text-primary-800">Household</h3>
          <p className="text-sm text-neutral-700">
            Household ID: {person.householdId}
          </p>
          {householdMembers.length > 0 && (
            <div className="space-y-2">
              {householdMembers.map((member, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded border border-primary-200 bg-cream-100 px-3 py-2"
                >
                  <span className="text-sm text-neutral-700">{member}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Save Button */}
      <div className="mt-auto pt-4 border-t border-primary-200">
        <Button
          variant="primary"
          size="md"
          onClick={handleSave}
          disabled={!hasUnsavedChanges}
          className="w-full"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default PersonDetailCard;


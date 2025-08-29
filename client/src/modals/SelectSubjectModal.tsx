import { X } from "lucide-react";
import React from "react";

interface SubjectSelectionModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSelectSubject?: (subject: string) => void;
}

export const SubjectSelectionModal: React.FC<SubjectSelectionModalProps> = ({
  isOpen = true,
  onClose = () => {},
  onSelectSubject = () => {},
}) => {
  const subjects = [
    "English",
    "Kiswahili or Kenyan Sign Language",
    "Mathematics",
    "Integrated Science",
    "Health Education",
    "Pre-Technical and Pre-Career Education",
    "Social Studies",
    "Religious Education (CRE, IRE, or HRE)",
    "Business Studies",
    "Agriculture",
    "Life Skills Education",
    "Sports and Physical Education",
  ];

  const handleSubjectSelect = (subject: string) => {
    onSelectSubject(subject);
    onClose();
  };

  const handleKeyDown = (event: React.KeyboardEvent, subject: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleSubjectSelect(subject);
    }
  };

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={handleOverlayClick}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 id="modal-title" className="text-xl font-semibold text-gray-900">
            Choose Your Subject
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Subject List */}
        <div className="max-h-96 overflow-y-auto">
          <div className="p-4 space-y-2">
            {subjects.map((subject, index) => (
              <button
                key={subject}
                onClick={() => handleSubjectSelect(subject)}
                onKeyDown={(e) => handleKeyDown(e, subject)}
                className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 group"
                tabIndex={0}
              >
                <span className="text-gray-800 font-medium group-hover:text-blue-700">
                  {subject}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <p className="text-sm text-gray-600 text-center">
            Select a subject to continue with your learning journey
          </p>
        </div>
      </div>
    </div>
  );
};

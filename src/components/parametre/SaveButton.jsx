import React from 'react';
import { Save } from 'lucide-react';

const SaveButton = ({ darkMode, onSave }) => {
  return (
    <div className={`p-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="flex justify-end">
        <button
          onClick={onSave}
          className="px-8 py-3 bg-linear-to-r from-purple-600 to-purple-800 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center"
        >
          <Save className="w-5 h-5 mr-2" />
          Sauvegarder les modifications
        </button>
      </div>
    </div>
  );
};

export default SaveButton;